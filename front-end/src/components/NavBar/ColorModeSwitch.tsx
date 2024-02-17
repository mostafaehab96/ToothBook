import { HStack, useColorMode, IconButton } from "@chakra-ui/react";
import { MdOutlineModeNight } from "react-icons/md";

function ColorModeSwitch() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      colorScheme="blue"
      aria-label="Search database"
      icon={<MdOutlineModeNight />}
      borderRadius="50%"
      onClick={toggleColorMode}
    />
  );
}

export default ColorModeSwitch;
