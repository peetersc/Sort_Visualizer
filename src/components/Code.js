/*
  Code.js: Commponent for displaying Pseudocode
  Cameron: Responsible for Code.js
  Last Updated: 7/17/20 @ 1:00pm by Cameron
*/

import React, {Component} from 'react'
import styled from 'styled-components';
import {activeLine} from './sketch'
import {sortType, sliderVal} from '../Home'

//CSS for default style and the selected active line
const Styles = styled.div`
 *{
     color: #efefef;
     font-sixe: 15px;
 }

 .activeLine{
    width: 500px;
     color: black;
     background: peachpuff;
     padding: 0;
     padding-left: 5px;
 }
`;

class Code extends Component{

    constructor(props){
        super(props)
        this.state = {
            activeLine: 0,
        }
    }

    //getCode(): returns the list of Pseudocode from the active sort
    getCode(){
        let activeCode = sortType.find(x => x.active === true).pseudocode;
        let returnCode = []
        for (let i = 0; i < activeCode.length; ++i){
            returnCode.push(
                <div className="container">
                    <p className={i == activeLine  ? "activeLine":""}>
                        {activeCode[i]}
                    </p>
                </div>
            )
        }
        return(returnCode);
    }

    render(){
        //Finds the current running sorting algorithm
        let activeSort = sortType.find(x => x.active === true);

        //Creates a list of Pseudocode for each different sorting algorithm
        const Pseudocode = []
        for (const[index, value] of sortType.entries()){
          Pseudocode.push(
          <pre className="Pseudocode">
            <code>
              {this.getCode()}
            </code>
          </pre>
          )
        }

        return(
            <Styles>
                <div>
                    {/*Prints the pseudocode for current sort Type*/}
                    {Pseudocode[activeSort.id]}
                </div>
            </Styles>
        )
    }

    //updates the state of the active line
    componentDidMount(){
        this.myInterval = setInterval(()=>{
            this.setState(prevState => ({
                activeLine: activeLine,
            }))
        })
    }

    componentWillUnmount(){
        clearInterval(this.myInterval)
    }
}

export default Code