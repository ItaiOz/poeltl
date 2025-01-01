import "./App.css";
import { Header } from "./Components/Header";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { PoeltlWrapper } from "./Components/PoeltlWrapper";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<PoeltlWrapper />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
