import { Image, Input } from "@chakra-ui/react";
import { ChangeEvent, useRef, useState } from "react";
import profilePicPlaceHolder from "../../../public/profilePicPlaceHolder.webp";

function RegisterImageUploader() {
  const [selectedImage, setSelectedImage] = useState<File>();

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

  function resetInput() {
    const randomString = Math.random().toString(36);
    setInputKey(randomString);
  }

  return (
    <>
      <Image
        borderRadius="full"
        src={selectedImage ? URL.createObjectURL(selectedImage) : ""}
        fallbackSrc={profilePicPlaceHolder}
        cursor="pointer"
        onClick={handleBrowseClick}
      />
      <Input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={inputRef}
        hidden={true}
        key={inputKey}
      />
    </>
  );
}

export default RegisterImageUploader;
