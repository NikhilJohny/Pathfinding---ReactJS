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
            board : grid()
        })
    }

    render(){
        return(
            <div>
                <p>{this.currentState.board}</p>
            </div>
        )
    }
}

export default PathFindingView