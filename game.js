import k from './kaboom.js';
import food from './food.js';
import link from './snake-list.js';

const audio = new Audio('https://www.mboxdrive.com/Cartoon%20Bite%20-%20Sound%20Effect%20(HD).mp3');

function movement() {
  const direction = k.vec2(0, 0);
  const speed = 16;
  let timeTaken = 0;
  return {
    update() {
      timeTaken += k.dt();
      if (timeTaken < 0.25) {
        return;
      }
      timeTaken = 0;
      this.pos.x += direction.x * speed;
      this.pos.y += direction.y * speed;

      const segment = this.getSegment();
      if (!segment) return;

      segment.moveUpdate(this.pos.x, this.pos.y);
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
      },
    },
  };
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

export default function snake() {
  const spawnFood = k.add([
    food(),
    k.area(),
  ]);
  let tail = k.add([
    k.pos(8, 8),
    k.rect(16, 16),
    k.color(0, 255, 0, 1),
    k.origin('center'),
    k.area(),
    movement(),
    controls(),
    link(),
    'head',
  ]);

  spawnFood.spawn();

  k.onCollide('head', 'food', (head, food) => {
    k.destroy(food);

    const newSegment = k.add([
      k.pos(tail.pos.x, tail.pos.y),
      k.rect(16, 16),
      k.color(0, 255, 0, 1),
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
    k.destroyAll('head');
    k.add([
      k.pos(k.width() * 0.5, k.height() * 0.5),
      k.text('Game Over', 40),
      k.color(255, 0, 0, 1),
      k.origin('center'),
    ]);
    shake(12);
  });
}
