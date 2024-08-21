import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

const DialogPoke = ({ poke, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ display: "flex", justifyContent: "center" }} >Details</DialogTitle>
      <DialogContent>
        <Card sx={{ minWidth: 275, margin: "10px" , display: "flex" , justifyContent: "center"}}>
          <CardContent sx={{ display: "flex", justifyContent: "center" , flexDirection: "column" , alignItems: "center"}}>
            <div>
              <img src={poke?.sprites?.other.showdown.front_default} alt="" />
            </div>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Pokemon Name
            </Typography>
            <Typography variant="h5" component="div">
              {poke?.name || "Unknown Pokemon"}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Types:{" "}
              {poke?.types?.map((typeInfo) => typeInfo.type.name).join(", ") ||
                "Unknown Type"}
            </Typography>
            <Typography variant="body2">
              Height: {poke.height || "No Height available."} M
            </Typography>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogPoke;
