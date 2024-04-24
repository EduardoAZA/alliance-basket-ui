import axios from "axios";

const api = axios.create({
  baseURL : "http://host.docker.internal:8080",
});

export default api;
