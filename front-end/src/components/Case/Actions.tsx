import { HStack, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa6";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { useAuth } from "../../../contexts/AuthenticationContext";
import { useParams } from "react-router";
import api_client from "../../Services/api_client";
import { backendUrl } from "../../Services/api_client";
import axios, { AxiosRequestConfig } from "axios";

const iconButtonSize = { base: "40px", md: "60px", lg: "60px" };
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
  const { id } = useParams();
  let activeCase: boolean = false;
  let treatedCase: boolean = false;
  if (id) {
    treatedCase = user?.treatedPatients.includes(id) || false;
    activeCase = user?.activePatients.includes(id) || false;
  }

  async function contact() {
    if (user === null) return;

    const URL = `${backendUrl}/api/` + `users/${user._id}/contact`;

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
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  async function treat() {}
  async function reject() {}

  return (
    <HStack justify="center" spacing={14}>
      <IconButton
        width={iconButtonSize}
        height={iconButtonSize}
        colorScheme="blue"
        aria-label="Profile picture"
        overflow="hidden"
        isDisabled={!activeCase || treatedCase}
        onClick={() => treat()}
        icon={<FaCheck size={breakpoint === "base" ? "20px" : "30px"} />}
      >
        Complete
      </IconButton>
      <IconButton
        width={iconButtonSize}
        height={iconButtonSize}
        colorScheme="green"
        aria-label="contact"
        isDisabled={activeCase || treatedCase || user === null}
        overflow="hidden"
        icon={<FaPhone size={breakpoint === "base" ? "20px" : "30px"} />}
        onClick={() => contact()}
      >
        Contact
      </IconButton>
      <IconButton
        width={iconButtonSize}
        height={iconButtonSize}
        colorScheme="red"
        aria-label="reject"
        overflow="hidden"
        isDisabled={!activeCase}
        icon={
          <MdDoNotDisturbAlt size={breakpoint === "base" ? "20px" : "30px"} />
        }
        onClick={() => reject()}
      >
        Reject
      </IconButton>
    </HStack>
  );
}

export default Actions;
