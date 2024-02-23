import mongoose, { Document, Schema } from "mongoose";
import slugify from "slugify";

export interface IUser extends Document {
  email: string;
  name: string;
  avatar: string;
  slug: string;
  YOB: number;
  isAdmin: boolean;
  bio: string;
  authentication: {
    password: string;
    salt: string;
    refreshToken: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    slug: { type: String, require: true },
    YOB: { type: Number, required: false },
    isAdmin: { type: Boolean, default: false },
    avatar: {
      type: String,
      default:
        "https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-479x512-n8sg74wg.png",
    },
    bio: { type: String, maxlength: 500, required: false },
    authentication: {
      password: { type: String, required: true, select: false },
      salt: { type: String, select: false },
      refreshToken: { type: [String], select: false },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);

// User actions
const RESULTS_PER_PAGE = 5;

export const getUsers = (page = 1, name = "") => {
  const skip = (page - 1) * RESULTS_PER_PAGE;
  return User.find({ name: new RegExp(name, "i"), isAdmin: false })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(RESULTS_PER_PAGE);
};

export const getTotalPages = async () => {
  const totalUsers = await User.countDocuments();
  return Math.ceil(totalUsers / RESULTS_PER_PAGE);
};

export const getUserByEmail = (email: string) => User.findOne({ email });
export const getUserBySlug = (slug: string) => User.findOne({ slug: slug });
export const getUserBySessionToken = (sessionToken: string) =>
  User.findOne({ "authentication.sessionToken": sessionToken });
export const getUserByRefreshToken = (refreshToken: string) =>
  User.findOne({
    "authentication.refreshToken": refreshToken,
  }).select("+authentication.refreshToken");

export const getUserByName = (name: string) => User.findOne({ name });
export const getUserById = (id: string) => User.findById(id);
export const getUserByUsername = (username: string) =>
  User.findOne({ username });
export const createUser = (values: Record<string, any>) => {
  const slug = slugify(values.name, { lower: true });
  return new User({ ...values, slug }).save().then((User) => User.toObject());
};
export const deleteUserById = (id: string) =>
  User.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) => {
  return User.findByIdAndUpdate(id, values);
};

export const deleteOldestUser = async () => {
  const oldestUser = await User.findOne().sort("createdAt");
  if (!oldestUser) {
    return null;
  }
  return User.findOneAndDelete(oldestUser._id);
};

export const changeNewPassword = async (
  email: string,
  newSalt: string,
  newHash: string
) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }
  user.authentication.salt = newSalt;
  user.authentication.password = newHash;
  return user.save();
};
