import React, { Component } from "react";
import Nodes from "./Nodes";
import "./Node.css";
import update from "react-addons-update";
import Algorithms from "./Algorithms/pathfind/Algorithms";

let cunt = 0
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
      }
    };
  }

  componentDidMount() {
    const arr = grid();
    this.setState({ board: arr });
    console.log(window.innerWidth);
  }

  changeStateFunction(currentNode){
    console.log(currentNode)
    document.getElementById(`row-1-col-1`).className = 'Node node-visited'
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
        }else if(this.state.currentGrid.end && !grid[rows][cols].start){
          grid[rows][cols].end = true
          grid[rows][cols].wall = false
          grid[this.state.currentGrid.row][this.state.currentGrid.col].end = false
        }
        this.setState({
          currentGrid : grid[rows][cols]
        })
      }
    }else if(!grid[rows][cols].start && !grid[rows][cols].end){
      grid[rows][cols].wall = !grid[rows][cols].wall;
      this.updateIndex(rows, cols, grid[rows][cols]);
    }
    return
  }

  mouseUpFunction() {
    this.setState({
      mousePressed: false,
    });
  }

  render() {
    let temp = {
      row: 1,
      col: 1,
      start: false,
      end: false,
      previous: null,
      top: null,
      bottom: null,
      left: null,
      right: null,
      wall: false,
    }
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
      <div className="canvas">
        <table>
          <tbody>
            {NodeComponent}
          </tbody>
        </table>
        <Algorithms
          change = {()=>this.changeStateFunction(temp)}
          current = {grid}
          i = {cunt++}
        />
      </div>
    )
  }
}

const grid = () => {
  const rowArray = [];
  for (let i = 0; i < 20; i++) {
    const colArray = [];
    for (let j = 0; j < 60; j++) {
      colArray.push(createNode(i, j));
    }
    rowArray.push(colArray);
  }
  rowArray[0][0].start = true;
  rowArray[rowArray.length - 1][rowArray[0].length - 1].end = true;
  return rowArray;
};

const createNode = (i, j) => {
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
    visited : false
  };
  return NodeObj;
};


