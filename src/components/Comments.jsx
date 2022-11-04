import "../styles/Comments.css";
import { AiFillLike } from "react-icons/ai";
import { deleteCommentService } from "../api/services/comments";
import { useState, useContext, useEffect } from "react";
import { ArticleContext } from "../context/ArticleContext";
import { UserContext } from "../context/UserContext";
import Toastmsg from "./Toastmsg";

export default function Comments(props) {
  const [comments, setComments] = useState(props.comments);
  const { setArticleContent } = useContext(ArticleContext);
  const { signedUser } = useContext(UserContext);
  const [toast, setToast] = useState(false);
  const [toastID, setToastID] = useState();

  const deleteComment = (commentId) => {
    if (signedUser.user === "") {
      alert("Please sign in to delete a comment");
      return;
    }

    setComments((prevComment) => {
      return prevComment.filter((comment) => {
        return comment.comment_id !== commentId;
      });
    });
    deleteCommentService(commentId)
      .then((res) => {
        setToastID(commentId);
        setToast(true);
        setArticleContent();
      })
      .catch((err) => {
        setComments(props.comments);
        alert(err);
      });
  };
  useEffect(() => {
    setComments(props.comments);
  }, [props.comments]);
  return (
    <section className="section-comment-container">
      <h3>Comments</h3>
      <ul className="card-comment-container">
        {comments.length > 0 &&
          comments.map((comment) => {
            return (
              <li className="comment-container" key={comment.comment_id}>
                <h4>{comment.author}</h4>
                <div>{comment.body}</div>
                <div className="comment-btn-container">
                  <span>
                    <AiFillLike /> {comment.votes}
                  </span>
                  {comment.author === signedUser.user && (
                    <button
                      className="delete-comment-btn"
                      onClick={() => deleteComment(comment.comment_id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </li>
            );
          })}
      </ul>
      {toast && (
        <Toastmsg
          toastMessage="Your comment has been deleted."
          toastID={toastID}
        />
      )}
    </section>
  );
}
