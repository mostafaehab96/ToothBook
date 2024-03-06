import { IconButton, Image } from "@chakra-ui/react";
import profilePicPlaceHolder from "../../../public/profilePicPlaceHolder.webp";
import { useNavigate } from "react-router-dom";

interface Props {
  pic: string | undefined;
}

function ProfilePic({ pic }: Props) {
  const navigate = useNavigate();
  return (
    <IconButton
      aria-label="Profile picture"
      borderRadius="50%"
      overflow="hidden"
      icon={
        <Image
          boxSize="40px"
          objectFit="cover"
          src={pic}
          fallbackSrc={profilePicPlaceHolder}
          alt="Profile Picture"
          onClick={() => navigate("/profile")}
        />
      }
    />
  );
}

export default ProfilePic;
