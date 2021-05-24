function bfs(grid, start) {
    let visitedPath = []
    let neighbors = [start]
    let visited = new Set()
    let cacheNeighbours = new Set()
    while (neighbors.length) {
        let current = neighbors.shift()
        if (current.end) {
            return [visitedPath, getResultPath(grid, current)]
        } else {
            if (!current.wall || (current.start && current.wall)) {
                visited.add(current.no)
                cacheNeighbours.add(current.no)
                visitedPath.push([current.row, current.col])

                if (current.top != null && !visited.has(grid[current.top][current.col].no) && !cacheNeighbours.has(grid[current.top][current.col].no)) {
                    grid[current.top][current.col].previous = current
                    cacheNeighbours.add(grid[current.top][current.col].no)
                    neighbors.push(grid[current.top][current.col])
                }
                if (current.bottom != null && !visited.has(grid[current.bottom][current.col].no) && !cacheNeighbours.has(grid[current.bottom][current.col].no)) {
                    cacheNeighbours.add(grid[current.bottom][current.col].no)
                    grid[current.bottom][current.col].previous = current
                    neighbors.push(grid[current.bottom][current.col])
                }
                if (current.left != null && !visited.has(grid[current.row][current.left].no) && !cacheNeighbours.has(grid[current.row][current.left].no)) {
                    cacheNeighbours.add(grid[current.row][current.left].no)
                    grid[current.row][current.left].previous = current
                    neighbors.push(grid[current.row][current.left])
                }
                if (current.right != null && !visited.has(grid[current.row][current.right].no) && !cacheNeighbours.has(grid[current.row][current.right].no)) {
                    cacheNeighbours.add(grid[current.row][current.right].no)
                    grid[current.row][current.right].previous = current
                    neighbors.push(grid[current.row][current.right])
                }
            }
        }
    }
    return [visitedPath, []]
}

function dfs(grid, start) {
    let visitedPath = []
    let neighbors = [start]
    let visited = new Set()
    while (neighbors.length) {
        let current = neighbors.pop()
        if (current.end) {
            return [visitedPath, getResultPath(grid, current)]
        } else {
            if (!current.wall || (current.start && current.wall)) {
                if (!current.start && !visited.has(current.no)) {
                    visitedPath.push([current.row, current.col])
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
    return [visitedPath, []]
}


function bidirectionalSearch(grid, start, end) {
    let visitedPath = []
    let startNeighbors = [start]
    let endNeighbors = [end]
    let visited = new Set()
    let startCache = new Set()
    let endCache = new Set()
    while (startNeighbors.length && endNeighbors.length) {
        let current = startNeighbors.shift()
        if (current.end) {
            return [visitedPath, getResultPath(grid, current)]
        } else {
            if (!current.wall || (current.start && current.wall)) {
                visited.add(current.no)
                startCache.add(current.no)
                visitedPath.push([current.row, current.col])

                if (current.top != null && !visited.has(grid[current.top][current.col].no) && !startCache.has(grid[current.top][current.col].no)) {
                    grid[current.top][current.col].previous = current
                    startCache.add(grid[current.top][current.col].no)
                    startNeighbors.push(grid[current.top][current.col])
                } else if (visited.has(grid[current.top][current.col].no)) {
                    let result = getResultPath(grid, current)
                    return [visitedPath, result.concat(getResultPath(grid, grid[current.top][current.col]))]
                }
                if (current.bottom != null && !visited.has(grid[current.bottom][current.col].no) && !startCache.has(grid[current.bottom][current.col].no)) {
                    startCache.add(grid[current.bottom][current.col].no)
                    grid[current.bottom][current.col].previous = current
                    startNeighbors.push(grid[current.bottom][current.col])
                } else if (visited.has(grid[current.bottom][current.col].no)) {
                    let result = getResultPath(grid, current)
                    return [visitedPath, result.concat(getResultPath(grid, grid[current.bottom][current.col]))]
                }
                if (current.left != null && !visited.has(grid[current.row][current.left].no) && !startCache.has(grid[current.row][current.left].no)) {
                    startCache.add(grid[current.row][current.left].no)
                    grid[current.row][current.left].previous = current
                    startNeighbors.push(grid[current.row][current.left])
                } else if (visited.has(grid[current.row][current.left])) {
                    let result = getResultPath(grid, current)
                    return [visitedPath, result.concat(getResultPath(grid, grid[current.row][current.left]))]
                }
                if (current.right != null && !visited.has(grid[current.row][current.right].no) && !startCache.has(grid[current.row][current.right].no)) {
                    startCache.add(grid[current.row][current.right].no)
                    grid[current.row][current.right].previous = current
                    startNeighbors.push(grid[current.row][current.right])
                } else if (visited.has(grid[current.row][current.right])) {
                    let result = getResultPath(grid, current)
                    return [visitedPath, result.concat(getResultPath(grid, grid[current.row][current.right]))]
                }
            }
        }
        let endNode = endNeighbors.shift()
        if (endNode.start) {
            return [visitedPath, getResultPath(grid, endNode)]
        } else {
            if (!endNode.wall || (endNode.start && endNode.wall)) {
                visited.add(endNode.no)
                endCache.add(endNode.no)
                visitedPath.push([endNode.row, endNode.col])
                if (endNode.top != null && !visited.has(grid[endNode.top][endNode.col].no) && !endCache.has(grid[endNode.top][endNode.col].no)) {
                    grid[endNode.top][endNode.col].previous = endNode
                    endCache.add(grid[endNode.top][endNode.col].no)
                    startNeighbors.push(grid[endNode.top][endNode.col])
                } else if (visited.has(grid[endNode.top][endNode.col].no)) {
                    let result = getResultPath(grid, endNode)
                    return [visitedPath, result.concat(getResultPath(grid, grid[endNode.top][endNode.col]))]
                }
                if (endNode.bottom != null && !visited.has(grid[endNode.bottom][endNode.col].no) && !endCache.has(grid[endNode.bottom][endNode.col].no)) {
                    endCache.add(grid[endNode.bottom][endNode.col].no)
                    grid[endNode.bottom][endNode.col].previous = endNode
                    startNeighbors.push(grid[endNode.bottom][endNode.col])
                } else if (visited.has(grid[endNode.bottom][endNode.col].no)) {
                    let result = getResultPath(grid, endNode)
                    return [visitedPath, result.concat(getResultPath(grid, grid[endNode.bottom][endNode.col]))]
                }
                if (endNode.left != null && !visited.has(grid[endNode.row][endNode.left].no) && !endCache.has(grid[endNode.row][endNode.left].no)) {
                    endCache.add(grid[endNode.row][endNode.left].no)
                    grid[endNode.row][endNode.left].previous = endNode
                    startNeighbors.push(grid[endNode.row][endNode.left])
                } else if (visited.has(grid[endNode.row][endNode.left])) {
                    let result = getResultPath(grid, endNode)
                    return [visitedPath, result.concat(getResultPath(grid, grid[endNode.row][endNode.left]))]
                }
                if (endNode.right != null && !visited.has(grid[endNode.row][endNode.right].no) && !endCache.has(grid[endNode.row][endNode.right].no)) {
                    endCache.add(grid[endNode.row][endNode.right].no)
                    grid[endNode.row][endNode.right].previous = endNode
                    startNeighbors.push(grid[endNode.row][endNode.right])
                } else if (visited.has(grid[endNode.row][endNode.right])) {
                    let result = getResultPath(grid, endNode)
                    return [visitedPath, result.concat(getResultPath(grid, grid[endNode.row][endNode.right]))]
                }
            }
        }

    }
    return [visitedPath, []]
}


function getResultPath(grid, current) {
    console.log(current)
    let resultPath = []
    while (grid[current.row][current.col].previous !== null) {
        if (!grid[current.row][current.col].start && !grid[current.row][current.col].end) {
            resultPath.push([current.row, current.col])
        }
        current = grid[current.row][current.col].previous
    }
    return resultPath.reverse()
}

export { bfs, dfs, bidirectionalSearch }