import { Grid, GridItem, HStack } from "@chakra-ui/react";
import NavBar from "../../components/NavBar/NavBar";
import CasesGrid from "../../components/Cases/CasesGrid";
import FilterSelector from "../../components/Cases/FilterSelector";
import { useCases } from "../../../contexts/CasesContext";
import ErrorAlert from "../../components/Alerts/ErrorAlert";
import PageSelector from "../../components/Cases/PageSelector";
import AddCaseButton from "../../components/Cases/AddCaseButton";

function CasesPage() {
  const { error } = useCases();

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
      }}
    >
      <GridItem area={"nav"} paddingBottom={8}>
        <NavBar />
      </GridItem>
      <GridItem area={"main"} marginX={7}>
        {error ? (
          <ErrorAlert
            title="Connect to network"
            message="An error occurred while fetching the data. Please check your
        internet connection and try again later."
          />
        ) : (
          <HStack justify="space-between" paddingX={1}>
            <FilterSelector />
            <AddCaseButton />
          </HStack>
        )}
        {!error && <CasesGrid />}
        <PageSelector />
      </GridItem>
    </Grid>
  );
}

export default CasesPage;
