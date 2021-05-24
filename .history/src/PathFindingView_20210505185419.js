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
    console.log(i + " " + j);
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
        console.log(this.currentState.board)
    }

    render(){
        return(
            <div>
                <h1>This is a test</h1>
            </div>
        )
    }
}

export default PathFindingView