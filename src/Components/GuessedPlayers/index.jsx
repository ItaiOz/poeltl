import { SingleGuessedPlayer } from "../SingleGuessedPlayer";
import "./style.scss";

export const GuessedPlayers = ({
  playersList,
  guessedPlayersList,
  todaysPlayer,
  isGameOver,
  guessCount,
}) => {
  return (
    <div className="guesses-players-table-container">
      <table className="guess-table">
        <thead>
          <tr className="guess-title">
            <th>TEAM</th>
            <th>CONF</th>
            <th>DIV</th>
            <th>POS</th>
            <th>HT</th>
            <th>DRAFT</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {guessedPlayersList.map((name) => (
            <SingleGuessedPlayer
              key={name}
              playersList={playersList}
              todaysPlayer={todaysPlayer}
              guessedName={name}
            />
          ))}
          {guessCount === 9 && (
            <SingleGuessedPlayer
              playersList={playersList}
              guessedName={todaysPlayer.name}
              isGameOver={isGameOver}
              todaysPlayer={todaysPlayer}
            />
          )}
        </tbody>
      </table>
    </div>
  );
};
