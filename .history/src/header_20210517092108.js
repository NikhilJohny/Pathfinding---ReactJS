import React, {Component} from "react"
import "./Node.css";
import recursiveDivisionMaze from './Algorithms/Maze/RecursiveDivision'
export default class Header extends Component{
    constructor(){
        super()
        this.state = {
            algorithm = null,
            maze = null,
        }
    }
    render(){
        let clone = Object.assign({},this.props.current)
        return(
            <nav className = "Header">
                <select>
                    <option>BFS</option>
                    <option>DFS</option>
                </select>
                <button onClick={() => this.props.sentResult(recursiveDivisionMaze(clone,clone[0][0],clone[19][20]))}>Generate Maze</button>
            </nav>
        )
    }
}