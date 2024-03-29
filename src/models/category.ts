import mongoose from "mongoose";

export interface ICategory extends mongoose.Document {
  name: string;
  description: string;
  meta_data?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: mongoose.Schema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    meta_data: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

export const Category = mongoose.model<ICategory>("Category", CategorySchema);

//Category Actions
export const getCategories = () => Category.find().sort({ createdAt: -1 });
export const getCategoryByName = (name: string) => Category.findOne({ name });
export const getCategoryById = (id: string) => Category.findById(id);
export const createCategory = (values: Record<string, any>) =>
  new Category(values).save().then((category) => category.toObject());
export const deleteCategoryById = (id: string) =>
  Category.findOneAndDelete({ _id: id });
export const updateCategoryById = (id: string, values: Record<string, any>) =>
  Category.findByIdAndUpdate(id, values);
export const deleteOldestCategory = async () => {
  const oldestCategory = await Category.findOne().sort("createdAt");
  if (!oldestCategory) {
    return null;
  }
  return Category.findOneAndDelete(oldestCategory._id);
};
