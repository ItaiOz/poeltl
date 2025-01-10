import "./style.scss";

export const HeaderMenuModal = ({
  showModal,
  onCloseModal,
  children,
  modalTitle,
}) => {
  return (
    <>
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="modal-header">
              <h4>{modalTitle}</h4>
              <button className="close-button" onClick={onCloseModal}>
                X
              </button>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};
