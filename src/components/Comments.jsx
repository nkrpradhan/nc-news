import "../styles/Comments.css";
import { AiFillLike } from "react-icons/ai";
import { deleteCommentService } from "../api/services/comments";
import { useState, useContext } from "react";
import { ArticleContext } from "../context/ArticleContext";
import { UserContext } from "../context/UserContext";

export default function Comments(props) {
  const [comments, setComments] = useState(props.comments);
  const { setArticleContent } = useContext(ArticleContext);
  const { signedUser } = useContext(UserContext);
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
        alert("Comment has been deleted");
        setArticleContent();
      })
      .catch((err) => {
        setComments(props.comments);
        alert(err);
      });
  };

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
                  <button
                    disabled={comment.author === signedUser.user ? false : true}
                    className="delete-comment-btn"
                    onClick={() => deleteComment(comment.comment_id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
    </section>
  );
}
