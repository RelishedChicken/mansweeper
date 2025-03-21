import $ from 'jquery';
export function spawnItems(size:number, numOfBombs:number){
    
    const spawnY = (Math.round(size / 2) - 1).toString();
    const spawnX = (size - 1).toString();
    const manSprite = "😎";
    const bombSprite = "💣";
    const bombLocations:number[][] = [];
    
    //Generate bomb locations
    let i = 1;
    while(i !== numOfBombs){

        let randX = randomInt(size);
        let randY = randomInt(size);

        bombLocations.push([randX, randY])

        i++;
    }

    console.log(bombLocations);


    //Render sprites
    $('.cell').each((index, cell) => {
        let coords = cell.id.split(":");
        if(coords[0] == spawnX && coords[1] == spawnY){
            cell.innerHTML = manSprite;
        }

        bombLocations.forEach((bombCoords) => {
            let bombX = bombCoords[0];
            let bombY = bombCoords[1];

            

        });

    });

    return true;

}

//
function randomInt(max) {
    return Math.floor(Math.random()*(max  + 1));
}