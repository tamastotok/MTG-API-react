import React, { useEffect, useState, useRef } from "react";
import ColorFilter from "./ColorFilter";
import TypeFilter from "./TypeFilter";
import SubtypeFilter from "./SubtypeFilter";
import RarityFilter from "./RarityFilter";
import Details from "./Details";
import Filter from "./Filter"
import { getTypes, getAllCards, getCardByName } from "./API"
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom"

// https://docs.magicthegathering.io

//* sessionstorage useeffectnél triggerelni az "isFilterClicked" state-et
/*  
0.  CardDetails-et router nélkül átirányítani
1.  sessionstorage (url=>color,type,subtype,rarity,name,page,searchpage,exact)
2.  loading-ot kiírni a kártyák helyére
3.  scrollTo(0,0) nem működik IOS-en (safari)
4.  css (kártya containert lentebb rakni)
*/

const NewFetch = () => {
  //const data = JSON.parse(localStorage.getItem("colorEvent"));
  // Filters:
  const colors = ["Black", "Blue", "Green", "Red", "White"];
  const types = ["Any type", "Artifact", "Conspiracy", "Creature", "Enchantment", "Instant", "Land", "Phenomenon", "Plane", "Planeswalker", "Scheme", "Sorcery", "Tribal", "Vanguard"]
  const [subtypes, setSubtypes] = useState([]);
  let gatherSubtypes = [];
  let sortedSubtypes = [];
  const rarities = ["Any rarity", "Land", "Common", "Uncommon", "Rare", "Mythic"];

  // Cards:
  const [testFilter, setTestFilter] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [remain, setRemain] = useState(0);

  // Search
  const [value, setValue] = useState("");
  const [searchPage, setSearchPage] = useState(1);

  // Filter events
  const [colorEvent, setColorEvent] = useState([]);
  const [typeEvent, setTypeEvent] = useState("");
  const [subtypeEvent, setSubtypeEvent] = useState("");
  const [rarityEvent, setRarityEvent] = useState("");
  const colorArray = [];


  // Click event
  const [isFilterClicked, setIsFilterClicked] = useState(false)
  const [isSearchClicked, setIsSearchClicked] = useState(false)

  // Scroll events
  const [scrollPosition, setScrollPosition] = useState(0)

  // Show current number of cards
  const [currentCards, setCurrentCards] = useState(0)

  const isReloaded = useRef(false)




  // Fetch cards/infinite scroll
  const toScrollTop = useRef()
  const exactName = useRef()
  const exactValue = useRef()
  const [cardName, setCardName] = useState("")

  useEffect(() => {
    if (isSearchClicked || searchPage > 1) {
      if (exactName.current.checked) {
        // Exact name match
        setIsFetching(true)
        getCardByName(`"${exactValue.current.value}"`).then(nameData => {
          setTestFilter(nameData.body.cards)
          setIsLoaded(true)
          setIsFetching(false)
        })
      } else {
        // Partial name match
        setIsFetching(true)
        getCardByName(`${exactValue.current.value}&page=${searchPage}`).then(nameData => {
          setCurrentCards(nameData.header)
          setTotalCount(nameData.header / 100)
          setRemain((100 - (nameData.header % 100)) / 100)
          if (searchPage === 1 && toScrollTop.current) {
            window.scrollTo({
              behavior: "smooth",
              top: toScrollTop.current.scrollTo(0, 0)
            })
            setTestFilter(nameData.body.cards)
            //*Subtype
          } else {
            setTestFilter((prev) => [...prev, ...nameData.body.cards])
          }
          setIsLoaded(true)
          setIsFetching(false)
          setIsSearchClicked(false)
        })
      }
    }
  }, [isSearchClicked, searchPage])


  //* Subtype
  //  Prevent the first render
  const isFirstRender = useRef(true);
  //  Render "Loading..." button while fetching subtypes
  const [isFetching, setIsFetching] = useState(false)
  //  Get subtypes based on the selected type
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
    } else {
      setIsFetching(true)
      getTypes(typeEvent).then((types) => {
        types.cards.map(item => gatherSubtypes.push(item.subtypes[0]))
        gatherSubtypes.sort()
        sortedSubtypes = ["Any subtype", ...new Set(Object.values(gatherSubtypes))].filter(item => item !== undefined)
        setSubtypes(sortedSubtypes.length > 0 ? sortedSubtypes : ["No subtype"])
        setIsFetching(false)
      })
    }
  }, [typeEvent])
  //*----------

  /*
    // Get the cards with the "Search" button
    const fetchData = () => {
      getAllCards(colorEvent, typeEvent, subtypeEvent, rarityEvent, page).then((allCardsData) => {
        //  Check how many cards do we get from fetch   
        setCurrentCards(allCardsData.header)
        setTotalCount(allCardsData.header / 100)
        setRemain((100 - (allCardsData.header % 100)) / 100)
  
        setTestFilter(allCardsData.body.cards)
        setIsLoaded(true)
      })
    }
    //----------
  */

  // Get the cards with the "Filter" button
  useEffect(() => {
    if (isFilterClicked || page > 1) {
      getAllCards(colorEvent, typeEvent, subtypeEvent, rarityEvent, page).then((allCardsData) => {
        //  Check how many cards do we get from fetch   
        setCurrentCards(allCardsData.header)
        //  Fetch data for pagination
        setTotalCount(allCardsData.header / 100)
        setRemain((100 - (allCardsData.header % 100)) / 100)
        //  Put cards to an array for render
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
        setIsFilterClicked(false)
      })
    }
  }, [isFilterClicked, page])
  //----------




  /*if (window.performance) {
    if (PerformanceNavigation.TYPE_RELOAD === 1) {
      isReloaded.current = true

    } else {
      isReloaded.current = false
    }
  }*/



  //  Separate filters
  const allFilter = (e, index) => {
    setPage(1)
    if (colors.includes(e)) {
      colorArray.push(e)
      colorArray.sort()
      //! IMPORTANT
      //setColorEvent(prev => [...prev, e].sort())
      setColorEvent((prev) =>
        prev.includes(e) ? colorEvent.filter((r) => r !== e)
          : [...prev, e].sort()
      );
    } else if (types.includes(e)) {
      setTypeEvent(e)
    } else if (subtypes.includes(e)) {
      setSubtypeEvent(e)
    } else if (rarities.includes(e)) {
      setRarityEvent(e)
    } else return
  }
  //----------


  //  Any type, any subtype, any rarity button
  if (typeEvent === "Any type") {
    setTypeEvent("")
  }
  if (subtypeEvent === "Any subtype") {
    setSubtypeEvent("")
  }
  if (rarityEvent === "Any rarity") {
    setRarityEvent("")
  }
  //----------


  // onScroll function for infinite scroll
  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e;
    console.log(scrollTop)
    setScrollPosition(scrollTop)
    if (scrollHeight - scrollTop === clientHeight) {

      if (cardName.length > 0) {
        setSearchPage(prev => prev < (remain + totalCount) ? prev + 1 : remain + totalCount)
      } else {
        setPage(prev => prev < (remain + totalCount) ? prev + 1 : remain + totalCount)
      }
    }
  }

  // Jump back to top button
  const jumpToTop = () => {
    window.scrollTo({
      behavior: "smooth",
      top: toScrollTop.current.scrollTo(0, 0)
    })
    setScrollPosition(0)
  }

  const colorChecked = useRef()

  // Render
  return (
    <Router>
      {/*Ide te feeder szar*/}


      <div className="searchbar">
        <p>Quick search:</p>
        <input
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Search.."
          name="search"
        />
      </div>

      <div className="searchbar">
        <p>Search by name:</p>
        <input
          onChange={(e) => { setCardName(e.target.value); setSearchPage(1) }}
          type="text"
          placeholder="Search.."
          name="search"
          ref={exactValue}
        />
        <input className="exact-name"
          type="checkbox"
          name="exact"
          ref={exactName}
        />
        <Link to={`/name/${cardName}`}> <button onClick={() => { setIsSearchClicked(true); colorChecked.current.checked = false; setTypeEvent("Any type"); setSubtypeEvent("Any subtype"); setRarityEvent("Any rarity") }}>Search</button></Link>
      </div>

      <h3 id="total-count">Current number of cards: {currentCards}</h3>

      <div className="checkbox-container">
        <ColorFilter
          allFilter={allFilter}
          colorEvent={colorEvent}
          colorChecked={colorChecked}
          colors={colors} />
      </div>

      <div className="dropdown-container">
        <TypeFilter allFilter={allFilter} types={types} />
        {isFetching ? <div className="dropdown"><button className="button-active">Loading...</button></div> :
          <SubtypeFilter allFilter={allFilter} typeEvent={typeEvent} subtypes={subtypes} />
        }
        <RarityFilter allFilter={allFilter} rarities={rarities} />
        <Link to={`/filter/c=${colorEvent}&t=${typeEvent}&s=${subtypeEvent}&r=${rarityEvent}`}><button onClick={() => { setIsFilterClicked(true); exactValue.current.value = ""; exactName.current.checked = false }}>Filter</button></Link>
      </div>

      <Route path={["/name/:name", "/filter/:filter"]}>
        <Filter isLoaded={isLoaded} handleScroll={handleScroll} toScrollTop={toScrollTop} value={value} scrollPosition={scrollPosition} jumpToTop={jumpToTop} testFilter={testFilter} />
      </Route>



    </Router>
  );

};

export default NewFetch;
