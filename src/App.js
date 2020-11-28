import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { getAllCards, getCardByName } from "./components/API"
import Details from "./components/Details";
import Filter from "./components/Filter";
import Header from "./components/Header";
import "./App.css";
import { setFilterClicked } from "./actions/filterClicked"
import { setSearchClicked } from "./actions/searchClicked";
import { selectColors } from "./actions/colors"
import { colorsCheckBox } from "./actions/colorsCheckBox"
import { selectType } from "./actions/type"
import { selectRarity } from "./actions/rarity"
import { setPageReset } from "./actions/page"
import { setCardName } from "./actions/cardName"
import { cardNameCheckBox } from "./actions/cardNameCheckBox"
import { setSearchPageReset } from "./actions/searchPage"


//*  API: https://docs.magicthegathering.io

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
    const colorIsChecked = useSelector(state => state.colorsCheckBox)
    const dispatch = useDispatch()

    // Cards:
    const [testFilter, setTestFilter] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Pagination
    const [totalCount, setTotalCount] = useState(0);
    const [remain, setRemain] = useState(0);

    // Show current number of cards (for testing)
    const [currentCards, setCurrentCards] = useState(0)
    //----------


    //  Session Storage
    const urlPath = window.location.pathname

    useEffect(() => {
        const colorData = JSON.parse(sessionStorage.getItem("color"))
        const colorsCheckBoxData = JSON.parse(sessionStorage.getItem("colorsCheckBoxIndex"))
        const typeData = JSON.parse(sessionStorage.getItem("type"))
        const rarityData = JSON.parse(sessionStorage.getItem("rarity"))

        const cardNameData = JSON.parse(sessionStorage.getItem("cardName"))
        const cardNameIsCheckedData = JSON.parse(sessionStorage.getItem("cardNameIsChecked"))

        if (urlPath.includes("cards")) {
            colorData.map(color => dispatch(selectColors(color)))
            colorsCheckBoxData.map(checkBox => dispatch(colorsCheckBox(checkBox)))
            dispatch(selectType(typeData))
            dispatch(selectRarity(rarityData))

            //Trigger
            dispatch(setPageReset())
            dispatch(setFilterClicked(true))
        } else if (urlPath.includes("name")) {
            dispatch(setCardName(cardNameData))
            dispatch(cardNameCheckBox(cardNameIsCheckedData))

            //Trigger
            dispatch(setSearchPageReset())
            dispatch(setSearchClicked(true))
        } else if (urlPath.includes("cardID")) {
            colorData.map(color => dispatch(selectColors(color)))
            colorsCheckBoxData.map(checkBox => dispatch(colorsCheckBox(checkBox)))
            dispatch(selectType(typeData))
            dispatch(selectRarity(rarityData))
            dispatch(setCardName(cardNameData))
            dispatch(cardNameCheckBox(cardNameIsCheckedData))

            //Trigger
            if (cardNameData) {
                dispatch(setSearchPageReset())
                dispatch(setSearchClicked(true))
            } else {
                dispatch(setPageReset())
                dispatch(setFilterClicked(true))
            }
        }
        else {
            sessionStorage.clear()
        }
    }, [])

    useEffect(() => {
        sessionStorage.setItem("color", JSON.stringify(colorEvent))
        sessionStorage.setItem("colorsCheckBoxIndex", JSON.stringify(colorIsChecked))
        sessionStorage.setItem("type", JSON.stringify(typeEvent))
        sessionStorage.setItem("rarity", JSON.stringify(rarityEvent))
    }, [colorEvent, colorIsChecked, typeEvent, rarityEvent])

    useEffect(() => {
        sessionStorage.setItem("cardName", JSON.stringify(cardName))
        sessionStorage.setItem("cardNameIsChecked", JSON.stringify(isChecked))
    }, [cardName, isChecked])
    //----------


    // Get the cards with the "Search" button
    useEffect(() => {
        if (searchClicked || searchPage > 1) {
            if (isChecked) {
                // Exact name match      
                getCardByName(`"${cardName}"`).then(nameData => {
                    //  Check how many cards do we get from fetch
                    setCurrentCards(nameData.header)

                    //  Pagination
                    setTotalCount(nameData.header / 100)
                    setRemain((100 - (nameData.header % 100)) / 100)

                    setTestFilter(nameData.body.cards)

                    setIsLoaded(true)
                    dispatch(setSearchClicked(false))
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
                    setTestFilter(prevState => searchPage === 1 ? nameData.body.cards : [...prevState, ...nameData.body.cards])

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
                setTestFilter(prevState => page === 1 ? allCardsData.body.cards : [...prevState, ...allCardsData.body.cards])

                setIsLoaded(true)
                dispatch(setFilterClicked(false))

            })
        }
    }, [filterClicked, page])
    //----------


    return (
        <Router >
            <div className="App">
                <Switch>
                    <Route path="/" exact>
                        <h4 className="counter">Current number of cards: {currentCards}</h4>
                        <Header />
                    </Route>
                    <Route path={["/cards/:filter", "/name/:name"]}>
                        <h4 className="counter">Current number of cards: {currentCards}</h4>
                        <Header />
                        <Filter isLoaded={isLoaded} testFilter={testFilter} remain={remain} totalCount={totalCount} />
                    </Route>
                    <Route path="/cardID/:id" component={Details} />
                </Switch>
            </div>

        </Router >
    );
}

export default App;
