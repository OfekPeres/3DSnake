import
{
    Snake
}
from "./snake.js"

import
{
    createScene,
    handleKeyDown,
    createScoreBoard
}
from "./utils.js"
import {openGameOverModal} from "./modal.js"


console.log("Top of Main");

window.addEventListener('DOMContentLoaded', function ()
{
    let canvas = document.getElementById('canvas');
    let engine = new BABYLON.Engine(canvas, true);
    let scoreTexture;
    const snakeBoxSize = 8;
    const initialSnakeLength = 4;

    // Utilize Helper function above to initialize a scene
    let scene = createScene(engine);
    // Get the light source for shadows
    const light = scene.getLightByName("light1")
    let shadowGenerator = new BABYLON.ShadowGenerator(2048, light);

    
    let snake = new Snake(scene, initialSnakeLength, snakeBoxSize, shadowGenerator);

    const camera = scene.getCameraByName("UniversalCamera");

    // Run Main Loop
    let curTime = Date.now();
    console.log("Created Scene - Starting Render Loop");

    scene.onKeyboardObservable.add((kbInfo) =>
    {
        switch (kbInfo.type)
        {
        case BABYLON.KeyboardEventTypes.KEYDOWN:
            console.log("KEY DOWN: ", kbInfo.event.key);
            handleKeyDown(kbInfo.event.key, snake);
            // snake.updateDirection(newDirection);
            break;
        case BABYLON.KeyboardEventTypes.KEYUP:
            console.log("KEY UP: ", kbInfo.event.keyCode);
            break;
        }
    }
    );

    // Run Render Loop
    engine.runRenderLoop(() =>
    {
        // Only update the snake's position every 100ms
        if (Date.now() - curTime > 100)
        {
            // Check if need to reset game
            if (window.resetGame == true) 
            {
                snake.reset();
                window.resetGame = false;
            }
            let snakeHasCollided = snake.update();
            if (snakeHasCollided) {
                window.snakeLength = snake.boxes.length;
                openGameOverModal();

            }
            curTime = Date.now();
            scoreTexture = scene.getTextureByUniqueID("ground-texture1");
            // Draw the text using a white font on black background.
            let font = "bold 24px monospace";
            
            scoreTexture.drawText("Your Score is: " + snake.boxes.length, 30, 100, font, "black", "white", true, true);
            
        }

        // origin.addRotation(0,Math.PI/3,0);
        scene.render();
    }
    );

}
);
