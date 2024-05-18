import React from "react";
import { useState } from "react";
import { tempNames } from "../../assets/mock-data";
import "./style.scss";
import { getPlaceHolderTitle } from "./utils";
import Select from "react-select";

export const SearchInput = ({ guessCount, handleGuess, revealPlayer }) => {
  const [filteredPlayers, setFilteredPlayers] = useState([]);

  const placHolderTitle = getPlaceHolderTitle(revealPlayer, guessCount);

  const handleInputChange = (searchStr) => {
    if (searchStr.length === 0) {
      setFilteredPlayers([]);
      return;
    }
    const str = searchStr.toLowerCase();
    const temp = tempNames.filter((name) =>
      name.label.toLowerCase().includes(str)
    );
    const foundPlayers = temp.map((pl) => ({
      value: pl.value,
      label: pl.label,
    }));

    setFilteredPlayers(foundPlayers);
  };

  return (
    <div className="search-container">
      <Select
        onChange={(playerObj) => handleGuess(playerObj)}
        options={filteredPlayers}
        menuIsOpen={filteredPlayers.length > 0}
        onInputChange={(searchStr) => handleInputChange(searchStr)}
        placeholder={placHolderTitle}
        value={""}
        isSearchable
        className="search-window"
        isDisabled={revealPlayer}
      />
    </div>
  );
};
