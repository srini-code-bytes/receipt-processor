import express from "express";
import receiptRoutes from "./routes/receiptRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/receipts", receiptRoutes);

export default app;
