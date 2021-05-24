import React, { Component } from "react"
let speed = 1
export default class Algorithms extends Component {

    dfs(currentState,start) {
            const grid = currentState
            let visited = new Set()
            let neighbors = []
            neighbors.push(start)
            while (neighbors.length) {
                let currentNode = neighbors.pop()
                if (currentNode.end) {
                    this.props.togglePaused()
                    return
                }
                if (!currentNode.wall) {
                    currentNode.visisted = true
                    setTimeout(() => {
                        this.props.change(currentNode);
                      }, 10 * speed++);
                    visited.add(currentNode)

                    if (currentNode.top != null && !visited.has(grid[currentNode.top][currentNode.col])) {
                        neighbors.push(grid[currentNode.top][currentNode.col])
                    }
                    if (currentNode.bottom != null && !visited.has(grid[currentNode.bottom][currentNode.col])) {
                        neighbors.push(grid[currentNode.bottom][currentNode.col])
                    }
                    if (currentNode.left != null && !visited.has(grid[currentNode.row][currentNode.left])) {
                        neighbors.push(grid[currentNode.row][currentNode.left])
                    }
                    if (currentNode.right != null && !visited.has(grid[currentNode.row][currentNode.right])) {
                        neighbors.push(grid[currentNode.row][currentNode.right])
                    }
                }
            }
            this.props.togglePaused()
        return
    }
    render() {
        if(this.props.paused){
            let clone = Object.assign({},this.props.current)
            this.dfs(clone,this.props.start)
        }
        return (
            <h9>testing</h9>
        )
    }
}