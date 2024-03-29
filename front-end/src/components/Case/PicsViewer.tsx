import {
  HStack,
  IconButton,
  Image,
  Box,
  Stack,
  Button,
  VStack,
  Skeleton,
} from "@chakra-ui/react";
import { useState } from "react";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import placeHolderImage from "../../../public/placeholder-image.webp";
import getLocalImage from "../../utils/getLocalImage";

interface Props {
  images: Array<string> | Array<File>;
  isLoading: boolean;
  handleRemoveImage: undefined | ((index: number) => void);
}

const PicsViewer = ({ images, isLoading, handleRemoveImage }: Props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isArrayOfFiles = (
    arr: Array<File> | Array<string>
  ): arr is Array<File> => arr.length > 0 && arr[0] instanceof File;

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
        <Box
          borderRadius={12}
          overflow="hidden"
          maxHeight={{ base: "300px", lg: "500px" }}
        >
          {isLoading ? (
            <Skeleton
              height={{
                base: "230px",
                md: "400px",
                lg: "280px",
                xl: "460px",
                "2xl": "780px",
              }}
            />
          ) : isArrayOfFiles(images) ? (
            <VStack
              justify="center"
              height={{ base: "15rem", md: "30rem", lg: "40rem" }}
            >
              <Box
                position="relative"
                display="inline-block"
                overflow="hidden"
                borderRadius={12}
                maxH="600px"
              >
                <Image
                  maxH="inherit"
                  src={URL.createObjectURL(images[currentImageIndex])}
                  alt={`Image ${currentImageIndex + 1}`}
                  className="image"
                  objectFit="cover"
                  objectPosition="centre"
                  height="inherit"
                />
                <Button
                  fontSize={24}
                  position="absolute"
                  top={2}
                  right={2}
                  borderRadius={12}
                  colorScheme="red"
                  onClick={
                    handleRemoveImage
                      ? () => {
                          setCurrentImageIndex(0);
                          handleRemoveImage(currentImageIndex);
                        }
                      : () => {}
                  }
                >
                  &times;
                </Button>
              </Box>
            </VStack>
          ) : (
            <Image
              height={"100%"}
              width="100%"
              borderRadius={12}
              src={
                images.length
                  ? (getLocalImage(images[currentImageIndex]) as string)
                  : placeHolderImage
              }
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
