import React from 'react';
import './Sorting.css'
import P5Wrapper from 'react-p5-wrapper'
import sketch from './sketch'
import sketch2 from './sketch2'

import { ThemeContext } from 'styled-components';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stateSketch:sketch,
    };
  }
  resetArray(){
    this.state.stateSketch===sketch ? this.setState({stateSketch:sketch2}):this.setState({stateSketch:sketch});
  }

   render() {
    return (
      <div>
          <P5Wrapper sketch={this.state.stateSketch}></P5Wrapper>
           <button onClick={() => this.resetArray()}>Generate New Array</button>
      </div>
    );
  }
}



