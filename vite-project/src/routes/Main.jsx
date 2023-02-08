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
  Divider,
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
        justifyContent={"space-around"}
        bg="#fff"
        margin="8rem 6rem"
        padding={"40px 6rem"}
        borderRadius={10}
        boxShadow="rgb(0 0 0 / 8%) 0px 4px 15px"
      >
        <Heading marginBottom={5} textAlign="center">
          We're going to test it NOW
        </Heading>
        <Heading size={"lg"} margin="20px 0" textAlign={"center"}>
          The story is the following:
        </Heading>
        <Text as={"i"} color="red.700" marginBottom={"10px"} textAlign="center">
          ---Warning: The following story is completely invented and never
          happened, it's told only for the sake of explaining the E7ML.---
        </Text>
        <Divider marginBottom={"10px"} />
        <Text fontSize="lg">
          A web3 learning platform (like <b>Alchemy University</b> 😉) had been
          giving NFTs representing the Certification a person gets when the
          course is finished.
        </Text>
        <Text fontSize="lg">
          When a student finishes the course, receives an NFT, a simple ERC721
          token.
        </Text>
        <Text fontSize={"lg"}>But one day they thought:</Text>
        <Text marginTop={"10px"} as={"i"}>
          — "It'd be awesome if our students could{" "}
          <b>link the Certification NFT</b> we give them to any NFT they have,
          like a Bored Ape."
        </Text>
        <Text as={"i"}>
          — "Yeah, this way they could have a <b>Main Token</b> that represents
          their identity, for example the Bored Ape, and the{" "}
          <b>badge of Alchemy University linked to it.</b>"
        </Text>
        <Text marginBottom={"10px"} as={"i"}>
          — "That's a brilliant idea my friend!!"
        </Text>

        <Text fontSize={"lg"}>
          So they created a new Certification NFT but with the difference that
          this one was an <b>ERC721MultiLinkable</b> (E7ML).
        </Text>
        <Text fontSize={"lg"}>
          This way, any wallet that owned the original Certification NFT could
          mint the new E7ML by burning the original.
        </Text>
        <Text fontSize={"lg"}>
          And finally... all Alchemy University students had a E7ML token that
          could be linked to any NFT.
        </Text>
        <Text fontSize={"lg"}>
          Some months went by and finally <b>Opensea</b> implemented the{" "}
          <b>E7ML standard</b> and all students could finally see in Opensea the
          Alchemy University NFT linked to their favorite token.
        </Text>
        <Divider margin={"10px 0"} />
        <Heading size={"md"} margin="20px 0">
          End of the Story
        </Heading>

        <Heading size={"lg"} margin="20px 0" textAlign={"center"}>
          Now we are going to replicate this story HERE
        </Heading>

        <Heading size={"md"} textAlign="center">
          The steps are the following:
        </Heading>
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
              <Text color={"gray"} fontSize="x-small">
                // Go to Airdrops page and click in "Receive Old Certification
                NFT"
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
              <Text color={"gray"} fontSize="x-small">
                // Go to "MintE7ML"
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
              <Text color={"gray"} fontSize="x-small">
                // Go to Airdrops page and click in "Receive TOKEN1 NFT"
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
              <Text color={"gray"} fontSize="x-small">
                // Go to "LinkE7ML"
              </Text>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Flex>
    </Box>
  );
}
export default Main;
