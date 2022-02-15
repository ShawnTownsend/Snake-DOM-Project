import k from './kaboom.js'

loadSprite('food', 'pizza.png')
export function getRandomPosition(tileWidth = 16, tileHeight = 16) {
    
    const tilesInX = Math.floor(k.width() / tileWidth); //number of tiles in x access
                    //width of whole screen / tile width
    const tilesInY = Math.floor(k.height()/ tileHeight);
    //pixel location of the tile
    const x = (Math.floor(k.rand(0, tilesInX)) * tileWidth) + (tileWidth * 0.5);
    const y = (Math.floor(k.rand(0, tilesInY)) * tileHeight) + (tileHeight * 0.5);
    //Coordinates ^Where the random food will appear on the screen
    return k.vec2(x, y);
    //vc 2 function(directions passed in)
}
export function food () {   
    return {
        spawn () {
            k.add([
                k.pos(getRandomPosition()),
                k.sprite('food'),
                k.origin('center'), //specific area will be labelled food
                k.area(),
                'food'
            ])
        }
    }
}