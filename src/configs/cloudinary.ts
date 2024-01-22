import multer from "multer";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

dotenv.config();

interface Params {
  format: (req: Express.Request, file: Express.Multer.File) => Promise<string>;
  public_id: (req: Express.Request, file: Express.Multer.File) => string;
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    format: async (req: Express.Request, file: Express.Multer.File) => {
      return ["jpg", "png"].includes(file.originalname.split(".").pop())
        ? file.originalname.split(".").pop()
        : "png";
    },
    public_id: (req: Express.Request, file: Express.Multer.File) =>
      file.originalname,
  } as Params,
});

export const uploadCloud = multer({ storage });
