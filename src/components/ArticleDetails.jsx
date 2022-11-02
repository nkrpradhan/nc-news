import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  getArticleByID,
  updateVoteService,
  getComments,
  postCommentService,
} from "../api/services/articles";
import { BiCommentDetail } from "react-icons/bi";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import "../styles/ArticleDetails.css";
import { ArticleContext } from "../context/ArticleContext";
import Comments from "./Comments";

export default function ArticleDetails() {
  const { setArticleContent } = useContext(ArticleContext);

  const { id } = useParams();
  const [article, setArticle] = useState({});
  const [articleCreated, setArticleCreated] = useState("");
  const [votes, setVotes] = useState(0);
  const [comments, setComments] = useState([]);
  const [postComment, setPostComment] = useState("");
  const [userName] = useState("grumpy19");

  const getDate = (createdAt) => {
    const dateObj = new Date(createdAt);
    setArticleCreated(
      `${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`
    );
  };

  const getArticleByIDFn = () => {
    getArticleByID(id).then((res) => {
      console.log("id", res);
      if (res.status === 200) {
        setArticle(res.data.article);
        setVotes(res.data.article.votes);
        getDate(res.data.article.created_at);
      }
    });
  };

  const getArticleCommentsFn = () => {
    getComments(id).then((res) => {
      console.log("comments", res.data);
      setComments(res.data.comments);
    });
  };

  useEffect(() => {
    getArticleByIDFn();
    getArticleCommentsFn();
  }, []);

  const updateVote = (updateType) => {
    let noOfVotes = 0;
    if (updateType === "increment") {
      noOfVotes = 1;
    } else if (updateType === "decrement") {
      noOfVotes = -1;
    }
    setVotes((prevVotes) => prevVotes + noOfVotes);
    updateVoteService(id, noOfVotes)
      .then((res) => {
        setArticleContent();
      })
      .catch((err) => {
        setVotes((prevVotes) => prevVotes - noOfVotes);
        alert("Something went wrong, please try again.");
      });
  };

  const postCommentHandler = (e) => {
    e.preventDefault();

    postCommentService(id, userName, postComment)
      .then((res) => {
        getArticleCommentsFn();
        getArticleByIDFn();
        setArticleContent();
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="parent-article-container">
      <div className="section-container">
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

        <form onSubmit={(e) => postCommentHandler(e)}>
          <input
            required
            className="post-comment"
            type="text"
            placeholder="add comments"
            value={postComment}
            onChange={(e) => setPostComment(e.target.value)}
          />
          <button className="post-comment-btn" type="submit">
            Post
          </button>
        </form>
      </div>
      <Comments comments={comments} className="test" />
    </div>
  );
}
