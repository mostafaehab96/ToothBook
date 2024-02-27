import {
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import Case from "../../interfaces/Case";
import CardIconsList from "./CardIconsList";
import placeHolderImage from "../../../public/imagePlaceholder.jpg";

interface Props {
  casee: Case;
}

function CaseCard({ casee }: Props) {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const dynamicDepartmentTextValue =
    colorMode === "light" ? "#303030" : "#d2d2d2";

  return (
    <Card height="100%" onClick={() => navigate(`/case/${casee._id}`)}>
      <Image
        src={casee.photos[0] || placeHolderImage}
        height={{ base: "auto", md: "68%", lg: "68%" }}
      />
      <CardBody>
        <Heading marginY={2} fontSize="2xl">{`${casee.name}`}</Heading>
        <HStack justify={"space-between"} mt={4}>
          <Heading
            fontStyle="italic"
            marginY={2}
            fontSize={22}
            color={dynamicDepartmentTextValue}
          >
            # {`${casee.department}`}
          </Heading>
          <CardIconsList
            gender={casee.sex}
            age={casee.age}
            isEmergency={casee.isEmergency}
            isMedicalCompromised={casee.MedicalCompromised.length !== 0}
          />
        </HStack>
      </CardBody>
    </Card>
  );
}

export default CaseCard;
