export default bfs(grid, start) {
    let visitedPath = []
    let resultPath = []
    let neighbors = []
    let visited = new Set()
    neighbors.push(start)
    let cacheNeighbours = new Set()
    while (neighbors.length) {
        let current = neighbors.shift()
        if (current.end) {
            return [visitedPath, getResultPath(grid, current)]
        } else {
            if (!current.wall) {
                visited.add(current.no)
                path.add([current.row, current.col])
                cacheNeighbours.add(current.no)
                if (current.top != null && !visited.has(grid[current.top][current.col].no) && !cacheNeighbours.has(grid[current.top][current.col].no)) {
                    grid[current.top][current.col].previous = current
                    visit
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
}

function getResultPath()