// Define all DOM elements to register events to
let closeButton = document.querySelector("#close-button");
let instructionsModal = document.querySelector("#instructionsModal");
let gameOverModalContainer = document.querySelector("#game-over-modal-container");
let gameOverCloseButton = document.querySelector("#game-over-close-button");
let gameOverResetButton = document.querySelector("#game-over-reset-button");
let gameOverContinueButton = document.querySelector("#game-over-continue-button");
let gameOverMessageDiv     = document.querySelector(".message")

let canvas = document.querySelector("#canvas");
let resetButton = document.querySelector("#reset-button");
let toggleGameModeButton = document.querySelector("#game-mode-button");

// Define Global Variables to hold Game State
window.modalIsOpen = true;
window.resetGame = false;
window.practiceMode = true;

// Define functions to handle click events

// Functon to close instructions modal and bring the canvas into focus (allows keyboard input without clicking)
const closeIntructionsModal = () =>
{
    instructionsModal.style.display = 'none';
    canvas.focus();
    window.modalIsOpen = false;
}
// Bring back instructions modal into view
const openInstructionsModal = () =>
{
    console.log("Opening Modal")
    instructionsModal.style.display = 'grid';
    window.modalIsOpen = true;
}

// Reset game, bring snake to original size, close all modals
const resetGame = () =>
{
    window.resetGame = true;
    closeIntructionsModal();
    closeGameOverModal();
}

// Toggle between practice mode (collisions dont end game), and normal mode
const toggleGameMode = () =>
{
    window.practiceMode = !window.practiceMode;
    const practiceText = "Practice Mode";
    const normalText = "Normal Mode";
    toggleGameModeButton.textContent = window.practiceMode ? practiceText : normalText;

}

// Open game over modal
const openGameOverModal = () =>
{
    gameOverModalContainer.style.display = "grid";
    gameOverMessageDiv.textContent = "Game Over! Your Score was: " + window.snakeLength + ". Would you like to reset the game or continue?"
    window.modalIsOpen = true;
}
// close game over modal
const closeGameOverModal = () =>
{
    gameOverModalContainer.style.display = "none";
    canvas.focus();
    window.modalIsOpen = false;
}

// Register click events
closeButton.addEventListener('click', closeIntructionsModal);
resetButton.addEventListener('click', resetGame);
toggleGameModeButton.addEventListener('click', toggleGameMode);
gameOverCloseButton.addEventListener('click', closeGameOverModal);
gameOverResetButton.addEventListener('click', resetGame);

gameOverContinueButton.addEventListener('click', closeGameOverModal);

export
{
    openInstructionsModal,
    closeIntructionsModal,
    openGameOverModal,
    closeGameOverModal
}
