/*
  Home.js: Main landing page
  Cameron: Responsible for GUI -- Header(Jumbotron), Buttons, Styles
  Last Updated: 7/7/20 @ 8:00pm by Cameron
*/

import React, {Component, useState} from 'react'
import styled from 'styled-components';
import P5Wrapper from 'react-p5-wrapper'
import sketch from './components/sketch'
let beginSort= {
    active: false,
    isPressed: false,
};
let arraySize = 50;
export{beginSort,arraySize};
const Styles = styled.div`
  .off{
    background: burlywood;
    color: black;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid burlywood;
    border-radius: 3px;  
  }
  
  .on{
    background: teal;
    color: white;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid teal;
    border-radius: 3px;  
  }
`;

const Button = styled.button`
  background: burlywood;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid burlywood;
  border-radius: 3px;

  &:hover{
    background: skyblue !important;
    border: 2px solid skyblue;
  }
`;


const BeginButton = styled.button`
  background: ${props => props.primary ? "mediumseagreen": "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid mediumseagreen;
  border-radius: 3px;
`;

export const sortType = [
  {
    id: 0,
    value: 'Bubble',
    active: true
  },
  {
    id: 1,
    value: 'Quick',
    active: false
  },
  {
    id: 2,
    value: 'Merge',
    active: false
  },
  {
    id: 3,
    value: 'Insertion',
    active: false
  },
  {
    id: 4,
    value: 'Selection',
    active: false
  }
];
function sort(id) {
 beginSort.active=true;
 beginSort.isPressed=true;
};


export default class Home extends React.Component {
  //Holds the state of the current page to be shown
  state = {
      id: 0,
      value: sortType[0].value + " Sort",
      isActive: false,
      stateSketch:sketch,
  };
  
  //Changes the current state of the page to the active button clicked
  changeState = (_id) =>{
    //Ensures that only the correct sortType is active
    for (var i = 0; i < sortType.length; ++i){
      sortType[i].active = false;
      if (i === _id){
        sortType[_id].active = true;
        }
    }
    //Ensures that only the correct button/state of the page is active
    this.setState({
      id: _id,
      value: sortType[_id].value + " Sort",
      isActive: sortType[_id].active,
    })
    beginSort.isPressed=true;
  }
  changeSlider= (value) =>{
    arraySize=value;
    let iterator;
    iterator.next();
  }
  render() {
    //Creates buttons based off the number of different sorts along with Begin Sort Button
    const Buttons = []
    for (const[index, value] of sortType.entries()){
      Buttons.push(
        <Button  onClick={() => this.changeState(index)} 
                 className={this.state.id === sortType[index].id ? "Button on" : " off"}>
          {sortType[index].value}
        </Button>
      )
    }
    Buttons.push(<BeginButton primary onClick={() => sort(this.state.id)}>Begin Sort</BeginButton>)

    return (
      <Styles>
        <div>
          
          {Buttons}
          <input type="range" min="10" max="300" value={arraySize} ></input>
          <h1>{this.state.value}</h1>
          <P5Wrapper sketch={this.state.stateSketch}></P5Wrapper>
        </div>
      </Styles>
    );
  }
}