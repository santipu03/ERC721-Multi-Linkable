import { Box, Heading, Button, Divider, Text } from "@chakra-ui/react";
import AirdropOldNFT from "./AirdropOldNFT";
import MintE7L from "./MintE7L";
import AirdropTestNFT from "./AirdropTestNFT";
import LinkE7L from "./LinkE7L";
import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
  network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(config);

function Main() {
  return (
    <Box padding={"3rem 6rem"} minHeight={"calc(100vh - 161px)"}>
      <Box>
        <AirdropOldNFT></AirdropOldNFT>
        <Divider margin={"20px 0"}></Divider>
        <MintE7L alchemy={alchemy}></MintE7L>
        <Divider margin={"20px 0"}></Divider>
        <AirdropTestNFT></AirdropTestNFT>
        <Divider margin={"20px 0"}></Divider>
        <LinkE7L alchemy={alchemy}></LinkE7L>
      </Box>
    </Box>
  );
}
export default Main;
