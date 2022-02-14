import k from './kaboom.js'
import food from './food.js'
function movement () {
    const direction = k.vec2(0, 0);
    const speed = 16;
    let timeTaken = 0;
    return {
        update() {
            timeTaken += k.dt();
            if(timeTaken < 0.25) {
                return
            }
            timeTaken = 0;
            this.pos.x += direction.x * speed;
            this.pos.y += direction.y * speed;
        },
        movement: {
            left() {
                direction.x = -1;
                direction.y = 0;
            },
            right() {
                direction.x = 1;
                direction.y = 0;
            },
            down() {
                direction.x = 0;
                direction.y = 1;
            }, 
            up() {
                direction.x = 0;
                direction.y = -1;
            }
        }
    }
}
function controls () {
    return {
        add() {
            k.keyPress('left', () => {
                this.movement.left();
            }),
            k.keyPress('right', () => {
                this.movement.right();
            }),
            k.keyPress('down', () => {
                this.movement.down();
            }),
            k.keyPress('up', () => {
                this.movement.up();
            })
        }
    }
}
export default function snake () {
    const spawnFood = k.add([
        food(),
        k.area()
    ]);
    k.add([
        k.pos(8, 8),
        k.rect(16, 16),
        k.color(0, 255, 0, 1),
        k.origin('center'),
        k.area(),
        movement(),
        controls(),
        'head'
    ]);
    
    spawnFood.spawn();
    k.onCollide('head', 'food', (head, food) => {
        k.destroy(food);
    })
}