import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Articles from "./components/Articles";
import Topic from "./components/Topic";
import User from "./components/User";
import ArticleDetails from "./components/ArticleDetails";
import { useState, useEffect } from "react";
import { getArticles } from "./api/services/articles";
import { ArticleProvider } from "./context/ArticleContext";
import { UserProvider } from "./context/UserContext";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [signedUser, setSignedUser] = useState({});
  const setArticleContent = (sortBy, sortOrderDesc) => {
    console.log(sortBy, sortOrderDesc);
    getArticles(sortBy, sortOrderDesc).then((res) => {
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
    <UserProvider value={{ signedUser, setSignedUser }}>
      <ArticleProvider value={{ articles, setArticleContent }}>
        <Home />
        <Routes>
          <Route path="/" element={<Articles loading={loading} />} />
          <Route path="/user" element={<User loading={loading} />} />
          <Route
            path="/topics/:topicName"
            element={<Topic loading={loading} />}
          />
          <Route path="/article/:id" element={<ArticleDetails />} />
        </Routes>
      </ArticleProvider>
    </UserProvider>
  );
}

export default App;
