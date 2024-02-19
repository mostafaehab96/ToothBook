import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { FormEvent, KeyboardEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState<string | null>(null);
  const [emailFocus, setEmailFocus] = useState<boolean>(false);
  const [passwordFocus, setPasswordFocus] = useState<boolean>(false);
  const [password, setPassword] = useState<string | null>(null);

  const isInvalidEmail =
    email !== null && !emailFocus && (email === "" || !email.includes("@"));
  const isInvalidPassword = !passwordFocus && password === "";

  const navigate = useNavigate();

  function handleEnterClicked(e: KeyboardEvent) {
    if (e.key === "Enter" && !(isInvalidPassword || isInvalidEmail)) {
      navigate("/cases");
    }
  }

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    navigate("/cases");
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleEnterClicked(e);
        }
      }}
    >
      <Stack spacing={3} align="center">
        <FormControl isInvalid={isInvalidEmail}>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Email"
            type="email"
            value={email === null ? "" : email}
            onChange={(e) => setEmail(e.target.value)}
            onFocusCapture={() => {
              setEmailFocus(true);
              if (email == null) setEmail("");
            }}
            onBlur={() => setEmailFocus(false)}
          />
          {isInvalidEmail && (
            <FormErrorMessage>Email is required.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={isInvalidPassword}>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Password"
            type="password"
            value={password === null ? "" : password}
            onFocusCapture={() => {
              setPasswordFocus(true);
              if (password == null) setPassword("");
            }}
            onBlur={() => setPasswordFocus(false)}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {isInvalidPassword && (
            <FormErrorMessage>No password entered.</FormErrorMessage>
          )}
        </FormControl>
        <Button
          type="submit"
          width="fit-content"
          isDisabled={isInvalidEmail || isInvalidPassword}
        >
          Login
        </Button>
      </Stack>
    </form>
  );
}

export default LoginForm;
