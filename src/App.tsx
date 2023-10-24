import React, {useState} from 'react';
import "./App.css";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import Fab from "@mui/material/Fab";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {IconButton, TextField, Card, Grid} from "@mui/material/";

const COLORS = [
  "#EEE8AA",
  "#A8A77A", 
  "#EE8130", 
  "#6390F0", 
  "#F7D02C", 
  "#7AC74C", 
  "#E2BF65", 
  "#F95587", 
  "#96D9D6", 
  "#6F35FC", 
  "#C22E28", 
  "#D685AD", 
  "#B7B7CE", 
  "#A33EA1", 
  "#705746", 
  "#B6A136"
]
const BASE_URL = "https://cors-proxy-onomatopoeia-7e2ec4ca0944.herokuapp.com/https://jisho.org/api/v1/search/words";

function App() {

  const [onomatopoeia, setOnomatopoeia] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [wordInfo, setWordInfo] = useState([]);
  const [backgroundColors, setBackgroundColors] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  
  function search() {
    try {
      axios.get(`${BASE_URL}?keyword=${encodeURI(onomatopoeia)}`)
        .then((res) => {
          const onomatopoeiaWord = res.data.data.filter((word: any) => {
            return word.senses.some((sense: any) => sense.tags.includes("Onomatopoeic or mimetic word"))
          })
          if (onomatopoeiaWord.length === 0) {
            setErrorMessage("Please enter onomatopoeic word e.g. pachipaci");
            setWordInfo([]);
            setBackgroundColors([])
          } else {
            setWordInfo(onomatopoeiaWord);
            setErrorMessage("");
            setBackgroundColors(Array(onomatopoeiaWord.length).fill(getBackgroundColor()));
          }
      });

    } catch(error) {
          setErrorMessage("Error fetching data. Please try again.");
          console.error("Error", error);
    }
  }

  function handleKeyDown(event:any) {
    if (event.key === "Enter") {
      search()
    }

  }
  
  function getBackgroundColor() { 
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  }

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

    return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>

      <h1>Japanese Onomatopoeia Search</h1>
      <div className="darkModeToggle">
        <Fab color="primary" onClick={toggleDarkMode}>{darkMode ?  <Brightness7Icon /> : <Brightness4Icon />}</Fab>
      </div>
      <section className="container">
        <div className="input-container">
          <TextField 
          type="text"
          variant="outlined"
          label="e.g. dokidoki"
          placeholder="Search"
          name="onomatopoeia"
          value={onomatopoeia}
          onChange={(e)=> setOnomatopoeia(e.target.value)}
          onKeyDown={handleKeyDown}
          inputProps={{ style: { color: "white"}}}>
          </TextField>
          <IconButton
            aria-label="search"
            color="primary"
            onClick={search}>
            <SearchIcon></SearchIcon>
          </IconButton>
        </div>
      </section>

      {errorMessage && <p className="error">{errorMessage}</p>}

      {wordInfo.map((word: any, index) => (

        <section key={index}>
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
