const solver = document.querySelector("#solver");
const fieldList = document.querySelectorAll("input[type=number]");
const clearButton = document.querySelector("#clearButton");
const boardNumber = 9;
let fields = initiateFields();

alert("Please do not break the rules of the game otherwise error will occur");

solver.addEventListener("click", () => {
    let board = initiateBoard()
    solve(board)
    update(board);
});

clearButton.addEventListener("click", () => {
   clear();
})

function solve(board, n = 9) {
    let row = -1;
    let col = -1;
    let isEmpty = true;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] == null) {
                row = i;
                col = j;
                isEmpty = false;
                break;
            }
        }
        if (!isEmpty) {
            break;
        }
    }
    if (isEmpty) {
        return true;
    }

    for (let num = 1; num <= n; num++) {
        if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (solve(board, n)) {
                return true;
            }
            else {
                board[row][col] = null;
            }
        }
    }
    return false;
}

function isSafe(board, row, col, num) {

    for (let x = 0; x < 9; x++)
        if (board[row][x] == num)
            return false;


    for (let x = 0; x < 9; x++)
        if (board[x][col] == num)
            return false;


    let startRow = row - row % 3;
    let startCol = col - col % 3;
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            if (board[i + startRow][j + startCol] == num)
                return false;

    return true;
}

function initiateBoard() {
    let initialInputBoard = [[]]
    let j = 0;
    let i = 1;
    fieldList.forEach(element => {
        if (element.value == "") {
            initialInputBoard[j].push(null)
        } else {
            initialInputBoard[j].push(Number(element.value))
        }
        if (i % 9 == 0 && i < 81) {
            initialInputBoard.push([])
            j++
        }
        i++;
    });
    return initialInputBoard;
}
function initiateFields() {
    let inputFields = [[]]
    let j = 0;
    let i = 1;
    fieldList.forEach(element => {
        inputFields[j].push(element)
        if (i % 9 == 0 && i < 81) {
            inputFields.push([])
            j++
        }
        i++;
    })
    return inputFields;
}

function update(sudokuBoard) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            fields[i][j].value = sudokuBoard[i][j];
        }
    }
}

function clear(){
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            fields[i][j].value = "";
        }
    }
}