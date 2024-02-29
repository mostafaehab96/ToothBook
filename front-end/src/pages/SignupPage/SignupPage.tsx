import { Box, Grid, GridItem, VStack } from "@chakra-ui/react";
import NavBar from "../../components/NavBar/NavBar";
import SignupForm from "../../components/Forms/SignupForm";
import RegisterImageUploader from "../../components/Forms/RegisterImagesUploader";

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
            <RegisterImageUploader />
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
