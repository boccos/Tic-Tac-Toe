let board = ["", "", "", "", "", "", "", "", ""];
let human = "X";
let computer = "O";
let gameOver = false;

const cells = document.querySelectorAll(".cell");
const resultDiv = document.getElementById("gameResult");

const restartButton = document.createElement("button");
restartButton.textContent = "🔄 Restart";
restartButton.classList.add("restart");

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        if (cell.textContent === "" && !gameOver) {
            makeMove(cell, human);
            if (!gameOver) computerMove();
        }
    });
});

restartButton.addEventListener("click", () => {
    restartButton.remove();
    board = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;
    cells.forEach(c => {
        c.textContent = "";
        c.style.backgroundColor = "#333";
    });
    resultDiv.textContent = "";
});

function makeMove(cell, player) {
    const index = cell.getAttribute("data-index");
    board[index] = player;
    cell.textContent = player;

    let winner = checkWinner();
    if (winner) endGame(winner);
}

function computerMove() {
    let emptyIndexes = board.map((val, i) => val === "" ? i : null).filter(v => v !== null);
    let randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
    let cell = document.querySelector(`.cell[data-index='${randomIndex}']`);
    makeMove(cell, computer);
}

function checkWinner() {
    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    for (let pattern of winPatterns) {
        const [a,b,c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
    }

    if (!board.includes("")) return "Tie";
    return null;
}

function endGame(winner) {
    gameOver = true;

    if (winner === human) {
        resultDiv.textContent = "You win!";
        highlightWinner(human);
    } else if (winner === computer) {
        resultDiv.textContent = "You lost!";
        highlightWinner(computer);
    } else {
        resultDiv.textContent = "It's a tie!";
        cells.forEach(c => c.style.backgroundColor = "#444");
    }

    resultDiv.after(restartButton);
}

function highlightWinner(player) {
    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    for (let pattern of winPatterns) {
        const [a,b,c] = pattern;
        if (board[a] === player && board[b] === player && board[c] === player) {
            cells[a].style.backgroundColor = player === human ? "green" : "red";
            cells[b].style.backgroundColor = player === human ? "green" : "red";
            cells[c].style.backgroundColor = player === human ? "green" : "red";
        }
    }
}