/*
  Home.js: Main landing page
  Cameron: Responsible for GUI -- Header(Jumbotron), Buttons, Styles, Pseudocode
  Last Updated: 7/17/20 @ 1:00pm by Cameron
  Update: added comments and refactoring
  Bugs: The Pseudocode activeLines sometimes changes when paused 
*/

import React, {Component} from 'react'
import styled from 'styled-components';
import {activeLine} from './sketch'
import {sortType, sliderVal} from '../Home'


const Styles = styled.div`
 *{
     color: #efefef;
     font-sixe: 15px;
 }
 .container{
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

    //getCode(): returns a list of lines from the active sorting algorithm with acitveLine highlighted
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
        let activeSort = sortType.find(x => x.active === true);

        //creates a list of all Pseudocode for each sortType
        const Pseudocode = []
        for (const[index, value] of sortType.entries()){
          Pseudocode.push(
          <div className="">
          {/* <p className="Pseudocode">Function: {sortType[index].value + "Sort()"}</p> */}
          <pre className="Pseudocode">
            <code>
              {this.getCode()}
            </code>
          </pre>
        </div>)
        }

        return(
            <Styles>
                <div>
                    {/*Prints the active sort's Pseudocode */}
                    {Pseudocode[activeSort.id]}
                </div>
            </Styles>
        )
    }

    //Updates activeLine state
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