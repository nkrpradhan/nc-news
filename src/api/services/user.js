import axios from "axios";
const URL = `https://heroku-be-nc-news.herokuapp.com/api`;

const getUsers = () => {
  return axios.get(`${URL}/users`);
};

export { getUsers };
