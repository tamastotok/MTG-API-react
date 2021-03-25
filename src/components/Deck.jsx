import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementPage } from "../actions/page_action";
import { setStatus } from "../actions/set_status";
import SingleCard from "./SingleCard";
import arrow from "./../images/arrow.png";

export default function Deck({ cardsData }) {
   const page = useSelector((state) => state.page);
   const statusMessage = useSelector((state) => state.statusMessage);

   const dispatch = useDispatch();

   /* store a scroll value,
    "jump to top" button will show/hide depends on this value */
   const [scrollPosition, setScrollPosition] = useState(0);

   // ref to a scrollable div
   const toScrollTop = useRef(null);

   // onScroll function for infinite scroll
   const handleScroll = (e) => {
      const { scrollTop, clientHeight, scrollHeight } = e;
      setScrollPosition(scrollTop);
      if (scrollHeight - scrollTop === clientHeight) {
         if (statusMessage === "No more cards!") {
            return;
         } else {
            dispatch(setStatus("Loading..."));
            dispatch(incrementPage());
         }
      }
   };

   // scroll position jump back to top when page reset
   useEffect(() => {
      if (page === 1) {
         window.scrollTo({
            behavior: "smooth",
            top: toScrollTop.current.scrollTo(0, 0),
         });
      }
   }, [page]);

   // jump back to top button
   const jumpToTop = () => {
      window.scrollTo({
         behavior: "smooth",
         top: toScrollTop.current.scrollTo(0, 0),
      });
      setScrollPosition(0);
   };

   return (
      <>
         <div
            onScroll={(e) => handleScroll(e.currentTarget)}
            ref={toScrollTop}
            className="cards-container"
         >
            {cardsData.map((item, index) => {
               return (
                  <SingleCard
                     key={index}
                     id={item.id}
                     img={item.imageUrl}
                     name={item.name}
                  />
               );
            })}
         </div>

         <img
            id="jump-to-top"
            className={scrollPosition < 1200 ? "hide" : ""}
            onClick={jumpToTop}
            src={arrow}
            alt="arrow"
         />
      </>
   );
}
