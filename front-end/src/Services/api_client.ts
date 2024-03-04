import axios from "axios";

export const backendUrl = import.meta.env.VITE_BASE_URL;

export default axios.create({
  baseURL: `${backendUrl}/api/`,
});
