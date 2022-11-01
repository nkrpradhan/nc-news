import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleByID } from "../api/services/articles";
import { BiCommentDetail } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import "../styles/ArticleDetails.css";

export default function ArticleDetails() {
  const { id } = useParams();
  const [article, setArticle] = useState({});
  const [articleCreated, setArticleCreated] = useState("");

  const getDate = (createdAt) => {
    const dateObj = new Date(createdAt);
    setArticleCreated(
      `${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`
    );
  };
  useEffect(() => {
    getArticleByID(id).then((res) => {
      console.log("id", res);
      if (res.status === 200) {
        setArticle(res.data.article);
        getDate(res.data.article.created_at);
      }
    });
  }, []);

  return (
    <>
      <section className="section-container">
        <h2>{article?.title}</h2>
        <div className="section-date">{articleCreated}</div>
        <div>{article?.body}</div>
        <div className="comment-vote">
          <span>
            <BiCommentDetail /> {article.comment_count}
          </span>
          <span>
            <AiFillLike /> {article.votes}
          </span>
        </div>
        <div className="author">- {article.author}</div>
      </section>
    </>
  );
}
