import React from 'react'
import styled from 'styled-components';
import SortingView from './components/SortingView';

const Styles = styled.div`
  .mainbox{
    color: #262626;
    border: none;
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
    id: 1,
    value: 'Bubble',
  },
  {
    id: 2,
    value: 'Quick',
  },
];

function Home(){
    let id = 0;
    return (
        <div className="container">        
            <Styles>
              <div>
              <input type="number" placeholder="Size" min="10" max="100"></input>
                <Button primary onClick={() => console.log("click")}>Bubble</Button>
                <Button primary>Quick</Button>
                <Button primary>Merge</Button>
                <Button primary>Heap</Button>
                <Button primary>Selection</Button>
                <BeginButton primary>Begin Sort</BeginButton>
              </div>

                <div className="mainbox">
                  <h1>{items[id].value + " Sort"}</h1>
                  <p>Lorem .... Draw rectangles here</p>
                  <SortingView/>
                </div>
            </Styles>
        </div>
    );
}

export default Home;