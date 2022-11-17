import React, {useState} from 'react';
import './App.css';

function App() {

  const [pokemonName, setPokemonName] = useState("");

  function search() {
    console.log("I've been clicked!");
  }
  
  return (
    <div className="App">
      <h1>Pokémon Search</h1>

      <section className="container">
        <label>Pokémon Name</label>
        <input type="text" name="pokemon-name" onChange={e=> setPokemonName(e.target.value)}></input>
        <button onClick={search}>Search</button>
      </section>
    </div>
  );
}

export default App;
