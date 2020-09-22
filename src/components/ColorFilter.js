import React, { useContext } from "react";
import { CardsContext, TestFilterContext } from "./DataContext";

const ColorFilter = () => {
  const [cards] = useContext(CardsContext);
  const [testFilter, setTestFilter] = useContext(TestFilterContext);
  let colors = [];
  const everyColor = cards.map((element) => element.colors[0]);

  // Remove duplicates and undefined
  let colorsArray = [...new Set(Object.values(everyColor))]
    .filter((element) => {
      return element !== undefined;
    })
    .sort();

  const colorChange = (e) => {
    const currentIndex = colors.indexOf(e);
    const colorsArray = [...colors];
    if (currentIndex === -1) {
      colorsArray.push(e);
    } else {
      colorsArray.splice(currentIndex, 1);
    }
    colors = colorsArray;
    const yemen = colors.map((r) =>
      cards.filter((item) => item.colors[0] === r)
    );

    const yeet = [].concat(...Object.values(yemen));
    //setTestFilter(yeet);

    console.log("yeet: ", yeet);
  };

  return (
    <React.Fragment>
      {colorsArray.map((item, index) => {
        if (item === undefined) {
          return null;
        } else {
          return (
            <div key={index}>
              <input
                type="checkbox"
                name={item}
                onChange={(e) => colorChange(e.currentTarget.name)}
              />
              <label htmlFor={item}>{item}</label>
            </div>
          );
        }
      })}
    </React.Fragment>
  );
};

export default ColorFilter;
