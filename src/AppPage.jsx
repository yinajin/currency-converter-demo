import axios from "axios";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ExchangeRateTable } from "./ExchangeRateTable";
import { CurrencyConverter } from "./CurrencyConverter";
import styled from "styled-components";

const StyledMain = styled.main`
  grid-area: main;
  padding: 0.25rem;
`;
const StyledSideBar = styled.div`
  grid-area: sidebar;
  padding: 0.25rem;
`;

export function AppPage() {
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
    <>
      <StyledSideBar>
        <ExchangeRateTable data={data} />
      </StyledSideBar>
      <StyledMain>
        <CurrencyConverter data={data} />
      </StyledMain>
    </>
  );
}