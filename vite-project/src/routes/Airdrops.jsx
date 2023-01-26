import { Box, Flex } from "@chakra-ui/react";
import AirdropOldNFT from "../components/AirdropOldNFT";
import AirdropTestNFT from "../components/AirdropTestNFT";

function Airpdrops() {
  return (
    <Flex
      paddingY={"3rem"}
      paddingX={[10, 10, 10, 20, 150, 200]}
      minHeight={"calc(100vh - 161px)"}
      gap={"30px"}
    >
      <AirdropOldNFT />
      <AirdropTestNFT />
    </Flex>
  );
}

export default Airpdrops;
