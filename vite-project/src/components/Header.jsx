import { Flex, Heading, Box } from "@chakra-ui/react";
import { ConnectButton } from "@web3uikit/web3";

function Header() {
  return (
    <Box borderBottom={"1px solid #e7eaf3"} bg={"white"}>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        h={"100px"}
        padding={"30px 12rem"}
      >
        <a href="/">
          <Heading m={0} fontSize={36} p={0}>
            ERC721 Multi Linkable
          </Heading>
        </a>
        <Flex gap="50px">
          <Heading size={"md"}>
            <a href="/airdrops">Airdrops</a>
          </Heading>
          <Heading size={"md"}>
            <a href="/mint">Mint E7ML</a>
          </Heading>
          <Heading size={"md"}>
            <a href="/link">Link E7ML</a>
          </Heading>
          <Heading size={"md"}>
            <a href="/wallet">Your Wallet</a>
          </Heading>
        </Flex>
        <Flex w={"320px"} justifyContent={"flex-end"}>
          <ConnectButton moralisAuth={false} />
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;
