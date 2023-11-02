import axios from "axios";

const API = "http://localhost:8080/api";
export const registerRequest = (user) =>
  axios.post(`${API}/session/signup`, user);
