import React, { useEffect, useState } from "react";
import Card from "./Card";
import ColorFilter from "./ColorFilter";
import TypeFilter from "./TypeFilter";
import RarityFilter from "./RarityFilter";
import card from "../card.gif";

// colors[0],types[0],rarity

//TODO => searchbar
//TODO => dropdown menu
//TODO => write a function to "All types" and "All rarities"
//TODO => sort by name

const NewFetch = () => {
  const [cards, setCards] = useState([]);
  const [value, setValue] = useState("");
  const [testFilter, setTestFilter] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [colorEvent, setColorEvent] = useState([]);
  const [typeEvent, setTypeEvent] = useState("");
  const [rarityEvent, setRarityEvent] = useState("");

  // Fetch API
  useEffect(() => {
    fetch("https://api.magicthegathering.io/v1/cards")
      .then((response) => response.json())
      .catch((error) => console.log(error))
      .then((data) => {
        setCards(data.cards);

        // Show all cards by default
        setTestFilter(data.cards);
        setIsLoaded(true);
      });
  }, []);

  // Search by name
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

  // Get every color, type and rarity from cards
  const everyColor = cards.map((element) => element.colors[0]);
  const colors = [...new Set(Object.values(everyColor))]
    .filter((element) => {
      return element !== undefined;
    })
    .sort();

  const everyType = cards.map((element) => element.types[0]);
  const types = [...new Set(Object.values(everyType))];

  const everyRarity = cards.map((element) => element.rarity);
  const rarities = [...new Set(Object.values(everyRarity))];

  useEffect(() => {
    // Filter by color(s)
    let colorCards = [];
    if (colorEvent.length > 0) {
      colorCards = [].concat(
        ...Object.values(
          colorEvent.map((item) =>
            cards.filter((card) => card.colors[0] === item)
          )
        )
      );
    }

    // Filter by type and rarity
    if (colorCards.length > 0) {
      if (typeEvent && rarityEvent) {
        setTestFilter(
          colorCards.filter(
            (item) => item.types[0] === typeEvent && item.rarity === rarityEvent
          )
        );
      } else if (typeEvent && !rarityEvent) {
        setTestFilter(colorCards.filter((item) => item.types[0] === typeEvent));
      } else if (!typeEvent && rarityEvent) {
        setTestFilter(colorCards.filter((item) => item.rarity === rarityEvent));
      } else {
        setTestFilter(colorCards);
      }
    } else {
      if (typeEvent && rarityEvent) {
        setTestFilter(
          cards.filter(
            (item) => item.types[0] === typeEvent && item.rarity === rarityEvent
          )
        );
      } else if (typeEvent && !rarityEvent) {
        setTestFilter(cards.filter((item) => item.types[0] === typeEvent));
      } else if (!typeEvent && rarityEvent) {
        setTestFilter(cards.filter((item) => item.rarity === rarityEvent));
      } else {
        setTestFilter(cards);
      }
    }
  }, [colorEvent, typeEvent, rarityEvent]);

  // Separate events (e) depends on what filter is used
  const allFilter = (e) => {
    if (colors.includes(e)) {
      setColorEvent((prev) =>
        prev.includes(e) === false
          ? [...prev, e].sort()
          : colorEvent.filter((r) => r !== e)
      );
    }
    if (types.includes(e)) {
      setTypeEvent(e);
    }
    if (rarities.includes(e)) {
      setRarityEvent(e);
    }
  };

  if (!isLoaded) {
    return (
      <div className="loading-screen">
        <p>Loading ...</p>
        <img src={card} alt={"card-animation"} />
      </div>
    );
  } else {
    return (
      <div>
        {console.log(search)}
        <div className="searchbar">
          <input
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Search.."
            name="search"
          />
          <div className="checkbox-container">
            <ColorFilter allFilter={allFilter} cards={cards} />
          </div>

          <div className="dropdown-container">
            <TypeFilter allFilter={allFilter} cards={cards} />
            <RarityFilter allFilter={allFilter} cards={cards} />
          </div>

          <div className="list-container">
            {search
              ? search
              : testFilter.map((item, index) => {
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
                })}
          </div>
        </div>
      </div>
    );
  }
};

export default NewFetch;
