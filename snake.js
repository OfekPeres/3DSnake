class Snake
{
    constructor(scene, initialSize, boxSize, shadowGenerator)
    {
        this.scene = scene;
        this.boxSize = boxSize;
        this.boxes = []
        this.shadowGenerator = shadowGenerator;
        this.head = null;
        this.justAte = 0;
        this.initialSize = initialSize
            // this.food

            this.createFood();

        this.boxes.push(this.createSnakeBox())
        for (let i = 0; i < this.initialSize - 1; i++)
        {
            this.move();
            this.grow();
        }
        this.move();
    }

    createSnakeBox()
    {
        let faceColors = [];
        faceColors[0] = BABYLON.Color3.Blue();
        faceColors[1] = BABYLON.Color3.Red();
        faceColors[2] = BABYLON.Color3.Green();
        faceColors[3] = BABYLON.Color3.White();
        faceColors[4] = BABYLON.Color3.Yellow();
        faceColors[5] = BABYLON.Color3.Black();
        let box = BABYLON.MeshBuilder.CreateBox("Box",
            {
                width: this.boxSize,
                height: this.boxSize,
                depth: this.boxSize,
                faceColors: faceColors
            }, this.scene);
        this.shadowGenerator.addShadowCaster(box);
        let mat = new BABYLON.StandardMaterial("mat", this.scene);
        box.material = mat;
        // box.material.emissiveColor = new BABYLON.Color4(.4, .3, .6, .8);
        // box.material.diffuseColor = new BABYLON.Color4(.4, .3, .6, .8);
        if (this.head == null)
        {
            this.head = box;
        }
        else
        {
            box.rotation = this.head.rotation;
        }
        return box;
    }

    createFood()
    {
        let food = BABYLON.MeshBuilder.CreateBox("Food",
            {
                width: 20,
                height: 20,
                depth: 20
            }, this.scene);
        this.shadowGenerator.addShadowCaster(food);
        let mat = new BABYLON.StandardMaterial("mat", this.scene);
        food.material = mat;
        food.material.emissiveColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        this.food = food;
    }

    // Position the box at the end of the snake
    placeBoxAtEnd(newTail)
    {
        if (this.boxes.length == 0)
        {
            newTail.position = BABYLON.Vector3(0, 0, 0);
        }
        else
        {
            newTail.position = this.boxes[0].position.clone();
        }
    }
    // Add a new box to the snake
    grow()
    {
        let box = this.createSnakeBox();
        this.placeBoxAtEnd(box);
        this.boxes.push(box);
    }
    // Just update the position of each box
    move()
    {
        for (let i = this.boxes.length - 1; i > 0; i--)
        {
            this.boxes[i].position = this.boxes[i - 1].position;
        }
        this.head.translate(BABYLON.Axis.X, this.boxSize * 1.05, BABYLON.Space.Local);
    }
    checkEatFood()
    {
        if (this.food.intersectsMesh(this.head))
        {
            this.grow()
            this.justAte = 1;
            this.food.position = new BABYLON.Vector3(Math.random() * 100 - 50, Math.random() * 50, Math.random() * 100 - 50);
        }
    }

    changeColor()
    {
        if (this.justAte == 1 && this.boxes.length !== 0)
        {
            for (let i = 0; i < this.boxes.length; i++)
            {
                let box = this.boxes[i];
                box.material.emissiveColor = new BABYLON.Color4(0, .8, 0, .6);

            }
            this.justAte = 2;
        }
        else if (this.justAte = 2)
        {
            for (let i = 0; i < this.boxes.length; i++)
            {
                let box = this.boxes[i];
                box.material.emissiveColor = new BABYLON.Color4(.4, .3, .6, .8);
            }
            this.justAte = 0
        }
    }

    rotate(key)
    {
        switch (key)
        {
        case "a":
            this.head.rotate(BABYLON.Axis.Y, -Math.PI / 2, BABYLON.Space.World);
            for (let i = 1; i < this.boxes.length; i++)
            {
                this.boxes[i].rotationQuaternion = this.head.rotationQuaternion;
            }
            break;

        case "d":
            this.head.rotate(BABYLON.Axis.Y, Math.PI / 2, BABYLON.Space.World);
            for (let i = 1; i < this.boxes.length; i++)
            {
                this.boxes[i].rotationQuaternion = this.head.rotationQuaternion;
            }

            break;
        case "w":
            this.head.rotate(BABYLON.Axis.Z, Math.PI / 2, BABYLON.Space.World);
            for (let i = 1; i < this.boxes.length; i++)
            {
                this.boxes[i].rotationQuaternion = this.head.rotationQuaternion;
            }
            break
        case "s":
            this.head.rotate(BABYLON.Axis.Z, -Math.PI / 2, BABYLON.Space.World);
            for (let i = 1; i < this.boxes.length; i++)
            {
                this.boxes[i].rotationQuaternion = this.head.rotationQuaternion;
            }
            break;
        case "o":

            break;
        case "p":

            break;
        default:

        }
    }

    checkSelfCollision()
    {

        for (let i = 1; i < this.boxes.length; i++)
        {
            if (this.boxes[i].intersectsMesh(this.head))
            {
                return true;

            }
        }
        return false;
    }

    reset()
    {
        console.log("Resetting Snake")
        // First dispose of all of the current meshes
        for (let i = 0; i < this.boxes.length; i++)
        {
            let box = this.boxes[i];
            box.dispose();
        }

        this.boxes = [];
        this.head = null;

        // Then create a new snake of the correct initial size
        this.boxes.push(this.createSnakeBox())
        for (let i = 0; i < this.initialSize - 1; i++)
        {
            this.move();
            this.grow();
        }
        this.move();
    }
    update()
    {
        let collided = false;
        if (window.modalIsOpen == false)
        {

            if (!window.practiceMode)
            {
                if (this.checkSelfCollision())
                {
                    collided = true;
                }
            }
            this.checkEatFood();
            this.move();
        }
        return collided;

        // this.changeColor();
    }

};

export
{
    Snake
}
