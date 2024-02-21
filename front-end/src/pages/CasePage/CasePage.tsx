import { Grid, GridItem, Show, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import PicsViewer from "../../components/Case/PicsViewer";
import CaseDetails from "../../components/Case/CaseDetails";
import Actions from "../../components/Case/Actions";
import { useEffect, useState } from "react";
import Case from "../../components/Case/Case";
import ErrorAlert from "../../components/Alerts/ErrorAlert";

const BASE_URL = "http://localhost:9000/";

function CasePage() {
  const { id } = useParams();

  const [currentCase, setCurrentCase] = useState<Case | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      async function getCase(id: number) {
        setIsLoading(true);
        try {
          const res = await fetch(`${BASE_URL}cases/${id}`);
          const data = await res.json();
          setCurrentCase(data);
        } catch (e) {
          console.log(e);
          setError("error happened during fetching case");
        } finally {
          setIsLoading(false);
        }
      }
      getCase(Number(id));
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
              "-ms-overflow-style": "none",
              "scrollbar-width": "none",
            }}
            area={"main"}
            justifySelf="center"
            overflow={"scroll"}
            height={{ sm: "60vh", md: "50vh", lg: "86vh" }}
          >
            <Stack w="100%" paddingBottom={4} paddingRight={2}>
              <CaseDetails isLoading={isLoading} casee={currentCase} />
              <Show below="lg">
                <Actions />
              </Show>
            </Stack>
          </GridItem>

          <GridItem area={"pics"} padding={3}>
            <Stack
              width="100%"
              justify="center"
              height={{ sm: "auto", md: "auto", lg: "30rem" }}
            >
              <PicsViewer
                images={currentCase?.images || []}
                isLoading={isLoading}
              />
            </Stack>
            <Show above="lg">
              <Actions />
            </Show>
          </GridItem>
        </>
      )}
    </Grid>
  );
}

export default CasePage;
