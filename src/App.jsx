import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { PoeltlWrapper } from "./Components/PoeltlWrapper";
import { Header } from "./Components/Header";

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
