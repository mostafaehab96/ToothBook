import {
  Button,
  Checkbox,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import toTitleCase from "../../utils/toTitleCase";
import { useCases } from "../../../contexts/CasesContext";
import Emergency from "../../interfaces/Emergency";
import IsMedicalCompromised from "../../interfaces/IsMedicalCompromised";
import Department from "../../interfaces/Department";
import Sex from "../../interfaces/Sex";
import { Filters } from "../../interfaces/Filters";

const filterTypes = {
  department: Department,
  medicalCompromised: IsMedicalCompromised,
  emergency: Emergency,
  sex: Sex,
};

function FilterSelectors() {
  const { filters, filterItemChecked } = useCases();

  return (
    <HStack>
      {Object.keys(filterTypes).map((type) => (
        <FilterSelector
          key={type}
          filterName={type}
          filters={filters[type as keyof Filters]}
          filterItemChecked={filterItemChecked}
        />
      ))}
    </HStack>
  );
}

interface FilterSelectorProps {
  filters: Record<string, boolean>;
  filterName: string;
  filterItemChecked: null | ((filter: string, filterItem: string) => void);
}

function FilterSelector({
  filters,
  filterName,
  filterItemChecked,
}: FilterSelectorProps) {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {toTitleCase(filterName)}
      </MenuButton>
      <MenuList>
        {Object.keys(filterTypes[filterName as keyof typeof filterTypes]).map(
          (dep) => (
            <MenuItem key={dep}>
              <HStack width={"100%"} justifyContent="space-between">
                <Text>{toTitleCase(dep)}</Text>
                <Checkbox
                  isChecked={filters[dep]}
                  onChange={
                    filterItemChecked
                      ? () => filterItemChecked(filterName, dep)
                      : () => {}
                  }
                />
              </HStack>
            </MenuItem>
          )
        )}
      </MenuList>
    </Menu>
  );
}

export default FilterSelectors;
