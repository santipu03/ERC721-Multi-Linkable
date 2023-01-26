import {
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  useToast,
  Box,
  Flex,
  Text,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import {
  CERTIFICATION_ADDRESS,
  CERTIFICATION_ABI,
  E7ML_ABI,
  E7ML_ADDRESS,
} from "../../constants";
import { useWeb3Contract, useMoralis } from "react-moralis";

function MintE7ML({ alchemy }) {
  const [selectedNFT, setSelectedNFT] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [hasQueried, setHasQueried] = useState(false);
  const [nftsForOwner, setNftsForOwner] = useState([]);
  const toast = useToast();
  const { isWeb3Enabled, account } = useMoralis();

  const { runContractFunction: mint } = useWeb3Contract({
    abi: E7ML_ABI,
    contractAddress: E7ML_ADDRESS,
    functionName: "mint",
    params: {
      tokenId: parseInt(selectedNFT.slice(1)),
    },
  });

  const { runContractFunction: approve } = useWeb3Contract({
    abi: CERTIFICATION_ABI,
    contractAddress: CERTIFICATION_ADDRESS,
    functionName: "approve",
    params: {
      to: E7ML_ADDRESS,
      tokenId: parseInt(selectedNFT.slice(1)),
    },
  });

  const queryNfts = async () => {
    const nfts = await alchemy.nft.getNftsForOwner(account);
    const filteredNfts = nfts.ownedNfts.filter((nft) => {
      return nft.contract.address === CERTIFICATION_ADDRESS.toLowerCase();
    });
    setNftsForOwner(filteredNfts);
    setHasQueried(true);
  };

  const renderNftsForOwner = () => {
    return nftsForOwner.map((nft) => {
      return (
        <MenuItem
          onClick={(e) => setSelectedNFT(e.target.textContent)}
          key={nft.tokenId}
        >
          #{nft.tokenId}
        </MenuItem>
      );
    });
  };

  const handleButtonClick = async () => {
    setIsButtonLoading(true);
    approve({
      onError: (e) => handleTxError(e),
      onSuccess: handleApproveSuccess,
    });
  };

  const handleApproveSuccess = async (tx) => {
    await tx.wait(1);
    mint({
      onError: (e) => handleTxError(e),
      onSuccess: handleMintSuccess,
    });
  };

  const handleMintSuccess = async (tx) => {
    await tx.wait(1);
    toast({
      title: "E7ML NFT Minted.",
      description: "Now you have the E7ML NFT in your wallet",
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
        flexDir="column"
        alignItems="center"
        gap={"20px"}
        bg="#fff"
        boxShadow="rgb(0 0 0 / 8%) 0px 4px 15px"
        borderRadius={10}
        padding="40px"
        marginX={[0, 0, "3rem", "6rem", "6rem", "16rem"]}
      >
        <Heading>Mint E7ML Certification NFT</Heading>
        <Text>Now you are going to sign 2 transactions.</Text>
        <Flex gap={"20px"}>
          <Card variant={"filled"} width={"50%"}>
            <CardHeader>
              <Heading size={"md"} textAlign="center">
                Transaction 1
              </Heading>
            </CardHeader>
            <CardBody>
              <Text>
                You will approve for the Certification NFT you've minted to the
                E7ML contract
              </Text>
            </CardBody>
          </Card>
          <Card variant={"filled"} width={"50%"}>
            <CardHeader>
              <Heading size={"md"} textAlign="center">
                Transaction 2
              </Heading>
            </CardHeader>
            <CardBody>
              <Text>
                You will call the mint function in the E7ML contract. It will
                burn your Certification NFT to mint a E7ML Certification NFT
              </Text>
            </CardBody>
          </Card>
        </Flex>

        <Heading margin={"3rem 0"}>Are you ready? Let's go!</Heading>
        <Flex gap="20px">
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} size="lg">
              {selectedNFT ? selectedNFT : "Choose NFT"}
            </MenuButton>
            <MenuList>
              {hasQueried ? (
                renderNftsForOwner()
              ) : (
                <MenuItem>Connect your Wallet!</MenuItem>
              )}
            </MenuList>
          </Menu>
          <Button
            colorScheme="blue"
            variant="solid"
            onClick={handleButtonClick}
            isLoading={isButtonLoading}
            loadingText="Minting..."
            size={"lg"}
          >
            Mint NFT
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default MintE7ML;
