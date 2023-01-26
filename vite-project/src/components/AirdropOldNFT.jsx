import { Heading, Button, useToast, Flex, Box, Text } from "@chakra-ui/react";
import { useWeb3Contract } from "react-moralis";
import { CERTIFICATION_ADDRESS, CERTIFICATION_ABI } from "../../constants";
import { useState } from "react";

function AirdropOldNFT() {
  const toast = useToast();
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const { runContractFunction: mint } = useWeb3Contract({
    abi: CERTIFICATION_ABI,
    contractAddress: CERTIFICATION_ADDRESS,
    functionName: "mint",
    msgValue: 0,
    // tokenId is a random number between 1 and 10000
    params: {
      tokenId: Math.floor(Math.random() * (10000 - 1 + 1) + 1),
    },
  });

  const handleButtonClick = () => {
    setIsButtonLoading(true);
    mint({
      onError: (e) => handleAirdropError(e),
      onSuccess: handleAirdropSuccess,
    });
  };

  const handleAirdropError = (e) => {
    setIsButtonLoading(false);
    console.log(e);
    toast({
      title: "OOOPS!",
      description: "Something went wrong. Try Again",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  const handleAirdropSuccess = async (tx) => {
    await tx.wait(1);
    toast({
      title: "NFT Airdropped.",
      description: "Now you have the Certification NFT in your wallet",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    setIsButtonLoading(false);
  };

  return (
    <Flex
      padding="40px 20px"
      bg={"#fff"}
      width={"50%"}
      borderRadius={10}
      boxShadow="rgb(0 0 0 / 8%) 0px 4px 15px"
      height={"400px"}
      flexDir="column"
      justifyContent={"space-around"}
    >
      <Heading textAlign="center">Receive Old Certification NFT</Heading>
      <Text textAlign="center" fontSize={"lg"}>
        We will use this NFT mint a new E7ML token
      </Text>
      <Text textAlign="center" fontStyle={"italic"}>
        You will receive a simple NFT (ERC721 Burnable) in your wallet that
        represents a Certification that you earned. We will burn this NFT to
        mint a E7ML Certification NFT
      </Text>
      <Flex justifyContent="center">
        <Button
          colorScheme="blue"
          variant="solid"
          onClick={handleButtonClick}
          isLoading={isButtonLoading}
          loadingText="Minting..."
        >
          Receive NFT
        </Button>
      </Flex>
    </Flex>
  );
}

export default AirdropOldNFT;
