import { useContext } from "react";
import Article from "./Article";
import "../styles/Articles.css";
import { ArticleContext } from "../context/ArticleContext";

export default function Articles({ loading }) {
  const { articles } = useContext(ArticleContext);
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
