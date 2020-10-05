import React from "react";

const ColorFilter = (props) => {
  const everyColor = props.cards.map((element) => element.colors[0]);
  let colorsArray = [...new Set(Object.values(everyColor))]
    .filter((element) => {
      return element !== undefined;
    })
    .sort();

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
                onChange={(e) => props.allFilter(e.currentTarget.name)}
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
