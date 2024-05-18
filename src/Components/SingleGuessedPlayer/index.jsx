import { activePlayers, names } from "../../assets/mock-data";
import "../GuessedPlayers/style.scss";
import { TeamLogo } from "../TeamLogo";
import { conferenceMap, divisionMap, currPlayer } from "../utils";
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

const TEAM_NICK = 9;
const TEAM_CODE = 4;
const NUMBER = 10;
const POSITION = 11;
const HEIGHT = 12;
const DRAFT = 16;

export const SingleGuessedPlayer = ({ name, isGameOver }) => {
  const result = activePlayers.find((subArray) => subArray[3] === name.value);

  const teamClassName =
    currPlayer[TEAM_NICK] === result[TEAM_NICK] ? GREEN : "";

  const divisionClassName =
    divisionMap[currPlayer[TEAM_CODE]] === divisionMap[result[TEAM_CODE]]
      ? GREEN
      : "";

  const confClassName =
    conferenceMap[currPlayer[TEAM_CODE]] === conferenceMap[result[TEAM_CODE]]
      ? GREEN
      : "";

  const heightClassName = getHeightClassName(
    currPlayer[HEIGHT],
    result[HEIGHT]
  );

  const heightBalance =
    getFullHeight(result[HEIGHT]) - getFullHeight(currPlayer[HEIGHT]);

  const draftClassName = getDraftClassName(currPlayer[DRAFT], result[DRAFT]);

  const numberClassName = getNumberClassName(
    currPlayer[NUMBER],
    result[NUMBER]
  );
  const positionClassName = getPositionClassName(
    currPlayer[POSITION],
    result[POSITION]
  );

  const draftBalance =
    currPlayer[DRAFT] === null || result[DRAFT] === null
      ? undefined
      : -(currPlayer[DRAFT] - result[DRAFT]);

  const numberBalance = -(currPlayer[NUMBER] - result[NUMBER]);

  return (
    <>
      <tr>
        <td
          colSpan="7"
          className={`player-cell ${isGameOver ? "todays-player" : ""}`}
        >
          {name.label}
        </td>
      </tr>
      <tr className="guessing-row">
        <td className={isGameOver ? RED : `team-cell ${teamClassName}`}>
          <TeamLogo teamCode={result[TEAM_CODE]} teamName={result[TEAM_NICK]} />
        </td>
        <td className={isGameOver ? RED : divisionClassName}>
          {divisionMap[result[TEAM_CODE]]}
        </td>
        <td className={isGameOver ? RED : confClassName}>
          {conferenceMap[result?.[TEAM_CODE]]}
        </td>
        <StatCell
          statistic={result?.[POSITION]}
          className={isGameOver ? RED : positionClassName}
        />
        <StatCell
          statistic={result?.[HEIGHT]}
          className={isGameOver ? RED : heightClassName}
          arrow={heightBalance}
        />
        <StatCell
          statistic={result[DRAFT]}
          className={isGameOver ? RED : draftClassName}
          arrow={draftBalance}
        />
        <StatCell
          statistic={result[NUMBER]}
          className={isGameOver ? RED : numberClassName}
          arrow={numberBalance}
        />
      </tr>
    </>
  );
};
