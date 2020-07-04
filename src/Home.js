import React from 'react'
import styled from 'styled-components';
import SortingView from './components/SortingView';
import sketch from './components/sketch';
import sketch2 from './components/sketch2';
const Styles = styled.div`
  .mainbox{
    color: #262626;
    border: none;
  }

  .footer{
    height: 50px;

  }
`;

const Button = styled.button`
  background: ${props => props.primary ? "burlywood" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid burlywood;
  border-radius: 3px;

  &:active{
    background: ${props => props.primary ? "teal" : "white"} !important;
  }
  &:hover{
    background: ${props => props.primary ? "skyblue" : "white"} !important;
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
const items = [
  {
    id: 0,
    value: 'Bubble',
  },
  {
    id: 1,
    value: 'Quick',
  },
  {
    id: 2,
    value: 'Merge',
  },
  {
    id: 3,
    value: 'Heap',
  },
  {
    id: 4,
    value: 'Selection',
  }
];

function sort(id, sortArray) {

  {/*If id == 0*/}
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

  {/*If id == 1*/}
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

  {/*If id == 4*/}
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

}

function Home(){
    let id = 0;
    return (
        <div className="container">  
            <Styles>
              <div>
              <input type="number" placeholder="Size" min="10" max="100"></input>
                <Button primary onClick={() => id=0}>Bubble</Button>
                <Button primary onClick={() => id=1}>Quick</Button>
                <Button primary onClick={() => id=2}>Merge</Button>
                <Button primary onClick={() => id=3}>Heap</Button>
                <Button primary onClick={() => id=4}>Selection</Button>
                <BeginButton primary>Begin Sort</BeginButton>  {/*onClick={() => sort(id)}*/}
              </div>

                <div className="mainbox">
                  {/*make it update after ID gets changed*/}
                  <h1>{items[id].value + " Sort"} {console.log(id)}</h1>
                  <div>
                    <SortingView/>
                  </div>
                  <div className="footer">

                  </div>
                </div>
            </Styles>
        </div>
    );
}

export default Home;