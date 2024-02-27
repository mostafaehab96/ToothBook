import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import ToothBookTextLogo from "../../components/NavBar/LandingPageNavBar";
import Logopng from "../../../public/logo.png";
import { motion } from "framer-motion";
import { Circle } from "@chakra-ui/react";
import landing_page_join_page from "../../../public/landing_page_join_page.png";
import { Link } from "react-router-dom";

const whatYouCanDoData = [
  {
    title: "Find the perfect case",
    discription:
      "Find patients with the specific traits and conditions on your mind.",
  },
  {
    title: "Filter cases",
    discription:
      "Filter medical compromised or emergency cases or even by department.",
  },
  {
    title: "View cases history",
    discription:
      "Keep track of the cases you completed, with images of the case after treatment.",
  },
];

const AnimatedCircle = () => {
  const variants = {
    expanded: { scale: 1.5, opacity: "0%" },
    shrunk: { scale: 1, opacity: "100%" },
  };

  return (
    <motion.div
      animate="expanded"
      variants={variants}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <Circle size={{ base: "240px", md: "300px" }} bg="blue.500" />
    </motion.div>
  );
};

function LandingPage() {
  const { colorMode } = useColorMode();

  const dynamicTextColorValue = colorMode === "light" ? "#155B9C" : "#90cdf4";
  return (
    <Grid templateAreas={{ base: `"nav" "main"` }}>
      <GridItem area={"nav"} paddingBottom={{ base: 4, md: 8 }}>
        <ToothBookTextLogo />
      </GridItem>
      <GridItem area={"main"} margin={7} marginTop={20}>
        {/* Hero Section */}
        <SimpleGrid
          columns={{ sm: 1, md: 1, lg: 2, "2xl": 2 }}
          spacing="60px"
          justifyContent="center"
          paddingY={8}
        >
          <Flex justify="center" align="center" paddingY={10}>
            <Box
              height={{ base: "300px", md: "400px" }}
              width={{ base: "300px", md: "400px" }}
              position="absolute"
            >
              <Image cursor="pointer" src={Logopng} boxSize="100%" />
            </Box>
            <Box zIndex={-1}>
              <AnimatedCircle />
            </Box>
          </Flex>

          <VStack justify="center" align="center">
            <Text
              fontSize={{ base: 35, md: 45 }}
              fontFamily="Rubik"
              fontWeight={700}
              textShadow="2px 2px 4px rgba(0, 0, 0, 0.5);"
              color={dynamicTextColorValue}
            >
              Easily find a patient
            </Text>
            <Text
              fontWeight={600}
              fontSize={{ base: 25, md: 30 }}
              fontFamily="Rubik"
              fontStyle="italic"
              textShadow="2px 2px 4px rgba(0, 0, 0, 0.5);"
            >
              Find ur patient easily
            </Text>
          </VStack>
        </SimpleGrid>
        {/* What you can do section */}

        <Flex
          align="center"
          direction="column"
          paddingTop={{ base: "100px", md: "150px" }}
          paddingBottom={{ base: "20px", md: "100px" }}
          fontFamily="Rubik"
        >
          <Heading fontSize={{ base: 34, md: 52 }} fontWeight={800}>
            What you can do...
          </Heading>
          <Stack
            paddingX={15}
            direction={{ base: "column", lg: "row" }}
            spacing={["110px", "120px"]}
            marginY="100px"
            align="center"
          >
            {whatYouCanDoData.map((item) => (
              <VStack
                boxShadow="md"
                padding={4}
                borderRadius={15}
                width={{ base: "auto", lg: "28%" }}
              >
                <Text
                  paddingY={4}
                  fontSize={{ base: 28, md: 40, lg: 30 }}
                  fontWeight={600}
                  textAlign="center"
                  color={dynamicTextColorValue}
                >
                  {item.title}
                </Text>
                <Text fontSize={{ base: 22, lg: 24 }} textAlign="center">
                  {item.discription}
                </Text>
              </VStack>
            ))}
          </Stack>
        </Flex>

        {/* login / register section */}
        <SimpleGrid
          columns={{ sm: 1, md: 1, lg: 2, "2xl": 2 }}
          spacing={{ base: "120px", md: "150px", lg: "60px" }}
          justifyContent="center"
          paddingY={8}
          justifyItems="center"
        >
          <VStack justify="center" align="center" fontFamily="Rubik">
            <Heading
              fontFamily="Rubik"
              fontSize={{ base: 55, md: 65 }}
              fontWeight={700}
              textShadow="2px 2px 4px rgba(0, 0, 0, 0.5);"
              color={dynamicTextColorValue}
            >
              Join Now
            </Heading>
            <HStack spacing={[5, 10]} paddingTop={10}>
              <Link to="/login">
                <Button
                  boxShadow="md"
                  fontSize={{ base: 24, md: 30, lg: 26 }}
                  padding={{ base: 6, md: 8 }}
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  boxShadow="md"
                  fontSize={{ base: 24, md: 30, lg: 26 }}
                  padding={{ base: 6, md: 8 }}
                >
                  Register
                </Button>
              </Link>
            </HStack>
          </VStack>
          <Flex
            justify="center"
            align="center"
            borderRadius="80px"
            overflow="hidden"
            h={["350px", "500px"]}
            w={["300px", "460px"]}
            boxShadow="lg"
          >
            <Image
              cursor="pointer"
              src={landing_page_join_page}
              boxSize="100%"
              objectFit="cover"
            />
          </Flex>
        </SimpleGrid>
        {/* About section */}
        <Flex
          align="center"
          direction="column"
          paddingTop={["50px", "150px"]}
          paddingBottom={{ base: "20px", md: "100px" }}
          fontFamily="Rubik"
        >
          <Heading
            fontSize={{ base: 34, md: 52 }}
            fontWeight={800}
            marginBottom={10}
          >
            About
          </Heading>
          <Text fontSize={24} width="100%" paddingX={{ base: 7, md: 20 }}>
            We are a great team. We are a great team. We are a great team. We
            are a great team. We are a great team. We are a great team.
          </Text>
        </Flex>
        {/* Contact us section */}
      </GridItem>
    </Grid>
  );
}

export default LandingPage;
