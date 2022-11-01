import "../styles/Article.css";
import { BiCommentDetail } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { Link } from "react-router-dom";
export default function Article({ article }) {
  return (
    <>
      <li className="article-item">
        <Link to={`/article/${article.article_id}`} className="article-link">
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
        </Link>
      </li>
    </>
  );
}
