import React, { useEffect, useState } from "react";
import Card from "./Card";
import SearchBar from "./SearchBar";

const Fetch = (props) => {
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState([]);
  const [cards, setCards] = useState([]);

  // Fetch API
  useEffect(() => {
    fetch("https://api.magicthegathering.io/v1/cards")
      .then((response) => response.json())
      .catch((error) => console.log(error))
      .then((data) => {
        setCards(data.cards);
      });
  }, []);

  // Get every color of the cards
  const everyColor = cards.map((element) => element.colors[0]);
  // Remove duplicates
  let colors = [...new Set(Object.values(everyColor))];

  // Put color values in the filter array when checkbox checked
  const handleChange = (value) => {
    const currentIndex = filter.indexOf(value);
    const newFilter = [...filter];
    if (currentIndex === -1) {
      newFilter.push(value);
    } else {
      newFilter.splice(currentIndex, 1);
    }
    setFilter(newFilter);
  };

  // Filter all cards by their color
  const filt = cards
    .filter((element) => {
      return element.colors.some((r) => filter.indexOf(r) >= 0);
    })
    .map((element) => {
      return (
        <Card
          key={element.id}
          name={element.name}
          colors={element.colors}
          types={element.types}
          subtypes={element.subtypes}
          supertypes={element.supertypes}
          rarity={element.rarity}
          img={element.imageUrl}
          text={element.text}
        />
      );
    });

  // Filter all cards by their names
  const search = cards
    .filter((element) => {
      return element.name.toLowerCase().indexOf(value.toLowerCase()) >= 0;
    })
    .map((element) => {
      return (
        <Card
          key={element.id}
          name={element.name}
          colors={element.colors}
          types={element.types}
          subtypes={element.subtypes}
          supertypes={element.supertypes}
          rarity={element.rarity}
          img={element.imageUrl}
          text={element.text}
        />
      );
    });

  // RENDER
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
          {colors.map((value, index) => {
            // Remove "undefined colors"
            if (value === undefined) {
              return null;
            } else
              return (
                <SearchBar
                  key={index}
                  value={value}
                  colors={colors}
                  handleChange={() => handleChange(value, index)}
                />
              );
          })}
        </div>

        <div className="list-container">
          {filter.length === 0 ? search : filt}
        </div>
      </div>
    </div>
  );
};

export default Fetch;
