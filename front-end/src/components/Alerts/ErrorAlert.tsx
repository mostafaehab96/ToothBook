import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Stack,
} from "@chakra-ui/react";

interface Props {
  title: string;
  message: string;
}

function ErrorAlert({ title, message }: Props) {
  return (
    <Alert status="error">
      <AlertIcon />
      <Stack direction={["column", "row"]}>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Stack>
    </Alert>
  );
}

export default ErrorAlert;
