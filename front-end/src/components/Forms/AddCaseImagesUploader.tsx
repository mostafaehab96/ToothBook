import { Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { ChangeEvent, useRef, useState } from "react";
import PicsViewer from "../Case/PicsViewer";

interface Props {
  selectedImage: File;
  setSelectedImage: React.Dispatch<React.SetStateAction<File[]>>;
}

function RegisterImageUploader({ selectedImage, setSelectedImage }: Props) {
  const [inputKey, setInputKey] = useState<string>(Math.random().toString(36));
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    if (files && files.length > 0) {
      const newImages = Array.from(files);
      setSelectedImage((prevImages) => [...prevImages, ...newImages]);
    }
  }

  function handleBrowseClick() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  function handleRemoveImage(index: number) {
    setSelectedImage((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
    if (selectedImage.length === 1) {
      resetInput();
    }
  }

  function resetInput() {
    const randomString = Math.random().toString(36);
    setInputKey(randomString);
  }

  return (
    <>
      <VStack spacing={4}>
        <Text paddingBottom={6} fontSize={24}>
          Upload Images
        </Text>
        <Button colorScheme="blue" onClick={handleBrowseClick}>
          Browse
        </Button>
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          multiple
          ref={inputRef}
          hidden={true}
          key={inputKey}
        />
        {selectedImage && (
          <HStack
            justifyContent="center"
            // paddingX={{ base: "0px", lg: "10%" }}
            paddingBottom={4}
            width="100%"
          ></HStack>
        )}
      </VStack>
    </>
  );
}

export default RegisterImageUploader;
