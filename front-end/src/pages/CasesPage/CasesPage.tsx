import { Box, HStack, Stack } from "@chakra-ui/react";
import { NavBar } from "../../components/NavBar/NavBar";
import CasesGrid from "../../components/Cases/CasesGrid";
import FilterSelectors from "../../components/Cases/FilterSelector";
import { useCases } from "../../contexts/CasesContext";
import ErrorAlert from "../../components/Alerts/ErrorAlert";
import PageSelector from "../../components/Cases/PageSelector";
import AddCaseButton from "../../components/Cases/AddCaseButton";
import { useAuth } from "../../contexts/AuthenticationContext";

function CasesPage() {
  const { error } = useCases();
  const { isAuthenticated } = useAuth();

  return (
    <Stack w="100%">
      {/* header */}
      <Box paddingBottom={2} w="100%">
        <NavBar />
        {error && (
          <ErrorAlert
            title="Connect to network"
            message="An error occurred while fetching the data. Please check your
          internet connection and try again later."
          />
        )}
      </Box>
      {/* main */}
      <Box maxW="100%">
        {!error && (
          <HStack justify="space-between" paddingX={4}>
            <HStack
              overflow="scroll"
              css={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              <FilterSelectors />
            </HStack>
            {isAuthenticated && <AddCaseButton />}
          </HStack>
        )}
        {!error && <CasesGrid />}
        <PageSelector />
      </Box>
    </Stack>
  );
}

export default CasesPage;
