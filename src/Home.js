/*
  Home.js: Main landing page
  Cameron: Responsible for GUI -- Header(Jumbotron), Buttons, Styles, Pseudocode
  Last Updated: 7/7/20 @ 8:00pm by Cameron
*/

import React, {Component, useState} from 'react'
import styled from 'styled-components';
import P5Wrapper from 'react-p5-wrapper'
import sketch from './components/sketch'
import {beginSortClick} from './components/sketch'
import {typeClicked} from './components/sketch'
import {nextClicked} from './components/sketch'
import {pauseClicked} from './components/sketch'


let arraySize = 50;
let sliderVal = 50;
export{arraySize, sliderVal};
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
  .Pseudocode{
    color: #efefef;
    background: none;
  }
  .collapsible {
    background-color: #262626;
    color: white;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 15px;
  }
  
  .active, .collapsible:hover {
    background-color: #262626;
  }
  
  .content {
    padding: 0 18px;
    display: none;
    overflow: hidden;
    background-color: #f1f1f1;
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

const PauseButton = styled.button`
  background: ${props => props.primary ? "red": "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid red;
  border-radius: 3px;
`;

const ResumeButton = styled.button`
  background: ${props => props.primary ? "green": "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid green;
  border-radius: 3px;
`;

export const sortType = [
  {
    id: 0,
    value: 'Bubble',
    active: true,
    pseudocode: ["begin BubbleSort(list)\n",
                 "\tfor all elements of list\n",
                 "\t\tif list[i] > list[i+1]\n",
                 "\t\t\tswap(list[i], list[i+1]\n",
                 "\t\tend if\n",
                 "\tend for\n",
                 "\treturn list\n",
                 "end BubbleSort"]
  },
  {
    id: 1,
    value: 'Quick',
    active: false,
    pseudocode: ["begin QuickSort(arr, low, high)\n",
                "\tif(low < high)\n",
                "\t\tpivot = partition(arr, low, high)\n",
                "\t\tQuickSort(arr, low, pivot - 1)\n",
                "\t\tQuickSort(arr, pivot + 1, high)\n",
                "\tend if\n",
                "end QuickSort"]
  },
  {
    id: 2,
    value: 'Merge',
    active: false,
    pseudocode: ["begin MergeSort(arr, left, right)\n",
                "\tmiddle = (left+right)/2\n",
                "\tMergeSort(arr, left, middle)\n",
                "\tMergeSort(arr, middle + 1, right)\n",
                "\tMerge(arr, middle + 1, right)\n",
                "end MergeSort\n"]
  },
  {
    id: 3,
    value: 'Insertion',
    active: false,
    pseudocode:  ["begin InsertionSort(arr)\n",
                "\tfor i = 1 in arr\n",
                "\t\tkey = arr[i]\n",
                "\t\tj = i - 1\n",
                "\t\twhile j >= 0 and arr[j] > key\n",
                "\t\t\tarr[j+1] = arr[j]\n",
                "\t\t\tj = j - 1\n",
                "\t\tend while\n",
                "\t\tarr[j+1] = key\n",
                "\tend for\n",
                "end InsertionSort\n"]
  },
  {
    id: 4,
    value: 'Selection',
    active: false,
    pseudocode: ["begin SelectionSort(arr)\n",
                "\tfor i in arr-1\n",
                "\t\tmin = i\n",
                "\t\tfor j = i+1 in arr\n",
                "\t\t\tif arr[j] < arr[min]\n",
                "\t\t\t\tmin = j\n",
                "\t\t\tend if\n",
                "\t\t\tswap(arr[min], arr[i])\n",
                "\t\tend for\n",
                "\tend for\n",
                "end SelectionSort\n"]
  }
];
function sort(id) {
beginSortClick();
};

export default class Home extends React.Component {
  //Holds the state of the current page to be shown
  state = {
      id: 0,
      value: sortType[0].value + " Sort",
      isActive: false,
      controlButton: 0,
      showPsuedo: false,
      stateSketch:sketch,
  };

  handleCollapsible() {
    var content = this.nextElementSibling;
    if (this.state.showPsuedo) {
      this.setState({
        showPsuedo: false
      })
    } else {
      this.setState({
        showPsuedo: true
      })
    }
  }

  //once begin is pressed, this will change into a pause/resume button. (need help)
  changeButton(val){
    if(val==0){
      sort(this.state.id)
      val=1
    }
    this.setState({
      controlButton : val
    })
  }

  //Changes the current state of the page to the active button clicked
  changeState = (_id) =>{
    //Switches active state to false and finds current id adn sets active
    sortType.find(x => x.active === true).active = false;
    sortType.find(x => x.id === _id).active = true;

    //Ensures that only the correct button/state of the page is active
    this.setState({
      id: _id,
      value: sortType[_id].value + " Sort",
      isActive: sortType[_id].active,
    })
    typeClicked();
  }

  //gets the slider's speed and sets the slider speed variable to it
  sliderSpeed= () =>{
    var x = document.getElementById("myRange").value;
    sliderVal = x
  }
  changeNext(){
    nextClicked();
  }
  changePause(){
    pauseClicked();
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
    Buttons.push(<BeginButton primary onClick={() => this.changeButton(0)}>Reset and Begin Sort</BeginButton>)
    Buttons.push(<BeginButton primary onClick={() => this.changeNext()}>Next</BeginButton>)
    Buttons.push(<BeginButton primary onClick={() => this.changePause()}>Pause/Resume</BeginButton>)



    const Pseudocode = []
    for (const[index, value] of sortType.entries()){
      Pseudocode.push(
      <div className="">
      {/* <p className="Pseudocode">Function: {sortType[index].value + "Sort()"}</p> */}
      <pre className="Pseudocode">
        <code>
          {sortType[index].pseudocode}
        </code>
      </pre>
    </div>)
    }

    return (
      <Styles>
        <div>
          {Buttons}

          {/* displays the slider and updates the speed variable on clicks */}
          <input type="range" id="myRange" onClick={() => this.sliderSpeed()}/>

          <P5Wrapper sketch={this.state.stateSketch}></P5Wrapper>
          <button type="button" class="collapsible" onClick={() => this.handleCollapsible()}>
            Pseudocode {this.state.showPsuedo ? <i className="fa fa-caret-up"></i> : <i className="fa fa-caret-down"></i>}
          </button>
          {this.state.showPsuedo ? Pseudocode[this.state.id] : null }
        </div>
      </Styles>
    );
  }
}