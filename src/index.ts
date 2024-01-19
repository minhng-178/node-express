import http from "http";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import compression from "compression";
import methodOverride from "method-override";

import router from "./routers";
import { originalData } from "./controllers/orchids";

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

const MONGODB_URI = process.env.MONGODB_URI!;

if (MONGODB_URI) {
  mongoose.Promise = Promise;
  mongoose.connect(MONGODB_URI).then(() => console.log("Connected to MongoDB"));
  mongoose.connection.on("error", (error: Error) => console.log(error));
} else {
  throw new Error("Missing MongoDB connection string");
}

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

app.get("/orchidForm", function (req: express.Request, res: express.Response) {
  res.render("pages/orchidForm", { originalList: originalData });
});

//Routes
app.use("/", router());
