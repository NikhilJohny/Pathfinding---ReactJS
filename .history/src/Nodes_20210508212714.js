import React , {Component} from "react"
import './Node.css';

class Nodes extends Component{

    render(){
        const nodeClass = this.props.wall ? 'Node node-wall' :  this.props.start ? 'Node node-start' : this.props.end ? 'Node node-end' : this.props.visited ? 'Node node-visited' : 'Node'
        return(
            <td className = {nodeClass}
            id = {`row-${this.props.row}-col-${this.props.col}`}
            onMouseDown = {() => this.props.onMouseDown()}
            onMouseEnter = {() => this.props.onMouseEnter()}
            onMouseUp = {() => this.props.onMouseUp()}
            >
            </td>
        )
    }
}

export default Nodes;