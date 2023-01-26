import {
  Box,
  Button,
  Heading,
  Link,
  OrderedList,
  ListItem,
} from "@chakra-ui/react";

function Main() {
  return (
    <Box
      paddingY={"3rem"}
      paddingX={[10, 10, 10, 20, 150, 200]}
      minHeight={"calc(100vh - 161px)"}
    >
      <Heading>A new way of linking 2.0</Heading>
      <Heading size="md" fontWeight="normal">
        ERC721MultiLinkable is an ampliation of the{" "}
        <Link href="https://www.e7l.rackslabs.com/" color="blue.500">
          E7L Standard
        </Link>{" "}
        developed by{" "}
        <Link href="https://www.rackslabs.com/" color={"blue.500"}>
          RacksLabs
        </Link>
      </Heading>
      <Heading size={"md"} fontWeight="normal">
        ERC721ML allows NFTs to get linked to other NFT. This way the parent NFT
        can represent all the NFTs linked to it.
      </Heading>
      <a href="https://github.com" target="_blank">
        <Button colorScheme="blue">View on Github</Button>
      </a>
      <Heading>Identity in Web3</Heading>
      <Heading size={"md"}>One NFT to rule them all</Heading>
      <Heading size="md" fontWeight="normal">
        Link the ERC721ML tokens to you favorite NFT!
      </Heading>
      <Heading>Demo</Heading>
      <Heading size="md">
        We're going to test how the ERC721MultiLinkable works right now!
      </Heading>
      <Heading size={"md"}>
        Suppose a web3 learning platform (like Alchemy University 😉) has been
        giving NFTs representing the Certification a person gets when the course
        is finished. But one day the platform decides it's going to give
        ERC721MultiLinkable (E7ML) tokens instead of simple ERC721, so the
        people that finish the course can link that E7ML Certification NFTs to
        their favorite NFT that represents their identity in Web3.
      </Heading>
      <Heading size={"md"}>The steps are the following:</Heading>
      <OrderedList>
        <ListItem>
          Get the ERC721 Certification NFT that is usually given when a student
          finishes the course
        </ListItem>
        <ListItem>
          Mint the E7ML Certification NFT by burning the previous ERC721
          Certification. This way we assure there are no repeated
          Certifications.
        </ListItem>
        <ListItem>
          Get a test ERC721 token that we'll use to link the E7ML. This test
          token is called TOKEN1 and will represent your favorite NFT.
        </ListItem>
        <ListItem>Link the E7ML Certification to the TOKEN1.</ListItem>
        <ListItem>Check the linked tokens!</ListItem>
      </OrderedList>
    </Box>
  );
}
export default Main;
