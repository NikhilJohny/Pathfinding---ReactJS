import React,{Component} from "react"


const grid = (() =>{
    const rowArray = []
    for(let i = 0; i < 10; i++){
        const colArray = []
        for(let j = 0; j < 20; j++){
            colArray.push(createNode(i,j));
        }
        rowArray.push(colArray);
    }
    return RowArray;
})

const createNode = ((i,j) => {
    return {
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

})

class PathFindingView extends Component{
    constructor(){
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
        return(
            <div>
                <h1>This is a test</h1>
            </div>
        )
    }
}

export default PathFindingView