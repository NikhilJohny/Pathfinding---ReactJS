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
                await delay(25)
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
                if (!current.wall) {
                    if(!current.start  && !visited.has(current.no)){
                        await delay(10)
                        this.props.change(current,'Node node-visited')
                    }
                    visited.add(current.no)
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
    }

    async bfs(grid,start){
        let neighbors = []
        let visited = new Set()
        neighbors.push(start)
        let cacheNeighbours = new Set()
        while (neighbors.length) {
            let current = neighbors.shift()
            if (current.end) {
                await delay(500)
                this.animateShortestPath(grid,current)
                return
            }else {
                if (!current.wall) {
                    visited.add(current.no)
                    cacheNeighbours.add(current.no)
                    if(!current.start){
                        await delay(5)
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

    async recursiveMaze(grid,start){
        let neighbors = []
        let visited = new Set()
        let current = start
        while (neighbors.length || !visited.has(current.no)) {
            let temp = [] 
            if(!current.start && !current.end){
                if (current.top != null && !visited.has(grid[current.top][current.col].no)) {
                    temp.push(grid[current.top][current.col])
                }
                if (current.bottom != null && !visited.has(grid[current.bottom][current.col].no)) {
                    temp.push(grid[current.bottom][current.col])
                }
                if (current.left != null && !visited.has(grid[current.row][current.left].no)) {
                    temp.push(grid[current.row][current.left])
                }
                if (current.right != null && !visited.has(grid[current.row][current.right].no)) {
                    temp.push(grid[current.row][current.right])
                }

            }
            if(temp.length){
                let randomIndex = Math.floor(Math.random() * temp.length)
                for(let i = 0; i < temp.length; i++){
                    if(i === randomIndex){
                        visited.add(temp[i].no)
                        await delay(10)
                        neighbors.push(temp[i])
                        current = temp[i]
                    }else{
                        this.props.change(temp[i],'Node node-wall')
                        visited.add(temp[i])
                    }
                }
            }else{
                current = neighbors.pop()
            }
        }
    }

    render() {
        if (this.props.paused) {
            this.props.togglePaused()
            let clone = Object.assign({}, this.props.current)
            this.clearVisited(clone)
            this.recursiveMaze(clone, this.props.start)
        }
        return ( 
            <div>hi</div>
        )
    }
}