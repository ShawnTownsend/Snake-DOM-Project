import k from './kaboom.js';
import snake from './game.js'

export default function start() {
    k.add([
        k.pos(k.width() / 2, k.height() / 2),
        k.text("Start"),
        k.origin('center'),
        k.color(50, 168, 82)
    ])
    k.add([
        k.pos(k.width()/ 2, k.height() / 1.5),
        k.text('Press Enter'),
        k.origin('center'),
        k.color(50, 168, 82),
    ])
    k.onKeyPress('enter', () => {
        k.go('snake')
    })
}

snake();
