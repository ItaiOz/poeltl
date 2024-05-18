export const StatCell = ({ statistic, className, arrow }) => {
  return (
    <td className={className}>
      <div>{statistic ?? "-"}</div>
      {arrow !== 0 && <div>{arrow > 0 ? "↓" : arrow < 0 ? "↑" : ""}</div>}
    </td>
  );
};
