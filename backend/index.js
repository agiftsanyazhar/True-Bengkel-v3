import express from "express";
import cors from "cors";
import RoleRoute from "./routes/RoleRoute.js";
import UserRoute from "./routes/UserRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(RoleRoute);
app.use(UserRoute);

app.listen(5000, () => console.log("Listening on port 5000..."));
