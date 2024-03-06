import { Box, Grid, GridItem, Text, VStack } from "@chakra-ui/react";
import NavBar from "../../components/NavBar/NavBar";
import SignupForm from "../../components/Forms/SignupForm";
import RegisterImageUploader from "../../components/Forms/RegisterImagesUploader";
import { useAuth } from "../../../contexts/AuthenticationContext";
import RegisterFormValues from "../../interfaces/RegisterFormValues";
import { useState } from "react";
import ErrorAlert from "../../components/Alerts/ErrorAlert";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const { register, error } = useAuth();
  const [selectedImage, setSelectedImage] = useState<File>();
  const navigate = useNavigate();
  const { user } = useAuth();
  if (user) navigate("/cases");

  function handleRegisterSubmit(values: RegisterFormValues) {
    if (register) register(values, selectedImage);
  }

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
