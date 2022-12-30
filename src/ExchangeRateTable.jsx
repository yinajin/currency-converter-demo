import React from "react";

export function ExchangeRateTable({ data }) {
  return (
    <div>
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
              <td>{entry[2]} {entry[1]} ({entry[3]}) = {entry[4]} CZK</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}