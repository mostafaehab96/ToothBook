import { Box, Grid, GridItem, Text, VStack } from "@chakra-ui/react";
import NavBar from "../../components/NavBar/NavBar";
import SignupForm, { initialValues } from "../../components/Forms/SignupForm";
import RegisterImageUploader from "../../components/Forms/RegisterImagesUploader";
import { useAuth } from "../../../contexts/AuthenticationContext";
import RegisterFormValues from "../../interfaces/RegisterFormValues";
import { useState } from "react";
import ErrorAlert from "../../components/Alerts/ErrorAlert";
// import api_client from "../../Services/api_client";

function SignupPage() {
  const { register, error } = useAuth();
  const [selectedImage, setSelectedImage] = useState<File>();
  // const [formValues, setFormValues] =
  //   useState<RegisterFormValues>(initialValues);
  // console.log("rerendered");

  function handleRegisterSubmit(values: RegisterFormValues) {
    if (register) register(values, selectedImage);
  }

  // useEffect(
  //   function () {
  //     function handleFormValuesChange() {
  //       if (
  //         register &&
  //         Object.values(formValues).every((val) => val as boolean)
  //       ) {
  //         register(formValues, selectedImage);
  //       }
  //     }
  //     console.log("rerendered");
  //     if (formValues && register) {
  //       console.log(formValues);
  //       handleFormValuesChange();
  //     }
  //   },
  //   [formValues]
  // );

  // async function handleRegisterSubmit(values: RegisterFormValues) {
  //   // send request to ask of the user exists
  //   try {
  //     const response = await api_client.get("/users/exists");
  //     console.log(response);
  //     if (response.data.status === "success") {
  //       if (response.data.data === null) {
  //         setError;
  //       }
  //     }
  //   } catch (e) {}
  //   // if not register with the values and the photo
  // }

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
      }}
    >
      <GridItem area={"nav"} paddingBottom={2}>
        <NavBar />
        {error && <ErrorAlert title="Error" message={error} />}
      </GridItem>

      <GridItem area="main" marginX={7} overflow={"hidden"}>
        <VStack
          mt={5}
          width="auto"
          display="relative"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            flexDirection="column"
            display="flex"
            alignItems="center"
            mb={10}
          >
            <Box
              width="220px"
              height="220px"
              mx="auto"
              marginBottom={7}
              borderRadius="50%"
              overflow="hidden"
            >
              <RegisterImageUploader
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />
            </Box>
            <Text fontSize={20} fontWeight={600}>
              Choose a profile picture
            </Text>
          </Box>

          <Box paddingX={{ base: 0, md: "100px" }}>
            <SignupForm
              registerSubmit={(values) => handleRegisterSubmit(values)}
            />
          </Box>
        </VStack>
      </GridItem>
    </Grid>
  );
}

export default SignupPage;
