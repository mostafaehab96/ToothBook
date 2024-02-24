import { useFormik } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  SimpleGrid,
  HStack,
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Text,
  Box,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import AddCaseImagesUploader from "./AddCaseImagesUploader";

enum Department {
  Operative = "Operative",
  Crown = "Crown",
  Endo = "Endo",
  Pedo = "Pedo",
  Surgery = "Surgery",
  Perio = "Perio",
  Prosthesis = "Prosthesis",
}

enum MedicalCompromises {
  Hypertensive = "Hypertensive",
  Cardiac = "Cardiac",
  Disability = "Disability",
  Diabitic = "Diabitic",
}

interface FormValues {
  name: string;
  age: string;
  gender: string;
  phoneNumber: string;
  diagnosis: string;
  isEmergency: boolean;
  isMedicalCompromised: boolean;
  medicalCompromised: MedicalCompromises[] | undefined;
  departments: Department[] | undefined;
}

const initialValues = {
  name: "",
  age: "",
  gender: "",
  phoneNumber: "",
  diagnosis: "",
  isEmergency: false,
  isMedicalCompromised: false,
  medicalCompromised: undefined,
  departments: undefined,
};

function AddCaseForm() {
  const formik = useFormik<FormValues>({
    initialValues,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleMedicalCompromisedCheckboxChange = (value: string) => {
    if (formik.values.medicalCompromised !== undefined) {
      if (
        formik.values.medicalCompromised
          .map((medCom) => medCom.toString())
          .includes(value)
      ) {
        formik.setFieldValue(
          "medicalCompromised",
          formik.values.medicalCompromised.filter(
            (medCom) => medCom.toString() !== value
          )
        );
      } else {
        formik.setFieldValue("medicalCompromised", [
          ...formik.values.medicalCompromised,
          MedicalCompromises[value as keyof typeof MedicalCompromises],
        ]);
      }
    } else {
      formik.setFieldValue("medicalCompromised", [
        MedicalCompromises[value as keyof typeof MedicalCompromises],
      ]);
    }
  };
  const handleDepartmentCheckboxChange = (value: string) => {
    const departments = formik.values.departments;

    if (departments !== undefined) {
      if (departments.map((dep) => dep.toString()).includes(value)) {
        formik.setFieldValue(
          "departments",
          departments.filter((dep) => dep.toString() !== value)
        );
      } else {
        formik.setFieldValue("departments", [
          ...departments,
          Department[value as keyof typeof Department],
        ]);
      }
    } else {
      formik.setFieldValue("departments", [
        Department[value as keyof typeof Department],
      ]);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacingX={8}>
        <FormControl mb={4}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input type="text" id="name" name="name" />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel htmlFor="diagnosis">Diagnosis</FormLabel>
          <Input type="text" id="diagnosis" name="diagnosis" />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel htmlFor="age">Age</FormLabel>
          <Input type="number" id="age" name="age" />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
          <Input type="number" id="phoneNumber" name="phoneNumber" />
        </FormControl>

        <Stack direction={["column", "row"]} justifyContent="space-around">
          <Box>
            <FormControl mb={4}>
              <FormLabel>Gender</FormLabel>
              <Menu id="gender">
                <MenuButton as={Button} rightIcon={<BsChevronDown />}>
                  {formik.values.gender
                    ? formik.values.gender.charAt(0).toUpperCase() +
                      formik.values.gender.slice(1)
                    : "Gender"}
                </MenuButton>
                <MenuList>
                  {["male", "female"].map((gender) => (
                    <MenuItem
                      key={gender}
                      onClick={() => formik.setFieldValue("gender", gender)}
                    >
                      {gender.charAt(0).toUpperCase() + gender.slice(1)}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </FormControl>
          </Box>
          <Box>
            <FormControl mb={4}>
              <FormLabel>Department</FormLabel>
              <Menu id="department" closeOnSelect={false}>
                <MenuButton as={Button} rightIcon={<BsChevronDown />}>
                  Open Menu
                </MenuButton>
                <MenuList>
                  {Object.keys(Department).map((dep) => (
                    <MenuItem key={dep}>
                      <HStack width={"100%"} justifyContent="space-between">
                        <Text>{dep}</Text>
                        <Checkbox
                          isChecked={formik.values.departments
                            ?.map((depp) => depp.toString())
                            .includes(dep)}
                          onChange={() => handleDepartmentCheckboxChange(dep)}
                        />
                      </HStack>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </FormControl>
          </Box>
        </Stack>

        <Stack direction={["column", "row"]} justifyContent="space-around">
          <Box>
            <FormControl mb={4}>
              <HStack>
                <FormLabel htmlFor="medicalCompromised">
                  Medical Compromised
                </FormLabel>
                <Checkbox
                  id="isMedicalCompromised"
                  name="isMedicalCompromised"
                  onChange={formik.handleChange}
                  isChecked={formik.values.isMedicalCompromised}
                  colorScheme="blue"
                  marginBottom={1}
                  marginLeft={1}
                />
              </HStack>
              <Menu closeOnSelect={false}>
                <MenuButton
                  isDisabled={!formik.values.isMedicalCompromised}
                  as={Button}
                  rightIcon={<BsChevronDown />}
                >
                  Open Menu
                </MenuButton>
                <MenuList>
                  {Object.keys(MedicalCompromises).map((item) => (
                    <MenuItem key={item}>
                      <HStack width={"100%"} justifyContent="space-between">
                        <Text>{item}</Text>
                        <Checkbox
                          isChecked={formik.values.medicalCompromised
                            ?.map((medCom) => medCom.toString())
                            .includes(item)}
                          onChange={() =>
                            handleMedicalCompromisedCheckboxChange(item)
                          }
                        />
                      </HStack>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </FormControl>
          </Box>
          <Box>
            <FormControl mb={4}>
              <HStack>
                <FormLabel htmlFor="isEmergency">Emergency</FormLabel>
                <Checkbox
                  id="isEmergency"
                  name="isEmergency"
                  onChange={formik.handleChange}
                  isChecked={formik.values.isEmergency}
                  colorScheme="blue"
                  marginBottom={1}
                  marginLeft={1}
                />
              </HStack>
            </FormControl>
          </Box>
        </Stack>
      </SimpleGrid>
      <Box paddingY={8} paddingX={2}>
        <AddCaseImagesUploader />
      </Box>
      <HStack justify="center" marginBottom={5}>
        <Button
          paddingX={10}
          width="fit-content"
          type="submit"
          colorScheme="blue"
          mt={4}
        >
          Add Case
        </Button>
      </HStack>
    </form>
  );
}

export default AddCaseForm;
