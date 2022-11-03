import axios from "axios";
const URL = `https://heroku-be-nc-news.herokuapp.com/api`;

const deleteCommentService = (commentId) => {
  return axios.delete(`${URL}/comments/${commentId}`);
};

export { deleteCommentService };
