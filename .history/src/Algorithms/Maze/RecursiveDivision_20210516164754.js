function recursiveDivisionMaze(grid, startNode, finishNode) {
    if (!startNode || !finishNode || startNode === finishNode) {
        return false;
    }
    let vertical = this.range(60);
    let horizontal = this.range(20);
    let walls = [];
    this.getRecursiveWalls(vertical, horizontal, grid, startNode, finishNode, walls);
    return walls;
}

function range(len) {
    let result = [];
    for (let i = 0; i < len; i++) {
        result.push(i);
    }
    return result;
}

//dir === 0 => Horizontal
//dir === 1 => Vertical

function getRecursiveWalls(vertical, horizontal, grid, startNode, finishNode, walls) {
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
        this.addWall(grid, dir, num, vertical, horizontal, startNode, finishNode, walls);
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
        this.addWall(grid, dir, num, vertical, horizontal, startNode, finishNode, walls);
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

function generateOddRandomNumber(array) {
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

async function addWall(grid, dir, num, vertical, horizontal, startNode, finishNode, walls) {
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