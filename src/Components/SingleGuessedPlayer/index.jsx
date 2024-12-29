import "../GuessedPlayers/style.scss";
import { TeamLogo } from "../TeamLogo";
import { conferenceMap, divisionMap } from "../utils";
import { StatCell } from "../Common/StatCell";
import "./style.scss";
import {
  getHeightClassName,
  getFullHeight,
  getNumberClassName,
  getDraftClassName,
  getPositionClassName,
  GREEN,
  RED,
} from "./utils";

export const SingleGuessedPlayer = ({
  playersList,
  todaysPlayer,
  guessedName,
  isGameOver,
}) => {
  if (!playersList) return;
  const result = playersList.find((player) => player.name === guessedName);

  const teamClassName = todaysPlayer.team === result.team ? GREEN : "";

  const divisionClassName =
    divisionMap[todaysPlayer.teamId] === divisionMap[result.teamId]
      ? GREEN
      : "";

  const confClassName =
    conferenceMap[todaysPlayer.teamId] === conferenceMap[result.teamId]
      ? GREEN
      : "";

  const heightClassName = getHeightClassName(
    todaysPlayer.height,
    result.height
  );

  const heightBalance =
    getFullHeight(result.height) - getFullHeight(todaysPlayer.height);

  const draftClassName = getDraftClassName(
    todaysPlayer.draftYear,
    result.draftYear
  );

  const numberClassName = getNumberClassName(
    todaysPlayer.jersey,
    result.jersey
  );
  const positionClassName = getPositionClassName(
    todaysPlayer.position,
    result.position
  );

  const draftBalance =
    todaysPlayer.draftYear === null || result.draftYear === null
      ? undefined
      : -(todaysPlayer.draftYear - result.draftYear);

  const numberBalance = -(+todaysPlayer.jersey - +result.jersey);

  return (
    <>
      <tr>
        <td
          colSpan="7"
          className={`player-cell ${isGameOver ? "todays-player" : ""}`}
        >
          {guessedName}
        </td>
      </tr>
      <tr className="guessing-row">
        <td className={isGameOver ? RED : `team-cell ${teamClassName}`}>
          <TeamLogo teamCode={result.teamId} teamName={result.abbreviation} />
        </td>
        <td className={isGameOver ? RED : divisionClassName}>
          {divisionMap[result.teamId]}
        </td>
        <td className={isGameOver ? RED : confClassName}>
          {conferenceMap[result?.teamId]}
        </td>
        <StatCell
          statistic={result?.position}
          className={isGameOver ? RED : positionClassName}
        />
        <StatCell
          statistic={result?.height}
          className={isGameOver ? RED : heightClassName}
          arrow={heightBalance}
        />
        <StatCell
          statistic={result.draftYear}
          className={isGameOver ? RED : draftClassName}
          arrow={draftBalance}
        />
        <StatCell
          statistic={result.jersey}
          className={isGameOver ? RED : numberClassName}
          arrow={numberBalance}
        />
      </tr>
    </>
  );
};
