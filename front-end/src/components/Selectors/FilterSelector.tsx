import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

const fake_filter_list: Array<string> = [
  "Age",
  "Category",
  "Gender",
  "Address",
  "Phone",
];

function FilterSelector() {
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {`Filter By: ${selectedFilter || ""}`}
      </MenuButton>
      <MenuList>
        {fake_filter_list.map((filter) => (
          <MenuItem onClick={() => setSelectedFilter(filter)} key={filter}>
            {filter}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export default FilterSelector;
