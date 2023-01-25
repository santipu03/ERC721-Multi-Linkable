import { Heading, Text, Button, useToast, Flex, Box } from "@chakra-ui/react";
import { useWeb3Contract } from "react-moralis";
import { TOKEN1_ABI, TOKEN1_ADDRESS } from "../../constants";
import { useState } from "react";

function AirdropTestNFT() {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const toast = useToast();

  const { runContractFunction: mint } = useWeb3Contract({
    abi: TOKEN1_ABI,
    contractAddress: TOKEN1_ADDRESS,
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
      description: "Now you have the Test NFT in your wallet",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    setIsButtonLoading(false);
  };

  return (
    <Box padding="40px 0">
      <Heading textAlign="center">Receive a Test NFT to Link</Heading>
      <Text textAlign="center">
        You will receive an NFT that you'll use for linking the E7ML Token.
      </Text>
      <Text textAlign="center">
        In theory, you can link the E7ML token to any NFT you have but this page
        has been built to link the E7ML to this NFT you'll receive. We've called
        it TOKEN1
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
    </Box>
  );
}

export default AirdropTestNFT;
