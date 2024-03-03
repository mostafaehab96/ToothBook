import axios from "axios";

export const backendUrl =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

export default axios.create({
  baseURL: `${backendUrl}/api/`,
});
