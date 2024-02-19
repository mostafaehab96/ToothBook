import { Box, Flex, Grid, GridItem, Image, Stack } from "@chakra-ui/react";
import LoginForm from "../../components/Forms/LoginForm";
import Logo from "../../../public/logo.png";
import NavBar from "../../components/NavBar/NavBar";

function LoginPage() {
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
          <Box>
            <Box
              zIndex={0}
              filter="auto"
              blur="4px"
              background="url(https://picsum.photos/id/1080/200/300) center/cover no-repeat"
            ></Box>
            <Stack
              borderRadius={15}
              borderWidth={2}
              paddingX={10}
              paddingY={3}
              zIndex={5}
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
