import {
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import {
  CERTIFICATION_ADDRESS,
  CERTIFICATION_ABI,
  E7L_ABI,
  E7L_ADDRESS,
} from "../../constants";
import { useWeb3Contract, useMoralis } from "react-moralis";

function MintE7L({ alchemy }) {
  const [selectedNFT, setSelectedNFT] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [hasQueried, setHasQueried] = useState(false);
  const [nftsForOwner, setNftsForOwner] = useState([]);
  const toast = useToast();
  const { isWeb3Enabled, account } = useMoralis();

  const { runContractFunction: mint } = useWeb3Contract({
    abi: E7L_ABI,
    contractAddress: E7L_ADDRESS,
    functionName: "mint",
    msgValue: 0,
    params: {
      tokenId: parseInt(selectedNFT.slice(1)),
    },
  });

  const { runContractFunction: approve } = useWeb3Contract({
    abi: CERTIFICATION_ABI,
    contractAddress: CERTIFICATION_ADDRESS,
    functionName: "approve",
    msgValue: 0,
    params: {
      to: E7L_ADDRESS,
      tokenId: parseInt(selectedNFT.slice(1)),
    },
  });

  const queryNfts = async () => {
    const nfts = await alchemy.nft.getNftsForOwner(account);
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
    console.log(E7L_ADDRESS);
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
      title: "E7L NFT Minted.",
      description: "Now you have the E7L NFT in your wallet",
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
    <>
      <Heading>Mint E7L Certification NFT</Heading>
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
    </>
  );
}

export default MintE7L;
