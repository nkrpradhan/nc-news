import Article from "./Article";
import "../styles/Articles.css";

export default function Articles({ articles, loading }) {
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
