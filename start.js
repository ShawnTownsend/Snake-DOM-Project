import k from './kaboom.js';
import snake from './game.js'

export default function start() {
    k.add([
        k.pos((k.width() / 2), 100),
        k.text('VIPER', {
            size: 100,
            // width: 40,
            font: "sinko",// there're 4 built-in fonts: "apl386", "apl386o", "sink", and "sinko"
        }),
        k.origin('center'),
        k.color(255, 0, 0)
    ])
    k.add([
        k.pos(k.width() / 2, 200),
        k.text('CRUNCH', {
            size: 100,
            font: "sinko",// there're 4 built-in fonts: "apl386", "apl386o", "sink", and "sinko"
        }),
        k.origin('center'),
        k.color(255,255,0)
    ])
    k.add([
        k.pos(k.width() / 2, k.height() / 2),
        k.text("Start"),
        k.origin('center'),
        k.color(50, 168, 82),
        k.area(),
        'start'
    ])
    k.add([
        k.pos(k.width() / 2, 500),
        k.text("Use the Arrow keys to control", {
            size: 30,
            font: "apl386o"
        }),
        k.origin('center')
    ])

    k.add([
        k.pos(k.width() / 2, 600),
        k.text("Eat, get big and don't die!", {
            size: 30,
            font: "apl386o"
        }),
        k.origin('center')
    ])

    k.onHover('start', (start) => {
        start.color = k.hsl2rgb(wave(0, 1, time()), 0.6, 0.6);
    })
    k.onClick('start', () => {
        k.go('snake');
    })
}

snake();
