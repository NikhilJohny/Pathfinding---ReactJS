import React , {Component} from "react"
import './Node.css';

class Nodes extends Component{
    onMouseClick(rows,cols){
        // console.log(rows + " " + cols)
        console.log("flag")
    }

    render(){
        console.log(this.props.row)
        return(
            <div className="Node"
            onMouseDown = {() => this.props.onMouseDown(this.props.row.row,this.props.col.col)}
            >
            </div>
        )
    }
}

export default Nodes;