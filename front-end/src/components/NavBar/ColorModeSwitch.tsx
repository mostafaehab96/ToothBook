import { useColorMode, IconButton, Tooltip } from "@chakra-ui/react";
import { MdOutlineModeNight } from "react-icons/md";

function ColorModeSwitch() {
  const { colorMode, toggleColorMode } = useColorMode();
  const dynamicColorValue = colorMode === "light" ? "#3182ce" : "#90cdf4";

  return (
    <Tooltip label="color mode" bgColor={dynamicColorValue}>
      <IconButton
        colorScheme="blue"
        aria-label="Search database"
        icon={<MdOutlineModeNight size={20} />}
        borderRadius="50%"
        onClick={toggleColorMode}
      />
    </Tooltip>
  );
}

export default ColorModeSwitch;
