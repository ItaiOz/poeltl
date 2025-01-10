import { useState } from "react";
import "./style.scss";
import { HeaderMenuModal } from "../Common/HeaderMenuModal";
import { HowToPlay } from "./HowToPlay";
import { Stats } from "./Stats";

export const Header = () => {
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isInstructionsModalOpen, setIsInstructionsModalOpen] = useState(false);

  return (
    <div className="header">
      <div className="nav">
        <span className="navbar-item" onClick={() => setIsStatsModalOpen(true)}>
          STATS
        </span>
        <span
          className="navbar-item"
          onClick={() => setIsInstructionsModalOpen(true)}
        >
          HOW TO PLAY
        </span>
      </div>
      <HeaderMenuModal
        showModal={isStatsModalOpen}
        onCloseModal={() => setIsStatsModalOpen(false)}
        modalTitle="GUESS DISTRIBUTION"
      >
        <Stats />
      </HeaderMenuModal>
      <HeaderMenuModal
        showModal={isInstructionsModalOpen}
        onCloseModal={() => setIsInstructionsModalOpen(false)}
        modalTitle="GUESS THE MYSTERY PLAYER!"
      >
        <HowToPlay />
      </HeaderMenuModal>
    </div>
  );
};
