import React, { useState, useContext } from "react";
import {
  CardsContext,
  TypeFilterContext,
  TestFilterContext,
  ColorFilterContext,
  ColorsContext,
  RarityFilterContext,
} from "./DataContext";
import ColorFilter from "./ColorFilter";
import NewFetch from "./NewFetch";

const Button = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [cards, setCards] = useContext(CardsContext);
  const [typeFilter, setTypeFilter] = useContext(TypeFilterContext);
  const [rarityFilter, setRarityFilter] = useContext(RarityFilterContext);
  const [testFilter, setTestFilter] = useContext(TestFilterContext);

  const dropDown = (e) => {
    e.preventDefault();
    setShowMenu(!showMenu);
  };

  const everyType = cards.map((element) => element.types[0]);
  let types = [...new Set(Object.values(everyType))];

  const typeChange = (e) => {
    const typeArray = cards.filter((item) => item.types[0] === e);
    setTypeFilter(typeArray);
  };

  const showAllType = () => {};

  return (
    <div className="dropdown">
      <button onClick={dropDown}>Type</button>
      {showMenu ? (
        <div className="menu">
          <button onClick={showAllType}>All types</button>
          {types.map((element, index) => {
            return (
              <button
                key={index}
                value={element}
                index={index}
                onClick={(e) => typeChange(e.target.value)}
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
export default Button;
