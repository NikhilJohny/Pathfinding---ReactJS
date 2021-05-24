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
            if (current.end) {
                console.log('hey thereeee')
                console.log(grid)
                speed = 0
                // this.animateShortestPath(grid,current)
                // while(current.previous.row != null){
                //     this.props.change(grid[current.previous.row][current.previous.col],'Node node-path')
                //     current = grid[current.previous.row][current.previous.col]
                // }
                return
            }else {
                if (!current.wall) {
                    visited.add(grid[current.row][current.col])
                    if(!current.start){
                        setTimeout(
                            this.props.change(current,'Node node-visited')
                        ,speed++)
                    }
                    if (current.top != null && !visited.has(grid[current.top][current.col]) && !cacheNeighbours.has(grid[current.top][current.col])) {
                        cacheNeighbours.add(grid[current.top][current.col])
                        console.log(current.row + " " + current.col)
                        grid[current.top][current.col].previous.row = current.row
                        grid[current.top][current.col].previous.col = current.col
                        console.log("top : " + grid[current.top][current.col].previous.row  + " : ")
                        console.log("top : " + grid[current.top][current.col].previous.col + " : ")

                        neighbors.push(grid[current.top][current.col])
                    }
                    if (current.bottom != null && !visited.has(grid[current.bottom][current.col]) && !cacheNeighbours.has(grid[current.bottom][current.col])) {
                        cacheNeighbours.add(grid[current.bottom][current.col])
                        console.log(current.row + " " + current.col)
                        grid[current.bottom][current.col].previous.row =  current.row 
                        grid[current.bottom][current.col].previous.col =  current.col 
                        console.log("Botttom : "  + grid[current.bottom][current.col].previous.row  + " : ")
                        console.log("Botttom : "  + grid[current.bottom][current.col].previous.col + " : ")
                        neighbors.push(grid[current.bottom][current.col])
                    }
                    if (current.left != null && !visited.has(grid[current.row][current.left] && !cacheNeighbours.has(grid[current.row][current.left]))) {
                        cacheNeighbours.add(grid[current.row][current.left])
                        console.log(current.row + " " + current.col)
                        grid[current.row][current.left].previous.row = current.row
                        grid[current.row][current.left].previous.col = current.col 
                        console.log("left : " + grid[current.row][current.left].previous.row + " :")
                        console.log("left : " + grid[current.row][current.left].previous.col + " :")    
                        neighbors.push(grid[current.row][current.left])
                    }
                    if (current.right != null && !visited.has(grid[current.row][current.right]) && !cacheNeighbours.has(grid[current.row][current.right])) {
                        cacheNeighbours.add(grid[current.row][current.right])
                        console.log(current.row + " " + current.col)
                        grid[current.row][current.right].previous.row = current.row
                        grid[current.row][current.right].previous.col = current.col 
                        console.log("right : " + grid[current.row][current.right].previous.row + " :")    
                        console.log("right : " + grid[current.row][current.right].previous.col +  " :")
                        neighbors.push(grid[current.row][current.right])
                    }
                }
            }
            console.log(grid)
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