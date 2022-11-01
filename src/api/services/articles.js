import axios from "axios";
const URL = `https://heroku-be-nc-news.herokuapp.com/api`;

const getArticles = () => {
  return axios.get(`${URL}/articles`);
};

const getArticleByID = (id) => {
  return axios.get(`${URL}/articles/${id}`);
};

const updateVoteService = (id, noOfVotes) => {
  return axios.patch(`${URL}/articles/${id}`, { inc_votes: noOfVotes });
};

export { getArticles, getArticleByID, updateVoteService };
