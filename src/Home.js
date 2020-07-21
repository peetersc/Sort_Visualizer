/*
  Home.js: Main landing page
  Cameron: Responsible for GUI -- Header(Jumbotron), Buttons, Styles, Pseudocode
  Last Updated: 7/17/20 @ 1:00pm by Cameron
*/

import React, { Component, useEffect, useState } from 'react'
import styled from 'styled-components';
import P5Wrapper from 'react-p5-wrapper'
import sketch from './components/sketch'
import { beginSortClick } from './components/sketch'
import { typeClicked } from './components/sketch'
import { nextClicked } from './components/sketch'
import { pauseClicked } from './components/sketch'
import { setSize } from './components/sketch'
import Code from './components/Code'

let speedSliderVal = 50;
export { speedSliderVal };
let arraySize = 50;
export { arraySize };
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
    padding: 0;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 25px;
  }
  
  .active, .collapsible:hover {
    background-color: #262626;
  }
  
  
.sansserif {
  font-family: Arial, Helvetica, sans-serif;
}
  
 .Key {
  font-size: 1em;
  margin: 1em;
  padding: 0.05em 1em;
  border-radius: 3px;
}
.blue {
  background: blue;
}
.maroon {
  background: maroon;
}
.floralwhite {
  background: floralwhite;
}
.DarkSeaGreen {
  background: DarkSeaGreen;
}
.green {
  background: green;
}
.red {
  background: red;
}
  
  .content {
    padding: 0 18px;
    display: none;
    overflow: hidden;
    background-color: #f1f1f1;
  }

  .footer{
      padding-bottom: 50px;
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
  background: ${props => props.primary ? "mediumseagreen" : "white"};
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
        active: true,
        pseudocode: ["BubbleSort(list):\n",
            "\tfor i in range(len(list)):\n",
            "\t\tfor j in range(0, len(list)-1):\n",
            "\t\t\tif arr[j] > arr[j+1]:\n",
            "\t\t\t\tswap(arr[j],arr[j+1])\n",]
    },
    {
        id: 1,
        value: 'Quick',
        active: false,
        pseudocode: ["QuickSort(arr, low, high): \n",
            "\tif(low < high)\n",
            "\t\tPartition(arr, low, high,arr)\n",
            "\t\tQuickSort(arr, low, p - 1)\n",
            "\t\tQuickSort(arr, p + 1, high)\n\n",
            "Partition(arr, low, high, arr):\n",
            "\tp=low\n",
            "\tfor j in range(low, high):\n",
            "\t\tif arr[j] <= arr[high]\n",
            "\t\t\tswap(arr[j], arr[p])\n",
            "\t\t\tp++"]
    },
    {
        id: 2,
        value: 'Merge',
        active: false,
        pseudocode: ["MergeSort(arr, left, right):\n",
            "\tif left < high:\n",
            "\t\tmiddle = (left+right)/2\n",
            "\t\tMergeSort(arr, left, middle)\n",
            "\t\tMergeSort(arr, middle + 1, right)\n",
            "\t\tMerge(arr, middle + 1, right)\n",
            "Merge(arr, low, middle, high, arr):\n",
            "\twhile (i <= middle and j <= high):\n",
            "\t\tif arr[i] > arr[j]:\n",
            "\t\t\tfor k = i in j:\n",
            "\t\t\t\tswap(arr, k, j);"]
    },
    {
        id: 3,
        value: 'Insertion',
        active: false,
        pseudocode: ["InsertionSort(arr):\n",
            "\tfor i in range(1, len(arr))\n",
            "\t\tkey = arr[i]\n",
            "\t\tj = i - 1\n",
            "\t\twhile j >= 0 and arr[j] > key\n",
            "\t\t\tswap(arr[j+1], arr[j])\n",
            "\t\t\tj = j - 1\n",
            "\t\tarr[j+1] = key\n"]
    },
    {
        id: 4,
        value: 'Selection',
        active: false,
        pseudocode: ["SelectionSort(arr):\n",
            "\tfor i in arr-1\n",
            "\t\tmin = i\n",
            "\t\tfor j = i+1 in arr\n",
            "\t\t\tif arr[j] < arr[min]\n",
            "\t\t\t\tmin = j\n",
            "\t\t\tswap(arr[min], arr[i])\n"]
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
        stateSketch: sketch,
        isPaused: false,
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
    changeButton(val) {
        if (val === 0) {
            sort(this.state.id)
            val = 1
        }
        this.setState({
            controlButton: val,
            isPaused: true
        })
    }

    //Changes the current state of the page to the active button clicked
    changeState = (_id) => {
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
    sliderSpeed = () => {
        var x = document.getElementById("myRange").value;
        speedSliderVal = x;
        if (x >= 99)
            speedSliderVal = 100;
    }
    changeNext() {
        nextClicked();
        this.state.isPaused=true;
    }

    updateSizeSlider = () => {
        var size = parseInt(document.getElementById("textArraySize").value);

        if (size.isNan) {
            return;
        }
        else if (size > 150) {
            size = 150
        }
        else if (size < 10) {
            size = 10
        }

        document.getElementById("sizeSlide").value = size;
    }


    changePause() {
        if (this.state.isPaused) {
            this.setState({
                isPaused: false
            })
        } else {
            this.setState({
                isPaused: true
            })
        }
        pauseClicked();
    }
    resetSort() {
        typeClicked();
        this.setState({
            isPaused: true
        })
    }

    displayKey() {
        if (this.state.id === 0) {
            return (<div >

                <p className="sansserif" style={{ color: "white", 'padding-left': '5px', 'padding-top': '5px' }}>

                    <b>
                        j
                    </b>
                    <box className="Key blue" />

                    <b>
                        j+1
                    </b>
                    <box className="Key maroon" />
                    Unsorted
                    <box className="Key floralwhite" />
                    Sorted
                    <box className="Key DarkSeaGreen" />
                </p>

            </div>)
        }

        else if (this.state.id === 1) {
            return (<div>

                <p className="sansserif" style={{ color: "white", 'padding-left': '5px', 'padding-top': '5px' }}>

                    <b>
                        Low/High
                    </b>
                    <box className="Key blue" />

                    <b>
                        p
                    </b>
                    <box className="Key red" />

                    <b>
                        j
                    </b>
                    <box className="Key maroon" />

                    Unsorted
                    <box className="Key floralwhite" />
                    Sorted
                    <box className="Key DarkSeaGreen" />
                </p>

            </div>)
        }

        else if (this.state.id === 2) {
            return (<div >
                <p className="sansserif" style={{ color: "white", 'padding-left': '5px', 'padding-top': '5px' }}>

                    <b>
                        j
                    </b>
                    <box className="Key blue" />

                    <b>
                        i
                    </b>
                    <box className="Key red" />
                    Unsorted
                    <box className="Key floralwhite" />
                    Sorted
                    <box className="Key DarkSeaGreen" />
                </p>

            </div>)
        }

        else if (this.state.id === 3) {
            return (<div >
                <p className="sansserif" style={{ color: "white", 'padding-left': '5px', 'padding-top': '5px' }}>

                    <b>
                        j
                    </b>
                    <box className="Key blue" />

                    <b>
                        j+1
                    </b>
                    <box className="Key maroon" />
                    Unsorted
                    <box className="Key floralwhite" />
                    Sorted
                    <box className="Key DarkSeaGreen" />
                </p>

            </div>)
        }

        else if (this.state.id === 4) {
            return (<div >
                <p className="sansserif" style={{ color: "white", 'padding-left': '5px', 'padding-top': '5px' }}>

                    <b>
                        min
                    </b>
                    <box className="Key blue" />

                    <b>
                        j
                    </b>
                    <box className="Key maroon" />
                    Unsorted
                    <box className="Key floralwhite" />
                    Sorted
                    <box className="Key DarkSeaGreen" />
                </p>

            </div>)
        }

    }

    render() {
        //Creates buttons based off the number of different sorts along with Begin Sort Button
        const Buttons = []
        const code = <Code />;
        for (const [index, value] of sortType.entries()) {
            Buttons.push(
                <Button onClick={() => this.changeState(index)}
                    className={this.state.id === sortType[index].id ? "Button on" : " off"}>
                    {sortType[index].value}
                </Button>
            )
        }
        Buttons.push(<BeginButton primary onClick={() => { setSize(document.getElementById("sizeSlide").value); this.changeButton(0) }}>Begin Sort</BeginButton>)
        Buttons.push(<BeginButton primary onClick={() => { setSize(document.getElementById("sizeSlide").value); this.resetSort() }}>Reset Array</BeginButton>) //reset sort button
        Buttons.push(<BeginButton primary onClick={() => this.changePause()}>
            {<i className={this.state.isPaused ? "fa fa-pause" : "fa fa-play"}></i>}
        </BeginButton>)
        Buttons.push(<BeginButton primary onClick={() => this.changeNext()}><i className="fa fa-arrow-right"></i></BeginButton>)
        return (
            <Styles>
                <div>
                    {Buttons}
                    <table>
                        <tr>
                            <th style={{ color: 'white', 'padding-left': '15px' }}>
                                Speed:
                            </th>
                            <th style={{ color: 'white', 'padding-left': '15px' }}>
                                Array Size (10-150):&nbsp;
                                <input type="text" id="textArraySize" size="4" maxlength="3" onChange={() => this.updateSizeSlider()}></input>
                            </th>
                        </tr>
                        <tr>
                            <td style={{ 'padding-left': '15px' }}>
                                <input type="range" id="myRange" onChange={() => this.sliderSpeed()} />
                            </td>
                            <td style={{ 'padding-left': '15px' }}>
                                <input type="range" id="sizeSlide" min="10" max="150" onChange={() => { document.getElementById("textArraySize").value = document.getElementById("sizeSlide").value; }} />
                            </td>
                        </tr>
                    </table>
                    <P5Wrapper sketch={this.state.stateSketch}></P5Wrapper>
                    {this.displayKey()}
                    <button type="button" class="collapsible" onClick={() => this.handleCollapsible()}>
                        Pseudocode {this.state.showPsuedo ? <i className="fa fa-caret-up"></i> : <i className="fa fa-caret-down"></i>}
                    </button>
                    {this.state.showPsuedo ? code : null}
                    <div className="footer" />
                </div>
            </Styles>
        );
    }
}