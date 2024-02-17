import { SimpleGrid } from "@chakra-ui/react";
import CaseCardContainer from "../Case/CaseCardContainer";
import CaseCard from "../Case/CaseCard";

const fakeCases: Array<Case> = [
  {
    id: 1,
    name: "Mostaafa Ehab",
    age: 28,
    gender: "male",
    address: "7 London, England",
    title: "software Engineer",
    description: "very very sick, needs a doctor right now...🤒💉",
    images: [
      "https://dawsondental.ca/wp-content/uploads/2022/01/iStock-1304070687.jpg",
      "https://wallpapercave.com/wp/wp5765934.jpg",
    ],
    phone: "01146260031",
  },
  {
    id: 2,
    name: "Mostaafa Ehab",
    age: 28,
    gender: "male",
    address: "7 London, England",
    title: "software Engineer",
    description: "very very sick, needs a doctor right now...🤒💉",
    images: [
      "https://dawsondental.ca/wp-content/uploads/2022/01/iStock-1304070687.jpg",
      "https://wallpapercave.com/wp/wp5765934.jpg",
    ],
    phone: "01146260031",
  },
  {
    id: 3,
    name: "Mostaafa Ehab",
    age: 28,
    gender: "male",
    address: "7 London, England",
    title: "software Engineer",
    description: "very very sick, needs a doctor right now...🤒💉",
    images: [
      "https://dawsondental.ca/wp-content/uploads/2022/01/iStock-1304070687.jpg",
      "https://wallpapercave.com/wp/wp5765934.jpg",
    ],
    phone: "01146260031",
  },
  {
    id: 4,
    name: "Mostaafa Ehab",
    age: 28,
    gender: "male",
    address: "7 London, England",
    title: "software Engineer",
    description: "very very sick, needs a doctor right now...🤒💉",
    images: [
      "https://dawsondental.ca/wp-content/uploads/2022/01/iStock-1304070687.jpg",
      "https://wallpapercave.com/wp/wp5765934.jpg",
    ],
    phone: "01146260031",
  },
  {
    id: 5,
    name: "Mostaafa Ehab",
    age: 28,
    gender: "male",
    address: "7 London, England",
    title: "software Engineer",
    description: "very very sick, needs a doctor right now...🤒💉",
    images: [
      "https://dawsondental.ca/wp-content/uploads/2022/01/iStock-1304070687.jpg",
      "https://wallpapercave.com/wp/wp5765934.jpg",
    ],
    phone: "01146260031",
  },
  {
    id: 6,
    name: "Mostaafa Ehab",
    age: 28,
    gender: "male",
    address: "7 London, England",
    title: "software Engineer",
    description: "very very sick, needs a doctor right now...🤒💉",
    images: [
      "https://dawsondental.ca/wp-content/uploads/2022/01/iStock-1304070687.jpg",
      "https://wallpapercave.com/wp/wp5765934.jpg",
    ],
    phone: "01146260031",
  },
];

function CasesGrid() {
  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, "2xl": 4 }}
      spacing={7}
      justifyContent="center"
      paddingY={8}
    >
      {fakeCases.map((casee) => (
        <CaseCardContainer key={casee.id}>
          <CaseCard key={casee.id} casee={casee} />
        </CaseCardContainer>
      ))}
    </SimpleGrid>
  );
}

export default CasesGrid;
