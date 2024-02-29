import { IconButton, Image } from "@chakra-ui/react";
import profilePicPlaceHolder from "../../../public/profilePicPlaceHolder.webp";

interface Props {
  pic: string | undefined;
}

function ProfilePic({ pic }: Props) {
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
        />
      }
    />
  );
}

export default ProfilePic;
