import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { getAllCards, getCardByName } from "./components/API"
import Details from "./components/Details";
import Filter from "./components/Filter";
import Header from "./components/Header";
import "./App.css";
import { setPage } from "./actions/page";
import { setSearchPage } from "./actions/searchPage"
import { setFilterClicked } from "./actions/filterClicked"
import { setSearchClicked } from "./actions/searchClicked";

//! commit!
//*  DOCS: https://docs.magicthegathering.io

//* Tested:
//* Chrome  87.0.4280.66    64bit
//* Opera   72.0.3815.320   64bit
//* Edge    87.0.664.47     64bit
//* Firefox 83.0            64bit

// scrollTo(0,0) doesn't work on Safari


function App() {
  //  Redux:
  const colorEvent = useSelector(state => state.colors)
  const typeEvent = useSelector(state => state.type)
  const rarityEvent = useSelector(state => state.rarity)
  const page = useSelector(state => state.page)
  const searchPage = useSelector(state => state.searchPage)
  const filterClicked = useSelector(state => state.filterButton)
  const searchClicked = useSelector(state => state.searchButton)
  const cardName = useSelector(state => state.cardName)
  const isChecked = useSelector(state => state.cardNameCheckBox)
  const dispatch = useDispatch()

  // Cards:
  const [testFilter, setTestFilter] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Pagination
  const [totalCount, setTotalCount] = useState(0);
  const [remain, setRemain] = useState(0);

  // Scroll events
  const [scrollPosition, setScrollPosition] = useState(0)

  // Show current number of cards (for testing)
  const [currentCards, setCurrentCards] = useState(0)

  // Fetch cards/infinite scroll
  const toScrollTop = useRef()
  //----------


  // Get the cards with the "Search" button
  useEffect(() => {
    if (searchClicked || searchPage > 1) {
      if (isChecked) {
        // Exact name match      
        getCardByName(`"${cardName}"`).then(nameData => {
          setTestFilter(nameData.body.cards)
          setIsLoaded(true)
        })
      } else {
        // Partial name match
        getCardByName(cardName).then(nameData => {
          //  Check how many cards do we get from fetch   
          setCurrentCards(nameData.header)

          //  Pagination
          setTotalCount(nameData.header / 100)
          setRemain((100 - (nameData.header % 100)) / 100)

          //  Render cards depends on scroll position
          if (page === 1 && toScrollTop.current) {
            window.scrollTo({
              behavior: "smooth",
              top: toScrollTop.current.scrollTo(0, 0)
            })
            setTestFilter(nameData.body.cards)
          } else {
            setTestFilter((prev) => [...prev, ...nameData.body.cards])
          }

          setIsLoaded(true)
          dispatch(setSearchClicked(false))
        })
      }
    }
  }, [searchClicked, searchPage])
  //----------


  // Get the cards with the "Filter" button
  useEffect(() => {
    if (filterClicked || page > 1) {
      getAllCards(colorEvent.length > 0 ? colorEvent : "", typeEvent !== "Any type" ? typeEvent : "", rarityEvent !== "Any rarity" ? rarityEvent : "", page).then((allCardsData) => {
        //  Check how many cards do we get from fetch   
        setCurrentCards(allCardsData.header)

        //  Pagination
        setTotalCount(allCardsData.header / 100)
        setRemain((100 - (allCardsData.header % 100)) / 100)

        //  Render cards depends on scroll position
        if (page === 1 && toScrollTop.current) {
          window.scrollTo({
            behavior: "smooth",
            top: toScrollTop.current.scrollTo(0, 0)
          })
          setTestFilter(allCardsData.body.cards)
        } else {
          setTestFilter((prev) => [...prev, ...allCardsData.body.cards])
        }

        setIsLoaded(true)
        dispatch(setFilterClicked(false))
      })
    }
  }, [filterClicked, page])
  //----------


  // onScroll function for infinite scroll
  let remainTotalCountSum = remain + totalCount
  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e;
    console.log(scrollTop)
    setScrollPosition(scrollTop)
    if (scrollHeight - scrollTop === clientHeight) {
      if (cardName.length > 0) {
        if (searchPage < remainTotalCountSum) {
          dispatch(setSearchPage())
        } else return
      } else {
        if (page < remainTotalCountSum) {
          dispatch(setPage())
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


  return (
    <Router >
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <p>Current number of cards: {currentCards}</p>
            <Header />
          </Route>
          <Route path={["/cards/:filter", "/name/:name"]}>
            <p>Current number of cards: {currentCards}</p>
            <Header />
            <Filter isLoaded={isLoaded} handleScroll={handleScroll} toScrollTop={toScrollTop} scrollPosition={scrollPosition} jumpToTop={jumpToTop} testFilter={testFilter} />
          </Route>
          <Route path="/cardID/:id" component={Details} />
        </Switch>
      </div>
    </Router >
  );
}

export default App;
