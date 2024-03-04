import { HStack, IconButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { RiLoginBoxFill } from "react-icons/ri";
import { RiLogoutBoxFill } from "react-icons/ri";
import Logo from "./Logo";
import SearchInput from "./SearchInput";
import ColorModeSwitch from "./ColorModeSwitch";
import ProfilePic from "./ProfilePic";
import { FaInfo } from "react-icons/fa";
import { useAuth } from "../../../contexts/AuthenticationContext";
import getLocalImage from "../../utils/getLocalImage";

function NavBar() {
  const { isAuthenticated, user, logout } = useAuth();
  console.log(user);
  return (
    <HStack paddingY={2} paddingX={3} spacing={2}>
      <Logo />
      <Link to="/" className="nav-item">
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
        {isAuthenticated ? (
          <IconButton
            colorScheme="blue"
            aria-label="Logout button"
            overflow="hidden"
            icon={<RiLogoutBoxFill size={20} />}
            borderRadius="50%"
            onClick={logout}
          />
        ) : (
          <Link to="/login" className="nav-item">
            <IconButton
              colorScheme="blue"
              aria-label="Login button"
              overflow="hidden"
              icon={<RiLoginBoxFill size={20} />}
              borderRadius="50%"
            />
          </Link>
        )}
        <ColorModeSwitch />
        {isAuthenticated && (
          <ProfilePic pic={user?.photo ? getLocalImage(user.photo) : ""} />
        )}
      </HStack>
    </HStack>
  );
}

export default NavBar;
