import "./App.css";
import Gameboard from "./components/Gameboard";

import React from "react";

function App() {
  return (
    <div id="app">
      <Gameboard size={25} />
    </div>
  );
}

export default App;
