import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { selectRarity } from "../actions/rarity"

const RarityFilter = () => {
  const selectedRarity = useSelector(state => state.rarity)
  const dispatch = useDispatch();

  const rarities = ["Any rarity", "Land", "Common", "Uncommon", "Rare", "Mythic"];
  const [showMenu, setShowMenu] = useState(false);


  const dropDown = (e) => {
    e.preventDefault();
    setShowMenu(!showMenu);
  };


  const handleClick = (e) => {
    dispatch(selectRarity(e.target.value))
    setShowMenu(!showMenu);
  }


  return (
    <div className="dropdown">
      <button className="button-active" onClick={dropDown}>
        {selectedRarity ? selectedRarity : "Rarity"}
      </button>
      {showMenu ? (
        <div className="menu">
          {rarities.map((element, index) => {
            return (
              <button
                key={index}
                value={element}
                onClick={handleClick}
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