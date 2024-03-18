import { Flex, Spinner } from "@chakra-ui/react";

function FullPageSpinner() {
  return (
    <Flex
      width="100%"
      height="100vh"
      flex={1}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner size="xl" />
    </Flex>
  );
}

export default FullPageSpinner;
