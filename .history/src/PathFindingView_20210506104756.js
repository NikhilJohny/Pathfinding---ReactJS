import React,{Component} from "react"
import Nodes from './Nodes'
import './Node.css';
import update from 'react-addons-update';

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
            currentGrid : {
                row : 0,
                col : 0,
                start : false,
                end : false,
                previous : null,
                top : null,
                bottom : null,
                left : null,
                right : null,
                wall : false
              }
        }
    }
    componentDidMount(){
        const arr = grid()
        this.setState({board : arr})
    }
    

    mouseDownFunctions(rows, cols){
        this.setState({
            mousePressed : true
        })
    }
    
    updateIndex(rows, cols, content){
        this.setState(update(this.state ,{
            board : {
                [rows]:{
                    [cols]:{
                        $set : content
                    }
                }
            }
        }))
    }

    mouseOverFunction(rows,cols){
        const grid = this.state.board;
        if(this.state.currentGrid !== grid[rows][cols] && this.state.mousePressed){
            console.log('testing')
            if(this.state.mousePressed){
                grid[rows][cols].wall = !grid[rows][cols].wall
                this.updateIndex(rows,cols,grid[rows][cols])
            }
            this.setState({
                currentGrid : grid[rows][cols]
            })
        }
    }

    onMouseClick(rows, cols){

    }

    mouseUpFunction(){
        
        this.setState(update(this.state ,{
            board : {
                [0]:{
                    [0]:{
                        $set : grid
                    }
                }
            }
        }))

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
                        onMouseOver = {(row,col) => this.mouseOverFunction(row,col)}
                        onMouseUp = {() => this.mouseUpFunction()}
                        onClick = {() => this.onMouseClick(row,col)}
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