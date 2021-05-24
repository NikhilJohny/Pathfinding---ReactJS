import React,{Component} from "react"
import Nodes from './Nodes'
import './Node.css';

const grid = () =>{
    const rowArray = [];
    for(let i = 0; i < 20; i++){
        const colArray = [];
        for(let j = 0; j < 50; j++){
            colArray.push(createNode(i,j));
        }
        rowArray.push(colArray);
    }
    return rowArray;
}

const createNode = ((i,j) => {
    const NodeObj = {
      row : i,
      col : j,
      start : false,
      end : false,
      previous : null,
      top : null,
      bottom : null,
      left : null,
      right : null,
      wall : false
    }
    return NodeObj;
})

class PathFindingView extends Component{
    constructor(){
        super();
        this.state = {
            board : [],
            mousePressed : false,
            currentGrid : null
        }
    }
    componentDidMount(){
        const arr = grid()
        this.setState({board : arr})
    }
    

    mouseDownFunctions(rows, cols){
        console.log('down')
        this.setState({
            mousePressed : true
        })
        console.log(this.state.mousePressed)
    }
    
    mouseEnterFunction(rows,cols){
        const grid = this.state.board;
        if(this.state.mousePressed && this.state.currentGrid != grid[rows]){
            grid[rows][cols].wall = !grid[rows][cols].wall
            this.setState({
                board : grid
            })
        }
        this.setState({
            currentGrid : grid[rows][cols]
        })
    }
    mouseUpFunction(){
        console.log('up')
        this.setState({
            mousePressed : false
        })
    }

    render(){
        const NodeComponent = []
        this.state.board.map((rows,rowKeys) =>{
            rows.map((cols,colKeys) => {
                NodeComponent.push(
                    <Nodes
                        id = {colKeys}
                        row = {cols.row}
                        col = {cols.col}
                        wall = {cols.wall}
                        onMouseDown = {(row,col) => this.mouseDownFunctions(row,col)}
                        onMouseEnter = {(row,col) => this.mouseEnterFunction(row,col)}
                        onMouseUp = {() => this.mouseUpFunction()}
                    />
                )
            })
        })
        return (
            <div className = "canvas">
                {NodeComponent}
            </div>
        )

    }
}

export default PathFindingView