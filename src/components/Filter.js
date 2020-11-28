import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux"
import Card from "./Card";
import card from "./../images/card.gif";
import arrow from "./../images/arrow.png";
import { setPage } from "./../actions/page";
import { setSearchPage } from "./../actions/searchPage"


const Filter = (props) => {
   const { isLoaded, testFilter, remain, totalCount } = props
   const filterClicked = useSelector(state => state.filterButton)
   const searchClicked = useSelector(state => state.searchButton)

   // Scroll events
   const [scrollPosition, setScrollPosition] = useState(0)
   const toScrollTop = useRef()


   //Redux:
   const cardName = useSelector(state => state.cardName)
   const page = useSelector(state => state.page)
   const searchPage = useSelector(state => state.searchPage)
   const dispatch = useDispatch()
   const [counter, setCounter] = useState([1, 100])


   // onScroll function for infinite scroll
   let remainTotalCountSum = remain + totalCount
   const handleScroll = (e) => {
      const { scrollTop, clientHeight, scrollHeight } = e;
      setScrollPosition(scrollTop)
      if (scrollHeight - scrollTop === clientHeight) {
         if (cardName.length > 0) {
            if (searchPage < remainTotalCountSum) {
               dispatch(setSearchPage())
            } else return
         } else {
            if (page < remainTotalCountSum) {
               dispatch(setPage())
               setCounter(prev => page < remainTotalCountSum - 1 ? [prev[0] + 100, prev[1] + 100] : [prev[0] + 100, prev[1] + (100 - (remain * 100))])
            } else return
         }
      }
   }
   //----------





   // Jump back to top button
   const jumpToTop = () => {
      window.scrollTo({
         behavior: "smooth",
         top: toScrollTop.current.scrollTo(0, 0)
      })
      setScrollPosition(0)
   }
   //----------


   useEffect(() => {
      if (toScrollTop.current) {
         jumpToTop()
      }
   }, [filterClicked, searchClicked])


   // Render
   return (
      <React.Fragment>
         {(page < remainTotalCountSum) || (searchPage < remainTotalCountSum) ? <h4 className="counter">{`${counter[0]} - ${counter[1]}`}</h4> : null}
         {totalCount === 0 && isLoaded ? <h4 className="counter">No Result!</h4> : null}

         {!isLoaded
            ?
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
               })}
            </div>
         }
         <img id="jump-to-top" className={scrollPosition < 1200 ? "hide" : ""} onClick={jumpToTop} src={arrow} alt="arrow" />
      </React.Fragment>
   );
};

export default Filter;


// {isLoaded?
//    <div onScroll={(e) => handleScroll(e.currentTarget)} ref={toScrollTop} className="cards-container">
//    {testFilter.map((item, index) => {
//       return (
//          <Card key={index} id={item.id} img={item.imageUrl} text={item.text} name={item.name} />
//       )
//    })
//    }
// </div>
// :            <div className="loading-screen">
// <h3>Loading</h3>
// <img src={card} alt={"card-animation"} />
// </div>
// }