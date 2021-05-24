export default function bfs(grid, start) {
    console.log(grid)
    console.log('testing')
    let visitedPath = []
    let neighbors = []
    let visited = new Set()
    neighbors.push(start)
    let cacheNeighbours = new Set()
    while (neighbors.length) {
        console.log('hi')
        let current = neighbors.shift()
        if (current.end) {
            console.log('found')
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
    console.log('ended')
    return [visitedPath, []]
}

function getResultPath(grid, current) {
    let resultPath = []
    while (grid[current.row][current.col].previous != null) {
        console.log('hey there')
        if (!grid[current.row][current.col].start && !grid[current.row][current.col].end) {
            resultPath.push([current.row, current.col])
        }
        current = grid[current.row][current.col].previous
    }
    return resultPath
}