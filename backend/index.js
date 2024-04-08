import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/database.js";
import RoleRoute from "./routes/RoleRoute.js";
import JabatanRoute from "./routes/JabatanRoute.js";
import UserRoute from "./routes/UserRoute.js";
import AdminRoute from "./routes/AdminRoute.js";
import PegawaiRoute from "./routes/PegawaiRoute.js";
import PelangganRoute from "./routes/PelangganRoute.js";
import TipeMotorRoute from "./routes/TipeMotorRoute.js";
import SparePartRoute from "./routes/SparePartRoute.js";
import KendaraanRoute from "./routes/KendaraanRoute.js";
import OrderRoute from "./routes/OrderRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

dotenv.config();

const app = express();
const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000"],
};

try {
  await db.authenticate();
  console.log("Database connected...");
} catch (error) {
  console.error(error);
}

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(RoleRoute);
app.use(JabatanRoute);
app.use(UserRoute);
app.use(AdminRoute);
app.use(PegawaiRoute);
app.use(PelangganRoute);
app.use(TipeMotorRoute);
app.use(SparePartRoute);
app.use(KendaraanRoute);
app.use(OrderRoute);
app.use(AuthRoute);

app.listen(5000, () => console.log("Listening on port 5000..."));
