import React, { useContext } from "react";
import {
  CardsContext,
  TestFilterContext,
  ColorFilterContext,
  TypeFilterContext,
  ColorsContext,
} from "./DataContext";

const ColorFilter = (props) => {
  const [cards, setCards] = useContext(CardsContext);
  const [testFilter, setTestFilter] = useContext(TestFilterContext);
  const [colorFilter, setColorFilter] = useContext(ColorFilterContext);
  const [typeFilter, setTypeFilter] = useContext(TypeFilterContext);
  const [colors, setColors] = useContext(ColorsContext);

  const everyColor = cards.map((element) => element.colors[0]);

  // Remove duplicates and undefined
  let colorsArray = [...new Set(Object.values(everyColor))]
    .filter((element) => {
      return element !== undefined;
    })
    .sort();

  const colorChange = (value) => {
    // Put the colors into an array
    const currentIndex = colorFilter.indexOf(value);
    const newFilterC = [...colorFilter];
    if (currentIndex === -1) {
      newFilterC.push(value);
    } else {
      newFilterC.splice(currentIndex, 1);
    }
    setColorFilter(newFilterC);

    // Get all the cards based on the colors what's in the array
    const arrayColor = [];
    for (let i = 0; i < newFilterC.length; i++) {
      cards.map((item) => {
        return item.colors[0] === newFilterC[i]
          ? arrayColor.push(item)
          : arrayColor.filter((r) => r !== item);
      });
    }

    setColors(arrayColor);
    arrayColor.length > 0 ? setTestFilter(arrayColor) : setTestFilter(cards);
  };

  return (
    <React.Fragment>
      {colorsArray.map((value, index) => {
        if (value === undefined) {
          return null;
        } else {
          return (
            <div key={index}>
              <input
                type="checkbox"
                name={value}
                onChange={() => colorChange(value, index)}
              />
              <label htmlFor={value}>{value}</label>
            </div>
          );
        }
      })}
    </React.Fragment>
  );
};

export default ColorFilter;
