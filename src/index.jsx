import React from "react";
import ReactDOM from "react-dom/client";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import styled from "styled-components";
import { AppPage } from "./AppPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StyledContainer>
        <AppPage />
      </StyledContainer>
    </QueryClientProvider>
  );
}

const StyledContainer = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 0.2fr 1fr 0.5fr 0.5fr;
  grid-template-areas:
    "sidebar main main main"
    "sidebar main main main"
    "sidebar main main main";
  text-align: center;
  grid-gap: 0.25rem;
  transition: all 0.25s ease-in-out;
`;

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
