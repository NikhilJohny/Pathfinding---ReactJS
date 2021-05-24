import React, { Component } from "react";
import Nodes from "./Nodes";
import "./Node.css";
import update from "react-addons-update";
import Algorithms from "./Algorithms/pathfind/Algorithms";
import Header from './header'


const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
export default class PathFindingView extends Component {
  constructor() {
    super();
    this.state = {
      board: [],
      mousePressed: false,
      currentGrid: {
        row: -1,
        col: -1,
        start: false,
        end: false,
        previous: null,
        top: null,
        bottom: null,
        left: null,
        right: null,
        wall: false,
        no :-1,
      },
      paused : false,
      algorithm : null,
      startNode : {
        row: 0,
        col: 0,
        start: true,
        end: false,
        previous: null,
        top: null,
        bottom: 1,
        left: null,
        right: 1,
        wall: false,
        no:0
      },
      endNode : null
    };
  }

  componentDidMount() {
    const arr = grid();
    this.setState({ board: arr });
  }

  changeStateFunction(currentNode,cname){
    document.getElementById(`row-${currentNode.row}-col-${currentNode.col}`).className = cname
  }

  togglePausedFunction(){
    const paused = this.state.paused
    this.setState({
      paused : !paused
    })
  }

  clearGrid(){

  }

  clearWalls(){
    const  grid = this.state.board
    for(let i = 0; i < 20; i++){
      for(let j = 0; j < 60; j++){
        if(grid[i][j].wall) grid[i][j].wall = false
      }
    }
    this.setState({
      board: grid
    })
}

  async getResultArray(resultArray){
    this.clearWalls()
    let grid = this.state.board
    for(let index of resultArray){
      grid[index[0]][index[1]].wall = true
      this.changeStateFunction(grid[index[0]][index[1]],'Node node-wall')
      await delay(0)            
    }
  }


  
  updateIndex(rows, cols, content) {
    this.setState(
      update(this.state, {
        board: {
          [rows]: {
            [cols]: {
              $set: content,
            },
          },
        },
        mousePressed: {
          $set: true,
        },
        currentGrid: {
          $set: content,
        },
      })
    );
  }

  mouseDownFunctions(rows, cols) {
    const grid = this.state.board;
    if(!grid[rows][cols].start && !grid[rows][cols].end){
      grid[rows][cols].wall = !grid[rows][cols].wall;
      this.updateIndex(rows, cols, grid[rows][cols]);
    }else{
        this.setState({
          mousePressed : true,
          currentGrid : grid[rows][cols]
        })
    }
  }


  mouseEnterFunction(rows, cols) {
    const grid = this.state.board;
    if (!this.state.mousePressed || this.state.currentGrid === grid[rows][cols])
      return;
    if(this.state.currentGrid.start || this.state.currentGrid.end && grid[rows][cols] != this.state.currentGrid ){
      if(!grid[rows][cols].end && !grid[rows][cols].start){
        if(this.state.currentGrid.start && !grid[rows][cols].end){
          grid[rows][cols].start = true
          grid[rows][cols].wall = false
          grid[this.state.currentGrid.row][this.state.currentGrid.col].start = false
          this.setState({
            currentGrid : grid[rows][cols],
            startNode : grid[rows][cols]
          })
        }else if(this.state.currentGrid.end && !grid[rows][cols].start){
          grid[rows][cols].end = true
          grid[rows][cols].wall = false
          grid[this.state.currentGrid.row][this.state.currentGrid.col].end = false
          this.setState({
            currentGrid : grid[rows][cols],
            endNode : grid[rows][cols]
          })
        }
      }
    }else if(!grid[rows][cols].start && !grid[rows][cols].end){
      grid[rows][cols].wall = !grid[rows][cols].wall;
      this.updateIndex(rows, cols, grid[rows][cols]);
    }
  }


  mouseUpFunction() {
    this.setState({
      mousePressed: false,
    });
  }

  render() {
    const testing = []
    const grid = this.state.board
    const NodeComponent = this.state.board.map((rows, rowKeys) => {
      return (
        <tr className={`rowIndex-${rowKeys}`}>
          {rows.map((cols, colKeys) => {
            return (
              <Nodes
                id={colKeys}
                row={cols.row}
                col={cols.col}
                wall={cols.wall}
                start={cols.start}
                end = {cols.end}
                visited = {cols.visited}
                onMouseDown={(row, col) => this.mouseDownFunctions(row,col)}
                onMouseEnter={(row, col) => this.mouseEnterFunction(row ,col)}
                onMouseUp={() => this.mouseUpFunction()}
              /> 
            )
          })}
        </tr>
      )
    });
    return (
      <div>
        <Header
          change = {(newVal,cname)=>this.changeStateFunction(newVal,cname)}
          current = {this.state.board}
          paused = {this.state.paused}
          start = {this.state.startNode}
          togglePaused = {() => this.togglePausedFunction()}
          sentResult = {(val) => this.getResultArray(val)}
        />
        <div className="canvas">
          <button onClick={(()=>{
            const val = !this.state.paused
            this.setState({
              paused : val
            })
          })}>Visualize</button>
          {testing}
          <table>
            <tbody>
              {NodeComponent}
            </tbody>
          </table>
          <Algorithms
              change = {(newVal,cname)=>this.changeStateFunction(newVal,cname)}
              current = {grid}
              paused = {this.state.paused}
              start = {this.state.startNode}
              togglePaused = {() => this.togglePausedFunction()}
            />
        </div>
      </div>
    )
  }
}

const grid = () => {
  let counter = 0
  const rowArray = [];
  for (let i = 0; i < 20; i++) {
    const colArray = [];
    for (let j = 0; j < 60; j++) {
      colArray.push(createNode(i, j,counter));
      counter++
    }
    rowArray.push(colArray);
  }
  rowArray[0][0].start = true;
  rowArray[rowArray.length - 1][rowArray[0].length - 1].end = true;
  return rowArray;
};

const createNode = (i, j, counter) => {
  const NodeObj = {
    row: i,
    col: j,
    start: false,
    end: false,
    previous: null,
    top: i === 0 ? null : i - 1,
    bottom: i === 19 ? null : i + 1,
    left: j === 0 ? null : j - 1,
    right: j === 59 ? null : j + 1,
    wall: false,
    visited : false,
    no: counter,
  };
  return NodeObj;
};


