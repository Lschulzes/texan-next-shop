import axios from "axios";

export const texanAPI = axios.create({
  baseURL: "/api",
});

export default texanAPI;
