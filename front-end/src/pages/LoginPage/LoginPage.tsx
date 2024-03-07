import { Box, Flex, Grid, GridItem, Image, Stack } from "@chakra-ui/react";
import LoginForm from "../../components/Forms/LoginForm";
import Logo from "../../../public/logo.png";
import NavBar from "../../components/NavBar/NavBar";
import { useAuth } from "../../../contexts/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const navigate = useNavigate();
  const { user, fetchingToken } = useAuth();

  useEffect(
    function () {
      if (user) {
        navigate("/cases");
      }
    },
    [user]
  );

  if (fetchingToken || user) return null; // LOADING

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
      }}
    >
      <GridItem area={"nav"} paddingBottom={8}>
        <NavBar />
      </GridItem>
      <GridItem area={"main"} marginLeft={7} marginRight={3} height="88vh">
        <Flex width="100%" align="center" justify="center" paddingBottom={6}>
          <Box
            overflow="hidden"
            // background="url(https://live.staticflickr.com/4490/37835996716_477ab51c7e_b.jpg)"
            backgroundSize="cover"
            borderRadius={15}
            borderWidth={2}
          >
            <Stack
              paddingX={10}
              paddingY={3}
              // backdropFilter="blur(4px) brightness(140%) "
            >
              <Box width="250px" height="250px">
                <Image src={Logo} />
              </Box>
              <LoginForm />
            </Stack>
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  );
}

export default LoginPage;
