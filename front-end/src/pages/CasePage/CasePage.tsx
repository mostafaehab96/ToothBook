import { Grid, GridItem, Show, Spinner, Stack, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";
import PicsViewer from "../../components/Case/PicsViewer";
import CaseDetails from "../../components/Case/CaseDetails";
import Actions from "../../components/Case/Actions";
import { useEffect, useState } from "react";
import Case from "../../interfaces/Case";
import ErrorAlert from "../../components/Alerts/ErrorAlert";
import { backendUrl } from "../../Services/api_client";

function CasePage() {
  const { id } = useParams();

  const [currentCase, setCurrentCase] = useState<Case | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      async function getCase(id: string) {
        setIsLoading(true);
        try {
          const res = await fetch(`${backendUrl}/api/patients/${id}`);
          const jsRes = await res.json();
          if (jsRes.status === "success") {
            setCurrentCase(jsRes.data.patient);
          }
        } catch (e) {
          setError("error happened during fetching case");
        } finally {
          setIsLoading(false);
        }
      }
      getCase(id as string);
    },
    [id]
  );

  return (
    <Grid
      templateAreas={{
        base: `"nav" "pics" "main"`,
        lg: `"nav nav" "pics main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "1fr 1fr",
      }}
      templateRows={{
        sm: `"100px" "1fr" "1fr"`,
        lg: `"100px" "1fr 1fr"`,
      }}
    >
      <GridItem area={"nav"} paddingBottom={8}>
        <NavBar />
        {error && (
          <ErrorAlert
            title="Connect to network"
            message="An error occurred while fetching the data. Please check your
        internet connection and try again later."
          />
        )}
      </GridItem>

      {!error && (
        <>
          <GridItem
            sx={{
              "::-webkit-scrollbar": {
                display: "none",
              },
              MsOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
            area={"main"}
            display="flex"
            alignItems="center"
            overflow={"scroll"}
            minHeight={{ base: "50vh", md: "50vh", lg: "86vh" }}
          >
            {isLoading ? (
              <VStack justify="center" width="100%">
                <Spinner />
              </VStack>
            ) : (
              <Stack w="100%" paddingBottom={4} paddingX={4} spacing={4}>
                <CaseDetails casee={currentCase} />
                <Show below="lg">
                  <Actions />
                </Show>
              </Stack>
            )}
          </GridItem>

          <GridItem area={"pics"} padding={3}>
            <Stack
              width="100%"
              justify="center"
              height={{ sm: "auto", md: "auto", lg: "100%" }}
              spacing={10}
            >
              <PicsViewer
                images={currentCase?.photos || []}
                isLoading={isLoading}
                handleRemoveImage={undefined}
              />
              <Show above="lg">
                <Actions />
              </Show>
            </Stack>
          </GridItem>
        </>
      )}
    </Grid>
  );
}

export default CasePage;
