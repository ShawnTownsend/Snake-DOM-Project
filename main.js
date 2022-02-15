// import kaboom lib
import k from './kaboom.js'
import snake from './game.js'
import start from './start.js'

k.scene('snake', snake);
k.scene('start', start)

k.go('start');