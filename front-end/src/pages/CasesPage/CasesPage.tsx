import { Grid, GridItem, HStack } from "@chakra-ui/react";
import NavBar from "../../components/NavBar/NavBar";
import CasesGrid from "../../components/Cases/CasesGrid";
import SortSelector from "../../components/Selectors/SortSelector";
import FilterSelector from "../../components/Selectors/FilterSelector";
import { useCases } from "../../../contexts/CasesContext";
import ErrorAlert from "../../components/Alerts/ErrorAlert";

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
          <HStack>
            <FilterSelector />
            <SortSelector />
          </HStack>
        )}
        {!error && <CasesGrid />}
      </GridItem>
    </Grid>
  );
}

export default CasesPage;
