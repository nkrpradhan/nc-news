import axios from "axios";
import URL from "./serverURL";

const getUsers = () => {
  return axios.get(`${URL}/users`);
};

export { getUsers };
