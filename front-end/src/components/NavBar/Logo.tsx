import { IconButton, Image, Tooltip, useColorMode } from "@chakra-ui/react";
import Logosvg from "../../../public/logo.svg";

import { useNavigate } from "react-router";

function Logo() {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const dynamicTooltipColorValue =
    colorMode === "light" ? "#3182ce" : "#90cdf4";
  return (
    <Tooltip label="Homepage" bgColor={dynamicTooltipColorValue}>
      <IconButton
        aria-label="Profile picture"
        borderRadius="50%"
        overflow="hidden"
        onClick={() => navigate("/cases")}
      >
        <Image
          cursor="pointer"
          transitionDuration={"0.5s"}
          _hover={{ filter: "brightness(90%)" }}
          src={Logosvg}
          width="100%"
          h="100%"
        />
      </IconButton>
    </Tooltip>
  );
}

export default Logo;
