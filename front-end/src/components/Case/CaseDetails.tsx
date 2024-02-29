import {
  Box,
  GridItem,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import Case from "../../interfaces/Case";
import toTitleCase from "../../utils/toTitleCase";

interface Props {
  casee: Case | null;
}

const displayedProperties = [
  "name",
  "age",
  "address",
  "sex",
  "diagnosis",
  "medicalCompromised",
];

const largeInfoBoxes = ["diagnosis", "medicalCompromised"];

function CaseDetails({ casee }: Props) {
  const dynamicGreyTextColor = useColorModeValue("#444444", "#aaaaaa");

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      spacingY={{ lg: "40px" }}
      spacingX={{ lg: "40px" }}
      paddingX={5}
    >
      {casee !== null &&
        Object.keys(casee)
          .filter((key) => displayedProperties.includes(key))
          .map((key) => (
            <GridItem key={key} colSpan={largeInfoBoxes.includes(key) ? 2 : 1}>
              <Box paddingY={2}>
                <Text
                  fontSize={{ sm: "1rem", md: "2rem", lg: "2rem" }}
                  fontWeight={700}
                >
                  {toTitleCase(key)}:{" "}
                </Text>
                <Text
                  fontSize={{ sm: "0.7rem", md: "1.5rem", lg: "1.5rem" }}
                  fontWeight={700}
                  color={dynamicGreyTextColor}
                >
                  {key === "medicalCompromised" &&
                    casee.medicalCompromised.length === 0 &&
                    "N/A"}
                  {casee[key as keyof Case] || "-"}
                </Text>
              </Box>
            </GridItem>
          ))}
    </SimpleGrid>
  );
}

export default CaseDetails;
