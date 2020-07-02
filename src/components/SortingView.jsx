import React from 'react';
import './Sorting.css'
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
      array: [],
    };
  }

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
    const {array} = this.state;

    return (
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

function randIntInInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


