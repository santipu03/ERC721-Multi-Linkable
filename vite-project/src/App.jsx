import { Box } from "@chakra-ui/react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import Airpdrops from "./routes/Airdrops";
import LinkE7ML from "./routes/LinkE7ML";
import MintE7ML from "./routes/MintE7ML";
import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
  network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(config);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
  },
  {
    path: "airdrops",
    element: <Airpdrops />,
  },
  {
    path: "mint",
    element: <MintE7ML alchemy={alchemy} />,
  },
  {
    path: "link",
    element: <LinkE7ML alchemy={alchemy} />,
  },
]);

function App() {
  return (
    <Box w="100vw" h="100vh" bg={"#f8f9fa"} overflowX={"hidden"}>
      <Header></Header>
      <RouterProvider router={router} />
      <Footer></Footer>
    </Box>
  );
}

export default App;
