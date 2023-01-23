import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { MoralisProvider } from "react-moralis";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MoralisProvider initializeOnMount={false}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </MoralisProvider>
  </React.StrictMode>
);
