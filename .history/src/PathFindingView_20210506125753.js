import React,{Component} from "react"
import Nodes from './Nodes'
import './Node.css';
import update from 'react-addons-update';

const grid = () =>{
    const rowArray = [];
    for(let i = 0; i < 30; i++){
        const colArray = [];
        for(let j = 0; j < 61; j++){
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
            currentGrid : null,
        }
    }
    componentDidMount(){
        const arr = grid()
        this.setState({board : arr})
        console.log(window.innerHeight)
    }
    

    mouseDownFunctions(rows, cols){
        const grid = this.state.board;
        grid[rows][cols].wall = !grid[rows][cols].wall
        this.updateIndex(rows,cols,grid[rows][cols])
    }
    
    updateIndex(rows, cols, content){
        this.setState(update(this.state ,{
            board : {
                [rows]:{
                    [cols]:{
                        $set : content
                    }
                }
            },
            mousePressed : {
                $set : true
            },
            currentGrid : {
                $set : content
            }
        }))
    }

    mouseEnterFunction(rows,cols){
        const grid = this.state.board;
        if(!this.state.mousePressed || this.state.currentGrid === grid[rows][cols]) return;
        if(this.state.currentGrid !== grid[rows][cols] && this.state.mousePressed){
            if(this.state.mousePressed){
                grid[rows][cols].wall = !grid[rows][cols].wall
                this.updateIndex(rows,cols,grid[rows][cols])
            }
        }
    }
    mouseUpFunction(){
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