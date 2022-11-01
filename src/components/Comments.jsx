import "../styles/Comments.css";
export default function Comments({ comments }) {
  return (

      <section className="comments-container">
        <h3>Comments</h3>
        <ul>
          {comments.map((comment) => {
            return (
              <li>
                <h4>{comment.author}</h4>
                <div>{comment.body}</div>
              </li>
            );
          })}
        </ul>
      </section>
    
  );
}
