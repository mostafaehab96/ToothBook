import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function CaseCardContainer({ children }: Props) {
  return (
    <Box
      overflow="hidden"
      borderRadius={10}
      borderWidth="3px"
      transition="transform 0.25s ease, border-color 0.3s ease"
      _hover={{ transform: "scale(1.04)", borderColor: "#90cdf4" }}
    >
      {children}
    </Box>
  );
}

export default CaseCardContainer;
