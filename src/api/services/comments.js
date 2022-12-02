import axios from "axios";
import URL from "./serverURL";

const deleteCommentService = (commentId) => {
  return axios.delete(`${URL}/comments/${commentId}`);
};

export { deleteCommentService };
