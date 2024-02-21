import { Formik, Form } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  SimpleGrid,
  HStack,
} from "@chakra-ui/react";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: string;
  grade: string;
}

function SignupForm() {
  const universities = ["University 1", "University 2", "University 3"];

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    university: "",
    age: "",
    grade: "",
  };

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacingX={8}>
          <FormControl mb={4}>
            <FormLabel htmlFor="firstName">First Name</FormLabel>
            <Input type="text" id="firstName" name="firstName" />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="lastName">Last Name</FormLabel>
            <Input type="text" id="lastName" name="lastName" />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input type="email" id="email" name="email" />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input type="password" id="password" name="password" />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="university">University</FormLabel>
            <Select id="university" name="university">
              {universities.map((uni) => (
                <option key={uni} value={uni}>
                  {uni}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="age">Age</FormLabel>
            <Input type="number" id="age" name="age" />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="grade">Grade</FormLabel>
            <Input type="text" id="grade" name="grade" />
          </FormControl>
        </SimpleGrid>
        <HStack justify="center" marginBottom={5}>
          <Button
            paddingX={10}
            width="fit-content"
            type="submit"
            colorScheme="blue"
            mt={4}
          >
            Sign Up
          </Button>
        </HStack>
      </Form>
    </Formik>
  );
}

export default SignupForm;
