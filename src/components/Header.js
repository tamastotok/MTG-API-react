import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import ColorFilter from "./ColorFilter"
import TypeFilter from "./TypeFilter"
import RarityFilter from "./RarityFilter"
import { useSelector, useDispatch } from "react-redux"
import { selectType } from "../actions/type"
import { selectRarity } from "../actions/rarity"
import { cardName } from "../actions/cardName"
import { setFilterClicked } from "../actions/filterClicked"
import { setSearchClicked } from "../actions/searchClicked"
import { cardNameCheckBox } from "../actions/cardNameCheckBox"
import { setPageReset } from '../actions/page'
import { setSearchPageReset } from '../actions/searchPage'


const Header = () => {
     const colorEvent = useSelector(state => state.colors)
     const typeEvent = useSelector(state => state.type)
     const rarityEvent = useSelector(state => state.rarity)
     const isChecked = useSelector(state => state.cardNameCheckBox)
     const dispatch = useDispatch()

     const exactCardNameRef = useRef();


     const handleSearchClick = () => {
          dispatch(setSearchClicked(true));
          dispatch(setSearchPageReset());
          dispatch(selectType("Any type"));
          dispatch(selectRarity("Any rarity"));
     }


     const handleFilterClick = () => {
          dispatch(setFilterClicked(true));
          dispatch(setPageReset());
          dispatch(cardName(""))
          exactCardNameRef.current.value = ""
     }


     return (
          <React.Fragment>
               <div className="searchbar">
                    <p>Search by name:</p>
                    <input
                         onChange={(e) => dispatch(cardName(e.target.value))}
                         type="text"
                         placeholder="Search.."
                         name="search"
                         ref={exactCardNameRef}
                    />
                    <label htmlFor="exact">Exact name:</label>
                    <input className="exact-name"
                         onClick={() => dispatch(cardNameCheckBox())}
                         type="checkbox"
                         name="exact"
                         checked={isChecked}
                    />
                    <Link to={`/name/${exactCardNameRef.current ? exactCardNameRef.current.value : ""}`}>
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