import {
  Box,
  Center,
  Divider,
  Heading,
  SimpleGrid,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { TOKEN1_ADDRESS, E7ML_ADDRESS, E7ML_ABI } from "../../constants";
import UnlinkedNFT from "../components/UnlinkedNFT";
import LinkedNFT from "../components/LinkedNFT";

function WalletE7ML({ alchemy }) {
  const [hasQueried, setHasQueried] = useState(false);
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
      onError: (e) => console.error(e),
    });

    return tokenInfo;
  };

  const renderLinkedNftsForOwner = () => {
    return linkedTokens.map((nft) => {
      return (
        <Flex alignItems={"center"} justifyContent="center" key={nft.tokenId}>
          <LinkedNFT nft={nft} />
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
        const parentToken = await alchemy.nft.getNftMetadata(
          tokenInfo.parentContract,
          tokenInfo.parentTokenId.toString()
        );
        nfts[i].parentToken = parentToken;
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
      {isWeb3Enabled ? (
        <>
          <Heading size={"lg"} marginBottom={"20px"}>
            Linked Tokens:{" "}
          </Heading>
          <Text marginBottom={"2rem"} fontStyle="italic" color={"grey"}>
            // Click in the linked tokens to see more...
          </Text>
          {hasQueried ? (
            linkedTokens.length === 0 ? (
              <Center margin="30px 0" fontSize="1.5rem">
                No linked E7ML in your wallet...
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
                No unlinked E7ML in your wallet...
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
        </>
      ) : (
        <Center margin="30px 0" fontSize="1.5rem">
          Connect your Wallet...
        </Center>
      )}
    </Box>
  );
}

export default WalletE7ML;
