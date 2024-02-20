import mongoose from "mongoose";
import { IUser } from "./users";

export interface IComment extends mongoose.Document {
  author: IUser["_id"];
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema: mongoose.Schema = new mongoose.Schema(
  {
    rating: { type: Number, min: 1, max: 5, require: true },
    comment: { type: String, require: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model<IComment>("Comment", CommentSchema);

// Comment Actions
export const getComments = () => Comment.find().sort({ createdAt: -1 });
export const getCommentById = (id: string) => Comment.findById(id);
export const createComment = (values: Record<string, any>) =>
  new Comment(values).save().then((comment) => comment.toObject());
export const deleteCommentById = (id: string) =>
  Comment.findOneAndDelete({ _id: id });
export const updateCommentById = (id: string, values: Record<string, any>) =>
  Comment.findByIdAndUpdate(id, values);
export const deleteOldestComment = async () => {
  const oldestComment = await Comment.findOne().sort("createdAt");
  if (!oldestComment) {
    return null;
  }
  return Comment.findOneAndDelete(oldestComment._id);
};
