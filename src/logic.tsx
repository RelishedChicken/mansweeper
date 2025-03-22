export function move(items:GameData, dir:string, size: number){
    
    items.prevPlayerCoords = [items.playerCoords[0], items.playerCoords[1]];


    switch(dir){
        case "u":
            if(items.playerCoords[1] - 1 >= 0) items.playerCoords[1]--;
            break;
        case "d":
            if(items.playerCoords[1] + 1 <= size - 1) items.playerCoords[1]++;            
            break;            
        case "l":
            if(items.playerCoords[0] - 1 >= 0) items.playerCoords[0]--;
            break;
        case "r":
            if(items.playerCoords[0] + 1 <= size - 1) items.playerCoords[0]++;
            break;
    }

    return items;

}

//Used to check if we have run into a bomb
export function checkDead(items:GameData):boolean{

    let dead = false;
    items.bombCoords.forEach((bomb) => {
        if(items.playerCoords[0] === bomb[0] && items.playerCoords[1] === bomb[1]){
            dead = true;
        }
    });

    console.log(dead);

    return dead;


}