import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/system";

const CustomList = styled(List)(({ theme }) => ({
  padding: 0,
  width: "100%",
  maxWidth: 360,
  borderRadius: 10,
  border: "1px solid",
  borderColor: "black",
  backgroundColor: "gray",
  textAlign: "center",
}));
const List1 = styled(List)(({ theme }) => ({
  padding: 0,
  width: "100%",
  maxWidth: 360,
  backgroundColor: "gray",
  textAlign: "center",
}));


const Listbox1 = ({ poke1 }) => {
  //console.log("poke1:", poke1); 

  return (
    <CustomList aria-label="pokemon abilities">
      {poke1?.abilities?.map((abil, index) => (
        <React.Fragment key={index}>
          <ListItem>
            <List1>
              <ListItemText
                primary={abil?.ability?.name || "No ability name"}
              />
            </List1>
          </ListItem>
          {index < poke1.abilities.length - 1 && <Divider component="li" />}
        </React.Fragment>
      ))}
    </CustomList>
  );
};

export default Listbox1;
