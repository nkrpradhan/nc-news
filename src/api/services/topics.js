import axios from "axios";
import URL from "./serverURL";

const getTopics = () => {
  return axios.get(`${URL}/topics`);
};

export { getTopics };
