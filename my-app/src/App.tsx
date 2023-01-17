import React, {useState} from 'react';
import './App.css';
import axios from "axios";
import {Pokemon} from "pokenode-ts";

function App() {

  const [pokemonName, setPokemonName] = useState("");
  const [pokemonInfo, setPokemonInfo] = useState<undefined | Pokemon | any>(undefined);

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

      {(pokemonInfo == undefined) ? 
      (<p>Pokemon was not found, please enter a pokemon name.</p>) :
      <section className="card">
        <h1>{pokemonInfo.name.charAt(0).toUpperCase() + pokemonInfo.name.slice(1)}</h1>
        <img src={pokemonInfo.sprites.other.dream_world.front_default}/>
      </section>}

    </div>
  );
}

export default App;
