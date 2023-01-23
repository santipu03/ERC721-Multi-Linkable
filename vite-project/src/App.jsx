import { Box } from "@chakra-ui/react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  return (
    <Box w="100vw" h="100vh" bg={"#f8f9fa"} overflowX={"hidden"}>
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </Box>
  );
}

export default App;
