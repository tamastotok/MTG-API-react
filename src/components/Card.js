import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className={props.img ? "card" : "hide"}>
      <Link to={`/id=${props.id}`}>
        <img src={props.img} alt={props.name} />
      </Link>
    </div>
  )
};
export default Card;
