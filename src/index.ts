import http from "http";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import methodOverride from "method-override";

import router from "./routers";
import { connectDB } from "./configs/db";
import { uploadCloud } from "./configs/cloudinary";

dotenv.config();

const app = express();
const port = 5000 || process.env.REST_PUBLIC_URL;

app.use(
  cors({
    credentials: true,
  })
);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Connect to MongoDB
connectDB();

app.use(morgan("dev"));
app.use(compression());
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", function (req: express.Request, res: express.Response) {
  res.render("pages/home");
});

app.get("/login", function (req: express.Request, res: express.Response) {
  res.render("pages/login");
});

app.post("/upload", uploadCloud.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const fileURL = req.file.path;

  return res
    .status(200)
    .send({ message: "File uploaded successfully.", fileURL });
});

//Routes
app.use("/", router());

// Global error handler
app.use(
  (
    err: express.Errback,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err);
    res.status(500).send("Something broke!");
  }
);
