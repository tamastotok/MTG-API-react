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

//* cards = egész api data EZ A FŐ TÖMB!!! (global)

//* value = searchbar értékét tárolja (string)(egyelőre local)

//* colorfilter,typefilter stb = filterezett tömbök...
//*                              checkboxok és gombok,
//*                              használja a cards tömböt (global)

//* testfilter = egyesített tömb amiben a ...filter tömbök vannak,
//*              ez lesz majd renderelve a végén (global)

//* isloaded = api betöltését jelzi (local)

const NewFetch = (props) => {
  const [cards, setCards] = useContext(CardsContext);
  const [value, setValue] = useState("");
  const [colorFilter, setColorFilter] = useContext(ColorFilterContext);
  const [typeFilter, setTypeFilter] = useContext(TypeFilterContext);
  const [rarityFilter, setRarityFilter] = useContext(TypeFilterContext);
  const [testFilter, setTestFilter] = useContext(TestFilterContext);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch API
  useEffect(() => {
    fetch("https://api.magicthegathering.io/v1/cards")
      .then((response) => response.json())
      .catch((error) => console.log(error))
      .then((data) => {
        //setCards(data.cards);
        setCards(data.cards);
        setTestFilter(data.cards);
        setIsLoaded(true);
      });
  }, []);

  console.log(cards);

  //! 3. Vagy itt csinálni kölön változót filterrle és beírni JSX-be

  //console.log(colorFilter);

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
            <ColorFilter />
          </div>

          <div className="dropdown-container">
            <Button />
            <Rarity />
          </div>

          <div className="list-container">
            {testFilter.map((item) => {
              return (
                //! 2. Vagy itt filterezni mindent
                <Card
                  key={item.id}
                  name={item.name}
                  colors={item.colors}
                  types={item.types}
                  rarity={item.rarity}
                  img={item.imageUrl}
                  text={item.text}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default NewFetch;
