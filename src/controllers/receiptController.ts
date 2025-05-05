import { Request, Response } from "express";
import { calculatePoints } from "../utils/pointsCalculator";
import { v4 as uuidv4 } from "uuid";

interface ReceiptStore {
  [key: string]: { receipt: any; points: number };
}

const receiptStore: ReceiptStore = {};

export const processReceipt = (req: Request, res: Response): any => {
  const receipt = req.body;

  if (!receipt || Object.keys(receipt).length === 0) {
    return res.status(400).json({ error: "Invalid receipt data." });
  }
  const id = uuidv4();
  const points = calculatePoints(receipt);
  receiptStore[id] = { receipt, points };

  return res.json({ id });

};

export const getPoints = (req: Request, res: Response): any => {
  const { id } = req.params;
  if (!receiptStore[id]) {
    return res.status(404).json({ error: "No receipt found for that ID." });
  }
  return res.json({ points: receiptStore[id].points });
};
