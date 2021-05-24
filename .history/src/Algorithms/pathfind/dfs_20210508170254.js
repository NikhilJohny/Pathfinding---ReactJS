function dfs(currentState, i) {
    let counter = 0
    if (i === 1) {
        const grid = currentState
        console.log(grid[0][0])

        const temp = {
            row: 0,
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
        while (counter <= 70) {
            let currentNode = neighbors.pop()
            if (currentNode.end) return grid
            grid[currentNode.row][currentNode.col].visited = true
            visited.add(currentNode)

            if (currentNode.top != null && !visited.has(grid[currentNode.top][currentNode.col])) {
                neighbors.push(grid[currentNode.top][currentNode.col])
            }
            if (currentNode.bottom != null && !visited.has(grid[currentNode.bottom][currentNode.col])) {
                neighbors.push(grid[currentNode.bottom][currentNode.col])
            }
            if (currentNode.left != null && !visited.has(grid[currentNode.row][currentNode.left])) {
                neighbors.push(grid[currentNode.row][currentNode.left])
            }
            if (currentNode.right != null && !visited.has(grid[currentNode.row][currentNode.right])) {
                neighbors.push(grid[currentNode.row][currentNode.right])
            }
            counter++
        }
        return grid
    }
}

export default dfs;