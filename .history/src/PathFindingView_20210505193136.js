import React,{Component} from "react"
import Nodes from './Nodes'

const grid = () =>{
    const rowArray = [];
    for(let i = 0; i < 10; i++){
        const colArray = [];
        for(let j = 0; j < 20; j++){
            colArray.push(createNode(i,j));
        }
        rowArray.push(colArray);
    }
    console.log(rowArray)
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
      right : null
    }
    return NodeObj;
})

class PathFindingView extends Component{
    constructor(){
        super();
        this.currentState = {
            board : []
        }
    }
    componentDidMount(){
        this.setState(() =>{
            this.currentState.board = grid();
        })
    }

    render(){
        // console.log(this.currentState.board)
        // const NodeComponent = []
        // for(let i = 0; i < this.currentState.board.length; i++){
        //     for(let j = 0; j < this.currentState.board[i].length; i++){
        //         console.log(this.currentState.board[i][j].row)
        //         NodeComponent.push(
        //             <Nodes
        //                 row = {this.currentState.board[i][j].row} 
        //                 col = {this.currentState.board[i][j].col}
        //             />
        //         )
        //     }
        // }
        // console.log(NodeComponent)
        // console.log(this.currentState.board)
        return (
            <div>
                <h1>This is a test</h1>
                {/* {NodeComponent} */}
            </div>
        )

    }
}

export default PathFindingView