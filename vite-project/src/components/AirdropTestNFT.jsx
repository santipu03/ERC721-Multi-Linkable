import { Heading, Text, Button, useToast } from "@chakra-ui/react";
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
    <>
      <Heading>Receive a Test NFT to Link</Heading>
      <Text>
        For testing purposes, you will receive an NFT ERC721 for the linking
      </Text>
      <Button
        colorScheme="teal"
        variant="solid"
        onClick={handleButtonClick}
        isLoading={isButtonLoading}
        loadingText="Minting..."
      >
        Receive NFT
      </Button>
    </>
  );
}

export default AirdropTestNFT;
