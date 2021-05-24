import React,{Component} from "react"


const grid = (() =>{
    var rowArray = []
    for(let i = 0; i < 10; i++){
        var colArray = []
        for(let j = 0; j < 20; j++){
            colArray.push(createNode(i,j));
        }
        rowArray.push(colArray);
    }
    return RowArray;
})

const createNode = ((i,j) => {
    NodeObj = {
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
        this.currentState = {
            canvas : []
        }
    }

    componentDidMount(){

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