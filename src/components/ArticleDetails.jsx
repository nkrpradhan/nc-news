import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getArticleByID, updateVoteService } from "../api/services/articles";
import { BiCommentDetail } from "react-icons/bi";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import "../styles/ArticleDetails.css";
import { ArticleContext } from "../context/ArticleContext";

export default function ArticleDetails() {
  const { setArticleContent } = useContext(ArticleContext);

  const { id } = useParams();
  const [article, setArticle] = useState({});
  const [articleCreated, setArticleCreated] = useState("");
  const [votes, setVotes] = useState(0);

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
        setVotes(res.data.article.votes);
        getDate(res.data.article.created_at);
      }
    });
  }, []);

  const updateVote = (updateType) => {
    let noOfVotes = 0;
    if (updateType === "increment") {
      noOfVotes = 1;
    } else if (updateType === "decrement") {
      noOfVotes = -1;
    }
    updateVoteService(id, noOfVotes).then((res) => {
      console.log("vote", res);
      setVotes(res.data.article.votes);
      setArticleContent();
    });
  };

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
            <button
              onClick={() => updateVote("increment")}
              className="vote-btn"
            >
              <AiFillLike />
            </button>
            <button
              onClick={() => updateVote("decrement")}
              className="vote-btn"
            >
              <AiFillDislike />
            </button>
            {votes}
          </span>
        </div>
        <div className="author">- {article.author}</div>
      </section>
    </>
  );
}
