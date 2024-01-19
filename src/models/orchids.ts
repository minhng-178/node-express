import mongoose, { Document, Schema } from "mongoose";

interface IOrchid extends Document {
  name: string;
  image: string;
  price: number;
  color: string;
  original: string;
  isNatural: boolean;
  meta_data?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrchidSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    price: { type: Number, required: false },
    color: { type: String, required: true },
    original: { type: String, required: true },
    isNatural: { type: Boolean, required: false },
    meta_data: { type: String, required: false },
  },
  { timestamps: true }
);

export const Orchid = mongoose.model<IOrchid>("Player", OrchidSchema);

//Orchids action
export const getOrchids = () => Orchid.find().sort({ createdAt: -1 });
export const getOrchidByName = (name: string) => Orchid.findOne({ name });
export const getOrchidById = (id: string) => Orchid.findById(id);
export const createOrchid = (values: Record<string, any>) =>
  new Orchid(values).save().then((Orchid) => Orchid.toObject());
export const deleteOrchidById = (id: string) =>
  Orchid.findOneAndDelete({ _id: id });
export const updateOrchidById = (id: string, values: Record<string, any>) =>
  Orchid.findByIdAndUpdate(id, values);
