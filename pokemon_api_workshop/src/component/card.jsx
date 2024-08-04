import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState, useEffect } from "react";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function BasicCard({ pokecard }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [newpokecard, setPokeCard] = useState("");

  useEffect(() => {
    let abortController = new AbortController();
    const loadPokemon = async () => {
      try {
        setLoading(true);
        let response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokecard?.id}/encounters`,
          {
            signal: abortController.signal,
          }
        );
        setPokeCard(response.data);
        setError("");
      } catch (error) {
        setError("Something went wrong: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
    return () => abortController.abort();
  }, []);


  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <div>
          <img src={pokecard?.sprites?.other.showdown.front_default} alt="" />
        </div>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Pokemon Name
        </Typography>
        <Typography variant="h5" component="div">
          {pokecard?.name || "Unknown Pokemon"}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Types: {pokecard?.types?.[0]?.type?.name || "Unknown Type"}
        </Typography>
        <Typography variant="body2">
          Height: {pokecard?.height || "No Height available."} M
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
