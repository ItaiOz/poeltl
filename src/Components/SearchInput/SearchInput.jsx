import React from "react";
import { useState } from "react";
import "./style.scss";
import { getPlaceHolderTitle } from "./utils";
import Select from "react-select";

export const SearchInput = ({
  guessCount,
  handleGuess,
  revealPlayer,
  playersNames,
  guessedPlayersList,
}) => {
  const [filteredPlayers, setFilteredPlayers] = useState([]);

  console.log(guessedPlayersList);
  const placHolderTitle = getPlaceHolderTitle(revealPlayer, guessCount);

  const handleInputChange = (searchStr) => {
    if (searchStr.length === 0) {
      setFilteredPlayers([]);
      return;
    }
    const str = searchStr.toLowerCase();
    const foundNames = playersNames.filter((name) =>
      name.toLowerCase().includes(str)
    );
    const foundPlayers = foundNames.map((pl) => ({
      value: pl,
      label: pl,
      isDisabled: guessedPlayersList?.find((player) => player === pl),
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
