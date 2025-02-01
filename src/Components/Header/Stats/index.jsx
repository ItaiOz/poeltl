import "./style.scss";

export const Stats = () => {
  const tempGuessDist = localStorage.getItem("guessDist");
  const parsedObject = JSON.parse(tempGuessDist);

  console.log(parsedObject);

  const maxCount = Math.max(...Object.values(parsedObject));

  const sortedData = Object.entries(parsedObject).sort(([keyA], [keyB]) => {
    if (keyA === "0") return 1; // Move "0" to the end
    if (keyB === "0") return -1;
    return keyA - keyB;
  });

  return (
    <div className="horizontal-graph">
      {sortedData.map(([guess, count]) => {
        const barWidth = (count / maxCount) * 85;
        return (
          <div className="graph-row" key={guess}>
            <span
              className={`guess-label ${guess === "0" ? "zero-label" : ""}`}
            >
              {guess}
            </span>
            <div
              className={`graph-bar ${guess === "0" ? "zero" : ""}`}
              style={{ width: `${barWidth}%` }}
            ></div>
            <span
              className={`guess-count ${guess === "0" ? "zero-label" : ""}`}
            >
              {count}
            </span>
          </div>
        );
      })}
    </div>
  );
};
