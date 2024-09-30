import Axios from "axios";
const server = "http://localhost:3020"
export const  apiClient = Axios.create({
  baseURL:  server || 'https://e-grade.onrender.com',
});
