$(document).ready(function () {
    $("#grid").on('click', ".clickable", function () {
        let newX = $(this).data("x");
        let newY = $(this).data("y");
        let direction = $(this).data("direction");

        gridGame.makeMove(newX, newY, direction);
    });
});