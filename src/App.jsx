import "./App.css";
import { GuessArea } from "./Components/GuessArea";
import { Header } from "./Components/Header";

function App() {
  return (
    <>
      <Header />
      <div className="main-container">
        <div className="game-title">
          <h1 className="h1-game-title">POELTL</h1>
          <h4 className="h4-game-title">NBA PLAYER GUESSING GAME</h4>
        </div>
        <GuessArea />
      </div>
    </>
  );
}

export default App;
