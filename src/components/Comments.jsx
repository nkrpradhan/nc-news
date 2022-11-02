import "../styles/Comments.css";
import { AiFillLike } from "react-icons/ai";

export default function Comments({ comments }) {
  return (
    <section>
      <h3>Comments</h3>
      <ul >
        {comments.map((comment) => {
          return (
            <li className="comment-container" key={comment.comment_id}>
              <h4>{comment.author}</h4>
              <div>{comment.body}</div>
              <div>
                <AiFillLike /> {comment.votes}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
