import { HStack, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import SearchInput from "./SearchInput";
import ColorModeSwitch from "./ColorModeSwitch";
import ProfilePic from "./ProfilePic";

const nav_item_style = { fontWeight: 600 };

function NavBar() {
  return (
    <HStack paddingY={2} paddingX={3}>
      <Logo />
      <SearchInput />
      <HStack paddingX={5} spacing={10}>
        <Link to="/" className="nav-item">
          <Text
            _hover={{ color: "#96b0e0" }}
            transition={"0.3s"}
            style={nav_item_style}
          >
            Home
          </Text>
        </Link>
        <Link to="/login" className="nav-item">
          <Text
            _hover={{ color: "#96b0e0" }}
            transition={"0.3s"}
            style={nav_item_style}
          >
            Login
          </Text>
        </Link>
        <Link to="/about" className="nav-item">
          <Text
            _hover={{ color: "#96b0e0" }}
            transition={"0.3s"}
            style={nav_item_style}
          >
            About
          </Text>
        </Link>
      </HStack>
      <ColorModeSwitch />
      <ProfilePic />
    </HStack>
  );
}

export default NavBar;
