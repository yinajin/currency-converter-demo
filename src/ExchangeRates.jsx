import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CurrencyConverter } from "./CurrencyConverter";

export function ExchangeRates() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["exchangeRateData"],
    queryFn: () =>
      axios
        .get("https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt")
        .then((res) => {
          return res.data
            .split("\n")
            .slice(2)
            .map(line => line.split("|"))
            .filter(entry => entry.length == 5)
            .map(entry => [entry[0], entry[1].charAt(0).toUpperCase() + entry[1].slice(1), entry[2], entry[3], entry[4]]);
        }),
  });

  if (isLoading) {
    return "Loading...";
  }

  if (error) {
    return "An error has occurred: " + error.message;
  }

  return (
    <div>
      <CurrencyConverter data={data} />
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Exchange Rate Today</th>
          </tr>
        </thead>
        <tbody>
          {data.map(entry =>
            <tr key={entry[0]}>
              <td>{entry[0]}</td>
              <td>{entry[2]} {entry[1].charAt(0).toUpperCase() + entry[1].slice(1)} ({entry[3]}) = {entry[4]} CZK</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}