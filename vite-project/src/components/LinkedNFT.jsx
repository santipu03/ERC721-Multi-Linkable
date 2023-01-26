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
} from "@chakra-ui/react";

function LinkedNFT({ nft, parentToken }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent bg={"#f8f9fa"}>
          <ModalHeader>E7ML #{nft.tokenId}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap={"30px"}>
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
            <Button colorScheme="blue" mr={3}>
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
        {console.log(nft)}
        {console.log(parentToken)}
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
