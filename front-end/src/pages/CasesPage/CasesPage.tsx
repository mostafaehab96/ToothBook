import { Grid, GridItem, HStack } from "@chakra-ui/react";
import NavBar from "../../components/NavBar/NavBar";
import CasesGrid from "../../components/Cases/CasesGrid";
import SortSelector from "../../components/Selectors/SortSelector";
import FilterSelector from "../../components/Selectors/FilterSelector";

function CasesPage() {
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
        <HStack>
          <FilterSelector />
          <SortSelector />
        </HStack>
        <CasesGrid />
      </GridItem>
    </Grid>
  );
}

export default CasesPage;
