import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "../api/services/articles";
import Article from "./Article";
import "../styles/Topic.css";
import { MdWorkspacesFilled } from "react-icons/md";

export default function Topic({ articles, loading }) {
  let { topicName } = useParams();

  if (loading) {
    return (
      <>
        <h2 className="loading">Loading...</h2>
      </>
    );
  }
  return (
    <>
      <h1 className="topic-header">
        <MdWorkspacesFilled /> {topicName}
      </h1>
      {articles.length > 0 && (
        <ul className="articles-container">
          {articles.map((article) => {
            return (
              article.topic === topicName && (
                <Article key={article.article_id} article={article} />
              )
            );
          })}
        </ul>
      )}
    </>
  );
}
