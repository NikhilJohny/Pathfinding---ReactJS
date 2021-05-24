import React, {Component} from "react"
import "./Node.css";
import {recursiveDivisionMaze} from './Algorithms/Maze/RecursiveDivision'
export default class Header extends Component{
    render(){
        return(
            <nav className = "Header">
                <select>
                    <option>BFS</option>
                    <option>DFS</option>
                </select>
                <button onCilck={recursiveDivisionMaze(this.props.current,this.props.current[0][0],this.props.current[19][59])}></button>
            </nav>
        )
    }
}