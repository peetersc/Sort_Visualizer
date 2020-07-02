import React from 'react';
import './Sorting.css'

import P5Wrapper from 'react-p5-wrapper'
import sketch from './sketch'
import sketch2 from './sketch2'

import { ThemeContext } from 'styled-components';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";


let NUMBER_OF_ARRAY_BARS = 90;

const PRIMARY_COLOR = 'black';


export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stateSketch:sketch,
    };
  }

  resetArray(){
    this.state.stateSketch===sketch ? this.setState({stateSketch:sketch2}):this.setState({stateSketch:sketch});

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    if (isMobile) {
      NUMBER_OF_ARRAY_BARS = 21;
    }
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randIntInInterval(10, 500));
    }
    this.setState({array});

  }

   render() {
    return (

      <div>
          <P5Wrapper sketch={this.state.stateSketch}></P5Wrapper>
           <button onClick={() => this.resetArray()}>Generate New Array</button>

      <div className="array-container">
        
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <br/>

        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}>

            </div>
        ))}
      </div>
    );
  }
}



