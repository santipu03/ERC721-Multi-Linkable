import {
  Box,
  Button,
  Heading,
  Link,
  SimpleGrid,
  Text,
  Flex,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";

function Main() {
  return (
    <Box
      paddingY={"3rem"}
      paddingX={[10, 10, 10, 20, 150, 200]}
      minHeight={"calc(100vh - 161px)"}
    >
      <Flex
        height={"400px"}
        flexDir="column"
        justifyContent={"space-around"}
        alignItems="center"
        margin={"5rem 0"}
      >
        <Heading size={"4xl"}>A new way of linking 2.0</Heading>
        <Heading size="md" fontWeight="normal">
          ERC721MultiLinkable is an ampliation of the{" "}
          <Link
            href="https://www.e7l.rackslabs.com/"
            color="blue.500"
            target={"_blank"}
          >
            E7L Standard
          </Link>{" "}
          developed by{" "}
          <Link
            href="https://www.rackslabs.com/"
            color={"blue.500"}
            target="_blank"
          >
            RacksLabs
          </Link>
        </Heading>
        <Heading size={"md"} fontWeight="normal">
          ERC721ML allows NFTs to get linked to other NFT. This way the parent
          NFT can represent all the NFTs linked to it.
        </Heading>
        <a
          href="https://github.com/santipu03/ERC721-Multi-Linkable"
          target="_blank"
        >
          <Button colorScheme="blue" size={"lg"}>
            View on Github
          </Button>
        </a>
      </Flex>

      <Flex
        flexDir={"column"}
        alignItems="center"
        justifyContent={"space-around"}
        bg="#fff"
        margin="0 6rem"
        padding={"40px 6rem"}
        borderRadius={10}
        boxShadow="rgb(0 0 0 / 8%) 0px 4px 15px"
      >
        <Heading marginBottom={5}>Here's the story</Heading>

        <Text fontSize="lg" textAlign="center">
          A web3 learning platform (like Alchemy University 😉) has been giving
          NFTs representing the Certification a person gets when the course is
          finished.
        </Text>
        <Heading size={"md"} margin="20px 0">
          When a student finishes the course, receives an NFT
        </Heading>
        <Text fontSize={"lg"} textAlign="center">
          But one day the platform decides it's going to give
          ERC721MultiLinkable (E7ML) tokens instead of simple ERC721, so the
          students can link that E7ML Certification NFTs to their favorite NFT
          that represents their identity in Web3.
        </Text>
        <Heading size={"md"} margin="20px 0">
          Now we are going to replicate this story in this web page
        </Heading>
        <Heading size={"md"}>The steps are the following:</Heading>
        <SimpleGrid columns={2} gap="20px" padding={"20px"}>
          <Card variant={"filled"}>
            <CardHeader>
              <Heading size={"md"}>1. Get the Certification NFT</Heading>
            </CardHeader>
            <CardBody>
              <Text>
                Get the ERC721 Certification NFT that is usually given when a
                student finishes the course
              </Text>
            </CardBody>
          </Card>
          <Card variant={"filled"}>
            <CardHeader>
              <Heading size={"md"}>2. Mint the E7ML Certification NFT</Heading>
            </CardHeader>
            <CardBody>
              <Text>
                Mint the E7ML Certification NFT by burning the previous ERC721
                Certification. This way we assure there are no repeated
                Certifications.
              </Text>
            </CardBody>
          </Card>
          <Card variant={"filled"}>
            <CardHeader>
              <Heading size={"md"}>3. Get the Test Token1</Heading>
            </CardHeader>
            <CardBody>
              <Text>
                Get a test NFT that we'll use to link the E7ML. We're going to
                call it TOKEN1.
              </Text>
            </CardBody>
          </Card>
          <Card variant={"filled"}>
            <CardHeader>
              <Heading size={"md"}>3. Link the E7ML to TOKEN1</Heading>
            </CardHeader>
            <CardBody>
              <Text>
                Link the E7ML Certification to the TOKEN1 and check the linking
                in "Your Wallet" section.
              </Text>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Flex>
    </Box>
  );
}
export default Main;
