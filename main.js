"use strict";
//clickable 😸
//winner 😸
//player name
//Result

const cells = document.querySelectorAll("[data-cell]"),
    board = document.querySelector(`[id="board"]`),
    winMessage = document.querySelector(`[id="winningMessageText"]`);
let isXTurn = true,
    className = isXTurn ? "x" : "circle",
    cellIndices = Array(9).fill(null);

function checkForWinner(array) {
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < winCombos.length; i++) {
        const [a, b, c] = winCombos[i];
        if (array[a] && array[a] === array[b] && array[a] === array[c]) {
            return array[a];
        }
    }
    return "No winner yet";
}

for (const cell of cells) {
    cell.addEventListener(
        "click",
        e => {
            //get index of clicked cell
            const index = Array.prototype.indexOf.call(cells, e.target);

            if (isXTurn == true) {
                e.target.classList.add("x");
                cellIndices[index] = "x";
            } else {
                e.target.classList.add("circle");
                cellIndices[index] = "o";
            }

            if (
                checkForWinner(cellIndices) == "x" ||
                checkForWinner(cellIndices) == "o"
            ) {
                winMessage.innerHTML = `${checkForWinner(cellIndices)} is the winner!`;
                winMessage.parentElement.classList.add("show");
            } else if (cellIndices.includes(null) == false) {
                winMessage.innerHTML = `It's a tie!`;
                winMessage.parentElement.classList.add("show");
            }

            console.log(`check for winner in gameGrid: ${checkForWinner(cellIndices)}`);

            isXTurn = !isXTurn;
        }, { once: true }
    );
}

function handleBoardHover(e, className) {
    board.classList.add(className);
}

board.addEventListener("mouseover", e => {
    board.className = "board";
    className = isXTurn ? "x" : "circle";
    handleBoardHover(e, className);
});