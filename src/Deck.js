import React from "react";
import axios from 'axios';
import Card from "./Card";
import "./Deck.css";
const BASE_API_URL = "https://deckofcardsapi.com/api/deck";

class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deck: null, drawn: [] };
    this.getCard = this.getCard.bind(this);
  }
  async componentDidMount() {
    let deck = await axios.get(`${BASE_API_URL}/new/shuffle/`);
    this.setState({ deck: deck.data });
  }

  async getCard() {
    let deck_id = this.state.deck.deck_id;
    try {
      let cardUrl = `${BASE_API_URL}/${deck_id}/draw/`;
      let cardRes = await axios.get(cardUrl);
      if (!cardRes.data.success) {
        throw new Error("No Card Remaining");
      }
      let card = cardRes.data.cards[0];
      this.setState(st => ({
        drawn: [
          ...st.drawn,
          {
            id: card.code,
            image: card.image,
            name: `${card.suit} ${card.value}`
          }
        ]
      }));
    } catch (err) {
      alert(err);
    }
  }
  render() {
    const cards = this.state.drawn.map(c => (
      <Card key={c.id} name={c.name} image={c.image} />
    ));
    return (
      <div className="Deck">
        <h1>Deck of Cards</h1>
        <button onClick={this.getCard} className="ui orange button">
          Get Card
        </button>
        <div className="Deck-cardarea">{cards}</div>
      </div>
    );
  }
}

export default Deck;
