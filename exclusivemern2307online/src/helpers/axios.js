import axios from "axios";
const axiosinsance = axios.create({
  baseURL: "http://localhost:4000/api/v1",
});

export { axiosinsance };
