import "./App.css";
import { Main } from "./Components/Main";
import { Header } from "./Components/Header";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
