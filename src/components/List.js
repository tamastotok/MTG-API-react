import React, { Component } from "react";
import Card from "./Card";

//API = "https://api.magicthegathering.io/v1/cards";
// cards: colors, types, subtypes, supertypes, rarity, text

class List extends Component {
  // List every data what I need
  constructor() {
    super();
    this.state = {
      database: null,
      cards: null,
      name: [],
      cardName: null,
      img: null,
      colors: null,
      types: null,
      subtypes: null,
      supertypes: null,
      rarity: null,
      text: null,
      isLoaded: false,
      prevState: "",
    };
  }

  handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  // Make the HTTP Api request
  async componentDidMount() {
    await fetch("https://api.magicthegathering.io/v1/cards")
      .then((response) => this.handleResponse(response))
      .then((data) => {
        for (let i = 0; i < data.cards.length; i++) {
          this.setState({
            cards: data.cards,
            name: [...this.state.name, data.cards[i].name],
            cardName: data.name,
            img: data.cards.imageUrl,
            colors: data.cards.colors,
            types: data.cards.types,
            subtypes: data.cards.subtypes,
            supertypes: data.cards.supertypes,
            rarity: data.cards.rarity,
            text: data.cards.text,
            isLoaded: true,
          });
        }
        console.log(this.state.name);
      });
  }

  render() {
    const { cards, isLoaded } = this.state;

    // Render the cards when its loaded
    if (!isLoaded) {
      return <p>Loading ...</p>;
    } else {
      return (
        <div className="list-container">
          {cards
            .filter((element) => {
              return (
                element.name
                  .toLowerCase()
                  .indexOf(this.props.value.toLowerCase()) >= 0
              );
            })
            .filter((element) => {
              return element.colors.indexOf(this.props.color);
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
            })}
        </div>
      );
    }
  }
}

export default List;
