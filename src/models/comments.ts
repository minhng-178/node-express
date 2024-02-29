import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./users";
import { Orchid } from "./orchids";

export interface IComment extends Document {
  author: IUser["_id"];
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema: Schema = new Schema(
  {
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    orchid: {
      type: Schema.Types.ObjectId,
      ref: "Orchid",
      require: true,
    },
  },
  { timestamps: true }
);

CommentSchema.index({ author: 1, orchid: 1 }, { unique: true });

export const Comment = mongoose.model<IComment>("Comment", CommentSchema);

// Comment Actions
export const getComments = () => Comment.find().sort({ createdAt: -1 });
export const getCommentById = (id: string) => Comment.findById(id);
export const createComment = (values: Record<string, any>, slug: string) =>
  new Comment(values).save().then((comment) => {
    return Orchid.findOneAndUpdate(
      { slug: slug },
      { $push: { comments: comment._id } },
      { new: true }
    ).then((orchid) => comment.toObject());
  });
export const deleteCommentById = async (id: string) => {
  const comment = await Comment.findById(id);
  if (!comment) {
    throw new Error("Comment not found");
  }
  await Orchid.updateMany(
    { comments: comment._id },
    { $pull: { comments: comment._id } }
  );
  return Comment.deleteOne({ _id: id });
};
export const updateCommentById = (id: string, values: Record<string, any>) =>
  Comment.findByIdAndUpdate(id, values);
export const deleteOldestComment = async () => {
  const oldestComment = await Comment.findOne().sort("createdAt");
  if (!oldestComment) {
    return null;
  }
  return Comment.findOneAndDelete(oldestComment._id);
};
