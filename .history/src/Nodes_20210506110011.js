import React , {Component} from "react"
import './Node.css';

class Nodes extends Component{

    render(){
        const nodeClass = this.props.wall ? 'Node node-wall' : 'Node'
        return(
            <div className = {nodeClass}
            onMouseDown = {() => this.props.onMouseDown(this.props.row,this.props.col)}
            onMouseOver = {() => this.props.onMouseOver(this.props.row,this.props.col)}
            onMouseUp = {() => this.props.onMouseUp()}
            onClick = {() => this.onMouseClick(this.props.row, this.props.col)}
            >
            </div>
        )
    }
}

export default Nodes;