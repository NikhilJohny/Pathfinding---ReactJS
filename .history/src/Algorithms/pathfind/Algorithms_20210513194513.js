import React, { Component } from "react"
let speed = 1
export default class Algorithms extends Component {

    animateShortestPath(grid,current){
        console.log(current)
        console.log(grid)
        while(grid[current.row][current.col].previous != null){
            console.log('hi there')
            setTimeout(this.props.change(current,'Node node-path'),speed++)
            current = grid[current.row][current.col].previous
        }
    }

    dfs(grid, start) {
        let neighbors = [start]
        let visited = new Set()
        while (neighbors.length) {
            let current = neighbors.pop()
            if (current.end) return
            else {
                if (!current.wall) {
                    if(!current.start){
                        visited.add(current)
                        setTimeout(this.props.change(current,'Node node-visited'),10 * speed++)
                    }
                    if (current.top != null && !visited.has(grid[current.top][current.col])) {
                        neighbors.push(grid[current.top][current.col])
                    }
                    if (current.bottom != null && !visited.has(grid[current.bottom][current.col])) {
                        neighbors.push(grid[current.bottom][current.col])
                    }
                    if (current.left != null && !visited.has(grid[current.row][current.left])) {
                        neighbors.push(grid[current.row][current.left])
                    }
                    if (current.right != null && !visited.has(grid[current.row][current.right])) {
                        neighbors.push(grid[current.row][current.right])
                    }
                }
            }
        }
            // let visited = new Set()
            // let neighbors = []
            // neighbors.push(start)
            // while (neighbors.length) {
            //     let currentNode = neighbors.pop()
            //     if (currentNode.end) {
            //         this.props.togglePaused()
            //         return
            //     }
            //     if (!currentNode.wall) {
            //         currentNode.visisted = true
            //         setTimeout(() => {
            //             this.props.change(currentNode);
            //           }, 10 * speed++);
            //         visited.add(currentNode)

            //         if (currentNode.top && !visited.has(grid[currentNode.top][currentNode.col])) {
            //             neighbors.push(grid[currentNode.top][currentNode.col])
            //         }
            //         if (currentNode.bottom && !visited.has(grid[currentNode.bottom][currentNode.col])) {
            //             neighbors.push(grid[currentNode.bottom][currentNode.col])
            //         }
            //         if (currentNode.left && !visited.has(grid[currentNode.row][currentNode.left])) {
            //             neighbors.push(grid[currentNode.row][currentNode.left])
            //         }
            //         if (currentNode.right && !visited.has(grid[currentNode.row][currentNode.right])) {
            //             neighbors.push(grid[currentNode.row][currentNode.right])
            //         }
            //     }
            // }
    }

    bfs(grid,start){
        let neighbors = []
        let visited = new Set()
        neighbors.push(start)
        let cacheNeighbours = new Set()
        while (neighbors.length) {
            let current = neighbors.shift()
            let currentRowCol = {row : current.row, col : current.col}
            if (current.end) {
                return
            }else {
                if (!current.wall) {
                    visited.add(currentRowCol)
                    cacheNeighbours.add(currentRowCol)
                    if(!current.start){
                        setTimeout(
                            this.props.change(current,'Node node-visited')
                        ,speed++)
                    }
                    if (current.top != null && !grid[current.top][current.col].wall && !visited.has({row: current.top, col : current.col}) && cacheNeighbours.has({row : current.top, col : current.col}) === false) {
                        grid[current.top][current.col].previous = current
                        cacheNeighbours.add({row: current.top, col : current.col})
                        neighbors.push(grid[current.top][current.col])
                    }
                    if (current.bottom != null && !grid[current.bottom][current.row].wall && !visited.has({row: current.bottom, col : current.col}) && !cacheNeighbours.has({row: current.bottom, col : current.col})) {
                        cacheNeighbours.add({row: current.bottom, col : current.col})
                        grid[current.bottom][current.col].previous = current 
                        neighbors.push(grid[current.bottom][current.col])
                    }
                    if (current.left != null && !grid[current.row][current.col].wall && !visited.has({row: current.row, col : current.left}) && !cacheNeighbours.has({row: current.row, col : current.left})) {
                        cacheNeighbours.add({row: current.row, col : current.left})
                        grid[current.row][current.left].previous = current  
                        neighbors.push(grid[current.row][current.left])
                    }
                    if (current.right != null && !grid[current.row][current.right].wall &&  !visited.has({row: current.row, col : current.right}) && !cacheNeighbours.has({row: current.row, col : current.right})) {
                        cacheNeighbours.add({row: current.row, col : current.right})
                        grid[current.row][current.right].previous = current
                        neighbors.push(grid[current.row][current.right])
                    }
                }
            }
        }
    }
    render() {
        if (this.props.paused) {
            let clone = Object.assign({}, this.props.current)
            this.bfs(clone, this.props.start)
            this.props.togglePaused()
        }
        return ( 
            <div>hi</div>
        )
    }
}