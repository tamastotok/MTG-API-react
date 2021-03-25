import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setId } from "../actions/cards_action";
import { setIsLoading } from "../actions/set_loading";
import backside from "./../images/backside.png";

export default function SingleCard({ img, id, name }) {
   const dispatch = useDispatch();

   const handleClick = () => {
      dispatch(setIsLoading(false));
      dispatch(setId(id));
   };

   return (
      <div className="card">
         <Link
            to={{
               pathname: "/card/search",
               search: `id=${id}`,
            }}
         >
            <img onClick={handleClick} src={img ? img : backside} alt={name} />
         </Link>
      </div>
   );
}
