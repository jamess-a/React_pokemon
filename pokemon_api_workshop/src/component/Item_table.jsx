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
  const [items, setItems] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    const loadItems = async () => {
      try {
        setLoading(true);
        let response = await axios.get(
          "https://pokeapi.co/api/v2/item/master-ball/",
          {
            signal: abortController.signal,
          }
        );
        let items = response.data.results;
        setItems(items);
        setError("");
      } catch (error) {
        setError("Something went wrong: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
    return () => abortController.abort();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  console.log(items);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      <Card>{items}</Card>
    </Box>
  );
}
