import { Component, useEffect, useState } from "react";
import axios from "axios";
import Box from "./componant/box.jsx";
import Listbox1 from "./componant/listbox.jsx";
import { styled } from "@mui/system";
import "./App.css";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  padding: "10px",
});

function App() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [poke, setPoke] = useState("");
  const [number, setNumber] = useState(6);

  useEffect(() => {
    let abortController = new AbortController();
    const loadPokemon = async () => {
      try {
        setLoading(true);
        let response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${number}`,
          {
            signal: abortController.signal,
          }
        );
        setPoke(response.data);
        setError("");
      } catch (error) {
        setError("Something went wrong" + error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
    return () => abortController.abort();
  }, [number]);

  const Next_Pokemon = () => {
    setNumber((number) => number + 1);
  };

  const Prev_Pokemon = () => {
    setNumber((number) => number - 1);
  };

  return (
    <>
      <Container>
        <div>
          <img src={poke?.sprites?.other.home.front_default} alt="" />
        </div>
        <Listbox1 style={{ marginTop: "10px" }} poke1={poke} />
      </Container>
      <button
        style={{
          marginRight: "10px",
          marginTop: "10px",
          marginBottom: "10px",
        }}
        onClick={() => Prev_Pokemon()}
      >
        Previous
      </button>
      <button onClick={() => Next_Pokemon()}>Next</button>






    </>
  );
}

export default App;
