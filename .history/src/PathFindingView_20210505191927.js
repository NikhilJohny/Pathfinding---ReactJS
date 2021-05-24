import React,{Component} from "react"


const grid = () =>{
    const rowArray = [];
    for(let i = 0; i < 10; i++){
        const colArray = [];
        for(let j = 0; j < 20; j++){
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
        for(let i = 0; i < this.currentState.board.length; i++){
            for(j = 0; j < this.currentState.board[i].length; i++){

            }
        }

        return (
            <h1>This is a test</h1>
        )

    }
}

export default PathFindingView