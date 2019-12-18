let gridGame;

function readForm() {
    // Serialize array, then convert it to a key value pair, with the key being the form elements name
    return formData = $('form').serializeArray().reduce(function (obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
}

$(document).ready(function () {

    $("#player1NameInput").focus();

    $("#grid").on('click', ".clickable", function () {
        let newX = $(this).data("x");
        let newY = $(this).data("y");
        let direction = $(this).data("direction");

        gridGame.makeMove(newX, newY, direction);
    });

    $("#player1Move, #player2Move").on("click", function () {
        gridGame.showMoves();
        $("#player1Buttons, #player2Buttons").addClass("d-none");
    });


    $("#player1Attack, #player2Attack").on("click", function () {
        gridGame.attackPlayer();
    });

    $("#player1Defend, #player2Defend").on("click", function () {
        gridGame.defendsOneself();
    });

    $("#playAgainButton").on("click", function () {
        window.location.reload();
    })

    $("#playButton").on("click", function () {

        // get the player names
        let formData = readForm();

        // if there are names entered
        if (formData.player1NameInput !== "" && formData.player2NameInput !== "") {

            // create players
            let player1 = new Player(formData.player1NameInput, "images/boy.png", "player1");
            let player2 = new Player(formData.player2NameInput, "images/girl.png", "player2");

            player1.setWeapon(player1Weapon);
            player2.setWeapon(player2Weapon);

            // create the game grid
            let gameGrid = new Grid(10, 10);

            // distribute the weapons
            weaponList.forEach(weapon => {
                gameGrid.distributeObject(weapon);
            });

            // distribute the players
            gameGrid.distributeObject(player1);
            gameGrid.distributeObject(player2);

            // create a new game
            gridGame = new Game(player1, player2, gameGrid);

            // display the grid
            gameGrid.displayGrid();

            // show possible moves a player can take
            gridGame.showMoves();

            // display the entered names
            $("#player1Name").text(formData.player1NameInput);
            $("#player2Name").text(formData.player2NameInput);

            // display the game
            $("#startRow").addClass("d-none");
            $("#gameRow").removeClass("d-none");

        } else {
            // display error asking for names to be entered
            alert("Please enter two names to begin the game!")
        }
    });

    $("form").on("submit", function (e) {
        e.preventDefault();
        return false;
    })
});