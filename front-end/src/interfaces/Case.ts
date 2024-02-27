import Department from "./Department";

export default interface Case {
  _id: string;
  name: string;
  age: number;
  sex: string;
  address: string | null;
  diagnosis: string;
  status: string;
  phoneNumber: string | null;
  isEmergency: boolean;
  photos: Array<string>;
  MedicalCompromised: string[];
  department: Department;
  createdAt: string;
  updatedAt: string;
}
