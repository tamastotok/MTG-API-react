import React from "react";
import Card from "./Card";
import card from "../card.gif";
import arrow from "../arrow.png";


// https://docs.magicthegathering.io

//! React router dom telepítve

/*  
1.  routingot a filterezett kártyáknak
4.  loading-ot kiírni mindig (fent is), kevesebb kártyát renderelni/fetchelni
6.  cache the api
7.  scrollTo(0,0) nem működik IOS-en (safari)
8.  exact name search
*/

const Filter = (props) => {

   // Render
   return (
      <React.Fragment>
         <h1>Filter</h1>
         {!props.isLoaded ?
            <div className="loading-screen">
               <h3>Small indie company, please be patient!</h3>
               <img src={card} alt={"card-animation"} />
            </div>
            :
            <div onScroll={(e) => props.handleScroll(e.currentTarget)} ref={props.toScrollTop} className="cards-container">
               {props.testFilter
                  .filter((item) => {
                     return item.name.toLowerCase().indexOf(props.value.toLowerCase()) >= 0
                  })
                  .map((item, index) => {
                     return (
                        <Card key={index} id={item.id} img={item.imageUrl} text={item.text} name={item.name} />
                     )
                  })
               }
            </div>
         }
         <img id="jump-to-top" className={props.scrollPosition < 1200 ? "hide" : ""} onClick={props.jumpToTop} src={arrow} alt="arrow" />
      </React.Fragment>
   );

};

export default Filter;
