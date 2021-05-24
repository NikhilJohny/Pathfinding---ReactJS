import React, {Component} from "react"
import "./Node.css";
export default class Header extends Component{
    render(){
        return(
            <nav className = "Header">
                <select>
                    <option>BFS</option>
                    <option>DFS</option>
                </select>
            </nav>
        )
    }
}