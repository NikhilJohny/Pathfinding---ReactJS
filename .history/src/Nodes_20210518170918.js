import React , {Component} from "react"
import './Node.css';

class Nodes extends Component{

    render(){
        const nodeClass = this.props.start ? 'Node node-start' :  this.props.end ? 'Node node-end' : this.props.wall ? 'Node node-wall' : this.props.visited ? 'Node node-visited' : this.props.visitedRealTime ? 'Node node-realtime' : this.props.path ? 'Node node-realtimePath' : 'Node'
        return(
            <td className = {nodeClass}
            id = {`row-${this.props.row}-col-${this.props.col}`}
            onMouseDown = {() => this.props.onMouseDown(this.props.row,this.props.col)}
            onMouseEnter = {() => this.props.onMouseEnter(this.props.row,this.props.col)}
            onMouseUp = {() => this.props.onMouseUp()}
            >
            </td>
        )
    }
}

export default Nodes;