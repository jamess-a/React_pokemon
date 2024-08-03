import React, { Component } from 'react';
import Button from '@mui/material/Button';

export default class Box extends Component {
   constructor(props) {
    super(props);
   } 
  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <ul>
        {this.props.poke1.abilities?.map((abil, index) => (
          <li key={index}>{abil.ability.name}</li>
        ))}
      </ul>
      </div>
    );
  }
}
