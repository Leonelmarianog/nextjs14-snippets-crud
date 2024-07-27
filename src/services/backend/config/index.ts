import axios from "axios";

const backendClient = axios.create({
  baseURL: process.env.BACKEND_URL,
});

export default backendClient;
