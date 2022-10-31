import "../styles/Article.css";
import { BiCommentDetail } from "react-icons/bi";

export default function Article({ article }) {
  const calculateTime = () => {
    const createdAt = new Date(article.created_at);
    console.log(Date.now(), createdAt);
    console.log(Date.now() - createdAt);
  };
  calculateTime();
  return (
    <>
      <li className="article-item">
        <h3>{article.title}</h3>
        <div>
          <BiCommentDetail /> {article.comment_count}
        </div>
        <div>- {article.author}</div>
      </li>
    </>
  );
}
