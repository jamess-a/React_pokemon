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

const DialogPoke = ({ poke, open, onClose }) => {
  const [pokes, setPoketeam] = useState(poke);

  return (
    <Dialog
      open={open}
      onClose={() => onClose(pokes)}
      fullWidth
      maxWidth="md"
      sx={{ width: "100%" }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
        Details
      </DialogTitle>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          direction: "row",
          justifyContent: "start",
        }}
      >
        <Card key={pokes.id} sx={{ width: "20%", margin: "10px" }}>
          <CardContent>
            <div>
              <img
                src={pokes?.sprites?.other["official-artwork"].front_default}
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
              {pokes?.name || "Unknown Pokemon"}
            </Typography>
          </CardContent>
          <CardActions
            sx={{ display: "flex", justifyContent: "space-between" }}
          ></CardActions>
        </Card>
        <Card key={pokes.id} sx={{ width: "20%", margin: "10px" }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              TEST
            </Typography>
            <Typography variant="h5" component="div">
              1
            </Typography>
            <Typography variant="h5" component="div">
              2
            </Typography>
            <Typography variant="h5" component="div">
              3
            </Typography>
          </CardContent>
          <CardActions
            sx={{ display: "flex", justifyContent: "space-between" }}
          ></CardActions>
        </Card>
      </Box>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={() => onClose(pokes)}>Close</Button>{" "}
        {/* Update onClose to pass updated team */}
      </DialogActions>
    </Dialog>
  );
};

export default DialogPoke;
