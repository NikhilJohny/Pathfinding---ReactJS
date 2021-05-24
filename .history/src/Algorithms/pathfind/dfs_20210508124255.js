function dfs(currentState) {
    let grid = currentState
    console.log('hi there')

    let visited = new Set()
    let neighbors = []
    neighbors.push(grid[0][0])
    while (neighbors.length) {
        let currentNode = neighbors.pop()
        visited.add(currentNode)
        if (currentNode.top != null && !visited.has(grid[currentNode.top][currentNode.col])) {
            neighbors.push(grid[currentNode.top][currentNode.col])
        }
        if (currentNode.bottom != null && !visited.has(grid[currentNode.bottom][currentNode.col])) {
            neighbors.push(grid[currentNode.bottom][currentNode.col])
        }
        if (currentNode.left != null && !visited.has(currentNode.left)) {
            neighbors.push(currentNode.left)
        }
        if (currentNode.right != null && !visited.has(currentNode.right)) {
            neighbors.push(currentNode.right)
        }
    }
}

export default dfs;