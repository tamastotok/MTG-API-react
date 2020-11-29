import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ColorFilter from "./ColorFilter"
import TypeFilter from "./TypeFilter"
import RarityFilter from "./RarityFilter"
import { useSelector, useDispatch } from "react-redux"
import { selectType } from "../actions/type"
import { selectRarity } from "../actions/rarity"
import { setCardName } from "../actions/cardName"
import { setFilterClicked } from "../actions/filterClicked"
import { setSearchClicked } from "../actions/searchClicked"
import { cardNameCheckBox, cardNameCheckBoxOppositeState } from "../actions/cardNameCheckBox"
import { setPageReset } from '../actions/page'
import { setSearchPageReset } from '../actions/searchPage'
import { resetColors } from '../actions/colors'


const Header = () => {
     const colorEvent = useSelector(state => state.colors)
     const typeEvent = useSelector(state => state.type)
     const rarityEvent = useSelector(state => state.rarity)
     const isChecked = useSelector(state => state.cardNameCheckBox)
     const cardName = useSelector(state => state.cardName)
     const dispatch = useDispatch()

     const exactCardNameRef = useRef();

     useEffect(() => {
          if (exactCardNameRef.current) {
               exactCardNameRef.current.value = cardName
          }
     }, [cardName])

     const exactCardNameCheckBoxRef = useRef();
     useEffect(() => {
          if (exactCardNameCheckBoxRef.current) {
               exactCardNameCheckBoxRef.current.checked = isChecked
          }
     })

     const handleSearchClick = () => {
          if (!exactCardNameRef.current.value) {
               exactCardNameRef.current.value = "Search is empty!"
               exactCardNameRef.current.className = "alert"
               setTimeout(() => {
                    exactCardNameRef.current.value = ""
                    exactCardNameRef.current.className = ""
               }, 1500)
          }
          dispatch(setSearchClicked(true));
          dispatch(setPageReset());
          dispatch(setSearchPageReset());
          dispatch(resetColors());
          dispatch(selectType("Any type"));
          dispatch(selectRarity("Any rarity"));
     }


     const handleFilterClick = () => {
          dispatch(setFilterClicked(true));
          dispatch(setPageReset());
          dispatch(setSearchPageReset());
          dispatch(setCardName(""))
          dispatch(cardNameCheckBox(false))
          exactCardNameRef.current.value = ""
     }


     return (
          <React.Fragment>
               <div className="searchbar">
                    <p>Search by name:</p>
                    <input
                         onChange={(e) => dispatch(setCardName(e.target.value))}
                         type="text"
                         placeholder="Search.."
                         name="search"
                         ref={exactCardNameRef}
                    />
                    <label htmlFor="exact">Exact name:</label>
                    <input className="exact-name"
                         onClick={() => dispatch(cardNameCheckBoxOppositeState())}
                         type="checkbox"
                         name="exact"
                         ref={exactCardNameCheckBoxRef}
                    />
                    <Link to={exactCardNameRef.current ? `/name/${exactCardNameRef.current.value}` : "/"}>
                         <button onClick={handleSearchClick}>Search</button>
                    </Link>
               </div>

               <div className="checkbox-container">
                    <ColorFilter />
               </div>

               <div className="dropdown-container">
                    <TypeFilter />
                    <RarityFilter />
                    <Link to={`/cards/q?c=${colorEvent}&t=${typeEvent}&r=${rarityEvent}`}>
                         <button onClick={handleFilterClick}>Filter</button>
                    </Link>
               </div>
          </React.Fragment>
     )
}

export default Header