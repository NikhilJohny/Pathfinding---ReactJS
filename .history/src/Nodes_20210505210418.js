import React , {Component} from "react"
import './Node.css';

class Nodes extends Component{
    onMouseClick(rows,cols){
        // console.log(rows + " " + cols)
        console.log("flag")
    }

    render(){
        return(
            <div className="Node"
            onClick = {this.onMouseClick(this.props.row,this.props.col)}
            >
                
            </div>
        )
    }
}

export default Nodes;