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
        // console.log(event)
        this.setState({maze : event.target.value})
    }
    mazeAlgorithm(algo){

    }
    render(){
        let clone = Object.assign({},this.props.current)
        return(
            <nav className = "Header">
                <select onChange={this.handleSelectChange()} value ={this.state.maze}>
                    <option value="Select an algorithm">Select an algorithm</option>
                    <option value="RecursiveMaze">Recursive maze generation</option>
                </select>
                <button onClick={() => this.props.sentResult(recursiveDivisionMaze(clone,clone[0][0],clone[19][20]))}>{this.state.maze}</button>
            </nav>
        )
    }
}