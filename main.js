"use strict";

const cells = document.querySelectorAll("[data-cell]");
let isXTurn = true;

// function drawShape(e, shape) {}
for (const cell of cells) {
    cell.addEventListener(
        "click",
        e => {
            if (isXTurn == true) {
                e.target.classList.add("x");
            } else {
                e.target.classList.add("circle");
            }
            isXTurn = !isXTurn;
        }, { once: true }
    );
}