import axios from "axios";
import URL from "./serverURL";

const getArticles = (sortBy, sortOrderDesc) => {
  let getArticleUrl = `${URL}/articles`;
  if (sortBy !== undefined && sortBy !== "") {
    getArticleUrl += `?sort_by=${sortBy}`;
    if (sortOrderDesc !== undefined && sortOrderDesc !== "") {
      getArticleUrl += `&order=${sortOrderDesc}`;
    }
  } else if (sortOrderDesc !== undefined && sortOrderDesc !== "") {
    getArticleUrl += `?order=${sortOrderDesc}`;
  }
  return axios.get(getArticleUrl);
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
