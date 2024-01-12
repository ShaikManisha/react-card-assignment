import { useState } from "react";
import "./App.css";

function App() {
  const [deck, setDeck] = useState(getInitialCards());
  const [drawnCards, setDrawnCards] = useState([]);
  console.log(deck, "deck");

  function getInitialCards() {
    const suits = ["♠", "♥", "♦", "♣"];
    const ranks = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "K",
      "Q",
    ];

    const deck = [];
    // console.log(deck, "deck");
    for (const suit of suits) {
      for (const rank of ranks) deck.push({ suit, rank });
    }
    return deck;
  }

  const handleClick = () => {
    if (deck.length === 0) {
      alert("No more cards in deck");
      return;
    }

    const reamainingCards = [...deck];
    const drawnSets = [];
    for (let i = 0; i < 5; i++) {
      if (reamainingCards.length === 0) break;
      const randomIndex = Math.floor(Math.random() * reamainingCards.length);
      const drawnCards = reamainingCards[randomIndex];

      drawnSets.push(drawnCards);
      reamainingCards.splice(randomIndex, 1);
    }

    if (reamainingCards.length === 0) {
      alert("No more cards in deck!");
    } else {
      setDeck(reamainingCards);
      setDrawnCards([...drawnCards, ...drawnSets]);
    }
  };

  const getCardColor = (suit) => {
    return suit === "♥" || suit === "♦" ? "red" : "black";
  };

  return (
    <div className="App">
      <button className="button-card" onClick={handleClick}>
        Draw Card
      </button>
      {drawnCards.length > 0 && (
        <div className="card-grid">
          {drawnCards.map((item, index) => (
            <div className={`card ${getCardColor(item.suit)}`} key={index}>
              <div className="rank">{item.rank}</div>
              <div className="symbol">{item.suit}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
