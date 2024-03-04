import { Grid, GridItem, HStack, Text } from "@chakra-ui/react";
import NavBar from "../../components/NavBar/NavBar";
import { useCases } from "../../../contexts/CasesContext";
import ErrorAlert from "../../components/Alerts/ErrorAlert";
import UserCasesGrid from "../../components/Cases/UserCasesGrid";

function ProfilePage() {
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
            <Text fontFamily="Rubik" fontWeight={700} fontSize={40}>
              Active Cases
            </Text>
          </HStack>
        )}
        {!error && <UserCasesGrid />}
      </GridItem>
    </Grid>
  );
}

export default ProfilePage;
