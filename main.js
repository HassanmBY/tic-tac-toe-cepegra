"use strict";
//clickable 😸
//winner 😸
//player name 😸
//Result 😸

//#region HOISTING

const cells = document.querySelectorAll("[data-cell]"),
    board = document.querySelector(`[id="board"]`),
    winMessage = document.querySelector(`[id="winningMessageText"]`),
    restartButton = document.querySelector(`[id="restartButton"]`),
    startButton = document.querySelector(`[id="startButton"]`),
    playerInputs = document.querySelectorAll("[data-player"),
    landingPage = document.querySelector(`[id="landingPage"]`),
    turnText = document.querySelector(`[id="turnText"]`),
    table = document.querySelector(`[id="table"]`),
    lightBox = document.querySelector(`[id="lightBox"]`),
    scores = document.querySelector(`[id="scores"]`);

let isXTurn = true,
    className = isXTurn ? "x" : "circle",
    cellIndices = Array(9).fill(null);

//#endregion

//#region GET PLAYER NAMES
function getPlayerNames() {
    if (playerInputs[0].value == "") {
        playerInputs[0].value = "Anonymous 1";
    }

    if (playerInputs[1].value == "") {
        playerInputs[1].value = "Anonymous 2";
    }
    landingPage.style.display = "none";
    init();
    return null;
}
startButton.addEventListener("click", getPlayerNames);
//#endregion

//#region INIT && TOGGLE TURN
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

//#endregion

//#region CLICK EVENT LISTENER
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
    if (checkForWinner(cellIndices) != null) {
        let name = isXTurn ? playerInputs[0].value : playerInputs[1].value;
        winMessage.innerHTML = `${name} est le gagnant!`;
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

//#endregion

//#region CHECK FOR WINNER
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
            let name = isXTurn ? playerInputs[0].value : playerInputs[1].value,
                tttName = "ttt" + name;
            if (localStorage.getItem(tttName) === null) {
                localStorage.setItem(
                    tttName,
                    JSON.stringify({ name: name, winCount: "1" })
                );
            } else {
                let player = JSON.parse(localStorage.getItem(tttName));
                player.winCount = +player.winCount + 1;
                localStorage.setItem(tttName, JSON.stringify(player));
            }
            //return winner
            return name;
        }
    }
    return null;
}
//#endregion

//#region RESTART GAME
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

//#endregion

//#region SHOW SCORES
function showScores() {
    lightBox.classList.toggle("showLl");
    let tr = document.createElement("tr");
    let player = document.createElement("th");
    player.innerText = "Joueur";
    let winCount = document.createElement("th");
    winCount.innerText = "Nombre de victoires";

    table.innerHTML = "";
    tr.appendChild(player);
    tr.appendChild(winCount);
    table.appendChild(tr);

    for (let key of Object.keys(localStorage)) {
        if (key.startsWith("ttt")) {
            let slice = key.slice("3");
            let keyArr = [];
            keyArr.push(slice);
            let row = document.createElement("tr");
            for (const val of keyArr) {
                let td = document.createElement("td");
                let td2 = document.createElement("td");
                td.innerText = val;
                td2.innerText = JSON.parse(localStorage.getItem(key)).winCount;
                row.appendChild(td);
                row.appendChild(td2);
            }
            table.appendChild(row);
        }
    }
    // for (let i = 0; i < localStorage.length; i++) {
    //     let player = JSON.parse(localStorage.getItem(localStorage.key(i))),
    //         name = player.name,
    //         winCount = player.winCount,
    //         row = document.createElement("tr");
    //     row.innerText = `${localStorage.key(i)}`;
    //     table.appendChild(row);
    // }
}

scores.addEventListener("click", showScores);