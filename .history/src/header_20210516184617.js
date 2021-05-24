import React, {Component} from "react"
import "./Node.css";
import recursiveDivisionMaze from './Algorithms/Maze/RecursiveDivision'
export default class Header extends Component{
    render(){
        let clone = Object.assign({},this.props.current)
        return(
            <nav className = "Header">
                <select>
                    <option>BFS</option>
                    <option>DFS</option>
                </select>
                <button onCilck={(() =>{
                    this.props.sentResult(recursiveDivisionMaze(clone,clone[0][0],clone[19][59]))
                })}>Generate Maze</button>
            </nav>
        )
    }
}