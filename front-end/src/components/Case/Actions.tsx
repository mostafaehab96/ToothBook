import { Button, HStack, useColorMode } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthenticationContext";
import { useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "../../Services/api_client";
import axios, { AxiosRequestConfig } from "axios";
import { useCases } from "../../contexts/CasesContext";

function Actions() {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { setActionSignal } = useCases();
  const { id } = useParams();

  const returnButtonColor = colorMode === "light" ? "#ffffff" : "#000000";
  let activeCase: boolean = false;
  let treatedCase: boolean = false;

  if (id) {
    treatedCase = user?.treatedPatients.includes(id) || false;
    activeCase = user?.activePatients.includes(id) || false;
  }

  async function caseAction(caseAction: string) {
    if (user === null) return;
    const URL = `${backendUrl}/api/` + `users/${user._id}/${caseAction}`;
    const requestData = {
      patientId: id,
    };

    const axiosConfig: AxiosRequestConfig = {
      method: "post",
      url: URL,
      data: requestData,
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    };
    axios(axiosConfig)
      .then((response) => {
        console.log("Response:", response.data);
      })
      .then(() => {
        if (updateUser) updateUser();
      })
      .then(() => {
        if (setActionSignal) setActionSignal();
        if (caseAction !== "contact") navigate(-1);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <HStack justify="center" spacing={{ base: 8, md: 10 }}>
      <Button
        fontSize={{ base: "1.1rem", md: 20 }}
        fontFamily="Rubik"
        paddingY={8}
        fontWeight={700}
        colorScheme="blue"
        aria-label="Profile picture"
        overflow="hidden"
        isDisabled={!activeCase || treatedCase}
        onClick={() => caseAction("treat")}
      >
        Treated
      </Button>
      <Button
        fontFamily="Rubik"
        paddingY={8}
        fontSize={{ base: "1.1rem", md: 20 }}
        fontWeight={700}
        colorScheme="green"
        aria-label="contact"
        isDisabled={activeCase || treatedCase || user === null}
        overflow="hidden"
        onClick={() => caseAction("contact")}
      >
        Contact
      </Button>
      <Button
        fontFamily="Rubik"
        paddingY={8}
        fontSize={{ base: "1.1rem", md: 20 }}
        fontWeight={700}
        colorScheme="red"
        aria-label="reject"
        overflow="hidden"
        isDisabled={!activeCase}
        onClick={() => caseAction("reject")}
      >
        Reject
      </Button>
      <Button
        fontFamily="Rubik"
        paddingY={8}
        fontSize={{ base: "1.1rem", md: 20 }}
        fontWeight={700}
        colorScheme="yellow"
        color={returnButtonColor}
        aria-label="reject"
        overflow="hidden"
        isDisabled={!activeCase}
        onClick={() => caseAction("return")}
      >
        Return
      </Button>
    </HStack>
  );
}

export default Actions;
