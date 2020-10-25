import React, { useState } from "react";

const RarityFilter = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedRarity, setSelectedRarity] = useState("");

  const dropDown = (e) => {
    e.preventDefault();
    setShowMenu(!showMenu);
  };
  return (
    <div className="dropdown">
      <button onClick={dropDown}>
        {selectedRarity.length > 0 ? selectedRarity : "Rarity"}
      </button>
      {showMenu ? (
        <div className="menu">
          {props.rarities.map((element, index) => {
            return (
              <button
                key={index}
                value={element}
                index={index}
                onClick={(e) => {
                  props.allFilter(e.target.value);
                  setSelectedRarity(e.target.value);
                  setShowMenu(!showMenu);
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
