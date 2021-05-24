import React, { Component } from "react"
let speed = 1
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
export default class Algorithms extends Component {

    clearVisited(grid){
        for(let i = 0; i < 20; i++){
            for(let j =0 ; j < 60; j++){
                if(document.getElementById(`row-${i}-col-${j}`).className === 'Node node-path' || document.getElementById(`row-${i}-col-${j}`).className === 'Node node-visited'){
                    document.getElementById(`row-${i}-col-${j}`).className = 'Node'
                }
            }
        }
        // grid[0][1].wall = true
    }
    async animateShortestPath(grid,current){
        while(grid[current.row][current.col].previous != null){
            console.log('mm')
            if(!grid[current.row][current.col].start && !grid[current.row][current.col].end){
                await delay(50)
                this.props.change(current,'Node node-path')
            }
            current = grid[current.row][current.col].previous
        }
    }

    async dfs(grid, start) {
        let neighbors = [start]
        let visited = new Set()
        while (neighbors.length) {
            let current = neighbors.pop()
            if (current.end){
                this.animateShortestPath(grid,current)
                return
            }
            else {
                visited.add(current.no)
                if (!current.wall) {
                    if(!current.start){
                        // setTimeout(() =>{
                        //     this.props.change(current,'Node node-visited')
                        // },10 * speed++)
                        // setTimeout(this.props.change(current,'Node node-visited'),10 * speed++)
                        await delay(10)
                        this.props.change(current,'Node node-visited')
                    }
                    if (current.top != null && !visited.has(grid[current.top][current.col].no)) {
                        grid[current.top][current.col].previous = current
                        neighbors.push(grid[current.top][current.col])
                    }
                    if (current.bottom != null && !visited.has(grid[current.bottom][current.col].no)) {
                        grid[current.bottom][current.col].previous = current
                        neighbors.push(grid[current.bottom][current.col])
                    }
                    if (current.left != null && !visited.has(grid[current.row][current.left].no)) {
                        grid[current.row][current.left].previous = current
                        neighbors.push(grid[current.row][current.left])
                    }
                    if (current.right != null && !visited.has(grid[current.row][current.right].no)) {
                        grid[current.row][current.right].previous = current
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

    async bfs(grid,start){
        let neighbors = []
        let visited = new Set()
        neighbors.push(start)
        let cacheNeighbours = new Set()
        while (neighbors.length) {
            let current = neighbors.shift()
            if (current.end) {
                await delay(1000)
                this.animateShortestPath(grid,current)
                return
            }else {
                if (!current.wall) {
                    visited.add(current.no)
                    cacheNeighbours.add(current.no)
                    if(!current.start){
                        await delay(10)
                            this.props.change(current,'Node node-visited')
                    }
                    if (current.top != null   && !visited.has(grid[current.top][current.col].no) && !cacheNeighbours.has(grid[current.top][current.col].no)) {
                        grid[current.top][current.col].previous = current
                        cacheNeighbours.add(grid[current.top][current.col].no)
                        neighbors.push(grid[current.top][current.col])
                    }
                    if (current.bottom != null  && !visited.has(grid[current.bottom][current.col].no) && !cacheNeighbours.has(grid[current.bottom][current.col].no)) {
                        cacheNeighbours.add(grid[current.bottom][current.col].no)
                        grid[current.bottom][current.col].previous = current 
                        neighbors.push(grid[current.bottom][current.col])
                    }
                    if (current.left != null  && !visited.has(grid[current.row][current.left].no) && !cacheNeighbours.has(grid[current.row][current.left].no)) {
                        cacheNeighbours.add(grid[current.row][current.left].no)
                        grid[current.row][current.left].previous = current  
                        neighbors.push(grid[current.row][current.left])
                    }
                    if (current.right != null  &&  !visited.has(grid[current.row][current.right].no) && !cacheNeighbours.has(grid[current.row][current.right].no)) {
                        cacheNeighbours.add(grid[current.row][current.right].no)
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
            this.clearVisited(clone)
            this.bfs(clone, this.props.start)
            this.props.togglePaused()
        }
        return ( 
            <div>hi</div>
        )
    }
}