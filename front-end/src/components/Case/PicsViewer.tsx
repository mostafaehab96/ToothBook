import { HStack, IconButton, Image, Box, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

const PicsViewer = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([
    "https://dawsondental.ca/wp-content/uploads/2022/01/iStock-1304070687.jpg",
    "https://wallpapercave.com/wp/wp5765934.jpg",
    "https://dawsondental.ca/wp-content/uploads/2022/01/iStock-1304070687.jpg",
    "https://wallpapercave.com/wp/wp5765934.jpg",
  ]);

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevClick = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <HStack className="image-viewer" justify="center" width="100%">
      <IconButton
        colorScheme="blue"
        aria-label="Profile picture"
        overflow="hidden"
        icon={<GrPrevious size={20} />}
        onClick={handlePrevClick}
        disabled={currentImageIndex === 0}
      >
        Previous
      </IconButton>
      <Stack
        justify="center"
        width="100%"
        // boxSize={{ sm: "20rem", lg: "35rem" }}
      >
        <Box borderRadius={12} overflow="hidden">
          <Image
            src={images[currentImageIndex]}
            alt={`Image ${currentImageIndex + 1}`}
            className="image"
            objectFit="contain"
            objectPosition="centre"
          ></Image>
        </Box>
      </Stack>

      <IconButton
        onClick={handleNextClick}
        disabled={currentImageIndex === images.length - 1}
        colorScheme="blue"
        aria-label="Profile picture"
        overflow="hidden"
        icon={<GrNext size={20} />}
      >
        Next
      </IconButton>
    </HStack>
  );
};

export default PicsViewer;
