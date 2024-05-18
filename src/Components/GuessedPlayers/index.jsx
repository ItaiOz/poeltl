import React from "react";
import { SingleGuessedPlayer } from "../SingleGuessedPlayer";
import "./style.scss";
import { currPlayer } from "../utils";

export const GuessedPlayers = ({ playersList, isGameOver, guessCount }) => {
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
          {playersList.map((name) => (
            <SingleGuessedPlayer name={name} />
          ))}
          {guessCount === 9 && (
            <SingleGuessedPlayer
              name={{
                value: currPlayer[3],
                label: currPlayer[2] + " " + currPlayer[1],
              }}
              isGameOver={isGameOver}
            />
          )}
        </tbody>
      </table>
    </div>
  );
};
