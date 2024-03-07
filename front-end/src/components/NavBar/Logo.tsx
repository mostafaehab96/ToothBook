import { IconButton, Image, Tooltip, useColorMode } from "@chakra-ui/react";
import Logopng from "../../../public/logo.png";

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
        <Image cursor="pointer" src={Logopng} boxSize="100%" />
      </IconButton>
    </Tooltip>
  );
}

export default Logo;
