import {
  HStack,
  IconButton,
  Text,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { RiLoginBoxFill } from "react-icons/ri";
import { RiLogoutBoxFill } from "react-icons/ri";
import Logo from "./Logo";
import ColorModeSwitch from "./ColorModeSwitch";
import ProfilePic from "./ProfilePic";
import { FaInfo } from "react-icons/fa";
import { useAuth } from "../../../contexts/AuthenticationContext";
import getLocalImage from "../../utils/getLocalImage";
import React from "react";

const NavBar = React.memo(function NavBar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { colorMode } = useColorMode();
  const dynamicTooltipColorValue =
    colorMode === "light" ? "#3182ce" : "#90cdf4";

  return (
    <HStack
      paddingBottom={2}
      paddingX={3}
      spacing={2}
      paddingTop={{ base: 3, md: 0 }}
      justifyContent={"space-between"}
    >
      <HStack spacing={2}>
        {isAuthenticated ? (
          <ProfilePic pic={user?.photo ? getLocalImage(user.photo) : ""} />
        ) : (
          <Tooltip label="Info" bgColor={dynamicTooltipColorValue}>
            <Link to="/" className="nav-item">
              <IconButton
                colorScheme="blue"
                aria-label="Profile picture"
                borderRadius="50%"
                overflow="hidden"
                icon={<FaInfo size={20} />}
              />
            </Link>
          </Tooltip>
        )}

        <ColorModeSwitch />
      </HStack>
      <Link to="/">
        <Text
          color={dynamicTooltipColorValue}
          fontSize={{ base: "2rem", md: "3rem" }}
          fontFamily={"Rubik"}
          fontStyle="italic"
          fontWeight="700"
          cursor="pointer"
          transitionDuration="0.3s"
          _hover={{ filter: "brightness(110%)", transform: "1.2" }}
        >
          toothbook
        </Text>
      </Link>
      <HStack spacing={2}>
        {isAuthenticated ? (
          <Tooltip label="logout" bgColor={dynamicTooltipColorValue}>
            <IconButton
              colorScheme="blue"
              aria-label="Logout button"
              overflow="hidden"
              icon={<RiLogoutBoxFill size={20} />}
              borderRadius="50%"
              onClick={logout}
            />
          </Tooltip>
        ) : (
          <Link to="/login" className="nav-item">
            <Tooltip label="login" bgColor={dynamicTooltipColorValue}>
              <IconButton
                colorScheme="blue"
                aria-label="Login button"
                overflow="hidden"
                icon={<RiLoginBoxFill size={20} />}
                borderRadius="50%"
              />
            </Tooltip>
          </Link>
        )}
        <Logo />
      </HStack>
    </HStack>
  );
});

export { NavBar };
