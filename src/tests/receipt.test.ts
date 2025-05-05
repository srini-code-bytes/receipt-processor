import request from "supertest";
import app from "../app";

describe("Receipt Processing API", () => {
  it("should process a receipt and return an ID", async () => {
    const res = await request(app)
      .post("/receipts/process")
      .send({
        retailer: "Target",
        purchaseDate: "2022-01-01",
        purchaseTime: "13:01",
        items: [{ shortDescription: "Mountain Dew", price: "6.49" }],
        total: "6.49",
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id");
  });

  it("should return the correct points for a receipt", async () => {
    const processRes = await request(app)
      .post("/receipts/process")
      .send({
        retailer: "Target",
        purchaseDate: "2022-01-01",
        purchaseTime: "13:01",
        items: [{ shortDescription: "Mountain Dew", price: "6.49" }],
        total: "6.49",
      });

    const id = processRes.body.id;
    const pointsRes = await request(app).get(`/receipts/${id}/points`);
    expect(pointsRes.status).toBe(200);
    expect(pointsRes.body).toHaveProperty("points");
  });

  it("should return 404 for invalid receipt ID", async () => {
    const res = await request(app).get("/receipts/invalid-id/points");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });

  it("should return 400 for invalid receipt data", async () => {
    const res = await request(app).post("/receipts/process").send(undefined);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
