import { HStack, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { MdDoNotDisturbAlt } from "react-icons/md";

const iconButtonSize = { base: "40px", md: "60px", lg: "60px" };
function Actions() {
  const breakpoint = useBreakpointValue({
    base: "base",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
    "2xl": "2xl",
  });

  return (
    <HStack justify="center" spacing={14}>
      <IconButton
        width={iconButtonSize}
        height={iconButtonSize}
        colorScheme="blue"
        aria-label="Profile picture"
        overflow="hidden"
        icon={<FaCheck size={breakpoint === "base" ? "20px" : "30px"} />}
      >
        Complete
      </IconButton>
      <IconButton
        width={iconButtonSize}
        height={iconButtonSize}
        colorScheme="green"
        aria-label="Profile picture"
        overflow="hidden"
        icon={<IoMdAdd size={breakpoint === "base" ? "20px" : "30px"} />}
      >
        Contact
      </IconButton>
      <IconButton
        width={iconButtonSize}
        height={iconButtonSize}
        colorScheme="red"
        aria-label="Profile picture"
        overflow="hidden"
        icon={
          <MdDoNotDisturbAlt size={breakpoint === "base" ? "20px" : "30px"} />
        }
      >
        Reject
      </IconButton>
    </HStack>
  );
}

export default Actions;
