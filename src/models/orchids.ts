import mongoose, { Document, Schema } from "mongoose";
import slugify from "slugify";
import { IComment } from "./comments";
import { ICategory } from "./category";

interface IOrchid extends Document {
  name: string;
  slug: string;
  image: string;
  price: number;
  color: string;
  original: string;
  category: ICategory["_id"];
  isNatural?: boolean;
  comments: IComment[];
  meta_data?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrchidSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    price: {
      type: Number,
      required: true,
      get: (v: number) => (v / 100).toFixed(2),
      set: (v: number) => v * 100,
    },
    color: { type: String, required: true },
    original: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    isNatural: { type: Boolean, default: false, required: false },
    meta_data: { type: String, required: false },
  },
  { timestamps: true, toJSON: { getters: true } }
);

export const Orchid = mongoose.model<IOrchid>("Orchid", OrchidSchema);

//Orchids action
const RESULTS_PER_PAGE = 5;

export const getOrchids = (page = 1, name = "") => {
  const skip = (page - 1) * RESULTS_PER_PAGE;
  return Orchid.find({ name: new RegExp(name, "i") })
    .populate("category", "name")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(RESULTS_PER_PAGE);
};

export const getTotalPages = async () => {
  const totalOrchids = await Orchid.countDocuments();
  return Math.ceil(totalOrchids / RESULTS_PER_PAGE);
};

export const getOrchidByName = (name: string) => Orchid.findOne({ name });
export const getOrchidById = (id: string) => Orchid.findById(id);
export const getOrchidBySlug = (slug: string) =>
  Orchid.findOne({ slug: slug }).populate("category", "name");
export const createOrchid = (values: Record<string, any>) => {
  const slug = slugify(values.name, { lower: true });
  return new Orchid({ ...values, slug })
    .save()
    .then((Orchid) => Orchid.toObject());
};
export const deleteOrchidById = (id: string) =>
  Orchid.findOneAndDelete({ _id: id });
export const updateOrchidById = (id: string, values: Record<string, any>) => {
  if (values.name) {
    const slug = slugify(values.name, { lower: true });
    values = { ...values, slug };
  }
  return Orchid.findByIdAndUpdate(id, values);
};

export const deleteOldestOrchid = async () => {
  const oldestOrchid = await Orchid.findOne().sort("createdAt");
  if (!oldestOrchid) {
    return null;
  }
  return Orchid.findOneAndDelete(oldestOrchid._id);
};
