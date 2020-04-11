// Function to create and populate an initial scene
import
{
    openInstructionsModal,
    closeIntructionsModal
}
from "./modal.js"
const createScene = (engine) =>
{
    // Initialize Scene
    let scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3.White();

    // Create Lighting
    var light = new BABYLON.PointLight("light1", new BABYLON.Vector3(50, 180, 50), scene);
    var light1 = new BABYLON.PointLight("light1", new BABYLON.Vector3(-50, 180, -50), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.3;
    light1.intensity = 0.3;

    // Create the floor so we have a reference plane
    let ground = BABYLON.MeshBuilder.CreateBox("Ground",
        {
            width: 300,
            height: 1,
            depth: 300
        }, scene);
    ground.position.y = -25.0;

    // Initialize the material for the ground
    let groundMat = new BABYLON.StandardMaterial("groundMat", scene);
    groundMat.diffuseColor = new BABYLON.Color3(.3764705882, .5019607843, .2196078431);
    groundMat.emissiveColor = new BABYLON.Color3(.1, .1, .1);
    groundMat.backFaceCulling = false;

    let textureResolution = 512;
    let textureGround = new BABYLON.DynamicTexture("ground-texture1",
        {
            width: 400,
            height: 200
        }, scene);
    textureGround.uniqueId = "ground-texture1";

    // let textureContext = textureGround.getContext();

    groundMat.diffuseTexture = textureGround;

    let font = "bold 24px monospace";
    // textureGround.drawText("Created By Ofek", 30, 20, font, "Blue", "white", true, false);

    ground.material = groundMat;
    ground.receiveShadows = true;
    ground.rotate(BABYLON.Axis.Y, Math.PI, BABYLON.Space.World);

    // Create a camera to view the 3D scene at an angle
    let camPos = 150
        // Parameters : name, position, scene
        let camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(-camPos, camPos, 0), scene);
    // Targets the camera to a particular position. In this case the scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // Attach the camera to the canvas
    camera.attachControl(canvas, true);

    return scene;
};

// function to handle keyboard inputs
const handleKeyDown = (key, snake) =>
{
    let direction;

    switch (key)
    {
    case "m":
        openInstructionsModal()
        break;
    case "Escape":
        closeIntructionsModal()
        break;
    default:
        snake.rotate(key)

    }

    // return direction;
}

const createScoreBoard = (scene) =>
{
    let scoreTexture = new BABYLON.DynamicTexture("scoreTexture", 512, scene, true);
    let scoreboard = BABYLON.Mesh.CreateBox("scoreboard",
        {
            width: 50,
            height: 10
        }, scene);

    // Position the scoreboard after the lane.
    scoreboard.position.x = 150;
    scoreboard.position.y = 10;
    scoreboard.rotate(BABYLON.Axis.Y, Math.PI / 2, BABYLON.Space.World);
    // scoreboard.rotate(BABYLON.Axis.X, Math.PI/4, BABYLON.Space.World);
    // Create a material for the scoreboard.
    scoreboard.material = new BABYLON.StandardMaterial("scoradboardMat", scene);
    // Set the diffuse texture to be the dynamic texture.
    scoreboard.material.diffuseTexture = scoreTexture;
    // scoreboard.material.diffuseColor = BABYLON.Color3.White();
    return scoreTexture;
}

export
{
    createScene,
    handleKeyDown,
    createScoreBoard
};
