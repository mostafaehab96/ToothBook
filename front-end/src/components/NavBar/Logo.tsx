import { IconButton, Image } from "@chakra-ui/react";
import Logopng from "../../../public/logo.png";

import { useNavigate } from "react-router";

function Logo() {
  const navigate = useNavigate();

  return (
    <IconButton
      aria-label="Profile picture"
      borderRadius="50%"
      overflow="hidden"
      onClick={() => navigate("/cases")}
    >
      <Image cursor="pointer" src={Logopng} boxSize="100%" />
    </IconButton>
  );
}

export default Logo;
