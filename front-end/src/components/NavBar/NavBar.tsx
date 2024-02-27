import { HStack, IconButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import SearchInput from "./SearchInput";
import ColorModeSwitch from "./ColorModeSwitch";
import ProfilePic from "./ProfilePic";
import { FaInfo } from "react-icons/fa";
import { RiLoginBoxFill } from "react-icons/ri";

function NavBar() {
  return (
    <HStack paddingY={2} paddingX={3} spacing={2}>
      <Logo />
      <Link to="/about" className="nav-item">
        <IconButton
          colorScheme="blue"
          aria-label="Profile picture"
          borderRadius="50%"
          overflow="hidden"
          icon={<FaInfo size={20} />}
        />
      </Link>
      <SearchInput />
      <HStack>
        <Link to="/login" className="nav-item">
          <IconButton
            colorScheme="blue"
            aria-label="Profile picture"
            overflow="hidden"
            icon={<RiLoginBoxFill size={20} />}
            borderRadius="50%"
          />
        </Link>
        <ColorModeSwitch />
        <ProfilePic />
      </HStack>
    </HStack>
  );
}

export default NavBar;
