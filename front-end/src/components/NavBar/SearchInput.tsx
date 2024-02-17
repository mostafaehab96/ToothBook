import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { useRef } from "react";
import { BsSearch } from "react-icons/bs";

function SearchInput() {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
      style={{ width: "70%", paddingLeft: "70px", paddingRight: "70px" }}
    >
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={ref}
          placeholder="Search..."
          borderRadius={15}
          variant="filled"
        />
      </InputGroup>
    </form>
  );
}

export default SearchInput;
