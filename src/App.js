import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Articles from "./components/Articles";
import Topic from "./components/Topic";

function App() {
  return (
    <>
      <Home />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/topics/:topicName" element={<Topic />} />
      </Routes>
    </>
  );
}

export default App;
