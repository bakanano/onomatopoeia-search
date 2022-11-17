import React, {useState} from 'react';
import './App.css';

function App() {

  const [pokemonName, setPokemonName] = useState("");
  
  return (
    <div className="App">
      <h1>Pokémon Search</h1>

      <section className="container">
        <label>Pokémon Name</label>
        <input type="text" name="pokemon-name"></input>
      </section>
    </div>
  );
}

export default App;
