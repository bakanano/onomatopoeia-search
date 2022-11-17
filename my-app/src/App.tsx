import React, {useState} from 'react';
import './App.css';

function App() {

  const [pokemonName, setPokemonName] = useState("");
  
  return (
    <div className="App">
      <h1>Pokémon Search</h1> 
    </div>
  );
}

export default App;
