/*
  Home.js: Main landing page
  Cameron: Responsible for GUI -- Header(Jumbotron), Buttons, Styles
  Last Updated: 7/7/20 @ 8:00pm by Cameron
*/

import React, {Component, useState} from 'react'
import styled from 'styled-components';
import SortingView from './components/SortingView';
import { sortArray } from './components/sketch'
import P5Wrapper from 'react-p5-wrapper'
import sketch from './components/sketch'
export let beginSort = false;
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
    value: 'Heap',
    active: false
  },
  {
    id: 4,
    value: 'Selection',
    active: false
  }
];
function sort(id) {
 beginSort=true;
 
  {/*If id == 0*/}
  /*
  function bubbleSort() {
      var swapped;
      do {
          swapped = false;
          for (var i=0; i < sortArray.length-1; i++) {
              if (sortArray[i] > sortArray[i+1]) {
                  var temp = sortArray[i];
                  sortArray[i] = sortArray[i+1];
                  sortArray[i+1] = temp;
                  swapped = true;
              }
          }
      } while (swapped);
  }

  
  function quicksort() {
      if (sortArray.length <= 1) {
      return sortArray;
      }
  
      var pivot = sortArray[0];
      
      var left = []; 
      var right = [];
  
      for (var i = 1; i < sortArray.length; i++) {
          sortArray[i] < pivot ? left.push(sortArray[i]) : right.push(sortArray[i]);
      }
  
      return quicksort(left).concat(pivot, quicksort(right));
  };

  
  function selectionSort(){
      for (let i = 0; i < sortArray.length; i++){
          let indexOfMin = i // set index of min to the 
          let j = i // set the index to run the while loop for calculating min
          let min = sortArray[i] // set the initial value of minimum
  
          // find the minimum from i to end of array
          while (j < sortArray.length){
              if (sortArray[j] < min){
                  min = sortArray[j]
                  indexOfMin = j
              }
              j++
          }
  
          if (indexOfMin !== i){ // only swap if the index of minimum and curr item is different
              let tmp = sortArray[i]
              sortArray[i] = sortArray[indexOfMin]
              sortArray[indexOfMin] = tmp
              console.log(sortArray)
          }
      }
  }
*/
}

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
    this.state.stateSketch === sketch ? this.setState({stateSketch:sketch}) : this.setState({stateSketch:sketch});

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
          <input type="number" placeholder="Size" min="10" max="100"></input>
          {Buttons}
          <h1>{this.state.value}</h1>
          <P5Wrapper sketch={this.state.stateSketch}></P5Wrapper>
        </div>
      </Styles>
    );
  }
}