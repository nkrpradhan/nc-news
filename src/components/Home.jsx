import { useEffect, useState, useContext } from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import { getTopics } from "../api/services/topics";
import { ArticleContext } from "../context/ArticleContext";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function Home() {
  const [topics, setTopics] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrderDesc, setSortOrderDesc] = useState(true);
  const { setArticleContent } = useContext(ArticleContext);

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
      <ul className="nav-bar">
        <li>
          <h1 className="nav-header">
            <Link to="/" className="nav-link">
              NC News
            </Link>
          </h1>
        </li>
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
      </ul>

      <div className="sort-container">
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
      </div>
    </>
  );
}
