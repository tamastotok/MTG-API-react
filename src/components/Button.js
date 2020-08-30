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

const Button = (props) => {
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

  const everyType = cards.map((element) => element.types[0]);
  let types = [...new Set(Object.values(everyType))];

  const typeChange = (e, index) => {
    const newFilterT = [e];
    setTypeFilter(newFilterT);
    console.log(newFilterT);

    const arrayType = [];
    cards.map((item) => {
      return item.types[0] === e ? arrayType.push(item) : null;
    });

    colorFilter.length > 0
      ? setTestFilter(colors.filter((r) => r.types[0] === e))
      : setTestFilter(cards.filter((r) => r.types[0] === e));
  };

  return (
    <div>
      <button onClick={dropDown}>Types</button>
      {showMenu ? (
        <div className="menu">
          <button onClick={props.allType}>All types</button>
          {types.map((element, index) => {
            return (
              <button
                key={index}
                value={element}
                index={index}
                onClick={(e) => typeChange(e.target.value, index)}
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
