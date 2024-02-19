import { Grid, GridItem, Show, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import PicsViewer from "../../components/Case/PicsViewer";
import CaseDetails from "../../components/Case/CaseDetails";
import Actions from "../../components/Case/Actions";

const testCase = {
  id: 1,
  name: "Mostaafa Ehab",
  age: 28,
  gender: "male",
  address: "7 London, England",
  title: "software Engineer",
  description:
    "very very sick, needs treatment very very sick, needs treatment very very sick, needs treatment very very sick, needs treatment very very sick, needs treatment very very sick, needs treatment very very sick, needs treatment very very sick, needs treatment very very sick, needs treatment very very sick, needs treatment very very sick, needs treatment very very sick, needs treatment very very sick, needs treatment very very sick, needs treatment very very sick, needs treatment very very sick, needs treatment",
  images: [
    "https://dawsondental.ca/wp-content/uploads/2022/01/iStock-1304070687.jpg",
    "https://wallpapercave.com/wp/wp5765934.jpg",
  ],
  phone: "01146260031",
};

function CasePage() {
  // const { id } = useParams();
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
      </GridItem>

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
          <CaseDetails casee={testCase} />
          <Show below="md">
            <Actions />
          </Show>
        </Stack>
      </GridItem>

      <GridItem area={"pics"} justifySelf="center" padding={3}>
        <Stack
          width="100%"
          justify="center"
          height={{ sm: "10rem", md: "30rem", lg: "30rem" }}
        >
          <PicsViewer />
        </Stack>
        <Show above="md">
          <Actions />
        </Show>
      </GridItem>
    </Grid>
  );
}

// function CasePage() {
//   // const { id } = useParams();
//   return (
//     <Grid
//       templateAreas={{
//         base: `"nav" "main"`,
//       }}
//     >
//       <GridItem area={"nav"} paddingBottom={8}>
//         <NavBar />
//       </GridItem>
//       <GridItem area={"main"} marginX={7}>
//         <Stack
//           width="100%"
//           direction={["column", "column", "row"]}
//           justify="center"
//         >
//           <Stack
//             w={{ sm: "100%", md: "100%", lg: "50%" }}
//             spacing={10}
//             left={10}
//           >
//             <Stack
//               width="100%"
//               justify="center"
//               height={{ sm: "10rem", md: "20rem", lg: "30rem" }}
//             >
//               <PicsViewer />
//             </Stack>
//             <Show above="md">
//               <Actions />
//             </Show>
//           </Stack>
//           <Box w={{ sm: "100%", md: "100%", lg: "50%" }} paddingY={5}>
//             <CaseDetails casee={testCase} />
//           </Box>
//           <Show below="md">
//             <Actions />
//           </Show>
//         </Stack>
//       </GridItem>
//     </Grid>
//   );
// }

export default CasePage;
