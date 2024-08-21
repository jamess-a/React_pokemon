import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const DialogTeams = ({ poketeam, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg" sx={{ width: "100%" }}>
      <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
        Your Teams !
      </DialogTitle>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {poketeam.map((poketeam) => (
          <Card key={poketeam.id} sx={{ width: "20%", margin: "10px" }}>
            <CardContent>
              <div>
                <img
                  src={
                    poketeam?.sprites?.other["official-artwork"].front_default
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
                {poketeam?.name || "Unknown Pokemon"}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Types:{" "}
                {poketeam?.types
                  ?.map((typeInfo) => typeInfo.type.name)
                  .join(", ") || "Unknown Type"}
              </Typography>
              <Typography variant="body2">
                Height: {poketeam?.height || "No Height available."} M
              </Typography>
            </CardContent>
            <CardActions
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button size="small" onClick={() => handleAddToTeam(poketeam)}>
                Remove from Team
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Dialog>
  );
};

export default DialogTeams;
