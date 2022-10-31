import Article from "./Article";
import "../styles/Articles.css";

export default function Articles({ articles }) {
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
