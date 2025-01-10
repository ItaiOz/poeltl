import "./style.scss";

export const HowToPlay = () => {
  return (
    <ul>
      <li>You get eight guesses, try any current NBA player!</li>
      <li>
        <span className="highlight green">Green in any column</span> indicates a
        match!
      </li>
      <li>
        <span className="highlight yellow">Yellow in the team column</span>{" "}
        indicates the mystery player at one point played for this team, but does
        not currently.
      </li>
      <li>
        <span className="highlight yellow">Yellow in the position column</span>{" "}
        indicates a partial match to the mystery player's position.
      </li>
      <li>
        <span className="highlight yellow">Yellow in any other column</span>{" "}
        indicates this attribute is within 2 (inches, years, numbers) of the
        mystery player.
      </li>
      <li>
        If you get stuck, try enabling<strong> silhouette mode!</strong>
      </li>
      <li>A new mystery player every day!</li>
    </ul>
  );
};
