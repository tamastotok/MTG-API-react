import React from "react";
import { Link } from "react-router-dom";
import placeholder from "./../images/placeholder.png"

const Card = (props) => {
  const { img, id, name } = props


  return (
    <div className="card">
      <Link to={`/cardID/${id}`} >
        <img src={img ? img : placeholder} alt={name} />
      </Link>
    </div>
  )
};
export default Card;
