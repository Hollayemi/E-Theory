import Axios from "axios";

export const  apiClient = Axios.create({
  baseURL: 'https://e-grade.onrender.com',
});
