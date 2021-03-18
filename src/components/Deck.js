import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "./../actions/page";
import Card from "./Card";
import arrow from "./../images/arrow.png";
import { setIsClicked } from "../actions/isClicked";
import { setStatus } from "../actions/statusMessage";

const Deck = ({ cardData }) => {
   const page = useSelector((state) => state.page);
   const statusMessage = useSelector((state) => state.statusMessage);
   const isClicked = useSelector((state) => state.isClicked);
   const dispatch = useDispatch();

   // Scroll events
   const [scrollPosition, setScrollPosition] = useState(0);
   const toScrollTop = useRef();

   // onScroll function for infinite scroll
   const handleScroll = (e) => {
      const { scrollTop, clientHeight, scrollHeight } = e;
      setScrollPosition(scrollTop);
      if (scrollHeight - scrollTop === clientHeight) {
         if (statusMessage === "No more cards!") {
            dispatch(setIsClicked(false));
         } else {
            dispatch(setIsClicked(true));
            dispatch(setPage());
            dispatch(setStatus("Loading..."));
         }
      }
   };

   // Jump back to top button
   const jumpToTop = () => {
      window.scrollTo({
         behavior: "smooth",
         top: toScrollTop.current.scrollTo(0, 0),
      });
      setScrollPosition(0);
   };

   useEffect(() => {
      if (page === 1 || isClicked) {
         jumpToTop();
      }
   }, [page, isClicked]);

   // Render
   return (
      <React.Fragment>
         <div
            onScroll={(e) => handleScroll(e.currentTarget)}
            ref={toScrollTop}
            className="cards-container"
         >
            {cardData.map((item, index) => {
               return (
                  <Card
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
      </React.Fragment>
   );
};

export default Deck;
