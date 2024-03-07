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
import displayPropertyValues from "../../utils/displayPropertyValues";

interface Props {
  casee: Case | null;
}

const largeInfoBoxes = ["diagnosis"];
function CaseDetails({ casee }: Props) {
  const [displayedProperties, setDisplayedProperties] = useState([
    "name",
    "departments",
    "medicalCompromised",
    "age",
    "address",
    "sex",
    "diagnosis",
  ]);
  const { user } = useAuth();
  const dynamicGreyTextColor = useColorModeValue("#444444", "#bbbbbb");
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

  if (
    displayedProperties.includes("medicalCompromised") &&
    !casee?.medicalCompromised.length
  ) {
    setDisplayedProperties(
      displayedProperties.filter(
        (property) => property !== "medicalCompromised"
      )
    );
  }

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      spacingY={{ lg: "40px" }}
      spacingX={{ base: "20px", lg: "40px" }}
      paddingX={4}
    >
      {casee !== null &&
        displayedProperties.map((property) => (
          <GridItem
            key={property}
            colSpan={largeInfoBoxes.includes(property) ? 2 : 1}
          >
            <Box paddingY={2}>
              <Text
                fontSize={{ sm: "1rem", md: "1.6rem", lg: "1.6rem" }}
                fontWeight={700}
                fontFamily="Rubik"
              >
                {toTitleCase(property)}:{" "}
              </Text>
              <Text
                fontFamily="Rubik"
                fontSize={{ sm: "0.7rem", md: "1.5rem", lg: "1.4rem" }}
                fontWeight={700}
                color={dynamicGreyTextColor}
              >
                {property === "medicalCompromised" &&
                casee.medicalCompromised.length === 0
                  ? "N/A"
                  : displayPropertyValues(casee[property as keyof Case]) || "-"}
              </Text>
            </Box>
          </GridItem>
        ))}
    </SimpleGrid>
  );
}

export default CaseDetails;
