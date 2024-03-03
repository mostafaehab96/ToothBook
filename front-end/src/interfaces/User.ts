interface User {
  id: string;
  email: string;
  photo: string;
  name: string;
  token: string;
  university: string;
  role: string;

  casesPerSemester: number;
  contactedPatients: number;
  activePatients: Array<string>;
  treatedPatients: Array<string>;
}
export default User;
