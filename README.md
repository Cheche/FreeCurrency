# Free currency - Proof of concept

This project is a proof of concept for a calculator that converts the value of one currency to its equivalent in another currency.

## Settings

Copy the example file .env.example and rename it to .env.local

Then login to [https://freecurrencyapi.com](https://freecurrencyapi.com) create an account and get an ApiKey.

Place the ApiKey in the .env.local file.

It should look like this

```javascript
FREECURRENCYAPI_URL=https://api.freecurrencyapi.com/v1
FREECURRENCYAPI_KEY=fca_live_key
```

## Getting Started

To run the server you need to have Node installed on your computer.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
