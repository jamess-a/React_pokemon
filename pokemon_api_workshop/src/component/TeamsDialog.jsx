import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";

const DialogTeams = ({ poketeam, open, onClose }) => {
  const [poketeams, setPoketeam] = useState(poketeam);

  const handleRemoveFromTeam = (pokemonId) => {
    const newTeam = poketeams.filter((pokemon) => pokemon.id !== pokemonId);
    setPoketeam(newTeam);
  };

  return (
    <Dialog
      open={open}
      onClose={() => onClose(poketeams)} 
      fullWidth
      maxWidth="lg"
      sx={{ width: "100%" }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
        Your Team!
      </DialogTitle>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {poketeams.map((pokemon) => (
          <Card key={pokemon.id} sx={{ width: "20%", margin: "10px" }}>
            <CardContent>
              <div>
                <img
                  src={
                    pokemon?.sprites?.other["official-artwork"].front_default
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
                {pokemon?.name || "Unknown Pokemon"}
              </Typography>
            </CardContent>
            <CardActions
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                size="small"
                onClick={() => handleRemoveFromTeam(pokemon.id)}
                sx={{
                  color: "primary.main",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              >
                Remove from Team
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={() => onClose(poketeams)}>Close</Button> {/* Update onClose to pass updated team */}
      </DialogActions>
    </Dialog>
  );
};

export default DialogTeams;
