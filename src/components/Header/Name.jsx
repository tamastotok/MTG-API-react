import React from "react";
import { useDispatch } from "react-redux";
import { setName } from "../../actions/cards_action";
import { setStatus } from "../../actions/set_status";
import { resetPage } from "../../actions/page_action";

export default function Name() {
   const dispatch = useDispatch();

   const handleChange = (e) => {
      if (e.target.value.length > 2 || e.target.value.length === 0) {
         dispatch(setName(e.target.value));
         dispatch(resetPage());
         dispatch(setStatus("Loading..."));
      } else {
         dispatch(setStatus("Min. 3 characters!"));
      }
   };

   return (
      <>
         <div className="searchbar">
            <p>Search by name:</p>
            <input
               onChange={handleChange}
               type="text"
               placeholder="Search.."
               name="search"
            />
         </div>
      </>
   );
}
