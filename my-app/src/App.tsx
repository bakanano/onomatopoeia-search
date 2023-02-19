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
  
  function getPokemonType() {
    if (pokemonInfo !== undefined && pokemonInfo !== null) {
      return pokemonInfo.types.map((pokemonType: any) => (pokemonType.type.name));
    }
  }

  function getPokemonAbilities() {
    if (pokemonInfo !== undefined && pokemonInfo !== null) {
      return pokemonInfo.abilities.map((pokemonAbility: any) => (pokemonAbility.ability.name));
    }
  }

  function getHeldItem() {
    if (pokemonInfo !== undefined && pokemonInfo !== null) {
      if (pokemonInfo.held_items.length === 0) {
        return "None";
      }
      return pokemonInfo.held_items.map((heldItem: any) => (heldItem.item.name));
    }
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
        <p>Type: {getPokemonType()}</p>
        <p>Abilties: {getPokemonAbilities().toString()}</p>
        <p>Held Item(s): {getHeldItem().toString()}</p>
      </section>}

    </div>
  );
}

export default App;
