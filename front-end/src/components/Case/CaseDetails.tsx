import { Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { Case } from "./Case";

interface Props {
  casee: Case | null;
}

const displayedProperties = ["name", "age", "gender", "address", "description"];

function CaseDetails({ casee }: Props) {
  const dynamicGreyTextColor = useColorModeValue("#444444", "#aaaaaa");

  return (
    <Stack paddingX={5}>
      {casee !== null &&
        Object.keys(casee)
          .filter((key) => displayedProperties.includes(key))
          .map((key) => (
            <Stack paddingY={2}>
              <Text fontSize={{ sm: "1rem", lg: "2rem" }} fontWeight={700}>
                {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
              </Text>
              <Text
                fontSize={{ sm: "0.7rem", lg: "1.5rem" }}
                fontWeight={700}
                color={dynamicGreyTextColor}
              >
                {casee[key as keyof Case] ?? "-"}
              </Text>
            </Stack>
          ))}
    </Stack>
  );
}

export default CaseDetails;
