import { Image, Input } from "@chakra-ui/react";
import { ChangeEvent, useRef, useState } from "react";
import profilePicPlaceHolder from "../../../public/profilePicPlaceHolder.webp";

interface Props {
  selectedImage: File | undefined;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | undefined>>;
}

function RegisterImageUploader({ selectedImage, setSelectedImage }: Props) {
  const [inputKey, setInputKey] = useState<string>(Math.random().toString(36));
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    if (files && files.length > 0) {
      const newImageList = Array.from(files);
      setSelectedImage(newImageList[0]);
    }
  }

  function handleBrowseClick() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  // function resetInput() {
  //   const randomString = Math.random().toString(36);
  //   setInputKey(randomString);
  // }

  return (
    <>
      <Image
        src={selectedImage ? URL.createObjectURL(selectedImage) : ""}
        fallbackSrc={profilePicPlaceHolder}
        cursor="pointer"
        onClick={handleBrowseClick}
        objectFit="cover"
        width="100%"
        height="100%"
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
