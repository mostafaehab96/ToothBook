import Department from "./Department";

export default interface Case {
  _id: string;
  name: string;
  age: number;
  address: string | null;
  sex: string;
  diagnosis: string;
  status: string;
  phoneNumber: string | null;
  isEmergency: boolean;
  photos: Array<string>;
  medicalCompromised: string[];
  departments: Department[];
  createdAt: string;
  updatedAt: string;
}
