import { Flex, Heading, Box } from "@chakra-ui/react";
import { ConnectButton } from "@web3uikit/web3";

function Header() {
  return (
    <Box borderBottom={"1px solid #e7eaf3"} bg={"white"}>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        h={"100px"}
        padding={"30px 100px"}
      >
        <Heading m={0} fontSize={36} p={0}>
          ERC721 Multi Linkable
        </Heading>
        <Flex w={"320px"} justifyContent={"flex-end"}>
          <ConnectButton moralisAuth={false} />
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;
