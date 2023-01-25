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
    console.log(nfts.ownedNfts);
    const filteredNfts = nfts.ownedNfts.filter((nft) => {
      return nft.contract.address === CERTIFICATION_ADDRESS.toLowerCase();
    });
    console.log(filteredNfts);
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
    console.log(parseInt(selectedNFT.slice(1)));
    console.log(E7ML_ADDRESS);
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
    <Flex
      padding={"3rem 12rem"}
      minHeight={"calc(100vh - 161px)"}
      flexDir="column"
      alignItems="center"
      gap={"20px"}
    >
      <Heading>Mint E7ML Certification NFT</Heading>
      <Text>Now you are going to sign 2 transactions.</Text>
      <Text>
        1. You will approve for the Certification NFT you've minted before to
        the E7ML contract
      </Text>
      <Text>
        2. You will call the mint function in the E7ML contract. It will burn
        your Certification NFT to mint a E7ML Certification NFT
      </Text>

      <Flex gap="20px">
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
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
        >
          Receive NFT
        </Button>
      </Flex>
    </Flex>
  );
}

export default MintE7ML;
