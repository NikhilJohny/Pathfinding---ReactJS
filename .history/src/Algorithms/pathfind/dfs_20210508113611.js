function dfs() {
    let visited = new Set()
    let neighbors = []
    while (neighbors.length) {
        let currentNode = neighbors.pop()
        if (currentNode.top != null && !visited.has(currentNode.top)) {
            neighbors.push(currentNode.top)
        }
        if (currentNode.bottom != null && !visited.has(currentNode.bottom)) {
            neighbors.push(currentNode.bottom)
        }
        if (currentNode.left != null && !visited.has(currentNode.left)) {
            neighbors.push(currentNode.left)
        }
        if (currentNode.bottom != null && !visited.has(currentNode.bottom)) {
            neighbors.push(currentNode.bottom)
        }
    }
}