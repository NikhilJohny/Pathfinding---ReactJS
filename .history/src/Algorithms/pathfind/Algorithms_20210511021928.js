import React, { Component } from "react"
let speed = 1
export default class Algorithms extends Component {

    dfs(grid, start) {
        let neighbors = []
        let visited = new Set()
        neighbors.push(start)
        while (neighbors.length) {
            let current = neighbors.pop()
            if (current.end) return
            else {
                if (!current.wall && !urrent.start) {
                    visited.add(grid[current.row][current.col])
                    setTimeout(() => {
                        this.props.change()
                    }, 10 * speed++)
                }
                if (currentNode.top && !visited.has(grid[currentNode.top][currentNode.col])) {
                    neighbors.push(grid[currentNode.top][currentNode.col])
                }
                if (currentNode.bottom && !visited.has(grid[currentNode.bottom][currentNode.col])) {
                    neighbors.push(grid[currentNode.bottom][currentNode.col])
                }
                if (currentNode.left && !visited.has(grid[currentNode.row][currentNode.left])) {
                    neighbors.push(grid[currentNode.row][currentNode.left])
                }
                if (currentNode.right && !visited.has(grid[currentNode.row][currentNode.right])) {
                    neighbors.push(grid[currentNode.row][currentNode.right])
                }
            }
        }
        //     const grid = currentState
        //     let visited = new Set()
        //     let neighbors = []
        //     neighbors.push(start)
        //     while (neighbors.length) {
        //         let currentNode = neighbors.pop()
        //         if (currentNode.end) {
        //             this.props.togglePaused()
        //             return
        //         }
        //         if (!currentNode.wall) {
        //             currentNode.visisted = true
        //             setTimeout(() => {
        //                 this.props.change(currentNode);
        //               }, 10 * speed++);
        //             visited.add(currentNode)

        // if (currentNode.top != null && !visited.has(grid[currentNode.top][currentNode.col])) {
        //     neighbors.push(grid[currentNode.top][currentNode.col])
        // }
        // if (currentNode.bottom != null && !visited.has(grid[currentNode.bottom][currentNode.col])) {
        //     neighbors.push(grid[currentNode.bottom][currentNode.col])
        // }
        // if (currentNode.left != null && !visited.has(grid[currentNode.row][currentNode.left])) {
        //     neighbors.push(grid[currentNode.row][currentNode.left])
        // }
        // if (currentNode.right != null && !visited.has(grid[currentNode.row][currentNode.right])) {
        //     neighbors.push(grid[currentNode.row][currentNode.right])
        // }
        //         }
        //     }
        //     this.props.togglePaused()
        // return


    }
    render() {
        if (this.props.paused) {
            let clone = Object.assign({}, this.props.current)
            var visited = new Set()
            this.dfs(clone, this.props.start, visited)
        }
        return ( <
            h9 > testing < /h9>
        )
    }
}