import React, { useEffect, useState, useRef } from "react";
import Card from "./Card";
import ColorFilter from "./ColorFilter";
import TypeFilter from "./TypeFilter";
import SubtypeFilter from "./SubtypeFilter";
import RarityFilter from "./RarityFilter";
import card from "../card.gif";
import arrow from "../arrow.png";
import { getTypes, getAllCards, searchCards, mergeCards } from "./API"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

// https://docs.magicthegathering.io

//! React router dom telepítve

/*  
1.  routingot a filterezett kártyáknak
4.  loading-ot kiírni mindig (fent is), kevesebb kártyát renderelni/fetchelni
6.  cache the api
7.  scrollTo(0,0) nem működik IOS-en (safari)
8.  exact name search
*/

const NewFetch = () => {

  // Filters:
  const colors = ["Black", "Blue", "Green", "Red", "White"];
  const types = ["Any type", "Artifact", "Conspiracy", "Creature", "Enchantment", "Instant", "Land", "Phenomenon", "Plane", "Planeswalker", "Scheme", "Sorcery", "Tribal", "Vanguard"]
  const [subtypes, setSubtypes] = useState([]);
  const rarities = ["Any rarity", "Land", "Common", "Uncommon", "Rare", "Mythic"];
  let gatherSubtypes = [];
  let sortedSubtypes = [];

  // Cards:
  const [testFilter, setTestFilter] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [remain, setRemain] = useState(0);

  // Search
  const [value, setValue] = useState("");
  const [searchFilter, setSearchFilter] = useState([]);
  const [searchPage, setSearchPage] = useState(0);

  // Filter events
  const [colorEvent, setColorEvent] = useState([]);
  const [typeEvent, setTypeEvent] = useState("");
  const [subtypeEvent, setSubtypeEvent] = useState("");
  const [rarityEvent, setRarityEvent] = useState("");
  const [allColor, setAllColor] = useState([]);

  // Scroll events
  const [scrollPosition, setScrollPosition] = useState(0)

  // Show current number of cards
  const [currentCards, setCurrentCards] = useState(0)

  // Prevent the first render
  const isFirstRender = useRef(true);



  // Fetch cards/infinite scroll
  const toScrollTop = useRef()
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
    } else {
      getAllCards(colorEvent, typeEvent, subtypeEvent, rarityEvent, page).then((allCardsData) => {
        //  Check how many cards do we get from fetch   
        setCurrentCards(allCardsData.header)
        setTotalCount(allCardsData.header / 100)
        setRemain((100 - (allCardsData.header % 100)) / 100)
        //  Put cards to an array for render
        if (page === 1 && toScrollTop.current) {
          window.scrollTo({
            behavior: "smooth",
            top: toScrollTop.current.scrollTo(0, 0)
          })
          setTestFilter(allCardsData.body.cards)
          allCardsData.body.cards.map(item => gatherSubtypes.push(item.subtypes[0]))
        } else {
          setTestFilter((prev) => [...prev, ...allCardsData.body.cards])
        }
        //  Fetch subtypes bases on selected type
        gatherSubtypes.sort()
        sortedSubtypes = ["Any subtype", ...new Set(Object.values(gatherSubtypes))].filter(item => item !== undefined)
        setSubtypes(sortedSubtypes.length > 0 ? sortedSubtypes : ["No subtype"])
        setIsLoaded(true)
        //! Teszt: setIsFetching(false)
      })
    }
  }, [colorEvent, typeEvent, subtypeEvent, rarityEvent, page])



  // onScroll function for infinite scroll
  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    setScrollPosition(scrollTop)
    if (scrollHeight - scrollTop === clientHeight) {
      if (value.length > 0) {
        setSearchPage(prev => prev < (remain + totalCount) ? prev + 1 : remain + totalCount)
      } else {
        setPage(prev => prev < (remain + totalCount) ? prev + 1 : remain + totalCount)
      }
    }
  }


  const [isFetching, setIsFething] = useState(false)

  //  Separate filters
  const allFilter = (e) => {
    setIsFething(true)
    setPage(1)
    if (colors.includes(e)) {
      setColorEvent((prev) =>
        prev.includes(e) === false
          ? [...prev, e].sort()
          : colorEvent.filter((r) => r !== e)
      );
    } else if (types.includes(e)) {
      setTypeEvent(e)
    } else if (subtypes.includes(e)) {
      setSubtypeEvent(e)
    } else if (rarities.includes(e)) {
      setRarityEvent(e)
    } else return
  }

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


  // Jump back to top button
  const jumpToTop = () => {
    window.scrollTo({
      behavior: "smooth",
      top: toScrollTop.current.scrollTo(0, 0)
    })
    setScrollPosition(0)
  }


  // Render
  return (
    <React.Fragment>
      {/*Ide te feeder szar*/}
      {console.log(testFilter)}
      {isFetching && !isLoaded ? console.log("Fetch data") : console.log("Done")}

      <div className="searchbar">
        <input
          onChange={(e) => { setValue(e.target.value); setSearchPage(1) }}
          type="text"
          placeholder="Search.."
          name="search"
        />
      </div>

      <h3 id="total-count">Current number of cards: {currentCards}</h3>

      <div className="checkbox-container">
        <ColorFilter allFilter={allFilter} colors={colors} />
      </div>

      <div className="dropdown-container">
        <TypeFilter allFilter={allFilter} types={types} />
        <SubtypeFilter allFilter={allFilter} subtypes={subtypes} />
        <RarityFilter allFilter={allFilter} rarities={rarities} />
      </div>


      {isFetching && !isLoaded ? <div className="loading-screen">
        <img src={card} alt={"card-animation"} />
        <h3>Small indie company, please be patient!</h3>
      </div>
        :
        <div onScroll={handleScroll} ref={toScrollTop} className="cards-container">
          {testFilter
            .sort((a, b) =>
              a.colors[0] > b.colors[0] ?
                1 : b.colors[0] > a.colors[0] ?
                  -1 : 0
            ).filter((item) => {
              return item.name.toLowerCase().indexOf(value.toLowerCase()) >= 0
            })
            .map((item, index) => {
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

export default NewFetch;
