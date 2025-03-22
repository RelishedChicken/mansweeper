import $ from 'jquery';

const manSprite = "😎";
const bombSprite = "💣";
const deathSprite = "💥";

export function spawnItems(size:number, numOfBombs:number):GameData{
    
    const spawnX = (Math.round(size / 2) - 1);
    const spawnY = (size - 1);
    const bombLocations:number[][] = [];
    
    //Generate rabdom bomb locations
    while(bombLocations.length !== numOfBombs){
        let randX = randomInt(0, size-1);
        let randY = randomInt(0, size-1);
        
        if(bombLocations.indexOf([randX, randY]) == -1 && (randX !== spawnX && randY !== spawnY)){
            bombLocations.push([randX, randY]);
        }

    }

    //Create gamedata   
    const data:GameData = {
        prevPlayerCoords: [spawnX, spawnY],
        playerCoords : [spawnX, spawnY],
        bombCoords: bombLocations
    }

    //Render sprites
    renderMan(data);
    renderBombs(data);

    return data;

}

//Renders bombs
export function renderBombs(items:GameData){    
    $('.cell').each((index, cell) => {
        let coords = cell.id.split(":");
        let cX = parseInt(coords[0]);
        let cY = parseInt(coords[1]);

        //Bombs
        items.bombCoords.forEach((bombCoords) => {
            let bombX = bombCoords[0];
            let bombY = bombCoords[1];
            if((cX == bombX && cY == bombY)){
                cell.innerHTML = bombSprite
            }
        });
    });
}

//Renders the man on the grid
export function renderMan(items:GameData){
    $('.cell').each((index, cell) => {
        let coords = cell.id.split(":");
        let cX = parseInt(coords[0]);
        let cY = parseInt(coords[1]);
        if(cX == items.playerCoords[0] && cY == items.playerCoords[1]){
            cell.innerHTML = manSprite;
        }else if(cX == items.prevPlayerCoords[0] && cY == items.prevPlayerCoords[1]){
            cell.innerHTML = "";
        }
    });
}

//Render a death (where the player is)
export function renderDeath(items:GameData){
    $('.cell').each((index, cell) => {
        let coords = cell.id.split(":");
        let cX = parseInt(coords[0]);
        let cY = parseInt(coords[1]);
        if(cX == items.playerCoords[0] && cY == items.playerCoords[1]){
            explodeCell(cell);
        }else if(cX == items.prevPlayerCoords[0] && cY == items.prevPlayerCoords[1]){
            cell.innerHTML = "";
        }
    });
}

//Cause an explosion on a cell
async function explodeCell(cell:HTMLElement){
    let i = 0;
    cell.innerHTML = deathSprite;
    while(i!==5){
        $(cell + " p").fadeOut();
        $(cell + " p").fadeIn();
        i++;
    }
    return true;
}

//Render endgame (fade out grid and remove)
export function renderEnd(){
    $('#gameOver').fadeIn('fast');
}

//Generates a random integer given a min and a max (util)
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}