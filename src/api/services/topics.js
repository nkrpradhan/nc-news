import axios from "axios";
const URL = `https://heroku-be-nc-news.herokuapp.com/api/`;

const getTopics = () => {
  return axios.get(`${URL}/topics`);
};

export { getTopics };
