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

const getComments = (id) => {
  return axios.get(`${URL}/articles/${id}/comments`);
};

const postCommentService = (id, username, body) => {
  console.log("post comment value", id, username, body);
  return axios.post(`${URL}/articles/${id}/comments`, { username, body });
};

export {
  getArticles,
  getArticleByID,
  updateVoteService,
  getComments,
  postCommentService,
};
