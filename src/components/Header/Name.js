import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCardName } from "./../../actions/cardName";
import { setStatus } from "./../../actions/statusMessage";
import { setIsClicked } from "./../../actions/isClicked";
import { setPageReset } from "../../actions/page";

const Name = () => {
   const cardNameRef = useRef();
   const cardName = useSelector((state) => state.cardName);

   const dispatch = useDispatch();

   useEffect(() => {
      if (cardName.length > 2 || cardName.length === 0) {
         dispatch(setIsClicked(true));
         dispatch(setPageReset());
         dispatch(setStatus("Loading..."));
      }
      if (cardName.length < 3) {
         dispatch(setStatus("Min. 3 characters!"));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [cardName]);

   return (
      <React.Fragment>
         <div className="searchbar">
            <p>Search by name:</p>
            <input
               onChange={(e) => dispatch(setCardName(e.target.value))}
               type="text"
               placeholder="Search.."
               name="search"
               ref={cardNameRef}
            />
         </div>
      </React.Fragment>
   );
};

export default Name;
