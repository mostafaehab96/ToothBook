import { HStack, IconButton } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { MdDoNotDisturbAlt } from "react-icons/md";

function Actions() {
  return (
    <HStack justify="center" spacing={14}>
      <IconButton
        width="60px"
        height="60px"
        colorScheme="blue"
        aria-label="Profile picture"
        overflow="hidden"
        icon={<FaCheck size="30px" />}
      >
        Complete
      </IconButton>
      <IconButton
        width="60px"
        height="60px"
        colorScheme="green"
        aria-label="Profile picture"
        overflow="hidden"
        icon={<IoMdAdd size="30px" />}
      >
        Contact
      </IconButton>
      <IconButton
        width="60px"
        height="60px"
        colorScheme="red"
        aria-label="Profile picture"
        overflow="hidden"
        icon={<MdDoNotDisturbAlt size="30px" />}
      >
        Reject
      </IconButton>
    </HStack>
  );
}

export default Actions;
