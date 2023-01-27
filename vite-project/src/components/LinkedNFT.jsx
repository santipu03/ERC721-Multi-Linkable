import {
  Flex,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Heading,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useWeb3Contract } from "react-moralis";
import { E7ML_ABI, E7ML_ADDRESS } from "../../constants";
import { useState } from "react";

function LinkedNFT({ nft, parentToken }) {
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { runContractFunction: syncToken } = useWeb3Contract({
    abi: E7ML_ABI,
    contractAddress: E7ML_ADDRESS,
    functionName: "syncToken",
    params: {
      tokenId: parseInt(nft.tokenId),
    },
  });

  const handleSyncSuccess = async (tx) => {
    await tx.wait(1);
    toast({
      title: "E7ML Token Synced",
      description: "Now you have the E7ML synced with the right owner",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    setIsButtonLoading(false);
  };

  const handleTxError = (e) => {
    setIsButtonLoading(false);
    console.log(e);

    if (e.message.includes("already synced")) {
      toast({
        title: "Not this token",
        description: "Seems like this token is already synced!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "OOOPS!",
        description: "Something went wrong. Try Again",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleButtonClick = () => {
    syncToken({
      onError: (e) => handleTxError(e),
      onSuccess: handleSyncSuccess,
    });
    setIsButtonLoading(true);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent bg={"#f8f9fa"}>
          <ModalHeader>E7ML #{nft.tokenId}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap={"30px"} justifyContent="space-around">
              <Box>
                <Heading size={"md"} marginBottom="10px" textAlign="center">
                  Parent Token
                </Heading>
                <Flex
                  flexDir={"column"}
                  borderRadius={"10px"}
                  height={"260px"}
                  width={"200px"}
                  bg={"#fff"}
                  boxShadow="rgb(0 0 0 / 8%) 0px 4px 15px"
                  justifyContent={"space-between"}
                  onClick={onOpen}
                >
                  <Image
                    src={parentToken.rawMetadata.image}
                    alt="img"
                    borderRadius={"10px"}
                  ></Image>
                  <Flex flexDir={"column"} padding={"0 10px"}>
                    <Text>
                      <b>{parentToken.tokenId}</b>
                    </Text>
                    <Text margin={0}>
                      <b>{parentToken.contract.name}</b>
                    </Text>
                  </Flex>
                </Flex>
              </Box>
              <Box>
                <Heading size={"md"} marginBottom="10px" textAlign={"center"}>
                  Child Token
                </Heading>
                <Flex
                  flexDir={"column"}
                  borderRadius={"10px"}
                  height={"260px"}
                  width={"200px"}
                  bg={"#fff"}
                  justifyContent={"space-between"}
                  boxShadow="rgb(0 0 0 / 8%) 0px 4px 15px"
                  onClick={onOpen}
                >
                  <Image
                    src={nft.rawMetadata.image}
                    alt="img"
                    borderRadius={"10px"}
                  ></Image>
                  <Flex flexDir={"column"} padding={"0 10px"}>
                    <Text>
                      <b>{nft.tokenId}</b>
                    </Text>
                    <Text margin={0}>
                      <b>{nft.contract.name}</b>
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleButtonClick}
              isLoading={isButtonLoading}
              loadingText="Syncing..."
            >
              Sync Token
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex
        flexDir={"column"}
        boxShadow="rgb(0 0 0 / 8%) 0px 4px 15px"
        borderRadius={"10px"}
        height={"250px"}
        width={"250px"}
        bgColor={"#fff"}
        justifyContent={"space-between"}
        padding="10px"
        onClick={onOpen}
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
    </>
  );
}

export default LinkedNFT;
