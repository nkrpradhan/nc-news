import { useContext } from "react";
import Article from "./Article";
import "../styles/Articles.css";
import { ArticleContext } from "../context/ArticleContext";
import BeatLoader from "react-spinners/BeatLoader";

export default function Articles({ loading }) {
  const { articles } = useContext(ArticleContext);
  if (loading) {
    return <BeatLoader color="#0000FF" margin={200} size={30} />;
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
