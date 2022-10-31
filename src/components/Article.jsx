import "../styles/Article.css";
import { BiCommentDetail } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
export default function Article({ article }) {
  // const calculateTime = () => {
  //   const createdAt = new Date(article.created_at);
  //   console.log(Date.now(), createdAt);
  //   console.log(
  //     Math.abs(new Date().getTime() - createdAt.getTime()) / (3600000 * 24)
  //   );
  // };
  // calculateTime();
  return (
    <>
      <li className="article-item">
        <h3>{article.title}</h3>
        <div className="comment-vote">
          <span>
            <BiCommentDetail /> {article.comment_count}
          </span>
          <span>
            <AiFillLike /> {article.votes}
          </span>
        </div>
        <div className="author">- {article.author}</div>
      </li>
    </>
  );
}
