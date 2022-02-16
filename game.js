
import k from './kaboom.js'
import {food, getRandomPosition, } from './food.js'
import link from './snake-list.js'

let timePerFrame = 0.1;
let score = 0;
let increaseSpeed = 0; 
const audio = new Audio('crunch.mp3');
const endAudio = new Audio('end.wav');

let gameHeight = k.height();
let gameWidth = k.width()

function movement () {
    const direction = k.vec2(0, 0);
    const speed = 16;
    let timeTaken = 0;
    return {
        update() {
            timeTaken += k.dt();
            if(timeTaken < timePerFrame) {
                return
            }
            timeTaken = 0;
            if (this.pos.x >= gameWidth){
              this.pos.x = 0;
              this.pos.x += direction.x * speed;
              this.pos.y += direction.y * speed;
            } 
            if (this.pos.x <= 0){
              this.pos.x = gameWidth;
              this.pos.x += direction.x * speed;
              this.pos.y += direction.y * speed;
            } 
            if (this.pos.y >= gameHeight) {
              this.pos.y = 0;
              this.pos.x += direction.x * speed;
              this.pos.y += direction.y * speed;
            } 
            if (this.pos.y <= 0) {
              this.pos.y = gameHeight;
              this.pos.x += direction.x * speed;
              this.pos.y += direction.y * speed;
            } else {
              this.pos.x += direction.x * speed;
              this.pos.y += direction.y * speed;
            }
            

            const segment = this.getSegment();
            if(!segment) return;

            segment.moveUpdate(this.pos.x, this.pos.y)
        },
        movement: {
            left() {
              if (direction.x !== 1) {
                direction.x = -1;
                direction.y = 0;
              }
              
            },
            right() {
              if (direction.x !== -1) {
                direction.x = 1;
                direction.y = 0;
              }
            },
            down() {
              if (direction.y !== -1) {
                direction.x = 0;
                direction.y = 1;
              }
            }, 
            up() {
              if (direction.y !== 1) {
                direction.x = 0;
                direction.y = -1;
              }
            }
        }
    }
}
function controls() {
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
      });
    },
  };
}


export default function snake () {

    const spawnFood = k.add([
        food(),
        k.area()
    ]);
    let tail = k.add([
        k.rect(16, 16),
        k.pos(getRandomPosition()),
        k.color(0, 255, 0),
        k.origin('center'),
        k.area(),
        movement(),
        controls(),
        link(),
        'head'
    ]);
    
    spawnFood.spawn();

    const scoreText = k.add([
        k.pos(2, 2),
        k.text(`Score : ${score}`, { size : 25 }),
        k.color(255, 255, 255, 1)
    ])


  k.onCollide('head', 'food', (head, food) => {
    k.destroy(food);
      
    score++;
    scoreText.text = `Score : ${score}`;
    increaseSpeed++;
    if (increaseSpeed === 5) {
      increaseSpeed = 0;
      timePerFrame -= 0.01;
    }

    const newSegment = k.add([
      k.pos(tail.pos.x, tail.pos.y),
      k.rect(16, 16),
      k.color(0, 255, 0),
      k.origin('center'),
      k.area(),
      link(),
      'body',
    ]);
    audio.play();

    tail.setSegment(newSegment);

    tail = newSegment;

    spawnFood.spawn();
  });

  k.onCollide('head', 'body', (head, body) => {
    if (body.isNew()) return;
    endAudio.play();
    k.destroyAll('head');
    k.add([
      k.pos(k.width() * 0.5, k.height() * 0.5),
      k.text('Game Over', 40),
      k.color(255, 0, 0, 1),
      k.origin('center'),
    ]);
    shake(40);
    k.add([
        k.pos(k.width() * 0.5, k.height() * 0.5 + 50),
        k.text('Press Enter to replay', { size : 20 }),
        k.color(255, 255, 255, 1),
        k.origin('center')
    ]);
    k.keyPress('enter', () => {
        timePerFrame = 0.09;
        score = 0;
        increaseSpeed = 0;
        k.go('snake');
    });
  });
}
