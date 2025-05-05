# Receipt Processor

This project implements a REST API for processing receipts and calculating reward points.

## Getting Started

1.  Install dependencies:
    `sh
npm install
`

2.  Start the server:
    `sh
npm run dev
`

3.  Run tests:
    `sh
npm test
`

## API Endpoints

- `POST /receipts/process` - Submit a receipt for processing
- `GET /receipts/:id/points` - Retrieve points for a receipt

## Docker Support

To run in Docker:
`sh
       docker build -t receipt-processor .
       docker run -p 3000:3000 receipt-processor
       `
