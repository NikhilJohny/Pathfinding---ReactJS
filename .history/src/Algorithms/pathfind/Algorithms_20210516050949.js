import React, { Component } from "react"
let speed = 1
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
export default class Algorithms extends Component {

    async animateMaze(grid,maze){
        for(let index of maze){
            grid[index[0]][index[1]].wall = true
            this.props.change(grid[index[0]][index[1]],'Node node-wall')
            await delay(0)            
        }
    }
    recursiveDivisionMaze(grid, startNode, finishNode) {
        if (!startNode || !finishNode || startNode === finishNode) {
          return false;
        }
        let vertical = this.range(60);
        let horizontal = this.range(20);
        let walls = [];
        this.getRecursiveWalls(vertical, horizontal, grid, startNode, finishNode,walls);
        return walls;
    }
      
       range(len) {
        let result = [];
        for (let i = 0; i < len; i++) {
          result.push(i);
        }
        return result;
      }
      
      //dir === 0 => Horizontal
      //dir === 1 => Vertical
      
       getRecursiveWalls(vertical, horizontal, grid, startNode, finishNode,walls) {
        if (vertical.length < 2 || horizontal.length < 2) {
          return;
        }
        let dir;
        let num;
        if (vertical.length > horizontal.length) {
          dir = 0;
          num = this.generateOddRandomNumber(vertical);
        }
        if (vertical.length <= horizontal.length) {
          dir = 1;
          num = this.generateOddRandomNumber(horizontal);
        }
      
        if (dir === 0) {
          this.addWall(grid,dir, num, vertical, horizontal, startNode, finishNode,walls);
          this.getRecursiveWalls(
            vertical.slice(0, vertical.indexOf(num)),
            horizontal,
            grid,
            startNode,
            finishNode,
            walls,
          );
          this.getRecursiveWalls(
            vertical.slice(vertical.indexOf(num) + 1),
            horizontal,
            grid,
            startNode,
            finishNode,
            walls
          );
        } else {
          this.addWall(grid,dir, num, vertical, horizontal, startNode, finishNode,walls);
          this.getRecursiveWalls(
            vertical,
            horizontal.slice(0, horizontal.indexOf(num)),
            grid,
            startNode,
            finishNode,
            walls
          );
          this.getRecursiveWalls(
            vertical,
            horizontal.slice(horizontal.indexOf(num) + 1),
            grid,
            startNode,
            finishNode,
            walls
          );
        }
      }
      
       generateOddRandomNumber(array) {
        let max = array.length - 1;
        let randomNum =
          Math.floor(Math.random() * (max / 2)) +
          Math.floor(Math.random() * (max / 2));
        if (randomNum % 2 === 0) {
          if (randomNum === max) {
            randomNum -= 1;
          } else {
            randomNum += 1;
          }
        }
        return array[randomNum];
      }
      
      //dir === 0 => Horizontal
      //dir === 1 => Vertical
      
       async addWall(grid,dir, num, vertical, horizontal, startNode, finishNode,walls) {
        let isStartFinish = false;
        let tempWalls = [];
        if (dir === 0) {
          if (horizontal.length === 2) return;
          for (let temp of horizontal) {
            if (
              (temp === startNode.row && num === startNode.col) ||
              (temp === finishNode.row && num === finishNode.col)
            ) {
              isStartFinish = true;
              continue;
            }
            tempWalls.push([temp, num]);
          }
        } else {
          if (vertical.length === 2) return;
          for (let temp of vertical) {
            if (
              (num === startNode.row && temp === startNode.col) ||
              (num === finishNode.row && temp === finishNode.col)
            ) {
              isStartFinish = true;
              continue;
            }
            tempWalls.push([num, temp]);
          }
        }
        if (!isStartFinish) {
          tempWalls.splice(this.generateRandomNumber(tempWalls.length), 1);
        }
        for (let wall of tempWalls) {
            walls.push(wall)
          }
      }
      
       generateRandomNumber(max) {
        let randomNum =
          Math.floor(Math.random() * (max / 2)) +
          Math.floor(Math.random() * (max / 2));
        if (randomNum % 2 !== 0) {
          if (randomNum === max) {
            randomNum -= 1;
          } else {
            randomNum += 1;
          }
        }
        return randomNum;
      }









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

    clearWalls(grid){
        for(let i = 0; i < 20; i++){
            for(let j = 0; j < 60; j++){
                if(grid[i][j].wall)
                    grid[i][j].wall = !grid[i][j].wall
            }
        }
    }
    async animateShortestPath(grid,current){
        while(grid[current.row][current.col].previous != null){
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
        let counter = 0
        let neighbors = []
        let visited = new Set()
        let current = start
        while (neighbors.length || !visited.has(current.no)) {
            let temp = [] 
            if(!current.end){
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
            this.clearWalls(clone)
            const maze = this.recursiveDivisionMaze(clone, clone[0][0],clone[19][59])
            this.animateMaze(clone,maze)
            this.dfs(clone,this.props.start)
        }
        return ( 
            <div>hi</div>
        )
    }
}