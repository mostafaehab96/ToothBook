import { Button, HStack, IconButton } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { GrNext, GrPrevious } from "react-icons/gr";
import createSublistAroundIndex from "../../utils/subListAroundIndex";
import { useCases } from "../../../contexts/CasesContext";

function PageSelector() {
  const { currentPage, totalPages, setPage } = useCases();
  const { colorMode } = useColorMode();
  const dynamicPageButtonBorderColor =
    colorMode === "light" ? "#3182ce" : "#90cdf4";

  function handlePageChange(page: number) {
    setPage(page);
  }
  function renderPageButtons() {
    let pageButtons = [];
    for (const i of createSublistAroundIndex(
      Array.from({ length: totalPages }, (_, index) => index + 1),
      currentPage
    )) {
      pageButtons.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          value={i}
          borderColor={i === currentPage ? dynamicPageButtonBorderColor : ""}
          borderWidth={i === currentPage ? 2 : 0}
        >
          {i}
        </Button>
      );
    }
    if (totalPages > currentPage + 2) {
      pageButtons.push(
        <Button key="...n" disabled={true}>
          ...
        </Button>
      );
    }
    if (currentPage > 2) {
      pageButtons = [
        <Button key="...p" disabled={true}>
          ...
        </Button>,
        ...pageButtons,
      ];
    }
    return pageButtons;
  }

  return (
    <HStack justify="center" marginBottom={8} marginTop={2}>
      <IconButton
        colorScheme="blue"
        aria-label="previous"
        overflow="hidden"
        icon={<GrPrevious size={10} />}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        key={`prev`}
      >
        Previous
      </IconButton>
      <HStack spacing={2}>{renderPageButtons()}</HStack>
      <IconButton
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        colorScheme="blue"
        aria-label="Profile picture"
        overflow="hidden"
        icon={<GrNext size={10} />}
        key={`next`}
      >
        Next
      </IconButton>
    </HStack>
  );
}

export default PageSelector;
