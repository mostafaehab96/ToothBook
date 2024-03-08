import { useFormik } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  SimpleGrid,
  HStack,
  Menu,
  FormErrorMessage,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import * as Yup from "yup";
import { useState } from "react";
import RegisterFormValues from "../../interfaces/RegisterFormValues";
import { useAuth } from "../../../contexts/AuthenticationContext";

const universities = [
  "Zakazik University",
  "Mansoura University",
  "American University in Cairo (AUC)",
  "Ain Shams University",
  "Al-Azhar University",
  "Alexandria University",
  "Assiut University",
  "Aswan University",
  "Banha University",
  "Beni-Suef University",
  "Cairo University",
  "Damanhour University",
  "Damietta University",
];
const grades = ["4th grade", "5th grade", "graduated"];
export const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  university: "",
  age: "",
  grade: "",
};

const validationSchema = Yup.object().shape({
  age: Yup.number().required("Age field is required").integer(),
  name: Yup.string()
    .required("Name field is required")
    .min(4, "Name must be at least 4 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%&])[a-zA-Z0-9!@#\$%&]{8,}$/,
      "Password must include lowercase, uppercase, number, and special character"
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), undefined], "Passwords must match"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  grade: Yup.string().required("Grade is required"),
  university: Yup.string().required("University is required"),
});

interface Props {
  // setFormValues: React.Dispatch<React.SetStateAction<RegisterFormValues>>;
  registerSubmit: (values: RegisterFormValues) => void;
}

function SignupForm({ registerSubmit }: Props) {
  const { isLoading } = useAuth();
  const formik = useFormik<RegisterFormValues>({
    initialValues,
    onSubmit: (values) => {
      if (registerSubmit) registerSubmit(values);
    },
    validationSchema: validationSchema,
    validateOnBlur: true,
    validateOnMount: true,
  });
  const [universityMenuTouched, setUniversityMenuTouched] = useState(false);
  const [gradeMenuTouched, setGradeMenuTouched] = useState(false);
  const universityErrorIsShown: boolean =
    universityMenuTouched && formik.values.university === "";
  const gradeErrorIsShown: boolean =
    gradeMenuTouched && formik.values.grade === "";

  function handleMenuItemSelected(fieldName: string, value: string) {
    formik.setFieldValue(fieldName, value);
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacingX={8}>
        <FormControl
          mb={4}
          isInvalid={formik.touched.name && formik.errors.name !== undefined}
        >
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <FormErrorMessage style={{ color: "red" }}>
              {formik.errors.name}
            </FormErrorMessage>
          )}
        </FormControl>

        <FormControl
          mb={4}
          isInvalid={formik.touched.email && formik.errors.email !== undefined}
        >
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <FormErrorMessage style={{ color: "red" }}>
              {formik.errors.email}
            </FormErrorMessage>
          )}
        </FormControl>

        <FormControl
          mb={4}
          isInvalid={
            formik.touched.password && formik.errors.password !== undefined
          }
        >
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <FormErrorMessage style={{ color: "red" }}>
              {formik.errors.password}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl
          mb={4}
          isInvalid={
            formik.touched.confirmPassword &&
            formik.errors.confirmPassword !== undefined
          }
        >
          <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <FormErrorMessage style={{ color: "red" }}>
              {formik.errors.confirmPassword}
            </FormErrorMessage>
          )}
        </FormControl>

        <HStack align="">
          <FormControl
            mb={4}
            isInvalid={formik.touched.age && formik.errors.age !== undefined}
          >
            <FormLabel htmlFor="age">Age</FormLabel>
            <Input
              type="number"
              id="age"
              name="age"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.age}
            />
            {formik.touched.age && formik.errors.age && (
              <FormErrorMessage style={{ color: "red" }}>
                {formik.errors.age}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl mb={4} isInvalid={gradeErrorIsShown}>
            <FormLabel>Grade</FormLabel>
            <Menu onClose={() => setGradeMenuTouched(true)}>
              <MenuButton
                borderWidth={gradeErrorIsShown ? 1.5 : 0}
                borderColor="red"
                as={Button}
                rightIcon={<BsChevronDown />}
                width="100%"
                textAlign="start"
              >
                {formik.values.grade || "Grade:"}
              </MenuButton>
              <MenuList>
                {grades.map((grade) => (
                  <MenuItem
                    onClick={() => handleMenuItemSelected("grade", grade)}
                    key={grade}
                  >
                    {grade}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            {gradeErrorIsShown && (
              <FormErrorMessage style={{ color: "red" }}>
                This field is required.
              </FormErrorMessage>
            )}
          </FormControl>
        </HStack>

        <FormControl mb={4} isInvalid={universityErrorIsShown}>
          <FormLabel htmlFor="university">University</FormLabel>
          <Menu onClose={() => setUniversityMenuTouched(true)}>
            <MenuButton
              borderWidth={universityErrorIsShown ? 1.5 : 0}
              borderColor="red"
              as={Button}
              rightIcon={<BsChevronDown />}
              width="100%"
              textAlign="start"
            >
              {formik.values.university || "Select University:"}
            </MenuButton>
            <MenuList>
              {universities.map((uni) => (
                <MenuItem
                  onClick={() => handleMenuItemSelected("university", uni)}
                  key={uni}
                >
                  {uni}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          {universityErrorIsShown && (
            <FormErrorMessage style={{ color: "red" }}>
              This field is required.
            </FormErrorMessage>
          )}
        </FormControl>
      </SimpleGrid>
      <HStack justify="center" marginBottom={5}>
        <Button
          paddingX={10}
          width="fit-content"
          type="submit"
          colorScheme="blue"
          mt={4}
          isDisabled={!formik.isValid}
        >
          {isLoading ? <Spinner /> : "Sign Up"}
        </Button>
      </HStack>
    </form>
  );
}

export default SignupForm;
