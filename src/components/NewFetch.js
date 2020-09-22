import React, { useEffect, useState, useContext } from "react";
import Card from "./Card";
import ColorFilter from "./ColorFilter";
import Button from "./Button";
import Rarity from "./Rarity";
import {
  CardsContext,
  ColorFilterContext,
  TypeFilterContext,
  TestFilterContext,
  RarityFilterContext,
} from "./DataContext";

// colors[0],types[0],rarity

const NewFetch = (props) => {
  const [cards, setCards] = useContext(CardsContext);
  const [value, setValue] = useState("");
  const [colorFilter, setColorFilter] = useContext(ColorFilterContext);
  const [typeFilter, setTypeFilter] = useContext(TypeFilterContext);
  const [rarityFilter, setRarityFilter] = useContext(RarityFilterContext);
  const [testFilter, setTestFilter] = useContext(TestFilterContext);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch API
  useEffect(() => {
    fetch("https://api.magicthegathering.io/v1/cards")
      .then((response) => response.json())
      .catch((error) => console.log(error))
      .then((data) => {
        setCards(data.cards);
        //setTestFilter(data.cards);
        setIsLoaded(true);
      });
  }, []);

  const allFilter = (e) => {};
  console.log("color: ", testFilter);
  //console.log("type: ", typeFilter);
  //console.log("rarity: ", rarityFilter);

  const every = testFilter.map((item, index) => {
    return (
      <Card
        key={index}
        name={item.name}
        colors={item.colors}
        types={item.types}
        rarity={item.rarity}
        img={item.imageUrl}
        text={item.text}
      />
    );
  });

  if (!isLoaded) {
    return <p>Loading ...</p>;
  } else {
    return (
      <div>
        <div className="searchbar">
          <input
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Search.."
            name="search"
          />
          <div className="checkbox-container">
            <ColorFilter allFilter={allFilter} />
          </div>

          <div className="dropdown-container">
            <Button allFilter={allFilter} />
            <Rarity allFilter={allFilter} />
          </div>

          <div className="list-container">{every}</div>
        </div>
      </div>
    );
  }
};

export default NewFetch;
