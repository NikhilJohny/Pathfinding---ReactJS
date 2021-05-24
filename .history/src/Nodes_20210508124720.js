import React , {Component} from "react"
import './Node.css';

class Nodes extends Component{

    render(){
        const nodeClass = this.props.wall ? 'Node node-wall' :  this.props.start ? 'Node node-start' : this.props.end ? 'Node node-end' : this.props.visisted ? 'Node node-visited' : 'Node'
        return(
            <td className = {nodeClass}
            onMouseDown = {() => this.props.onMouseDown(this.props.row,this.props.col)}
            onMouseEnter = {() => this.props.onMouseEnter(this.props.row,this.props.col)}
            onMouseUp = {() => this.props.onMouseUp()}
            >
            </td>
        )
    }
}

export default Nodes;