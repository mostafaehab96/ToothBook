import { SimpleGrid } from "@chakra-ui/react";
import CaseCardContainer from "../Case/CaseCardContainer";
import CaseCard from "../Case/CaseCard";
import { useCases } from "../../../contexts/CasesContext";
import CaseCardSkeleton from "../Case/CaseCardSkeleton";

function CasesGrid() {
  const { cases, isLoadingCases } = useCases();

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, "2xl": 4 }}
      spacing={7}
      justifyContent="center"
      paddingY={8}
    >
      {isLoadingCases
        ? Array.from({ length: 10 }, (_, index) => index + 1).map((s) => (
            <CaseCardContainer key={s}>
              <CaseCardSkeleton key={s} />
            </CaseCardContainer>
          ))
        : cases.map((casee) => (
            <CaseCardContainer key={casee._id}>
              <CaseCard key={casee._id} casee={casee} />
            </CaseCardContainer>
          ))}
    </SimpleGrid>
  );
}

export default CasesGrid;
