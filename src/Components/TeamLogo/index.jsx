import "./style.scss";

export const TeamLogo = ({ teamCode, teamName }) => {
  const imgSrc = `https://cdn.nba.com/logos/nba/${teamCode}/global/L/logo.svg`;

  return (
    <div className="team-container">
      <img alt="team" src={imgSrc} />
      <p>{teamName}</p>
    </div>
  );
};
