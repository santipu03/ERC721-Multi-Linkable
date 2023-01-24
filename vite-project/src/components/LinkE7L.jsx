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
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { TOKEN1_ADDRESS, E7L_ADDRESS, E7L_ABI } from "../../constants";

function LinkE7L({ alchemy }) {
  const [token1SelectedNFT, setToken1SelectedNFT] = useState("");
  const [E7LSelectedNFT, setE7LSelectedNFT] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [hasQueried, setHasQueried] = useState(false);
  const [token1NftsForOwner, setToken1NftsForOwner] = useState([]);
  const [E7LNftsForOwner, setE7LNftsForOwner] = useState([]);

  const toast = useToast();
  const { isWeb3Enabled, account } = useMoralis();

  const { runContractFunction: linkToken } = useWeb3Contract({
    abi: E7L_ABI,
    contractAddress: E7L_ADDRESS,
    functionName: "linkToken",
    msgValue: 0,
    params: {
      tokenId: parseInt(E7LSelectedNFT.slice(1)),
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

  const renderE7LNftsForOwner = () => {
    return E7LNftsForOwner.map((nft) => {
      return (
        <MenuItem
          onClick={(e) => setE7LSelectedNFT(e.target.textContent)}
          key={nft.tokenId}
        >
          #{nft.tokenId}
        </MenuItem>
      );
    });
  };

  const handleButtonClick = () => {
    console.log(parseInt(token1SelectedNFT.slice(1)));
    console.log(parseInt(E7LSelectedNFT.slice(1)));
    linkToken({
      onError: (e) => handleTxError(e),
      onSuccess: handleLinkSuccess,
    });
    setIsButtonLoading(true);
  };

  const handleLinkSuccess = async (tx) => {
    await tx.wait(1);
    toast({
      title: "E7L Token Linked",
      description: "Now you have the E7L linked with your TOKEN1",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    setIsButtonLoading(false);
  };

  const handleTxError = (e) => {
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

  const queryNfts = async () => {
    const nfts = await alchemy.nft.getNftsForOwner(account);
    const token1Nfts = nfts.ownedNfts.filter(
      (nft) => nft.contract.address === TOKEN1_ADDRESS.toLowerCase()
    );
    const E7LNfts = nfts.ownedNfts.filter(
      (nft) => nft.contract.address === E7L_ADDRESS.toLowerCase()
    );
    console.log(token1Nfts);
    setToken1NftsForOwner(token1Nfts);
    setE7LNftsForOwner(E7LNfts);
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
    <>
      <Heading>Link your E7L Certification to your NFT</Heading>
      <Card>
        <CardHeader>
          <Heading size="md">Select the NFTs to link</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="s">Token1</Heading>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  {token1SelectedNFT ? token1SelectedNFT : "Choose NFT"}
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
              <Heading size="s">E7L Certification</Heading>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  {E7LSelectedNFT ? E7LSelectedNFT : "Choose NFT"}
                </MenuButton>
                <MenuList>
                  {hasQueried ? (
                    renderE7LNftsForOwner()
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
      >
        Link NFTs
      </Button>
    </>
  );
}

export default LinkE7L;
