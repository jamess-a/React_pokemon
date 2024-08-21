import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import DialogPoke from "./allcarddialog";
import { IconButton, Snackbar, Alert } from "@mui/material";
import DialogPokeTeame from "./TeamsDialog";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function PokemonCardList() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpenTeams, setDialogOpenTeams] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [success, setSuccess] = useState(false);
  const [pokename, setPokename] = useState("");
  const [select_poketeam, setPoketeam] = useState([]);
  const [teams, setTeams] = useState([]);

  const handleDialogOpen = (pokecard) => {
    setSelectedPokemon(pokecard);
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedPokemon(null);
  };

  const handleAddToTeam = (pokecard) => {
    setPokename(pokecard.name);
    let newTeam = [...select_poketeam, pokecard];
    setPoketeam(newTeam);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleDialogOpenTeams = (newTeam) => {
    setTeams(newTeam);
    console.log(" Your current team is ",teams);
    setDialogOpenTeams(true);
  };

  const handleDialogCloseTeams = (teams) => {
    setDialogOpenTeams(false);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const loadPokemons = async () => {
      try {
        setLoading(true);
        let response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=20",
          {
            signal: abortController.signal,
          }
        );
        let pokemons = response.data.results;

        // Fetch additional data for each Pokémon (like sprites)
        let detailedPokemons = await Promise.all(
          pokemons.map(async (pokemon) => {
            let details = await axios.get(pokemon.url);
            return details.data;
          })
        );

        setPokemonList(detailedPokemons);
        setError("");
      } catch (error) {
        setError("Something went wrong: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    loadPokemons();
    return () => abortController.abort();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      <Button
        onClick={() => handleDialogOpenTeams(teams)}
        variant="contained"
        color="primary"
        startIcon={<WorkspacesIcon />}
        sx={{ padding: "8px 16px", borderRadius: "8px" }}
      >
        <Typography variant="button" sx={{ marginLeft: "8px" }}>
          My Teams
        </Typography>
      </Button>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {pokemonList.map((pokecard) => (
          <Card key={pokecard.id} sx={{ width: "30%", margin: "10px" }}>
            <CardContent>
              <div>
                <img
                  src={
                    pokecard?.sprites?.other["official-artwork"].front_default
                  }
                  alt=""
                  style={{ width: "100%" }}
                />
              </div>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Pokemon Name
              </Typography>
              <Typography variant="h5" component="div">
                {pokecard?.name || "Unknown Pokemon"}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Types:{" "}
                {pokecard?.types
                  ?.map((typeInfo) => typeInfo.type.name)
                  .join(", ") || "Unknown Type"}
              </Typography>
              <Typography variant="body2">
                Height: {pokecard?.height || "No Height available."} M
              </Typography>
            </CardContent>
            <CardActions
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                size="small"
                onClick={() => handleDialogOpen(pokecard)}
                sx={{
                  color: "primary.main",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              >
                Learn More
              </Button>
              <IconButton
                onClick={() => handleAddToTeam(pokecard)}
                sx={{
                  color: "primary.main",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.2)",
                  },
                }}
              >
                <AddCircleOutlineIcon fontSize="small" />
              </IconButton>
            </CardActions>
          </Card>
        ))}

        {select_poketeam.length > 0 ? (
          <DialogPokeTeame
            poketeam={select_poketeam}
            open={dialogOpenTeams}
            onClose={handleDialogCloseTeams}
          />
        ) : (
          <Dialog open={dialogOpenTeams} onClose={handleDialogCloseTeams}>
            <DialogTitle>No Member</DialogTitle>
            <DialogContent>
              <DialogContentText>
                There are no members in your team yet!.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogCloseTeams} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={success}
          autoHideDuration={3000}
          onClose={() => setSuccess(false)}
          key={"topcenter"}
        >
          <Alert onClose={() => setSuccess(false)} severity="success">
            Added {pokename} to your teams successful!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
