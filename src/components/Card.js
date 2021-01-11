import React from "react";
import { Link } from "react-router-dom";
import backside from "./../images/backside.png";

const Card = (props) => {
   const { img, id, name } = props;

   return (
      <div className="card">
         <Link to={`/id/${id}`}>
            <img src={img ? img : backside} alt={name} />
         </Link>
      </div>
   );
};

export default Card;
