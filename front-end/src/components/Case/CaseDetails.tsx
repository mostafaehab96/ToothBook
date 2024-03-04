import {
  Box,
  GridItem,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Case from "../../interfaces/Case";
import toTitleCase from "../../utils/toTitleCase";
import { useAuth } from "../../../contexts/AuthenticationContext";
import { useParams } from "react-router-dom";
import { useState } from "react";

interface Props {
  casee: Case | null;
}

const largeInfoBoxes = ["diagnosis", "medicalCompromised"];
function CaseDetails({ casee }: Props) {
  const [displayedProperties, setDisplayedProperties] = useState([
    "name",
    "age",
    "address",
    "sex",
    "diagnosis",
    "medicalCompromised",
  ]);
  const { user } = useAuth();
  const dynamicGreyTextColor = useColorModeValue("#444444", "#aaaaaa");
  const { id } = useParams();

  let activeCase: boolean = false;
  let treatedCase: boolean = false;
  if (id) {
    treatedCase = user?.treatedPatients.includes(id) || false;
    activeCase = user?.activePatients.includes(id) || false;
  }

  if (
    !displayedProperties.includes("phoneNumber") &&
    (treatedCase || activeCase)
  ) {
    setDisplayedProperties([...displayedProperties, "phoneNumber"]);
  }

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
