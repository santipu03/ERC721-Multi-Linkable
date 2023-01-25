import { Flex, Image, Text } from "@chakra-ui/react";

function UnlinkedNFT({ nft }) {
  return (
    <Flex
      flexDir={"column"}
      border={"1px solid grey"}
      borderRadius={"10px"}
      height={"250px"}
      width={"250px"}
      bgColor={"#fff"}
      justifyContent={"space-between"}
      padding="10px"
    >
      <Flex
        width={"100%"}
        height={"180px"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Image
          src={nft.rawMetadata.image}
          alt="img"
          objectFit={"contain"}
          height={"100%"}
          width={"100%"}
          borderRadius={"10px"}
        ></Image>
      </Flex>
      <Flex flexDir={"column"} padding={"0 10px"}>
        <Text>
          <b>{nft.tokenId}</b>
        </Text>
        <Text margin={0}>
          <b>{nft.contract.name}</b>
        </Text>
      </Flex>
    </Flex>
  );
}

export default UnlinkedNFT;
