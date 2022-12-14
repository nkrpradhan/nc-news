import { useEffect, useState, useContext } from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import { getTopics } from "../api/services/topics";
import { ArticleContext } from "../context/ArticleContext";
import { UserContext } from "../context/UserContext";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";
export default function Home() {
  const [topics, setTopics] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrderDesc, setSortOrderDesc] = useState(true);
  const { setArticleContent } = useContext(ArticleContext);
  const { signedUser } = useContext(UserContext);
  const { articles } = useContext(ArticleContext);
  useEffect(() => {
    getTopics().then((res) => {
      console.log("topics", res);
      if (res.status === 200) {
        setTopics(res.data.topics);
      }
    });
  }, []);

  const filterArticles = (e) => {
    console.log(e.target.value);
    setSortBy(e.target.value);
  };

  const sortArticles = () => {
    setArticleContent(sortBy, !sortOrderDesc ? "asc" : "desc");
    setSortOrderDesc(!sortOrderDesc);
  };

  return (
    <>
      <div className="breaking-news-container">
        <h3>Breaking News</h3>
        <div className="wrapper">
          {articles.length > 0 && (
            <ul className="target">
              {articles.map((article) => {
                return <li key={article.article_id}>{article.title}</li>;
              })}
            </ul>
          )}
        </div>
      </div>

      <div className="nav-bar">
        <h1 className="nav-header">
          <Link to="/" className="nav-link">
            Mirror News
          </Link>
        </h1>
        <ul className="nav-links">
          {topics.length > 0 &&
            topics.map((topic) => {
              return (
                <li key={topic.slug}>
                  <Link to={`/topics/${topic.slug}`} className="nav-link">
                    <h3 className="nav-topic">{topic.slug}</h3>
                  </Link>
                </li>
              );
            })}

          <li className="sort-container">
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => {
                filterArticles(e);
              }}
            >
              <option value="created_at">Date</option>
              <option value="votes">Votes</option>
              <option value="comment_count">Comment</option>
            </select>

            <button className="sort-btn" onClick={() => sortArticles()}>
              {sortOrderDesc ? <FaArrowDown /> : <FaArrowUp />}
            </button>
          </li>
          <li>
            <div className="signed-user">{signedUser.user}</div>
            <Link to="/user" className="user-btn">
              <div className="user-icon">
                <BiUserCircle color="white" size="40px" />
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
