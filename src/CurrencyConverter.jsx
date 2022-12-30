import React, { useState } from "react";

export function CurrencyConverter({ data }) {
  // {foreign currency symbol: 1 unit of currency = how much CZK}
  const exchangeRates = Object.fromEntries(data.map(entry => [entry[3], parseFloat(entry[4]) / parseFloat(entry[2])]));
  // {foreign currency symbol: currency name}
  const currencyNames = Object.fromEntries(data.map(entry => [entry[3], entry[1]]));

  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState(data[0][3]);
  const [result, setResult] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(`${amount} CZK = ${amount / exchangeRates[currency]} ${currency}`);
  }

  // could use some more styling
  return (
    <div>
      <h1>Currency Converter</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Amount:
          <input
            name="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)} />
        </label>
        <br />
        <label>from: CZK</label>
        <br />
        <label>
          To:
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {
              Object.entries(currencyNames)
                .map(([symbol, currencyName]) => <option key={symbol} value={symbol}>{symbol} ({currencyName})</option>)
            }
          </select>
        </label>
        <br />
        <input type="submit" value="Convert" />
      </form>

      <p>{result}</p>
    </div>
  );
}
