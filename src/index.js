import { render } from 'react-dom'
import React from "react";
import Deck from "./Deck";
import "./Card.css";

function App() {
  return (
    <div className="App">
      <Deck />
    </div>
  );
}

export default App;

render(<App />, document.getElementById('root'))