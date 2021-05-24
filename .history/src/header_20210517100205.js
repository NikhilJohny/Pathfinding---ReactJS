import React, {Component} from "react"
import "./Node.css";
import recursiveDivisionMaze from './Algorithms/Maze/RecursiveDivision'
export default class Header extends Component{
    constructor(props){
        super(props)
        this.state = {
            algorithm : null,
            maze : null,
        }
    }
    handleSelectChange = (event) => {
        console.log(event.target.value)
        this.setState({maze : event.target.value})
    }

    mazeAlgorithm(algo){
        switch(algo){
            case 'RecursiveMaze' : this.props.clearWall
            this.props.sentResult(recursiveDivisionMaze()) 
        }
    }
    render(){
        let clone = Object.assign({},this.props.current)
        return(
            <nav className = "Header">
                <select onChange={this.handleSelectChange} value ={this.state.maze}>
                    <option value="Select an algorithm">Select an algorithm</option>
                    <option value="RecursiveMaze">Recursive maze generation</option>
                </select>
                <button onClick={() => this.mazeAlgorithm(this.state.maze,clone)}>{this.state.maze}</button>
            </nav>
        )
    }
}