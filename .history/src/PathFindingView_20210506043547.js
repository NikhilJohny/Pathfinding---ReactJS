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
      wall : null
    }
    return NodeObj;
})

class PathFindingView extends Component{
    constructor(){
        super();
        this.state = {
            board : []
        }
    }
    componentDidMount(){
        const arr = grid()
        this.setState({board : arr})
    }
    

    mouseFunctions(rows, cols){
        console.log(rows + " " + cols)
        const grid = this.state.board;
        console.log(grid[rows][cols])
        this.setState({
            board : grid
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
                        onMouseDown = {() => this.mouseFunctions(row,col)}
                    />
                )
            })
        })
        return (
            <div>
                <h1>This is a test</h1>
                {NodeComponent}
            </div>
        )

    }
}

export default PathFindingView