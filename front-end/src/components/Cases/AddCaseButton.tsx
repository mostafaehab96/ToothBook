import { Button, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

function AddCaseButton() {
  const breakpoint = useBreakpointValue({ base: "base", md: "md", lg: "lg" });
  const navigate = useNavigate();

  return breakpoint === "base" || breakpoint === "md" ? (
    <IconButton
      aria-label="add case"
      icon={<IoMdAdd size="30px" />}
      colorScheme="blue"
      onClick={() => navigate("/addCase")}
    >
      Add Case
    </IconButton>
  ) : (
    <Button colorScheme="blue" onClick={() => navigate("/addCase")}>
      Add Case
    </Button>
  );
}

export default AddCaseButton;
