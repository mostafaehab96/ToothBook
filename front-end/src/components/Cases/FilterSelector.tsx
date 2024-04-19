import {
  Button,
  Checkbox,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import toTitleCase from "../../utils/toTitleCase";
import { useCases } from "../../../contexts/CasesContext";
import Emergency from "../../interfaces/Emergency";
import IsMedicalCompromised from "../../interfaces/IsMedicalCompromised";
import Department from "../../interfaces/Department";
import Sex from "../../interfaces/Sex";
import { Filters } from "../../interfaces/Filters";
import { IoIosWarning } from "react-icons/io";
import { RiAlarmWarningFill } from "react-icons/ri";
import { Dispatch, SetStateAction, useState } from "react";

type ComponentsMap = {
  [key: string]: React.JSX.Element;
};

const filterIconsMap: ComponentsMap = {
  department: <IoIosWarning />,
  medicalCompromised: <IoIosWarning />,
  emergency: <RiAlarmWarningFill />,
  sex: <IoIosWarning />,
};

const filterTypes = {
  department: Department,
  medicalCompromised: IsMedicalCompromised,
  emergency: Emergency,
  sex: Sex,
};

function FilterSelectors() {
  const { filters, filterItemChecked } = useCases();
  const [openSelector, setOpenSelector] = useState<string>("");

  return (
    <HStack>
      {Object.keys(filterTypes).map((type) => (
        <FilterSelector
          key={type}
          filterName={type}
          filters={filters[type as keyof Filters]}
          filterItemChecked={filterItemChecked}
          openSelector={openSelector}
          setOpenSelector={setOpenSelector}
        />
      ))}
    </HStack>
  );
}

interface FilterSelectorProps {
  filters: Record<string, boolean>;
  filterName: string;
  filterItemChecked: null | ((filter: string, filterItem: string) => void);
  openSelector: string;
  setOpenSelector: Dispatch<SetStateAction<string>>;
}

function FilterSelector({
  filters,
  filterName,
  filterItemChecked,
  openSelector,
  setOpenSelector,
}: FilterSelectorProps) {
  const breakpoint = useBreakpointValue({ base: "base", md: "md", lg: "lg" });

  return (
    <Menu
      closeOnSelect={false}
      onOpen={() => setOpenSelector(filterName)}
      onClose={() => setOpenSelector("")}
    >
      <MenuButton
        as={Button}
        rightIcon={<BsChevronDown />}
        maxWidth={{
          base: filterName === openSelector ? "210px" : "110px",
          md: "1000px",
          lg: "1000px",
        }}
        minWidth={{
          base: filterName === openSelector ? "80px" : "70px",
          md: "0px",
          lg: "0px",
        }}
        transition="
        max-width 0.3s ease-in-out;
        min-width 0.3s ease-in-out;
        "
      >
        {breakpoint === "base" && filterName !== openSelector
          ? filterIconsMap[filterName]
          : toTitleCase(filterName)}
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
