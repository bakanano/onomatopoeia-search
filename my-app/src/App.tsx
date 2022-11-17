import React, {useState} from 'react';
import './App.css';

function App() {

  const [pokemonName, setPokemonName] = useState("");
  
  return (
    <div className="App">
      <p>Hello, World!</p>
    </div>
  );
}

export default App;
