import { useRouteError } from "react-router-dom";
import { Flex, Heading } from "@chakra-ui/react";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Flex
      padding="3rem 6rem"
      minHeight="calc(100vh - 161px)"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
      gap="30px"
    >
      <Heading>Oops!</Heading>
      <Heading size={"md"}>Sorry, an unexpected error has occurred.</Heading>
      <p>
        <Heading fontStyle="italic" color={"#818181"} size="md">
          {error.statusText || error.message}
        </Heading>
      </p>
    </Flex>
  );
}
