import React, { Component } from "react"
let speed = 1
export default class Algorithms extends Component {

    clearVisited(){
        for(let i = 0; i < 20; i++){
            for(let j =0 ; j < 60; j++){
                if(document.getElementById(`row-${i}-col-${j}`).className === 'Node node-visited'){
                    document.getElementById(`row-${i}-col-${j}`).className = 'Node'
                }
            }
        }
    }
    animateShortestPath(grid,current){
        while(grid[current.row][current.col].previous != null){
            if(!grid[current.row][current.col].previous.start && !grid[current.row][current.col].previous.end){
                setTimeout(() =>{
                    this.props.change(current,'Node node-path')
                },speed++ * 50)
            }
            current = grid[current.row][current.col].previous
        }
    }

    dfs(grid, start) {
        console.log('testingggg')
        let neighbors = [start]
        let visited = new Set()
        while (neighbors.length) {
            let current = neighbors.pop()
            if (current.end){
                // this.animateShortestPath(grid,current)
                return
            }
            else {
                visited.add(current.no)
                if (!current.wall) {
                    if(!current.start){
                        // setTimeout(() =>{
                        //     this.props.change(current,'Node node-visited')
                        // },10 * speed++)
                        setTimeout(this.props.change(current,'Node node-visited'),10 * speed++)
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

    bfs(grid,start){
        let neighbors = []
        let visited = new Set()
        neighbors.push(start)
        let cacheNeighbours = new Set()
        while (neighbors.length) {
            let current = neighbors.shift()
            if (current.end) {
                // this.animateShortestPath(grid,current)
                return
            }else {
                if (!current.wall) {
                    visited.add(current.no)
                    cacheNeighbours.add(current.no)
                    if(!current.start){
                        setTimeout(
                            this.props.change(current,'Node node-visited')
                        ,speed++)
                    }
                    if (current.top != null   && !visited.has(grid[current.top][current.col].no) && cacheNeighbours.has(grid[current.top][current.col].no)) {
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
            this.dfs(clone, this.props.start)
            this.clearVisited(clone)
            this.props.togglePaused()
        }
        return ( 
            <div>hi</div>
        )
    }
}