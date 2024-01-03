import http from "http";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import compression from "compression";

import router from "./routers";

dotenv.config();

const app = express();
const port = 5000 || process.env.REST_PUBLIC_URL;

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(bodyParser.json());

const server = http.createServer(app);

// app.use(
//   (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "text/html");
//     res.end("<html><body><h1>This is an Express Server</h1></body></html>");
//   }
// );

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
app.use(express.static(__dirname + "/public"));

//Routes
app.use("/api/", router());
