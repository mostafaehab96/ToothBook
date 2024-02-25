import { Box, Image, Grid, GridItem, VStack } from "@chakra-ui/react";
import NavBar from "../../components/NavBar/NavBar";
import SignupForm from "../../components/Forms/SignupForm";
import Logo from "../../../public/logo.png";

function SignupPage() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
      }}
    >
      <GridItem area={"nav"} paddingBottom={2}>
        <NavBar />
      </GridItem>

      <GridItem area="main" marginX={7} overflow={"hidden"}>
        <VStack
          width="auto"
          display="relative"
          alignItems="center"
          justifyContent="center"
        >
          <Box width="220px" height="220px" mx="auto" marginBottom={7}>
            <Image src={Logo} />
          </Box>
          <Box paddingX={{ base: 0, md: "100px" }}>
            <SignupForm />
          </Box>
        </VStack>
      </GridItem>
    </Grid>
  );
}

export default SignupPage;
