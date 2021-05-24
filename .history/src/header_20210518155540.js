import React, {Component} from "react"
import "./Node.css";
import recursiveDivisionMaze from './Algorithms/Maze/RecursiveDivision'
import {bfs, dfs} from './Algorithms/Search algo/bfs'
export default class Header extends Component{
    constructor(props){
        super(props)
        this.state = {
            algorithm : 'bfs',
            maze : 'RecursiveMaze',
        }
    }
    handleMazeChange = (event) => {
        this.setState({maze : event.target.value})
    }
    handleAlgorithmChange = (event) => {
        this.setState({algorithm : event.target.value})
    }

    searchAlgorithm(algo,grid){
        switch(algo){
            case 'bfs' : this.props.clearVisited()
            this.props.sentPath(bfs(grid,this.props.start))
            break

            case 'dfs' : this.props.clearVisited()
            this.props.sentPath(dfs(grid,this.props.start))
            break
        }
    }

    mazeAlgorithm(algo,grid){
        switch(algo){
            case 'RecursiveMaze' : this.props.clearGrid()
            this.props.sentResult(recursiveDivisionMaze(grid,this.props.start,this.props.end,this.props.height,this.props.width))
        }
    }
    render(){
        let clone = Object.assign({},this.props.current)
        let changed = this.props.change
        if(changed === true){
            this.searchAlgorithm('bfs',clone)
            this.props.change = false
        }
        return(
            <nav className = "Header">
                <select onChange={this.handleMazeChange} value ={this.state.maze}>
                    <option value="Select an algorithm">Select an algorithm</option>
                    <option value="RecursiveMaze">Recursive maze generation</option>
                </select>
                <button onClick={() => this.mazeAlgorithm(this.state.maze,clone)}>{this.state.maze}</button>
                <select id="algorithms" onChange={this.handleAlgorithmChange} value ={this.state.algorithm}>
                    <option value="bfs">Breadth First Search</option>
                    <option value ="dfs">Depth First Search</option>
                </select>
                <button onClick={() => this.searchAlgorithm(this.state.algorithm,clone)}>{this.state.algorithm}</button>
            </nav>
        )
    }
}