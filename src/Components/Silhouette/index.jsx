import "./style.scss";

export const Silhouette = ({ showModal }) => {
  return (
    <div>
      <button className="silhouette-btn" onClick={showModal}>
        SHOW SILHOUETTE
      </button>
    </div>
  );
};
