import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "dotenv";
import healthcheckRouter from "./routes/healthcheck";
import authRouter from "./routes/auth";

config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/health", healthcheckRouter);
app.use("/auth", authRouter);

app.get("/", (_req, res) => {
  res.json({ ok: true, message: "HealthLink backend API root" });
});

app.listen(PORT, () => {
  console.log(`HealthLink backend running on port ${PORT}`);
});
