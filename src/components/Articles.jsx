import { useEffect, useState } from "react";
import { getArticles } from "../api/services/articles";
import Article from "./Article";
import "../styles/Articles.css";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    getArticles().then((res) => {
      console.log(res);
      if (res.status === 200) {
        setArticles(res.data.articles);
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <>
        <h2 className="loading">Loading...</h2>
      </>
    );
  }
  return (
    <>
      {articles.length > 0 && (
        <ul className="articles-container">
          {articles.map((article) => {
            return <Article key={article.article_id} article={article} />;
          })}
        </ul>
      )}
    </>
  );
}
