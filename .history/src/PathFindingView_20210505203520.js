import React,{Component} from "react"
import Nodes from './Nodes'

const grid = () =>{
    const rowArray = [];
    for(let i = 0; i < 30; i++){
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
      right : null
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

    render(){
        const NodeComponent = []
        this.state.board.map((rows,rowsIndex) =>{
            rows.map((cols,colsIndex) => {
                NodeComponent.push(
                    <Nodes
                        row = {cols.row}
                        col = {cols.col}
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