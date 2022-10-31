import Home from "./components/Home";
import Articles from "./components/Articles";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Home />
      <Routes>
        <Route path="/" element={<Articles />} />
      </Routes>
    </>
  );
}

export default App;
