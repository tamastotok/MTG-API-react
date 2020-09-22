import React, { useState, useContext } from "react";
import {
  CardsContext,
  TypeFilterContext,
  TestFilterContext,
  ColorFilterContext,
  RarityFilterContext,
} from "./DataContext";
import ColorFilter from "./ColorFilter";
import NewFetch from "./NewFetch";

const Rarity = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [cards, setCards] = useContext(CardsContext);
  const [typeFilter, setTypeFilter] = useContext(TypeFilterContext);
  const [testFilter, setTestFilter] = useContext(TestFilterContext);

  const [rarityFilter, setRarityFilter] = useContext(RarityFilterContext);

  const dropDown = (e) => {
    e.preventDefault();
    setShowMenu(!showMenu);
  };

  const everyRarity = cards.map((element) => element.rarity);
  let rarities = [...new Set(Object.values(everyRarity))];

  const rarityChange = (e) => {
    const rarityArray = cards.filter((item) => item.rarity === e);
    setRarityFilter(rarityArray);
  };

  const showAllRarity = () => {};

  return (
    <div className="dropdown">
      <button onClick={dropDown}>Rarity</button>
      {showMenu ? (
        <div className="menu">
          <button onClick={showAllRarity}>All types</button>
          {rarities.map((element, index) => {
            return (
              <button
                key={index}
                value={element}
                index={index}
                onClick={(e) => rarityChange(e.target.value)}
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
export default Rarity;
