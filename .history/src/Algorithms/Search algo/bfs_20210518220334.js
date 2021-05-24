function bfs(grid, start) {
    let visitedPath = []
    let neighbors = [start]
    let visited = new Set()
    let cacheNeighbors = new Set()
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
    while (startNeighbors.length && endNeighbors) {
        let current = startNeighbors.shift()
        if (current.end) {
            return [visitedPath, getResultPath(grid, current)]
        } else {
            if (!current.wall || (current.start && current.wall)) {
                visited.add(current.no)
                startCache.add(current.no)
                visitedPath.push([current.row, current.col])

                if (current.top != null && !visited.has(grid[current.top][current.col].no) && !cacheNeighbours.has(grid[current.top][current.col].no)) {
                    grid[current.top][current.col].previous = current
                    startCache.add(grid[current.top][current.col].no)
                    startNeighbors.push(grid[current.top][current.col])
                }
                if (current.bottom != null && !visited.has(grid[current.bottom][current.col].no) && !startCache.has(grid[current.bottom][current.col].no)) {
                    startCache.add(grid[current.bottom][current.col].no)
                    grid[current.bottom][current.col].previous = current
                    startNeighbors.push(grid[current.bottom][current.col])
                }
                if (current.left != null && !visited.has(grid[current.row][current.left].no) && !startCache.has(grid[current.row][current.left].no)) {
                    startCache.add(grid[current.row][current.left].no)
                    grid[current.row][current.left].previous = current
                    startNeighbors.push(grid[current.row][current.left])
                }
                if (current.right != null && !visited.has(grid[current.row][current.right].no) && !startCache.has(grid[current.row][current.right].no)) {
                    startCache.add(grid[current.row][current.right].no)
                    grid[current.row][current.right].previous = current
                    startNeighbors.push(grid[current.row][current.right])
                }
            }
        }
    }
}


function getResultPath(grid, current) {
    let resultPath = []
    while (grid[current.row][current.col].previous != null) {
        if (!grid[current.row][current.col].start && !grid[current.row][current.col].end) {
            resultPath.push([current.row, current.col])
        }
        current = grid[current.row][current.col].previous
    }
    return resultPath.reverse()
}

export { bfs, dfs }