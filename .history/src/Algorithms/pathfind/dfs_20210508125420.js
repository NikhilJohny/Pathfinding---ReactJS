function dfs(currentState) {
    const grid = currentState
    console.log('hi there')
    const temp = {
        row: 1,
        col: 1,
        start: false,
        end: false,
        previous: null,
        top: i === 0 ? null : i - 1,
        bottom: i === 19 ? null : i + 1,
        left: j === 0 ? null : j - 1,
        right: j === 59 ? null : j + 1,
        wall: false,
        visisted: false
    }
    let visited = new Set()
    let neighbors = []
    neighbors.push(grid[0][0])
    while (neighbors.length) {
        let currentNode = neighbors.pop()
        grid[currentNode.row][currentNode.col].visited = true
        visited.add(currentNode)
        if (currentNode.top != null && !visited.has(grid[currentNode.top][currentNode.col])) {
            neighbors.push(grid[currentNode.top][currentNode.col])
        }
        if (currentNode.bottom != null && !visited.has(grid[currentNode.bottom][currentNode.col])) {
            neighbors.push(grid[currentNode.bottom][currentNode.col])
        }
        if (currentNode.left != null && !visited.has(grid[currentNode.left][currentNode.row])) {
            neighbors.push(grid[currentNode.left][currentNode.row])
        }
        if (currentNode.right != null && !visited.has(grid[currentNode.right][currentNode.row])) {
            neighbors.push(grid[currentNode.right][currentNode.row])
        }
    }
    return grid
}

export default dfs;