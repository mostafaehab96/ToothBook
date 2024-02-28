import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

function CaseCardSkeleton() {
  return (
    <Card>
      <Skeleton height="250px" minWidth="370px" />
      <CardBody>
        <SkeletonText marginBottom={2} />
        <SkeletonText />
      </CardBody>
    </Card>
  );
}

export default CaseCardSkeleton;
