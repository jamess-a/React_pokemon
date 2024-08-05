// src/components/Pokemon.jsx
import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import axios from "axios";
import Box from "./box.jsx";
import Listbox1 from "./listbox.jsx";
import Card from "./card.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
import Profile from "./Profile.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  padding: "10px",
});

const Container2_Row = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  textAlign: "center",
  padding: "10px",
});

function Pokemon() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [poke, setPoke] = useState("");
  const [number, setNumber] = useState(6);
  const [dialogOpen, setDialogOpen] = useState(false);
  
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
      <Container2_Row>
        <Profile />
        <Container>
          <h1>{poke?.name}</h1>
          <div>
            <img src={poke?.sprites?.other.home.front_default} alt="" />
          </div>
          <Listbox1 style={{ marginTop: "10px" }} poke1={poke} />
        </Container>
        <Container>
          <Card pokecard={poke} />
          <Container2_Row>
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
          </Container2_Row>
        </Container>
      </Container2_Row>
    </>
  );
}

export default Pokemon;
