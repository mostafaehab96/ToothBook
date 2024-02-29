import { Grid, GridItem, HStack } from "@chakra-ui/react";
import NavBar from "../../components/NavBar/NavBar";
import CasesGrid from "../../components/Cases/CasesGrid";
import FilterSelector from "../../components/Cases/FilterSelector";
import { useCases } from "../../../contexts/CasesContext";
import ErrorAlert from "../../components/Alerts/ErrorAlert";
import PageSelector from "../../components/Cases/PageSelector";
import AddCaseButton from "../../components/Cases/AddCaseButton";
import { useAuth } from "../../../contexts/AuthenticationContext";

function CasesPage() {
  const { error } = useCases();
  const { isAuthenticated } = useAuth();

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
            {isAuthenticated && <AddCaseButton />}
          </HStack>
        )}
        {!error && <CasesGrid />}
        <PageSelector />
      </GridItem>
    </Grid>
  );
}

export default CasesPage;
