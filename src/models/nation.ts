import mongoose, { Document, Schema } from "mongoose";

interface INation extends Document {
  name: string;
  description: string;
  meta_data?: string;
}

const NationSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  meta_data: { type: String, required: false },
});

export const Nation = mongoose.model<INation>("Nation", NationSchema);

//Nation Actions
export const getNations = () => Nation.find();
export const getNationByName = (name: string) => Nation.findOne({ name });
export const getNationById = (id: string) => Nation.findById(id);
export const createNation = (values: Record<string, any>) =>
  new Nation(values).save().then((nation) => nation.toObject());
export const deleteNationById = (id: string) =>
  Nation.findOneAndDelete({ _id: id });
export const updateNationById = (id: string, values: Record<string, any>) =>
  Nation.findByIdAndUpdate(id, values);
