import React, {useState} from 'react';
import './App.css';
import axios from "axios";

function App() {

  const [pokemonName, setPokemonName] = useState("");
  const [pokemonInfo, setPokemonInfo] = useState<undefined | any>(undefined);

  const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

  function search() {
    axios.get(BASE_URL + pokemonName)
          .then((res) => setPokemonInfo(res.data));
  }
  
  return (
    <div className="App">

      <h1>Pokémon Search</h1>

      <section className="container">

        <label>Pokémon Name</label>
        <input type="text" name="pokemon-name" 
        onChange={e=> setPokemonName(e.target.value)}></input>
        <button onClick={search}>Search</button>

      </section>

    </div>
  );
}

export default App;
