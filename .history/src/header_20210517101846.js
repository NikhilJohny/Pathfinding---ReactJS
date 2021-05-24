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
    handleMazeChange = (event) => {
        this.setState({maze : event.target.value})
    }
    handleAlgorithmChange = (event) => {
        this.setState({algorithm : event.target.value})
    }

    mazeAlgorithm(algo,grid){
        switch(algo){
            case 'RecursiveMaze' : this.props.clearWall()
            this.props.sentResult(recursiveDivisionMaze(grid,grid[0][0],grid[19][59]))
        }
    }
    render(){
        let clone = Object.assign({},this.props.current)
        return(
            <nav className = "Header">
                <select id= "maze" onChange={this.handleSelectChange} value ={this.state.maze}>
                    <option value="Select an algorithm">Select an algorithm</option>
                    <option value="RecursiveMaze">Recursive maze generation</option>
                </select>
                <button onClick={() => this.mazeAlgorithm(this.state.maze,clone)}>{this.state.maze}</button>
                <select id="algorithms" onChange={this.handleAlgorithmChange} value ={this.state.algorithm}>
                <option value="bfs">Breadth First Search</option>
                <option value ="dfs">Depth First Search</option>
                <button onClick={() => this.searchAlgorithm(this.state.algorithm,clone)}>{this.state.algorithm}</button>
                </select>
            </nav>
        )
    }
}