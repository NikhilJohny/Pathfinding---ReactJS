import React , {Component} from "react"
import './Node.css';

class Nodes extends Component{

    render(){
        const nodeClass = this.props.wall ? 'Node node-wall' : 'Node'
        return(
            <div className = {nodeClass}
            onMouseDown = {() => this.props.onMouseDown(this.props.row,this.props.col)}
            onMouseEnter = {() => this.props.onMouseEnter(this.props.row,this.props.col)}
            onMouseUp = {() => this.props.onMouseUp()}
            >
            </div>
        )
    }
}

export default Nodes;