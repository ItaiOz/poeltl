import "./App.css";
import { Header } from "./Components/Header";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { PoeltlWrapper } from "./Components/PoeltlWrapper";

function App() {
  console.log(import.meta.env.VITE_FIREBASE_API_KEY);
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
