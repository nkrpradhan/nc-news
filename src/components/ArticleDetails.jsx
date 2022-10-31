import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleByID } from "../api/services/articles";
import { BiCommentDetail } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";

export default function ArticleDetails() {
  const { id } = useParams();
  const [article, setArticle] = useState({});
  useEffect(() => {
    getArticleByID(id).then((res) => {
      console.log("id", res);
      if (res.status === 200) {
        setArticle(res.data.article);
      }
    });
  }, []);
  return (
    <>
      <section>
        <h2>{article?.title}</h2>
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
