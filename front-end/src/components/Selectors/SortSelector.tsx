import { useState } from "react";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

const Orders = {
  age: "Age",
  DateAdded: "Date Added",
  name: "Name",
};

function SortSelector() {
  const [currentSortOrder, setCurrentSortOrder] = useState<string>("name");

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Sort By: {currentSortOrder.toString() || ""}
      </MenuButton>
      <MenuList>
        {Object.values(Orders).map((item) => (
          <MenuItem onClick={() => setCurrentSortOrder(item)} key={item}>
            {item}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export default SortSelector;
