import React, { useState, useContext } from "react";
import {
  CardsContext,
  TypeFilterContext,
  TestFilterContext,
  ColorFilterContext,
  ColorsContext,
} from "./DataContext";
import ColorFilter from "./ColorFilter";
import NewFetch from "./NewFetch";

const Rarity = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [cards, setCards] = useContext(CardsContext);
  const [typeFilter, setTypeFilter] = useContext(TypeFilterContext);
  const [testFilter, setTestFilter] = useContext(TestFilterContext);
  const [colorFilter, setColorFilter] = useContext(ColorFilterContext);
  const [colors, setColors] = useContext(ColorsContext);

  const dropDown = (e) => {
    e.preventDefault();
    setShowMenu(!showMenu);
  };

  const everyRarity = cards.map((element) => element.rarity);
  let rarities = [...new Set(Object.values(everyRarity))];

  const rarityChange = (e, index) => {
    const newFilterR = [e];
    setTypeFilter(newFilterR);
    console.log(newFilterR);

    const arrayType = [];
    cards.map((item) => {
      return item.rarity === e ? arrayType.push(item) : null;
    });

    colorFilter.length > 0
      ? setTestFilter(colors.filter((r) => r.rarity === e))
      : setTestFilter(cards.filter((r) => r.rarity === e));
  };

  const showAllRarity = () => {
    setTestFilter(colors);
  };

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
                onClick={(e) => rarityChange(e.target.value, index)}
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
