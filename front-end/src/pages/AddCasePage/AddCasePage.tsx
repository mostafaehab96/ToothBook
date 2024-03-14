import { Grid, GridItem, VStack } from "@chakra-ui/react";
import { NavBar } from "../../components/NavBar/NavBar";
import AddCaseForm from "../../components/Forms/AddCaseForm";
import { useState } from "react";
import ErrorAlert from "../../components/Alerts/ErrorAlert";

function AddCasePage() {
  const [error, setError] = useState("");

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
        {error && <ErrorAlert title="Error" message={error} />}
      </GridItem>

      <GridItem
        sx={{
          "::-webkit-scrollbar": {
            display: "none",
          },
          MsOverflowStyle: "none",
          scrollbarWidth: "none",
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
          <AddCaseForm setError={setError} />
        </VStack>
      </GridItem>
    </Grid>
  );
}

export default AddCasePage;
