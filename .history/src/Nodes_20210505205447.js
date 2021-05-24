import React , {Component} from "react"
import './Node.css';

class Nodes extends Component{
    onMouseClick(){
        console.log('testing')
    }

    render(){
        return(
            <div className="Node"
            onMouseEnter = {this.onMouseClick}
            >
                
            </div>
        )
    }
}

export default Nodes;