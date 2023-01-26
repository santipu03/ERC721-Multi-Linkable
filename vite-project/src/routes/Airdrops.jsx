import { Box, Flex } from "@chakra-ui/react";
import AirdropOldNFT from "../components/AirdropOldNFT";
import AirdropTestNFT from "../components/AirdropTestNFT";

function Airpdrops() {
  return (
    <Flex
      paddingY={"3rem"}
      paddingX={[10, 10, 10, 20, 150, 200]}
      minHeight={"calc(100vh - 161px)"}
      flexDir="column"
      alignItems="center"
    >
      <Flex flexDir="column" width={"50%"}>
        <AirdropOldNFT />
      </Flex>
      <Flex flexDir="column" width="50%">
        <AirdropTestNFT />
      </Flex>
    </Flex>
  );
}

export default Airpdrops;
