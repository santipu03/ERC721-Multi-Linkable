import {
  Box,
  Center,
  Divider,
  GridItem,
  Heading,
  SimpleGrid,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { TOKEN1_ADDRESS, E7ML_ADDRESS, E7ML_ABI } from "../../constants";
import UnlinkedNFT from "../components/UnlinkedNFT";
import LinkedNFT from "../components/LinkedNFT";

function WalletE7ML({ alchemy }) {
  const [hasQueried, setHasQueried] = useState(false);
  const [E7MLNftsForOwner, setE7MLNftsForOwner] = useState([]);
  const [token1NftsForOwner, setToken1NftsForOwner] = useState([]);
  const [linkedTokens, setLinkedTokens] = useState([]);
  const [unlinkedTokens, setUnlinkedTokens] = useState([]);

  const { runContractFunction } = useWeb3Contract();
  const { account, isWeb3Enabled } = useMoralis();

  const isNftInArray = (array, nft) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].tokenId === nft.tokenId) {
        return true;
      }
    }
    return false;
  };

  const getTokenInfo = async (nft) => {
    const tokenInfoOptions = {
      abi: E7ML_ABI,
      contractAddress: E7ML_ADDRESS,
      functionName: "tokenInfo",
      params: {
        tokenId: nft.tokenId,
      },
    };
    const tokenInfo = await runContractFunction({
      params: tokenInfoOptions,
      onSuccess: (tx) => handleApproveSuccess(tx),
      onError: (e) => console.error(e),
    });

    return tokenInfo;
  };

  const handleApproveSuccess = async (tx) => {};

  const renderLinkedNftsForOwner = () => {
    return linkedTokens.map((nft) => {
      const parentToken = token1NftsForOwner.find(
        (token) => token.tokenId === nft.parentTokenId
      );
      return (
        <Flex alignItems={"center"} justifyContent="center" key={nft.tokenId}>
          <LinkedNFT nft={nft} parentToken={parentToken} />
        </Flex>
      );
    });
  };
  const renderUnlinkedNftsForOwner = () => {
    return unlinkedTokens.map((nft) => {
      return (
        <Flex alignItems={"center"} justifyContent="center" key={nft.tokenId}>
          <UnlinkedNFT nft={nft} />
        </Flex>
      );
    });
  };

  const queryLinkingOfTokens = async (nfts) => {
    let localLinkedTokens = [];
    let localUnlinkedTokens = [];
    for (let i = 0; i < nfts.length; i++) {
      const tokenInfo = await getTokenInfo(nfts[i]);
      if (tokenInfo[0] && !isNftInArray(linkedTokens, nfts[i])) {
        nfts[i].parentTokenId = tokenInfo.parentTokenId.toString();
        localLinkedTokens.push(nfts[i]);
      } else if (!tokenInfo[0] && !isNftInArray(unlinkedTokens, nfts[i])) {
        localUnlinkedTokens.push(nfts[i]);
      }
    }
    setLinkedTokens(localLinkedTokens);
    setUnlinkedTokens(localUnlinkedTokens);
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
    await queryLinkingOfTokens(E7MLNfts);
    setHasQueried(true);
  };

  useEffect(() => {
    if (isWeb3Enabled) {
      if (!hasQueried) {
        queryNfts();
      }
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
      <Heading>Your E7ML Wallet</Heading>
      <Divider margin="1rem" />
      <Heading size={"lg"} marginBottom={"20px"}>
        Linked Tokens:{" "}
      </Heading>
      {hasQueried ? (
        linkedTokens.length === 0 ? (
          <Center margin="30px 0" fontSize="1.5rem">
            No NFTs in your wallet...
          </Center>
        ) : (
          <SimpleGrid columns={"4"} gap={"15px"}>
            {renderLinkedNftsForOwner()}
          </SimpleGrid>
        )
      ) : (
        <Center margin="30px 0" fontSize="1.5rem">
          Loading...
        </Center>
      )}
      <Divider margin={"1rem"} />
      <Heading size={"lg"} marginBottom={"20px"}>
        Unlinked Tokens:{" "}
      </Heading>
      {hasQueried ? (
        unlinkedTokens.length === 0 ? (
          <Center margin="30px 0" fontSize="1.5rem">
            No NFTs in your wallet...
          </Center>
        ) : (
          <SimpleGrid columns={"4"} gap={"15px"}>
            {renderUnlinkedNftsForOwner()}
          </SimpleGrid>
        )
      ) : (
        <Center margin="30px 0" fontSize="1.5rem">
          Loading...
        </Center>
      )}
    </Box>
  );
}

export default WalletE7ML;
