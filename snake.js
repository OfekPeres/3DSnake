class Snake
{
    constructor(scene, initialSize, boxSize, shadowGenerator)
    {
        this.scene = scene;
        this.boxSize = boxSize;
        this.boxes = []
        this.direction = new BABYLON.Vector3(1, 0, 0);
        this.shadowGenerator = shadowGenerator;

        this.boxes.push(this.createSnakeBox())
        for (let i = 0; i < initialSize - 1; i++)
        {
            this.grow();
            this.move();
        }
    }

    createSnakeBox()
    {

        let box = BABYLON.MeshBuilder.CreateBox("Box",
            {
                width: this.boxSize,
                height: this.boxSize,
                depth: this.boxSize
            }, this.scene);
        this.shadowGenerator.addShadowCaster(box);
        return box;
    }
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

    placeBoxAtFront(newHead)
    {
        let curHeadPos = this.boxes[this.boxes.length - 1].position;
        if (curHeadPos == null)
        {
            curHeadPos = new BABYLON.Vector3(0, 0, 0);
        }
        newHead.position = curHeadPos.add(this.direction.scale(this.boxSize * 1.05));
    }

    grow()
    {
        let box = this.createSnakeBox();
        this.placeBoxAtEnd(box);
        this.boxes.push(box);
    }
    // Move the tail from index 0 of the array to the position of the head at the end of
    // the array. Add one box unit in the direction the snake is moving
    move()
    {
        const tail = this.boxes.shift();
        this.placeBoxAtFront(tail);
        this.boxes.push(tail);
    }

    updateDirection(direction)
    {
        if (direction !== null)
        {
            this.direction = direction;
        }
    }
    getDirection()
    {
        return this.direction.clone();
    }

};

export
{
    Snake
}
