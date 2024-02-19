import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";

function SearchInput() {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
      style={{ width: "100%", paddingLeft: "10px", paddingRight: "10px" }}
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
