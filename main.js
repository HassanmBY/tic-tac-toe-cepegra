"use strict";
//clickable 😸
//winner 😸
//player name 😸
//Result 😸

const cells = document.querySelectorAll("[data-cell]"),
    board = document.querySelector(`[id="board"]`),
    winMessage = document.querySelector(`[id="winningMessageText"]`),
    restartButton = document.querySelector(`[id="restartButton"]`),
    startButton = document.querySelector(`[id="startButton"]`),
    playerInputs = document.querySelectorAll("[data-player"),
    landingPage = document.querySelector(`[id="landingPage"]`),
    turnText = document.querySelector(`[id="turnText"]`);

let isXTurn = true,
    className = isXTurn ? "x" : "circle",
    cellIndices = Array(9).fill(null);

function getPlayerNames() {
    if (playerInputs[0].value != "" && playerInputs[1].value != "") {
        landingPage.style.display = "none";
        init();
    } else {
        alert("Veuillez entrer un nom pour les deux joueurs");
    }
    return null;
}
startButton.addEventListener("click", getPlayerNames);

//initialize game
function init() {
    //caclulate who's turn it is
    let name = isXTurn ? playerInputs[0].value : playerInputs[1].value;
    //Display player turns
    turnText.innerText = `C'est au tour de/d' ${name}`;

    //add click event listener to all cells
    for (const cell of cells) {
        cell.addEventListener("click", clickHandler, { once: true });
    }
    toggleClasses();
}

function toggleClasses(e) {
    board.className = "board";
    className = isXTurn ? "x" : "circle";

    board.classList.add(className);
}

function clickHandler(e) {
    //get index of clicked cell
    const index = Array.prototype.indexOf.call(cells, e.target);

    //set cell to X or O depending on isXTurn value
    if (isXTurn == true) {
        e.target.classList.add("x");
        cellIndices[index] = "x";
    } else {
        e.target.classList.add("circle");
        cellIndices[index] = "o";
    }

    //check for winner or tie and display message
    if (checkForWinner(cellIndices)) {
        winMessage.innerHTML = `${checkForWinner(cellIndices)} est le gagnant!`;
        winMessage.parentElement.classList.add("show");
    } else if (cellIndices.includes(null) == false) {
        winMessage.innerHTML = `C'est une égalité!`;
        winMessage.parentElement.classList.add("show");
    }

    isXTurn = !isXTurn;
    //caclulate who's turn it is
    let name = isXTurn ? playerInputs[0].value : playerInputs[1].value;
    //Display player turns
    turnText.innerText = `C'est au tour de/d' ${name}`;

    //toggle board class when it's the other persons turn
    toggleClasses();
}

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
            //caclulate who's turn it is
            let name = isXTurn ? playerInputs[0].value : playerInputs[1].value;
            //return winner
            return name;
        }
    }
    return null;
}

function clearBoard() {
    for (const cell of cells) {
        cell.classList.remove("x");
        cell.classList.remove("circle");
        cell.removeEventListener("click", clickHandler);
    }

    isXTurn = Math.random() > 0.5;
    cellIndices = Array(9).fill(null);
    winMessage.parentElement.classList.remove("show");
    init();
}

restartButton.addEventListener("click", clearBoard);