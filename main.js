import
{
    Snake
}
from "./snake.js"

import
{
    createScene,
    handleKeyDown
}
from "./utils.js"

console.log("Top of Main");
window.addEventListener('DOMContentLoaded', function ()
{
    let canvas = document.getElementById('canvas');
    let engine = new BABYLON.Engine(canvas, true);
    const snakeBoxSize = 8;
    const initialSnakeLength = 3;

    // Utilize Helper function above to initialize a scene
    let scene = createScene(engine);
    // Get the light source for shadows
    const light = scene.getLightByName("light1")
    let shadowGenerator = new BABYLON.ShadowGenerator(2048, light);
    
    let transformNode = new BABYLON.TransformNode("root");
    let snake = new Snake(scene, initialSnakeLength, snakeBoxSize, shadowGenerator, transformNode);
    let origin = scene.getMeshByName("Origin")
    origin.parent = transformNode;
    // Testing for making the camera follow the snake's head
    // const camera = scene.getCameraByName("UniversalCamera");
    // camera.lockedTarget = snake.boxes[snake.boxes.length - 1];
    
    // Run Main Loop
    let curTime = Date.now();
    console.log("Created Scene - Starting Render Loop");
    
    scene.onKeyboardObservable.add((kbInfo) => {
    switch (kbInfo.type) {
        case BABYLON.KeyboardEventTypes.KEYDOWN:
            console.log("KEY DOWN: ", kbInfo.event.key);
            const newDirection = handleKeyDown(kbInfo.event.key, snake.getDirection(), transformNode);
            snake.updateDirection(newDirection);
            break;
        case BABYLON.KeyboardEventTypes.KEYUP:
            console.log("KEY UP: ", kbInfo.event.keyCode);
            break;
    }
});

    // Run Render Loop
    engine.runRenderLoop(() =>
    {
        // Only update the snake's position every 100ms
        if (Date.now() - curTime > 100)
        {
            snake.move();
            curTime = Date.now();
        }
        
        // origin.addRotation(0,Math.PI/3,0);
        scene.render();
    }
    );

}
);
