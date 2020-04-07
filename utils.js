// Function to create and populate an initial scene
const createScene = (engine) =>
    {
        // Initialize Scene
        let scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3.Black();

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
        groundMat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        groundMat.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        groundMat.backFaceCulling = false;

        ground.material = groundMat;
        ground.receiveShadows = true;
        // Create a Box at the origin for visualization purposes
        
        
        let origin = BABYLON.MeshBuilder.CreateBox("Origin",
            {
                height: 5,
                width: 10,
                depth: 15
            }, scene);
        origin.position = new BABYLON.Vector3(0, 0, 0);

        var mat = new BABYLON.StandardMaterial("mat", scene);
        var texture = new BABYLON.Texture("./arrow.png", scene);
        mat.diffuseTexture = texture;

        origin.material = mat;

        // let randomMaterial = new BABYLON.StandardMaterial("randomMaterial", scene);
        // randomMaterial.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        // randomMaterial.emissiveColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        // origin.material = randomMaterial;
        
        // Create a camera to view the 3D scene at an angle
        let camPos = 150
        // Parameters : name, position, scene
        let camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(-camPos, camPos, -camPos), scene);
        // Targets the camera to a particular position. In this case the scene origin
        camera.setTarget(BABYLON.Vector3.Zero());
        // camera.lockedTarget = origin;

        // Attach the camera to the canvas
        camera.attachControl(canvas, true);

        return scene;
    };



// function to handle keyboard inputs
const handleKeyDown = (key, snake_direction,origin)=>
{
    let direction;
    switch(key)
    {
        case "a":
            // direction = new BABYLON.Vector3(-1,0,0);
            direction = new BABYLON.Vector3(-1,0,0);
            // origin.addRotation(-Math.PI/2,0,0);
            origin.translate(BABYLON.Axis.X, 15,BABYLON.Space.Local);
            origin.addRotation(0,-Math.PI/2,0);
            break;

        case "d":
            direction = new BABYLON.Vector3(1,0,0);
            origin.translate(BABYLON.Axis.X, 15,BABYLON.Space.Local);
            origin.addRotation(0,Math.PI/2,0);
            break;
        case "w":
            direction = new BABYLON.Vector3(0,1,0);
            origin.translate(BABYLON.Axis.X, 15,BABYLON.Space.Local);
            origin.addRotation(0,0,Math.PI/2);
            break
        case "s":
            direction = new BABYLON.Vector3(0,-1,0);
            origin.translate(BABYLON.Axis.X, 15,BABYLON.Space.Local);
            origin.addRotation(0,0,-Math.PI/2);
            break;
        case "o":
            direction = new BABYLON.Vector3(0,0,1);
            break;
        case "p":
            direction = new BABYLON.Vector3(0,0,-1);
            break;
        default:
            direction = snake_direction;
    }

    return direction;
}

    export {createScene, handleKeyDown};