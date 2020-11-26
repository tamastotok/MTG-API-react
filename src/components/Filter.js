import React from "react";
import Card from "./Card";
import card from "./../images/card.gif";
import arrow from "./../images/arrow.png";


const Filter = (props) => {
   const { isLoaded, testFilter, handleScroll, toScrollTop, scrollPosition, jumpToTop } = props


   // Render
   return (
      <React.Fragment>
         {!isLoaded ?
            <div className="loading-screen">
               <h3>Loading</h3>
               <img src={card} alt={"card-animation"} />
            </div>
            :
            <div onScroll={(e) => handleScroll(e.currentTarget)} ref={toScrollTop} className="cards-container">
               {testFilter.map((item, index) => {
                  return (
                     <Card key={index} id={item.id} img={item.imageUrl} text={item.text} name={item.name} />
                  )
               })
               }
            </div>
         }
         <img id="jump-to-top" className={scrollPosition < 1200 ? "hide" : ""} onClick={jumpToTop} src={arrow} alt="arrow" />
      </React.Fragment>
   );
};

export default Filter;
