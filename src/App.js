import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Articles from "./components/Articles";
import Topic from "./components/Topic";
import ArticleDetails from "./components/ArticleDetails";
import { useState, useEffect } from "react";
import { getArticles } from "./api/services/articles";
import { ArticleProvider } from "./context/ArticleContext";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const setArticleContent = () => {
    getArticles().then((res) => {
      console.log("app", res);
      if (res.status === 200) {
        setArticles(res.data.articles);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    setArticleContent();
  }, []);

  return (
    <ArticleProvider value={{ articles, setArticleContent }}>
      <Home />
      <Routes>
        <Route path="/" element={<Articles loading={loading} />} />
        <Route
          path="/topics/:topicName"
          element={<Topic loading={loading} />}
        />
        <Route path="/article/:id" element={<ArticleDetails />} />
      </Routes>
    </ArticleProvider>
  );
}

export default App;
