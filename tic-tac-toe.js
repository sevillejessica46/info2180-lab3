document.addEventListener("DOMContentLoaded", function () {
    const gameBoard = document.getElementById("board");
    const squares = document.querySelectorAll("#board div");
    const status = document.getElementById("status");
    const newGameButton = document.querySelector(".btn");

    let currentPlayer = "X";
    const board = Array(9).fill("");

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Exercise 1:   Add square class
    squares.forEach(function (square) {
        square.classList.add("square");
    });

    function checkWinner() {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;

            if (
                board[a] !== "" &&
                board[a] === board[b] &&
                board[b] === board[c]
            ) {
                return combination;
            }
        }

        return null;
    }

    // Draw a line through the wining three squares
    function drawWinningLine(combination) {
        const firstSquare = squares[combination[0]];
        const lastSquare = squares[combination[2]];

        const boardRect = gameBoard.getBoundingClientRect();
        const firstRect = firstSquare.getBoundingClientRect();
        const lastRect = lastSquare.getBoundingClientRect();

        const startX =
            firstRect.left + firstRect.width / 2 - boardRect.left;

        const startY =
            firstRect.top + firstRect.height / 2 - boardRect.top;

        const endX =
            lastRect.left + lastRect.width / 2 - boardRect.left;

        const endY =
            lastRect.top + lastRect.height / 2 - boardRect.top;

        const distance = Math.sqrt(
            Math.pow(endX - startX, 2) +
            Math.pow(endY - startY, 2)
        );

        const angle =
            Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

        const line = document.createElement("div");

        line.id = "winning-line";

        line.style.position = "absolute";
        line.style.height = "6px";
        line.style.width = distance + "px";
        line.style.left = startX + "px";
        line.style.top = startY + "px";
        line.style.backgroundColor = "#e85d8e";
        line.style.borderRadius = "10px";
        line.style.transformOrigin = "0 50%";
        line.style.transform = "rotate(" + angle + "deg) scaleX(0)";
        line.style.transition = "transform 0.6s ease";
        line.style.zIndex = "5";
        line.style.pointerEvents = "none";

        gameBoard.style.position = "relative";
        gameBoard.appendChild(line);

        // Animate the line
        setTimeout(function () {
            line.style.transform =
                "rotate(" + angle + "deg) scaleX(1)";
        }, 50);
    }

    // Exercise 2: Click squares
    squares.forEach(function (square, index) {

        square.addEventListener("click", function () {

            // Do not allow an occupied square to be changed
            if (board[index] !== "") {
                return;
            }

            square.textContent = currentPlayer;
            square.classList.add(currentPlayer);

            board[index] = currentPlayer;

            // Exercise 4: Check for winner
            const winningCombination = checkWinner();

            if (winningCombination) {

                const winner = board[winningCombination[0]];

                status.textContent =
                    "Congratulations! " +
                    winner +
                    " is the Winner!";

                status.classList.add("you-won");

                // Highlight winning squares
                winningCombination.forEach(function (position) {
                    squares[position].style.zIndex = "6";
                });

                // Draw line through winning combination
                drawWinningLine(winningCombination);

                return;
            }

            currentPlayer =
                currentPlayer === "X" ? "O" : "X";
        });

        // Exercise 3: Hover effect
        square.addEventListener("mouseover", function () {
            if (board[index] === "") {
                square.classList.add("hover");
            }
        });

        square.addEventListener("mouseout", function () {
            square.classList.remove("hover");
        });
    });

    // Exercise 5: New Game
    newGameButton.addEventListener("click", function () {

        // Clear all squares
        squares.forEach(function (square, index) {
            square.textContent = "";
            square.classList.remove("X");
            square.classList.remove("O");
            square.classList.remove("hover");
            square.style.zIndex = "";
            board[index] = "";
        });

        // Reset player
        currentPlayer = "X";

        // Reset status
        status.textContent =
            "Move your mouse over a square and click to play an X or an O.";

        status.classList.remove("you-won");

        // 		Remove winning line
        const winningLine =
            document.getElementById("winning-line");

        if (winningLine) {
            winningLine.remove();
        }
    });
			});
