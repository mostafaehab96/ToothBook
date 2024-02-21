import { Card, CardBody, HStack, Heading, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import Case from "./Case";

interface Props {
  casee: Case;
}

function CaseCard({ casee }: Props) {
  const navigate = useNavigate();

  return (
    <Card height="100%" onClick={() => navigate(`/case/${casee.id}`)}>
      <Image src={casee.images[casee.id % 2]} />
      <CardBody>
        <HStack marginY={2} justifyContent="space-between">
          <Heading fontSize="2xl">{`name: ${casee.name}`}</Heading>
          <Heading fontSize="2xl">{`age: ${casee.age}`}</Heading>
        </HStack>
        <HStack marginY={2} justifyContent="space-between">
          <Heading fontSize="xl" color="#aaaaaa">
            {`brief: ${casee.title}`}
          </Heading>
          <Heading fontSize="xl" color="#aaaaaa">
            {`gender: ${casee.gender}`}
          </Heading>
        </HStack>
        <Heading fontSize="xl" color="#aaaaaa">
          {`description: ${casee.description}`}
        </Heading>
      </CardBody>
    </Card>
  );
}

export default CaseCard;
