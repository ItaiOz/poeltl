import "./style.scss";
import { currPlayer } from "../../utils";

export const Modal = ({
  showModal,
  onCloseModal,
  isHidden,
  guessCount,
  isGameOver,
  revealPlayer,
}) => {
  const currPlayerName =
    currPlayer[2].toUpperCase() + " " + currPlayer[1].toUpperCase();

  const modalInnerText = () => {
    if (isHidden)
      return (
        <>
          <span className="top-text">Who is this</span>
          <span className="bottom-text">MYSTERY PLAYER?</span>
        </>
      );

    if (!isHidden && revealPlayer)
      return (
        <>
          {isGameOver ? (
            <>
              <span className="top-text">Sorry, the correct answer is</span>
              <span className="bottom-text">{currPlayerName}</span>
              <span className="top-text">You can try again tomorrow</span>
            </>
          ) : (
            <>
              <span className="top-text">Great job!</span>
              <span className="bottom-text">{currPlayerName}</span>
              <span className="top-text">{`You solved it in ${guessCount} ${
                guessCount > 1 ? "guesses" : "guess"
              }`}</span>
            </>
          )}
        </>
      );

    if (!isHidden)
      return (
        <>
          <span className="top-text">Great job!</span>
          <span className="bottom-text">Player Name</span>
          <span className="top-text">{`You solved it in ${guessCount} ${
            guessCount > 1 ? "guesses" : "guess"
          }`}</span>
        </>
      );
  };

  return (
    <>
      {showModal && (
        <div className="backdrop">
          <div className={`modal ${!isHidden && "expanded"}`}>
            <span className="close" onClick={onCloseModal}>
              X
            </span>
            <div className="img-container">
              <img
                className={`player-image ${isHidden ? "hidden" : ""}`}
                src={`https://cdn.nba.com/headshots/nba/latest/260x190/${currPlayer[0]}.png`}
                alt="player"
              />
              {isHidden && <div className="question-mark">?</div>}
            </div>
            <div className="mystery-player-text">
              <div className="text-block">{modalInnerText()}</div>
            </div>
            {!isHidden && (
              <div className="new-player-countdown">
                <p>New mystery player in</p>
                <p>12:32:41</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
