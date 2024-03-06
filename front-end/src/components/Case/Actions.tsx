import { HStack, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa6";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { useAuth } from "../../../contexts/AuthenticationContext";
import { useParams } from "react-router";
import { backendUrl } from "../../Services/api_client";
import axios, { AxiosRequestConfig } from "axios";
import { useCases } from "../../../contexts/CasesContext";

const ICON_BTN_SIZE = { base: "40px", md: "60px", lg: "60px" };
function Actions() {
  const breakpoint = useBreakpointValue({
    base: "base",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
    "2xl": "2xl",
  });
  const { user, updateUser } = useAuth();
  const { setActionSignal } = useCases();
  const { id } = useParams();
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <HStack justify="center" spacing={14}>
      <IconButton
        width={ICON_BTN_SIZE}
        height={ICON_BTN_SIZE}
        colorScheme="blue"
        aria-label="Profile picture"
        overflow="hidden"
        isDisabled={!activeCase || treatedCase}
        onClick={() => caseAction("treat")}
        icon={<FaCheck size={breakpoint === "base" ? "20px" : "30px"} />}
      >
        Complete
      </IconButton>
      <IconButton
        width={ICON_BTN_SIZE}
        height={ICON_BTN_SIZE}
        colorScheme="green"
        aria-label="contact"
        isDisabled={activeCase || treatedCase || user === null}
        overflow="hidden"
        icon={<FaPhone size={breakpoint === "base" ? "20px" : "30px"} />}
        onClick={() => caseAction("contact")}
      >
        Contact
      </IconButton>
      <IconButton
        width={ICON_BTN_SIZE}
        height={ICON_BTN_SIZE}
        colorScheme="red"
        aria-label="reject"
        overflow="hidden"
        isDisabled={!activeCase}
        icon={
          <MdDoNotDisturbAlt size={breakpoint === "base" ? "20px" : "30px"} />
        }
        onClick={() => caseAction("reject")}
      >
        Reject
      </IconButton>
    </HStack>
  );
}

export default Actions;
