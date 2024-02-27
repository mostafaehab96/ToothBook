import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api_client from "../../Services/api_client";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
});

interface FormValues {
  email: string;
  password: string;
}

function LoginForm() {
  const formik = useFormik<FormValues>({
    initialValues,
    onSubmit: (values) => {
      loginPostRequest(values);
    },
    validationSchema: validationSchema,
    validateOnBlur: true,
    validateOnMount: true,
  });

  async function loginPostRequest(body: FormValues) {
    console.log(JSON.stringify(body));
    try {
      const response = await api_client.post("/users/login", body);
      console.log(response);

      if (response.data.status !== "success") {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = response.data;
      console.log("POST request successful:\n", data);
    } catch (error) {
      console.error("Error during POST request:", error);
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3} align="center">
        <FormControl
          isInvalid={formik.touched.email && formik.errors.email !== undefined}
        >
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Email"
            type="email"
            name="email"
            id="email"
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
          isInvalid={
            formik.touched.password && formik.errors.password !== undefined
          }
        >
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Password"
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
        <Button type="submit" width="fit-content" isDisabled={!formik.isValid}>
          Login
        </Button>
        <Link to="/register">
          <Text textDecoration="underline" fontStyle="italic">
            dont't have an account?
          </Text>
        </Link>
      </Stack>
    </form>
  );
}

export default LoginForm;
