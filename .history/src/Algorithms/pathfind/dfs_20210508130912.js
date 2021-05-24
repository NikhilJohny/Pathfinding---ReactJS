function dfs(currentState) {
    console.log(currentState)
    const grid = currentState
    console.log(grid)

    const temp = {
        row: 1,
        col: 1,
        start: false,
        end: false,
        previous: null,
        top: 0,
        bottom: 2,
        left: 0,
        right: 2,
        wall: false,
        visisted: false
    }
    let visited = new Set()
    let neighbors = []
    neighbors.push(temp)
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