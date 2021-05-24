import React, { Component } from "react"

export default class Algorithms extends Component {
    dfs(currentState,i) {
        console.log(currentState)
        console.log('testing')
        if (this.props.i >= 1) {
            let counter = 0
            const grid = currentState
            console.log(grid[0][0])

            const temp = {
                row: 0,
                col: 1,
                start: false,
                end: false,
                previous: null,
                top: 0,
                bottom: 2,
                left: 0,
                right: 2,
                wall: false,
                visisted: false
            }
            let visited = new Set()
            let neighbors = []
            neighbors.push(temp)
            while (counter <= 70) {
                console.log('hi there')
                let currentNode = neighbors.pop()
                if (currentNode.end) return grid
                this.props.change(currentNode)
                this.props.changeState(currentNode)
                if (!currentNode.wall) {
                    grid[currentNode.row][currentNode.col].visited = true
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
            return grid
        }

    }
    render() {
        this.dfs(this.props.current)
        return (
            <h9>testing</h9>
        )
    }
}