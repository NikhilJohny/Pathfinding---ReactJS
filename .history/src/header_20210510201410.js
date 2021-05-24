import React, { Component } from "react"
import './Nodes.css'
export default class Header extends Component {
    render() {
        return ( <
            nav class = "Header" >
            <
            select >
            <
            option > BFS < /option> <
            option > DFS < /option> <
            /select> <
            /nav>
        )
    }
}