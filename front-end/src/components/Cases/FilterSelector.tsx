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
import { useCases } from "../../contexts/CasesContext";
import Emergency from "../../interfaces/Emergency";
import IsMedicalCompromised from "../../interfaces/IsMedicalCompromised";
import Department from "../../interfaces/Department";
import Sex from "../../interfaces/Sex";
import { Filters } from "../../interfaces/Filters";
import { IoIosWarning } from "react-icons/io";
import { RiAlarmWarningFill } from "react-icons/ri";
import { Dispatch, SetStateAction, useState } from "react";
import { FaTransgender } from "react-icons/fa";
import { TbCircleLetterD } from "react-icons/tb";
import {
  getFilterSelectorTransitionTime,
  getFilterSelectorWidth,
} from "../../utils/getFilterSelectorTransitionProps";

type ComponentsMap = {
  [key: string]: React.JSX.Element;
};

const filterIconsMap: ComponentsMap = {
  department: <TbCircleLetterD />,
  medicalCompromised: <IoIosWarning />,
  emergency: <RiAlarmWarningFill />,
  sex: <FaTransgender />,
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
        width={{
          base:
            filterName === openSelector
              ? getFilterSelectorWidth(filterName)
              : "70px",
          md: "auto",
          lg: "auto",
        }}
        transform={{
          base:
            openSelector && openSelector !== filterName
              ? "scale(0.9)"
              : "scale(1)",
        }}
        transition={`all ${getFilterSelectorTransitionTime(
          filterName
        )} ease-in-out;`}
      >
        <span style={{ display: "block", overflow: "hidden" }}>
          {breakpoint === "base" && filterName !== openSelector
            ? filterIconsMap[filterName]
            : toTitleCase(filterName)}
        </span>
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
