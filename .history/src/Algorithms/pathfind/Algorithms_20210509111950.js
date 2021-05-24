import React, { Component } from "react"
let speed = 1
export default class Algorithms extends Component {
    dfs(currentState,start) {
        if (this.props.paused) {
            const grid = currentState
            let visited = new Set()
            let neighbors = []
            neighbors.push(start)
            while (neighbors.length) {
                let currentNode = neighbors.pop()
                if (currentNode.end) return grid
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
        }

    }
    render() {
        if(this.props.start === null){
            console.log('Hi there')
        }
        this.dfs(this.props.current,this.props.start)
        return (
            <h9>testing</h9>
        )
    }
}