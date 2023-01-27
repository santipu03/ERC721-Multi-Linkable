import {
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Stack,
  StackDivider,
  Box,
  useToast,
  Flex,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { TOKEN1_ADDRESS, E7ML_ADDRESS, E7ML_ABI } from "../../constants";

function LinkE7ML({ alchemy }) {
  const [token1SelectedNFT, setToken1SelectedNFT] = useState("");
  const [E7MLSelectedNFT, setE7MLSelectedNFT] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [hasQueried, setHasQueried] = useState(false);
  const [token1NftsForOwner, setToken1NftsForOwner] = useState([]);
  const [E7MLNftsForOwner, setE7MLNftsForOwner] = useState([]);

  const toast = useToast();
  const { isWeb3Enabled, account } = useMoralis();

  const { runContractFunction: linkToken } = useWeb3Contract({
    abi: E7ML_ABI,
    contractAddress: E7ML_ADDRESS,
    functionName: "linkToken",
    msgValue: 0,
    params: {
      tokenId: parseInt(E7MLSelectedNFT.slice(1)),
      parentContract: TOKEN1_ADDRESS,
      parentTokenId: parseInt(token1SelectedNFT.slice(1)),
    },
  });

  const renderToken1NftsForOwner = () => {
    return token1NftsForOwner.map((nft) => {
      return (
        <MenuItem
          onClick={(e) => setToken1SelectedNFT(e.target.textContent)}
          key={nft.tokenId}
        >
          #{nft.tokenId}
        </MenuItem>
      );
    });
  };

  const renderE7MLNftsForOwner = () => {
    return E7MLNftsForOwner.map((nft) => {
      return (
        <MenuItem
          onClick={(e) => setE7MLSelectedNFT(e.target.textContent)}
          key={nft.tokenId}
        >
          #{nft.tokenId}
        </MenuItem>
      );
    });
  };

  const handleButtonClick = () => {
    linkToken({
      onError: (e) => handleTxError(e),
      onSuccess: handleLinkSuccess,
    });
    setIsButtonLoading(true);
  };

  const handleLinkSuccess = async (tx) => {
    await tx.wait(1);
    toast({
      title: "E7ML Token Linked",
      description: "Now you have the E7ML linked with your TOKEN1",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    setIsButtonLoading(false);
  };

  const handleTxError = (e) => {
    setIsButtonLoading(false);
    console.log(e);

    if (e.message.includes("already linked")) {
      toast({
        title: "Not this token",
        description: "Seems like this token is already linked!",
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

  const queryNfts = async () => {
    const nfts = await alchemy.nft.getNftsForOwner(account);
    const token1Nfts = nfts.ownedNfts.filter(
      (nft) => nft.contract.address === TOKEN1_ADDRESS.toLowerCase()
    );
    const E7MLNfts = nfts.ownedNfts.filter(
      (nft) => nft.contract.address === E7ML_ADDRESS.toLowerCase()
    );
    setToken1NftsForOwner(token1Nfts);
    setE7MLNftsForOwner(E7MLNfts);
    setHasQueried(true);
  };

  useEffect(() => {
    if (isWeb3Enabled) {
      queryNfts();
    } else {
      setHasQueried(false);
    }
  }, [isWeb3Enabled]);

  return (
    <Box
      paddingY={"3rem"}
      paddingX={[10, 10, 10, 20, 150, 200]}
      minHeight={"calc(100vh - 161px)"}
    >
      <Flex
        alignItems="center"
        gap={"20px"}
        bg="#fff"
        boxShadow="rgb(0 0 0 / 8%) 0px 4px 15px"
        borderRadius={10}
        padding="40px"
        flexDir="column"
        marginX={[0, 0, "3rem", "6rem", "6rem", "16rem"]}
      >
        <Heading>Link your E7ML Certification to your NFT</Heading>
        <Text>Now it's time for the linking!</Text>
        <Text>
          You will link one of your E7ML tokens to a parent NFT, in this case it
          will be one TOKEN1
        </Text>
        <Card width="400px" variant={"filled"}>
          <CardHeader>
            <Heading size="md" textAlign="center">
              Select the NFTs to link
            </Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    colorScheme={"white"}
                    variant="outline"
                    size="lg"
                    width={"100%"}
                  >
                    {token1SelectedNFT ? token1SelectedNFT : "Choose TOKEN1"}
                  </MenuButton>
                  <MenuList>
                    {hasQueried ? (
                      renderToken1NftsForOwner()
                    ) : (
                      <MenuItem>Connect your Wallet!</MenuItem>
                    )}
                  </MenuList>
                </Menu>
              </Box>
              <Box>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    colorScheme={"white"}
                    variant="outline"
                    size="lg"
                    width={"100%"}
                  >
                    {E7MLSelectedNFT
                      ? E7MLSelectedNFT
                      : "Choose E7ML Certification"}
                  </MenuButton>
                  <MenuList width={"100%"}>
                    {hasQueried ? (
                      renderE7MLNftsForOwner()
                    ) : (
                      <MenuItem>Connect your Wallet!</MenuItem>
                    )}
                  </MenuList>
                </Menu>
              </Box>
            </Stack>
          </CardBody>
        </Card>

        <Button
          colorScheme="blue"
          variant="solid"
          onClick={handleButtonClick}
          isLoading={isButtonLoading}
          loadingText="Linking..."
          size={"lg"}
        >
          Link NFTs
        </Button>
      </Flex>
    </Box>
  );
}

export default LinkE7ML;
