import { Box, Button, IconButton, Show } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

function AddCaseButton() {
  const navigate = useNavigate();
  return (
    <Box>
      <Show above="md">
        <Button colorScheme="blue" onClick={() => navigate("/addCase")}>
          Add Case
        </Button>
      </Show>
      <Show below="md">
        <IconButton
          aria-label="add case"
          icon={<IoMdAdd size="25px" />}
          colorScheme="blue"
          onClick={() => navigate("/addCase")}
          height="3rem"
          width="3rem"
          borderRadius="15px"
        >
          Add Case
        </IconButton>
      </Show>
    </Box>
  );
}

// function LargeAddCaseButton() {
//   const breakpoint = useBreakpointValue({ base: "base", md: "md", lg: "lg" });
//   const navigate = useNavigate();

//   return breakpoint === "base" || breakpoint === "md" ? (
//     <IconButton
//       aria-label="add case"
//       icon={<IoMdAdd size="40px" />}
//       colorScheme="blue"
//       onClick={() => navigate("/addCase")}
//       height="4rem"
//       width="4rem"
//       borderRadius="15px"
//     >
//       Add Case
//     </IconButton>
//   ) : (
//     <Button colorScheme="blue" onClick={() => navigate("/addCase")}>
//       Add Case
//     </Button>
//   );
// }

// function MobileAddCaseButton() {
//   return (
//     {isMobile && (
//       <Box position="fixed" right="30px" bottom="20px" zIndex={1}>
//         {<AddCaseButton />}
//       </Box>
//     )}
//   )
// }

export default AddCaseButton;
