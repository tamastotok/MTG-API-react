import React from "react";

const Card = (props) => {
  return (
    //! Ide kell a propsokhoz írni vmi if / else cuccot ami filterez
    <div className="cards-container">
      <h3>{props.name}</h3>
      <p>Color: {props.colors}</p>
      <p>Type: {props.types}</p>
      <p>Rarity: {props.rarity}</p>
      <img src={props.img} alt={props.name} />
      <p>{props.text}</p>
    </div>
  );
};
export default Card;
