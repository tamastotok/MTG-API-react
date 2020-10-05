import React from "react";

const Card = (props) => {
  return (
    <div
      className={`cards-container ${!props.colors[0] ? "colorless" : ""} ${
        !props.img ? "hide" : ""
      }`}
    >
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
