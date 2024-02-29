import { Grid, GridItem, VStack } from "@chakra-ui/react";
import NavBar from "../../components/NavBar/NavBar";
import AddCaseForm from "../../components/Forms/AddCaseForm";

function AddCasePage() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
      }}
      templateColumns={{
        base: `"1fr"`,
      }}
      templateRows={{
        base: `auto`,
        md: `"50px" "1fr"`,
      }}
    >
      <GridItem area="nav" paddingBottom={8}>
        <NavBar />
      </GridItem>

      <GridItem
        sx={{
          "::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        }}
        area="main"
        marginX={7}
        overflow={"scroll"}
        height="auto"
      >
        <VStack
          width="auto"
          display="relative"
          alignItems="center"
          justifyContent="center"
        >
          <AddCaseForm />
        </VStack>
      </GridItem>
    </Grid>
  );
}

export default AddCasePage;
