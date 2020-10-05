import React, { useState } from "react";

const RarityFilter = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedRarity, setSelectedRarity] = useState("");

  const dropDown = (e) => {
    e.preventDefault();
    setShowMenu(!showMenu);
  };

  const everyRarity = props.cards.map((element) => element.rarity);
  let rarities = [...new Set(Object.values(everyRarity))];

  const showAllRarity = () => {};

  return (
    <div className="dropdown">
      <button onClick={dropDown}>
        {selectedRarity.length > 0 ? selectedRarity : "Rarity"}
      </button>
      {showMenu ? (
        <div className="menu">
          <button onClick={showAllRarity}>Show all</button>
          {rarities.map((element, index) => {
            return (
              <button
                key={index}
                value={element}
                index={index}
                onClick={(e) => {
                  props.allFilter(e.target.value);
                  setSelectedRarity(e.target.value);
                }}
              >
                {element}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
export default RarityFilter;
