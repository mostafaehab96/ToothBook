import { SimpleGrid } from "@chakra-ui/react";
import CaseCardContainer from "../Case/CaseCardContainer";
import CaseCard from "../Case/CaseCard";
import CaseCardSkeleton from "../Case/CaseCardSkeleton";
import { useUserCases } from "../../../contexts/UserCasesContext";

interface Props {
  activeCases: boolean;
}

function UserCasesGrid({ activeCases }: Props) {
  const { userCases, isLoadingUserCases } = useUserCases();

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, "2xl": 4 }}
      spacing={7}
      justifyContent="center"
      paddingY={8}
    >
      {isLoadingUserCases
        ? Array.from({ length: 10 }, (_, index) => index + 1).map((s) => (
            <CaseCardContainer key={s}>
              <CaseCardSkeleton key={s} />
            </CaseCardContainer>
          ))
        : userCases
            .filter((casee) => (casee.status === "contacted") === activeCases)
            .map((casee) => (
              <CaseCardContainer key={casee._id}>
                <CaseCard key={casee._id} casee={casee} />
              </CaseCardContainer>
            ))}
    </SimpleGrid>
  );
}

export default UserCasesGrid;
