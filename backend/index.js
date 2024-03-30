import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/database.js";
import RoleRoute from "./routes/RoleRoute.js";
import JabatanRoute from "./routes/JabatanRoute.js";
import UserRoute from "./routes/UserRoute.js";

dotenv.config();

const app = express();

try {
  await db.authenticate();
  console.log("Database connected...");
} catch (error) {
  console.error(error);
}

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(RoleRoute);
app.use(JabatanRoute);
app.use(UserRoute);

app.listen(5000, () => console.log("Listening on port 5000..."));
