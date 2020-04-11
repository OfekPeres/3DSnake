# 3D Snake

A simple Snake game with a twist - it's in 3D!


## Play the Game by clicking [here](https://ofekperes.github.io/3DSnake/)

You can play the game by going to: [https://ofekperes.github.io/3DSnake/](https://ofekperes.github.io/3DSnake/)

## Game Instructions
Use A,W,S, and D to rotate the snake. Use M to open up the instructions menu. You get a point every time you eat. 

The game starts of by default in practice mode. This means that you won't lose if you crash into yourself.
To go into normal mode, simply open the menu with M, then click on the blue button in the bottom right to toggle game mode.



If you want to play locally, simply clone the repo, open the directory in terminal and run the following command to start a local server to play the game.

```
python3 -m http.server
```
### Project Flow
The project has a few key components
* index.html - basic structure as well as all imports of modules
* main.js - game level logic (i.e. game over message, score board), manages scene creation, render loop, etc
* utils.js - helper functions such as keyboard input handling and helper functions to create a scene
* snake.js - creates a snake object: snake level logic such as collision detection, movement updates, rotation, growing etc.
* modal.js - creates instruction screen and game over screen and adds event listeners to update game based on which buttons are pressed (i.e. reset game, toggle game mode, X-button to close modal)

* main.css - contains styling for everything. Future refactoring will split this file into a few modular files

### Prerequisites

No prereqs needed. 



## Deployment

Deployed to GitHub Pages

## Built With

* [BabylonJS](https://doc.babylonjs.com/) - The 3D framework used



## Authors

* Ofek Peres