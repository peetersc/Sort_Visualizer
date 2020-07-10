import React from 'react';
import './Sorting.css'
import P5Wrapper from 'react-p5-wrapper'
import sketch from './sketch'

import { ThemeContext } from 'styled-components';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stateSketch:sketch,
    };
  }
  changeSketch(){
  }

   render() {
    return (
      <div>
          
      </div>
    );
  }
}



