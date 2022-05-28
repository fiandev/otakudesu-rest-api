import axios from "axios";

export const baseURL = "https://otakudesu.tube";

const api = axios.create({
  baseURL,
});
export default api;