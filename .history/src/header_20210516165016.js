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
                <button onCilck={}></button>
            </nav>
        )
    }
}