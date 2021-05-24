import React , {Component} from "react"


class Nodes extends Component{
    render(){
        return(
            <div>
                <p>row : {this.props.row}</p>
                <p>col : {this.props.col}</p>
            </div>
        )
    }
}