import './style.css';
import { getGrid } from './grid.tsx';
import { spawnItems, renderMan, renderDeath, renderEnd } from './render.tsx';
import { move, checkDead } from './logic.tsx';
import $ from 'jquery';

//Game data type
declare global{
  type GameData = {
    prevPlayerCoords:number[],
    playerCoords:number[],
    bombCoords:number[][]
  }
}

//Config
const width:number = 5;
const numOfBombs:number = 5;
let dead:boolean = false;

//Setup the game grid
$("#grid").append(getGrid(width));

//Spawn player and mines
let spawnedItems = spawnItems(width, numOfBombs);

//Listen for key inputs (this is also the main game loop and will end game too)
$('body').on('keydown', (e) => {
    if(e.originalEvent !== undefined && !dead){
        const key = e.originalEvent.code;

        //Map keys to 'movement'
        let dir = "";
        if(key == 'ArrowUp' || key == 'KeyW'){
            dir = "u";
        }else if(key == 'ArrowDown' || key == 'KeyS'){
            dir = "d";
        }else if(key == 'ArrowLeft' || key == 'KeyA'){
            dir = "l";
        }else if(key == 'ArrowRight' || key == 'KeyD'){
            dir = "r";
        }

        //Calculate move
        spawnedItems = move(spawnedItems, dir, width);

        //Check if we hit a bomb else move
        if(checkDead(spawnedItems)){
            dead = true;
            renderDeath(spawnedItems);
            renderEnd();
        }else{
            renderMan(spawnedItems);
        }
    }
}); 