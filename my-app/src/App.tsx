import React, {useState} from 'react';
import './App.css';
import axios from "axios";
import {Pokemon} from "pokenode-ts";
import SearchIcon from "@mui/icons-material/Search";
import {IconButton, TextField, Card} from "@mui/material/";

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
  
  function getBackgroundColor(poke: Pokemon | undefined | null) {
    let backgroundColor = "#EEE8AA";
    if (poke === undefined || poke === null) {
      return backgroundColor;
    }
    let pokemonTypes = poke.types.map((pokeType) => pokeType.type.name);
    if (pokemonTypes.includes("normal")) {
      backgroundColor = "#A8A77A";
    } else if (pokemonTypes.includes("fire")) {
      backgroundColor = "#EE8130";
    } else if (pokemonTypes.includes("water")) {
      backgroundColor = "#6390F0";
    } else if (pokemonTypes.includes("electric")) {
      backgroundColor = "#F7D02C";
    } else if (pokemonTypes.includes("grass")) {
      backgroundColor = "#7AC74C";
    } else if (pokemonTypes.includes("ice")) {
      backgroundColor = "#96D9D6";
    } else if (pokemonTypes.includes("fighting")) {
      backgroundColor = "#C22E28";
    } else if (pokemonTypes.includes("poison")) {
      backgroundColor = "#A33EA1";
    } else if (pokemonTypes.includes("ground")) {
      backgroundColor = "#E2BF65";
    } else if (pokemonTypes.includes("flying")) {
      backgroundColor = "#A98FF3";
    } else if (pokemonTypes.includes("psychic")) {
      backgroundColor = "#F95587";
    } else if (pokemonTypes.includes("bug")) {
      backgroundColor = "#A6B91A";
    } else if (pokemonTypes.includes("rock")) {
      backgroundColor = "#B6A136";
    } else if (pokemonTypes.includes("ghost")) {
      backgroundColor = "#735797";
    } else if (pokemonTypes.includes("dragon")) {
      backgroundColor = "#6F35FC";
    } else if (pokemonTypes.includes("dark")) {
      backgroundColor = "#705746";
    } else if (pokemonTypes.includes("steel")) {
      backgroundColor = "#B7B7CE";
    } else if (pokemonTypes.includes("fairy")) {
      backgroundColor = "#D685AD";
    }
    return backgroundColor;
  }

  return (
    <div className="App">

      <h1>Pokémon Search</h1>

      <section className="container">

        <TextField 
        type="text"
        variant="outlined"
        label="Enter a Pokémon"
        placeholder="Search"
        name="pokemon-name"
        value={pokemonName}
        onChange={(prop: any)=> setPokemonName(prop.target.value)}>
        </TextField>
        <IconButton
        aria-label="search"
        color="primary"
        onClick={search}>
          <SearchIcon></SearchIcon>
        </IconButton>
      </section>

      {(pokemonInfo == undefined) ? 
      (<div></div>) :
      <section>
        <Card sx={{backgroundColor: getBackgroundColor(pokemonInfo)}}>
            {pokemonInfo === undefined || pokemonInfo === null ? (
            <h1>Pokemon was not found, please enter a pokemon name.</h1>
            ) : (
              <div>
                <h1>{pokemonInfo.name.charAt(0).toUpperCase() + pokemonInfo.name.slice(1)}</h1>
                <img src={pokemonInfo.sprites.other.dream_world.front_default}/>
                <p>Type: {getPokemonType()}</p>
                <p>Abilties: {getPokemonAbilities().toString()}</p>
                <p>Held Item(s): {getHeldItem().toString()}</p>
              </div>
            )}
        </Card>
      </section>}

    </div>
  );
}

export default App;
