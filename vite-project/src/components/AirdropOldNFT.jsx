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
    <Box padding="40px 0">
      <Heading textAlign="center">Receive Old Certification NFT</Heading>
      <Text textAlign="center">
        You will receive a simple NFT in your wallet that represents a
        Certification that you earned.
      </Text>
      <Text textAlign="center">Is a simple ERC721 Burnable Token.</Text>
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
    </Box>
  );
}

export default AirdropOldNFT;
