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
  GridItem,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import AddCaseImagesUploader from "./AddCaseImagesUploader";
import Department from "../../interfaces/Department";
import MedicalCompromises from "../../interfaces/MedicalCompromises";
import api_client from "../../Services/api_client";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthenticationContext";

interface FormValues {
  name: string;
  age: string;
  sex: string;
  phoneNumber: string;
  diagnosis: string;
  isEmergency: boolean;
  isMedicalCompromised: boolean;
  medicalCompromised: MedicalCompromises[];
  departments: Department[];
  address: string;
  photos: File[];
}

const initialValues = {
  name: "",
  age: "",
  sex: "",
  phoneNumber: "",
  diagnosis: "",
  address: "",
  isEmergency: false,
  isMedicalCompromised: false,
  medicalCompromised: [],
  departments: [],
  photos: [],
};

function AddCaseForm() {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const { user } = useAuth();

  const formik = useFormik<FormValues>({
    initialValues,
    onSubmit: (values) => {
      addCasePostRequest(values);
    },
  });

  async function addCasePostRequest(body: FormValues) {
    if (!user) return;
    const formData = new FormData();
    try {
      // #region adding formdata
      formData.append("name", body.name);
      formData.append("age", body.age);
      formData.append("sex", body.sex);
      formData.append("phoneNumber", body.phoneNumber);
      formData.append("diagnosis", body.diagnosis);
      formData.append("address", body.address);
      formData.append("department", JSON.stringify(body.departments));
      formData.append("isEmergency", body.isEmergency.toString());
      // formData.append(
      //   "isMedicalCompromised",
      //   body.isMedicalCompromised.toString()
      // );
      // formData.append(
      //   "medicalCompromised",
      //   JSON.stringify(body.medicalCompromised)
      // );

      selectedImages.forEach((file, index) => {
        formData.append(`photos`, file, `image${index}.jpg`);
      });

      // #endregion adding formdata

      console.log(formData.get("department"));

      const response = await api_client.post("/patients", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status !== "success") {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = response.data;
      console.log("POST request successful:\n", data);
    } catch (error) {
      console.error("Error during POST request:", error);
    }
  }

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
          <Input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel htmlFor="diagnosis">Diagnosis</FormLabel>
          <Input
            type="text"
            id="diagnosis"
            name="diagnosis"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.diagnosis}
          />
        </FormControl>

        <GridItem mb={4}>
          <HStack spacing={4}>
            <FormControl>
              <FormLabel htmlFor="age">Age</FormLabel>
              <Input
                type="number"
                id="age"
                name="age"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.age}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
              <Input
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
              />
            </FormControl>
          </HStack>
        </GridItem>

        <FormControl mb={4}>
          <FormLabel htmlFor="address">Address</FormLabel>
          <Input
            type="text"
            id="address"
            name="address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
          />
        </FormControl>

        <Stack direction={["column", "row"]} justifyContent="space-around">
          <Box>
            <FormControl mb={4}>
              <FormLabel>Gender</FormLabel>
              <Menu id="gender">
                <MenuButton as={Button} rightIcon={<BsChevronDown />}>
                  {formik.values.sex
                    ? formik.values.sex.charAt(0).toUpperCase() +
                      formik.values.sex.slice(1)
                    : "Gender"}
                </MenuButton>
                <MenuList>
                  {["male", "female"].map((gender) => (
                    <MenuItem
                      key={gender}
                      onClick={() => formik.setFieldValue("sex", gender)}
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
        <AddCaseImagesUploader
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
        />
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
