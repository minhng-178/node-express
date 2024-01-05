import { Timestamp } from "mongodb";
import mongoose, { Document, Schema } from "mongoose";

interface IPlayer extends Document {
  name: string;
  image: string;
  club: string;
  position: string;
  goals?: number;
  isCaptain?: boolean;
  meta_data?: string;
  createdAt: Date;
  updatedAt: Date;
  nation_id: { type: Schema.Types.ObjectId; ref: "Nation" };
}

const PlayerSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    // image: { type: String, required: true },
    // club: { type: String, required: true },
    // position: { type: String, required: true },
    // goals: { type: Number, required: false },
    // isCaptain: { type: Boolean, required: false },
    // meta_data: { type: String, required: false },
    // nation_id: { type: Schema.Types.ObjectId, ref: "Nation", require: true },
  },
  { timestamps: true }
);

export const Player = mongoose.model<IPlayer>("Player", PlayerSchema);

//Player Actions
export const getPlayers = () => Player.find();
export const getPlayerByName = (name: string) => Player.findOne({ name });
export const getPlayerById = (id: string) => Player.findById(id);
export const createPlayer = (values: Record<string, any>) =>
  new Player(values).save().then((player) => player.toObject());
export const deletePlayerById = (id: string) =>
  Player.findOneAndDelete({ _id: id });
export const updatePlayerById = (id: string, values: Record<string, any>) =>
  Player.findByIdAndUpdate(id, values);
