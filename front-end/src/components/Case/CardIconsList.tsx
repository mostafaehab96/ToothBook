import { Badge, HStack, useColorMode } from "@chakra-ui/react";
import { IoMdMale } from "react-icons/io";
import { IoMdFemale } from "react-icons/io";
import { IoIosWarning } from "react-icons/io";
import { RiAlarmWarningFill } from "react-icons/ri";

const iconSize = "25px";

interface Props {
  gender: string;
  age: number;
  isEmergency: boolean;
  isMedicalCompromised: boolean;
}

function CardIconsList({
  gender,
  age,
  isEmergency,
  isMedicalCompromised,
}: Props) {
  const { colorMode } = useColorMode();
  const dynamicValue = colorMode === "light" ? "#2a4365" : "#90cdf4";

  return (
    <HStack marginY={1}>
      <Badge
        fontSize={16}
        paddingX={3}
        paddingY={1}
        borderRadius={8}
        colorScheme="blue"
        textTransform="lowercase"
      >
        {age} y
      </Badge>
      {gender == "male" ? (
        <IoMdMale size={iconSize} color={dynamicValue} />
      ) : (
        <IoMdFemale size={iconSize} color={dynamicValue} />
      )}
      {isEmergency && <RiAlarmWarningFill size={iconSize} color="#CE3B1E" />}
      {isMedicalCompromised && <IoIosWarning size={iconSize} color="#D0AC1C" />}
    </HStack>
  );
}

export default CardIconsList;
