import { useEffect, useState, createContext } from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import { getTopics } from "../api/services/topics";
import { ArticleContext } from "../context/ArticleContext";

export default function Home() {
  
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    getTopics().then((res) => {
      console.log("topics", res);
      if (res.status === 200) {
        setTopics(res.data.topics);
      }
    });
  }, []);
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
    </>
  );
}
