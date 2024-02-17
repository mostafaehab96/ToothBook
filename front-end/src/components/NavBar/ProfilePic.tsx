import { IconButton, Image } from "@chakra-ui/react";

function ProfilePic() {
  return (
    <IconButton
      aria-label="Profile picture"
      borderRadius="50%"
      overflow="hidden"
      icon={
        <Image
          boxSize="40px"
          objectFit="cover"
          src="https://wallpapercave.com/wp/wp5765934.jpg"
          alt="Profile Picture"
        />
      }
    />
  );
}

export default ProfilePic;
