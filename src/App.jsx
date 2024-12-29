import "./App.css";
import { Main } from "./Components/Main";
import { Header } from "./Components/Header";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  console.log(import.meta.env.VITE_FIREBASE_API_KEY);
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
