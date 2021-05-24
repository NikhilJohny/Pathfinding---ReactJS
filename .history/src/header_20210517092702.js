import React, {Component} from "react"
import "./Node.css";
import recursiveDivisionMaze from './Algorithms/Maze/RecursiveDivision'
export default class Header extends Component{
    constructor(){
        super()
        this.state = {
            algorithm : null,
            maze : null,
        }
    }
    handleSelectChange(event){
        this.setState({maze : event.target.value})
    }
    mazeAlgorithm(algo){

    }
    render(){
        let clone = Object.assign({},this.props.current)
        return(
            <nav className = "Header">
                <select onChange={this.handleSelectChange()}>
                    <option value="RecursiveMaze">Recursive maze generation</option>
                </select>
                <button onClick={() => this.props.sentResult(recursiveDivisionMaze(clone,clone[0][0],clone[19][20]))}>{this.state.maze}</button>
            </nav>
        )
    }
}