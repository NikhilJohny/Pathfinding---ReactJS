import React, { Component } from "react";
import Nodes from "./Nodes";
import "./Node.css";
import update from "react-addons-update";

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
    top: null,
    bottom: null,
    left: null,
    right: null,
    wall: false,
  };
  return NodeObj;
};

class PathFindingView extends Component {
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

  setMouseState(){
    this.setState({
      mousePressed : true
    })
  }

  mouseDownFunctions(rows, cols) {
    const grid = this.state.board;
    if(!grid[rows][cols].start && !grid[rows][cols].end){
      grid[rows][cols].wall = !grid[rows][cols].wall;
      this.updateIndex(rows, cols, grid[rows][cols]);
    }else{
      this.setMouseState()
    }
    console.log(this.state.mousePressed)
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

  mouseEnterFunction(rows, cols) {
    const grid = this.state.board;
    if (!this.state.mousePressed || this.state.currentGrid === grid[rows][cols])
      return;
    if(this.state.currentGrid.start && grid[rows][cols] != this.state.currentGrid){
      grid[rows][cols].start = true
      grid[rows][cols].wall = false
      grid[this.state.currentGrid.row][this.state.currentGrid.col].start = false
      this.setState({
        currentGrid : grid[rows][cols]
      })
    }else if(!grid[rows][cols].start){
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
                onMouseDown={(row, col) => this.mouseDownFunctions(row, col)}
                onMouseEnter={(row, col) => this.mouseEnterFunction(row, col)}
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
      </div>
    )
  }
}

export default PathFindingView;
