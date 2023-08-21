import React, {useState, useEffect} from 'react';
import "./App.css";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import {IconButton, TextField, Card, Grid} from "@mui/material/";

function App() {

  const [onomatopoeia, setOnomatopoeia] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [wordInfo, setWordInfo] = useState([]);
  const [backgroundColors, setBackgroundColors] = useState<string[]>([]);

  const BASE_URL = "https://cors-proxy-onomatopoeia-7e2ec4ca0944.herokuapp.com/https://jisho.org/api/v1/search/words";
  
  function search() {
    try {
      axios.get(`${BASE_URL}?keyword=${encodeURI(onomatopoeia)}`)
        .then((res) => {
          const onomatopoeiaWord = res.data.data.filter((word: any) => {
            return word.senses.some((sense: any) => sense.tags.includes("Onomatopoeic or mimetic word"))
          })
          if (onomatopoeiaWord.length === 0) {
            setErrorMessage("Please enter a onomatopoeic word");
            setWordInfo([]);
          } else {
            setWordInfo(onomatopoeiaWord);
            setErrorMessage("");
            setBackgroundColors(Array(onomatopoeiaWord.length).fill(getBackgroundColor()));
          }
      });

    } catch(error) {
          console.error("Error", error);
    }
  }
  
  function getBackgroundColor() {
    const colors = ["#EEE8AA", "#A8A77A", "#EE8130", "#6390F0", "#F7D02C", "#7AC74C", "#E2BF65", "#F95587", "#96D9D6", "#6F35FC", "#C22E28", "#D685AD", "#B7B7CE", "#A33EA1", "#705746", "#B6A136"]
    return colors[Math.floor(Math.random() * colors.length)];
  }

    return (
    <div className="App">

      <h1>Japanese Onomatopoeia Search</h1>

      <section className="container">

        <TextField 
        type="text"
        variant="outlined"
        label="Enter word"
        placeholder="Search"
        name="onomatopoeia"
        value={onomatopoeia}
        onChange={(e)=> setOnomatopoeia(e.target.value)}>
        </TextField>
        <IconButton
        aria-label="search"
        color="primary"
        onClick={search}>
          <SearchIcon></SearchIcon>
        </IconButton>
      </section>

      {errorMessage && <p className="error">{errorMessage}</p>}

      {wordInfo.map((word: any, index) => (

        <section>
          <Card style={{background: backgroundColors[index]}}>
            <Grid>
              <div className="wordInfo" key={index}>
                <h1>{word.japanese[0]?.reading}</h1>
                <p><b>Type:</b> {word.senses[0].tags[0]}</p>
                <p><b>Meanings:</b> {word.senses.map((sense: any, senseIndex: number) => (
                  <span key={senseIndex}>
                    {sense.english_definitions.join(", ")}
                    {senseIndex !== word.senses.length - 1 && <br/>}
                  </span>
                ))}
                </p>
                <p><b>Parts of Speech:</b> {word.senses.map((sense: any, senseIndex: number) => (
                  <span key={senseIndex}>
                    {sense.parts_of_speech.join(', ')}
                    {senseIndex !== word.senses.length - 1 && ', '}
                  </span>
                ))}</p>
              </div>
            </Grid>
          </Card>
        </section>
      ))}
    </div>
    )
}

export default App;
