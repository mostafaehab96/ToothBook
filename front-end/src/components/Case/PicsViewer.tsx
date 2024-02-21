import {
  HStack,
  IconButton,
  Image,
  Box,
  Stack,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

interface Props {
  images: Array<string>;
  isLoading: boolean;
}

const PicsViewer = ({ images, isLoading }: Props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
      <Stack justify="center" width="100%">
        <Box borderRadius={12} overflow="hidden">
          {isLoading ? (
            <Spinner />
          ) : (
            <Image
              src={images[currentImageIndex]}
              alt={`Image ${currentImageIndex + 1}`}
              className="image"
              objectFit="contain"
              objectPosition="centre"
            />
          )}
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
