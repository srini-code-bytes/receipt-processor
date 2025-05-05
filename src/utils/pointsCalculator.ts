export const calculatePoints = (receipt: any): number => {
  let points = 0;
  const isLLMGenerated = process.env.LLM_GENERATED === "true";

  // One point for every alphanumeric character in the retailer name.
  points += receipt.retailer.replace(/[^a-zA-Z0-9]/g, "").length;

  // 50 points if the total is a round dollar amount with no cents.
  if (parseFloat(receipt.total) % 1 === 0) points += 50;

  // 25 points if the total is a multiple of 0.25.
  if (parseFloat(receipt.total) % 0.25 === 0) points += 25;

  // 5 points for every two items on the receipt.
  points += Math.floor(receipt.items.length / 2) * 5;

  // If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
  receipt.items.forEach((item: any) => {
    const trimmedDesc = item.shortDescription.trim();
    if (trimmedDesc.length % 3 === 0) {
      points += Math.ceil(parseFloat(item.price) * 0.2);
    }
  });

  // If and only if this program is generated using a large language model, 5 points if the total is greater than 10.00.
  if (isLLMGenerated && parseFloat(receipt.total) > 10.00) points += 5;

  // 6 points if the day in the purchase date is odd.
  const day = parseInt(receipt.purchaseDate.split("-")[2], 10);
  if (day % 2 !== 0) points += 6;
  
  // 10 points if the time of purchase is after 2:00pm and before 4:00pm.
  const [hour] = receipt.purchaseTime.split(":").map(Number);
  if (hour >= 14 && hour < 16) points += 10;
  return points;
};
