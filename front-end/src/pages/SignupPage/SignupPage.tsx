import { Box, Grid, GridItem, Text, VStack } from "@chakra-ui/react";
import NavBar from "../../components/NavBar/NavBar";
import SignupForm, { initialValues } from "../../components/Forms/SignupForm";
import RegisterImageUploader from "../../components/Forms/RegisterImagesUploader";
import { useAuth } from "../../../contexts/AuthenticationContext";
import RegisterFormValues from "../../interfaces/RegisterFormValues";
import { useCallback, useEffect, useState } from "react";

function SignupPage() {
  const { register } = useAuth();
  const [selectedImage, setSelectedImage] = useState<File>();
  const [formValues, setFormValues] =
    useState<RegisterFormValues>(initialValues);
  console.log("rerendered");

  useEffect(
    function () {
      function handleFormValuesChange() {
        if (register) register(formValues, selectedImage);
      }
      console.log("rerendered");
      if (formValues && register) {
        console.log(formValues);
        handleFormValuesChange();
      }
    },
    [formValues, register]
  );

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
      }}
    >
      <GridItem area={"nav"} paddingBottom={2}>
        <NavBar />
      </GridItem>

      <GridItem area="main" marginX={7} overflow={"hidden"}>
        <VStack
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
            <SignupForm setFormValues={setFormValues} />
          </Box>
        </VStack>
      </GridItem>
    </Grid>
  );
}

export default SignupPage;
