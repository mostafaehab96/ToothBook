import { Grid, GridItem, HStack, Text, useColorMode } from "@chakra-ui/react";
import NavBar from "../../components/NavBar/NavBar";
import { useCases } from "../../../contexts/CasesContext";
import ErrorAlert from "../../components/Alerts/ErrorAlert";
import UserCasesGrid from "../../components/Cases/UserCasesGrid";
import { useState } from "react";

function ProfilePage() {
  const { errorUserCases } = useCases();
  const [showingActiveCases, setShowingActiveCases] = useState<boolean>(true);
  const { colorMode } = useColorMode();
  const dynamicTextColorValue =
    colorMode === "light"
      ? { selected: "#000000", unselected: "#bbbbbb" }
      : { selected: "#ffffff", unselected: "#353535" };

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
      }}
    >
      <GridItem area={"nav"} paddingBottom={8}>
        <NavBar />
        {errorUserCases && (
          <ErrorAlert title="Error" message={errorUserCases} />
        )}
      </GridItem>

      <GridItem area={"main"} marginX={7}>
        {!errorUserCases && (
          <HStack justify="space-around" paddingX={1}>
            <Text
              cursor="pointer"
              fontFamily="Rubik"
              fontWeight={700}
              fontSize={40}
              color={
                showingActiveCases
                  ? dynamicTextColorValue.selected
                  : dynamicTextColorValue.unselected
              }
              onClick={() => setShowingActiveCases(true)}
            >
              Active Cases
            </Text>
            <Text
              cursor="pointer"
              fontFamily="Rubik"
              fontWeight={700}
              fontSize={40}
              color={
                showingActiveCases
                  ? dynamicTextColorValue.unselected
                  : dynamicTextColorValue.selected
              }
              onClick={() => setShowingActiveCases(false)}
            >
              Treated Cases
            </Text>
          </HStack>
        )}
        {!errorUserCases && <UserCasesGrid activeCases={showingActiveCases} />}
      </GridItem>
    </Grid>
  );
}

export default ProfilePage;
