import Department from "./Department";

export default interface Case {
  name: string;
  age: number;
  id: number;
  description: string;
  gender: string;
  address: string | null;
  phone: string | null;
  images: Array<string>;
  department: Department;
  isEmergency: boolean;
  isMedicalCompromised: boolean;
}