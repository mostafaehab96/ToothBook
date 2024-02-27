import {
  HStack,
  IconButton,
  Text,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { RiLoginBoxFill } from "react-icons/ri";
import { IoHomeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import ColorModeSwitch from "./ColorModeSwitch";

function ToothBookTextLogo() {
  const { colorMode } = useColorMode();
  const dynamicLogoColorValue = colorMode === "light" ? "#3182ce" : "#90cdf4";
  const dynamicBackGroundColorValue =
    colorMode === "light" ? "#f0f0f0" : "#202020";
  return (
    <HStack
      borderBottomRadius={20}
      justify="space-between"
      width="100%"
      paddingY={2}
      paddingX={4}
      bgColor={dynamicBackGroundColorValue}
    >
      <Text
        color={dynamicLogoColorValue}
        fontSize={40}
        fontFamily={"Rubik"}
        fontStyle="italic"
        fontWeight="700"
      >
        toothbook
      </Text>
      <HStack spacing={3}>
        <Tooltip label="home" bgColor={dynamicLogoColorValue}>
          <Link to="/cases" className="nav-item">
            <IconButton
              colorScheme="blue"
              aria-label="home"
              overflow="hidden"
              icon={<IoHomeSharp size={20} />}
              borderRadius="50%"
            />
          </Link>
        </Tooltip>
        <Tooltip label="login" bgColor={dynamicLogoColorValue}>
          <Link to="/login" className="nav-item">
            <IconButton
              colorScheme="blue"
              aria-label="login"
              overflow="hidden"
              icon={<RiLoginBoxFill size={20} />}
              borderRadius="50%"
            />
          </Link>
        </Tooltip>
        <ColorModeSwitch />
      </HStack>
    </HStack>
  );
}

export default ToothBookTextLogo;
