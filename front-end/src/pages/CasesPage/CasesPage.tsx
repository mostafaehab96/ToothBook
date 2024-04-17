import { Box, HStack, Show, Stack } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import { NavBar } from "../../components/NavBar/NavBar";
import CasesGrid from "../../components/Cases/CasesGrid";
import FilterSelectors from "../../components/Cases/FilterSelector";
import { useCases } from "../../../contexts/CasesContext";
import ErrorAlert from "../../components/Alerts/ErrorAlert";
import PageSelector from "../../components/Cases/PageSelector";
import AddCaseButton from "../../components/Cases/AddCaseButton";
import { useAuth } from "../../../contexts/AuthenticationContext";

function CasesPage() {
  const { error } = useCases();
  const { isAuthenticated } = useAuth();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Stack w="100%">
      <Box paddingBottom={8} w="100%">
        <NavBar />
        {error && (
          <ErrorAlert
            title="Connect to network"
            message="An error occurred while fetching the data. Please check your
        internet connection and try again later."
          />
        )}
      </Box>
      <Box maxW="100%">
        {!error && (
          <HStack
            justify="space-between"
            overflow="scroll"
            paddingX={4}
            css={{
              "&::-webkit-scrollbar": {
                height: "0px",
                display: "none",
              },
            }}
          >
            <FilterSelectors />
            <Show above="lg">{isAuthenticated && <AddCaseButton />}</Show>
          </HStack>
        )}
        {isMobile && (
          <Box position="fixed" right="30px" bottom="20px" zIndex={1}>
            {isAuthenticated && <AddCaseButton />}
          </Box>
        )}
        {!error && <CasesGrid />}
        <PageSelector />
      </Box>
    </Stack>
  );
}

export default CasesPage;
