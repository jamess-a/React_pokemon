import { Component, useEffect, useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import axios from "axios";
import Box from "./component/box.jsx";
import Listbox1 from "./component/listbox.jsx";
import Card from "./component/card.jsx";
import { styled } from "@mui/system";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Login from "./component/Login";
import Register from "./component/Register";
import Profile from "./component/Profile.jsx";
import "./App.css";

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
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </AuthProvider>
      <Container2_Row>
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
export default App;
