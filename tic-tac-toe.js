document.addEventListener("DOMContentLoaded", function () {
    const squares = document.querySelectorAll("#board div");

    let currentPlayer = "X";
    const board = Array(9).fill("");

    squares.forEach(function (square, index) {
        square.classList.add("square");

        square.addEventListener("click", function () {
            if (board[index] !== "") {
                return;
            }

            square.textContent = currentPlayer;
            square.classList.add(currentPlayer);

            board[index] = currentPlayer;

            currentPlayer = currentPlayer === "X" ? "O" : "X";
        });
    });
});
