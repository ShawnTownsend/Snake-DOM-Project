import k from './kaboom.js'
function getRandomPosition(tileWidth = 16, tileHeight = 16) {
    const tilesInX = Math.floor(k.width() / tileWidth); //200
    const tilesInY = Math.floor(k.height()/ tileHeight);
    //pixel location of the tile
    const x = (Math.floor(k.rand(0, tilesInX)) * tileWidth) + (tileWidth * 0.5);
    const y = (Math.floor(k.rand(0, tilesInY)) * tileHeight) + (tileHeight * 0.5);
    return k.vec2(x, y);
}
export default function food () {   
    return {
        spawn () {
            k.add([
                k.pos(getRandomPosition()),
                k.rect(16, 16),
                k.color(0, 0, 255, 1),
                k.origin('center'),
                k.area(),
                'food'
            ])
        }
    }
}