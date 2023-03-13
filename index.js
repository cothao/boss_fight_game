const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const enemyHealth = document.querySelector('.healthbar')
const playerHealth = document.querySelector('.player-health')
console.log()
canvas.width = innerWidth
canvas.height = innerHeight

addEventListener('resize', ()=> {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init()
})

c.fillRect(0, 0, canvas.width, canvas.height)

const collisionDetection = function(player, enemy) {
    if (player.isAttacking === true) {
        return (player.attackBox.x + player.attackBox.atkWidth > enemy.position.x
        && player.attackBox.x + player.attackBox.atkWidth < enemy.position.x + enemy.width
        || (player.attackBox.x < enemy.position.x + enemy.width 
            && player.attackBox.x > enemy.position.x)) 
            && ((player.attackBox.y < enemy.position.y 
            && player.attackBox.y > enemy.position.y - enemy.height
            )
            || (player.attackBox.y < enemy.position.y + enemy.height 
                && player.attackBox.y > enemy.position.y))
    }
    }

const collisionDetectionEnemy = function(enemy, player) {
    if (
      (enemy.attackBox.x >= player.position.x &&
      enemy.attackBox.x <= player.position.x + player.width)
    ) {
      console.log(true);
    }
}

    const playerDetection = function (player, enemy) {
      return (
        ((player.position.x + player.width > enemy.attackBox.x 
        && player.position.x + player.width < enemy.attackBox.x + enemy.attackBox.atkWidth)
        || (player.position.x < enemy.attackBox.x + enemy.attackBox.atkWidth 
        && player.position.x > enemy.attackBox.x)) &&
        ((player.position.y < enemy.attackBox.y && player.position.y > enemy.attackBox.y - enemy.attackBox.atkHeight)
        || (player.position.y < enemy.attackBox.y + enemy.attackBox.atkHeight && player.position.y > enemy.attackBox.y))
      );
    };

const createImage = function(imageSrc) {
    const image = new Image()
    image.src = imageSrc
    return image
}

let keys, backgrounds, platforms, enemy, playerY, player
let scrollOffset = 0
const init = function() {

keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    jump: {
        pressed: false
    },
    attack: {
        pressed: false
    },
    lastKey: '' 
}

backgrounds = [
    new Background({
    position: {
        x: -50,
        y: -50
    },
    width: createImage('./img/background.png').width,
    height: createImage('./img/background.png').height,
    image: createImage('./img/background.png')
}),
new Background({
    position: {
        x: createImage('./img/background.png').width +109,
        y: -50
    },
    width: createImage('./img/background.png').width,
    height: createImage('./img/background.png').height,
    image: createImage('./img/background.png')
}),
new Background({
    position: {
        x: (createImage('./img/background.png').width * 4) + 10,
        y: -50
    },
    width: createImage('./img/background.png').width,
    height: createImage('./img/background.png').height,
    image: createImage('./img/background.png')
}),
new Background({
    position: {
        x: (createImage('./img/background.png').width * 6) + 40,
        y: -50
    },
    width: createImage('./img/background.png').width,
    height: createImage('./img/background.png').height,
    image: createImage('./img/background.png')
}),
new Background({
    position: {
        x: -50,
        y: createImage('./img/background.png').height*2 - 20
    },
    width: createImage('./img/background.png').width,
    height: createImage('./img/background.png').height,
    image: createImage('./img/background.png')
}),
new Background({
    position: {
        x: createImage('./img/background.png').width +109,
        y: createImage('./img/background.png').height*2 - 20
    },
    width: createImage('./img/background.png').width,
    height: createImage('./img/background.png').height,
    image: createImage('./img/background.png')
}),
new Background({
    position: {
        x: (createImage('./img/background.png').width * 4) + 10,
        y: createImage('./img/background.png').height*2 - 20
    },
    width: createImage('./img/background.png').width,
    height: createImage('./img/background.png').height,
    image: createImage('./img/background.png')
}),
new Background({
    position: {
        x: (createImage('./img/background.png').width * 6) + 40,
        y: createImage('./img/background.png').height*2 - 20
    },
    width: createImage('./img/background.png').width,
    height: createImage('./img/background.png').height,
    image: createImage('./img/background.png')
}),
new Background({
    position: {
        x: -50,
        y: createImage('./img/background.png').height*4 + 10
    },
    width: createImage('./img/background.png').width,
    height: createImage('./img/background.png').height,
    image: createImage('./img/background.png')
}),
new Background({
    position: {
        x: createImage('./img/background.png').width +109,
        y: createImage('./img/background.png').height*4 + 10
    },
    width: createImage('./img/background.png').width,
    height: createImage('./img/background.png').height,
    image: createImage('./img/background.png')
}),
new Background({
    position: {
        x: (createImage('./img/background.png').width * 4) + 10,
        y: createImage('./img/background.png').height*4 + 10
    },
    width: createImage('./img/background.png').width,
    height: createImage('./img/background.png').height,
    image: createImage('./img/background.png')
}),
new Background({
    position: {
        x: (createImage('./img/background.png').width * 6) + 40,
        y: createImage('./img/background.png').height*4 + 10
    },
    width: createImage('./img/background.png').width,
    height: createImage('./img/background.png').height,
    image: createImage('./img/background.png')
}),
new Background({
    position: {
        x: -50,
        y: createImage('./img/background.png').height*6 + 40
    },
    width: createImage('./img/background.png').width,
    height: createImage('./img/background.png').height,
    image: createImage('./img/background.png')
}),
new Background({
    position: {
        x: createImage('./img/background.png').width +109,
        y: createImage('./img/background.png').height*6 + 40
    },
    width: createImage('./img/background.png').width,
    height: createImage('./img/background.png').height,
    image: createImage('./img/background.png')
}),
new Background({
    position: {
        x: (createImage('./img/background.png').width * 4) + 10,
        y: createImage('./img/background.png').height*6 + 40
    },
    width: createImage('./img/background.png').width,
    height: createImage('./img/background.png').height,
    image: createImage('./img/background.png')
}),
new Background({
    position: {
        x: (createImage('./img/background.png').width * 6) + 40,
        y: createImage('./img/background.png').height*6 + 40
    },
    width: createImage('./img/background.png').width,
    height: createImage('./img/background.png').height,
    image: createImage('./img/background.png')
})
]





platforms = []

for (let i = 0; i<50; i++) {
    
    platforms.push(new Objects({
        position: {
            x: (50 * (i * 2.9)) - 50,
            y: canvas.height -35
        },
        width: 150,
        height: 20,
        image: createImage('./img/tileSet.png')
    }))
}

enemy = new Enemy({
    position: {
        x: 700,
        y: -300
    },
    velocity: {
        dx: -1,
        dy: 0
    },
    width: createImage('./img/monster/01_demon_idle/idle1.png').width,
    height: createImage('./img/monster/01_demon_idle/idle1.png').height +300,
    damage: 22
})

  platforms.forEach((platform) => {
    playerY = platform.position.y - platform.height -80;
  });

console.log(playerY)

player = new Player({
  position: {
    x: 100,
    y: playerY,
  },
  width: createImage("./img/image.png").width -250,
  height: createImage("./img/image.png").height,
  velocity: {
    dx: 0,
    dy: 10,
  },
  currentSprite: createImage("./img/image.png"),
  damage: 10,
});
}

init()

const animate = () => {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  backgrounds.forEach((background) => {
    background.update();
    if (player.position.x > 400 && keys.right.pressed) {
      background.position.x -= 3;
      player.velocity.dx = 0;
      scrollOffset -= 1
    } else if (player.position.x < 100 && keys.left.pressed) {
      if (scrollOffset != 0) {
        player.velocity.dx = 0
        background.position.x += 3;
        scrollOffset += 1
        } else if (scrollOffset === 0) {
          player.velocity.dx = 0
          background.position.x += 0
        }
    }
    //PARALAX UPWARD AND DOWNWARD. FOR LATER
    // if (player.position.y < 500) {
    //     background.position.y += 3;
    // } else if (player.position.y > 100) {
    //     background.position.y -= 0
    // }
  });
  
collisionDetectionEnemy(enemy, player)
    
  platforms.forEach((platform) => platform.update());
  platforms.forEach((platform) => {
    if (player.position.x > 400 && keys.right.pressed) {
      platform.position.x -= 10;
      scrollOffset -= 1
    } else if (player.position.x < 100 && keys.left.pressed) {
      if (scrollOffset != 0) {
        player.velocity.dx = 0
      platform.position.x += 10;
      scrollOffset += 1
      } else if (scrollOffset === 0) {
        player.velocity.dx = 0
        platform.position.x += 0
      }
    }
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.dy >=
        platform.position.y &&
      player.position.x + player.width > platform.position.x &&
      player.position.x - player.width / 2 <
        platform.position.x + platform.width
    ) {
      player.velocity.dy = 0;
      player.jumps = 1
    }
    // FOR PARALAX
    // if (player.position.y < 500) {
    //   platform.position.y += 3;
    // }
  });
  platforms.forEach((platform) => {
    if (
      enemy.position.y + enemy.height <= platform.position.y &&
      enemy.position.y + enemy.height + enemy.velocity.dy >=
        platform.position.y &&
      enemy.position.x + enemy.width > platform.position.x &&
      enemy.position.x - enemy.width / 2 < platform.position.x + platform.width
    ) {
      enemy.velocity.dy = 0;
    }
  });
  enemy.update();
  player.update();
  if (enemyHealth.style.width != `0%` ) {
    enemy.isAlive = true
  }
  if (enemyHealth.style.width === `0%`) {
    enemy.isAlive = false
  }
  if (player.position.x > 400 && keys.right.pressed) {
    enemy.position.x -= 3;
    enemy.attackBox.x -= 3;
  } else if (player.position.x < 100 && keys.left.pressed) {
    enemy.position.x += 3;
    enemy.attackBox.x += 3;
  }
  // PARALLAX
//   if (player.position.y < 500) {
//     enemy.position.y += 3;
//     enemy.attackBox.y
//   }
  if (keys.right.pressed) {
    player.velocity.dx = 10;
    if (keys.attack.pressed && keys.lastKey === "d") {
      player.currentSprite = player.sprites.attack.right;
      player.frameCount = player.sprites.attack.frameCount;
    }
    if (!keys.attack.pressed) {
      player.currentSprite = player.sprites.walk.right;
      player.frameCount = player.sprites.walk.frameCount;
    }
  } else if (keys.left.pressed) {
    player.velocity.dx = -10;
    if (keys.attack.pressed && keys.lastKey === "a") {
      player.currentSprite = player.sprites.attack.left;
      player.frameCount = player.sprites.attack.frameCount;
    }
    if (!keys.attack.pressed) {
      player.currentSprite = player.sprites.walk.left;
      player.frameCount = player.sprites.walk.frameCount;
    }
  } else {
    player.velocity.dx = 0;
    if (keys.lastKey === "d") {
      player.currentSprite = player.sprites.idle.right;
      player.frameCount = player.sprites.idle.frameCount;
    }

    if (keys.lastKey === "a") {
      player.currentSprite = player.sprites.idle.left;
      player.frameCount = player.sprites.idle.frameCount;
    }
  }
  if (keys.attack.pressed === true && keys.lastKey === "d") {
    player.currentSprite = player.sprites.attack.right;
    player.frameCount = player.sprites.attack.frameCount;
  } else if (keys.attack.pressed && keys.lastKey === "a") {
    player.currentSprite = player.sprites.attack.left;
    player.frameCount = player.sprites.attack.frameCount;
  }
  if (keys.jump.pressed && player.jumps === 1) {
    setTimeout(() => {
      player.velocity.dy -= 20
      keys.jump.pressed = false
    }, 10)
    player.jumps = 0
  }
  // PLAYER HIT
  if (player.isAttacking && (player.frames === 5 || player.frames === 6)) {
    if (collisionDetection(player, enemy)) {
      player.isAttacking = false;
      keys.attack.pressed = false;
      enemy.health -= player.damage
      gsap.to('.healthbar', {
        width: enemy.health + '%'
      })
    }
  }
  
  if (playerDetection(player, enemy)) {
    enemy.velocity.dx = 0
    enemy.isAttacking = true
  } else if (
    (!playerDetection(player, enemy))
  ) {
    enemy.isAttacking = false
    if (player.position.x > enemy.attackBox.x) {
    enemy.velocity.dx = 1;
    }
    if (player.position.x < enemy.attackBox.x) {
      enemy.velocity.dx = -1;
    }
  }

  if (
    enemy.isAttacking &&
    (enemy.currentFrame === 10 ||
      enemy.currentFrame === 11 ||
      enemy.currentFrame === 12)
  ) {
// GONNA FIX ATTACK ANIMATION SOON
if (enemy.isAlive) {
      enemy.isAttacking = false;
      player.health -= enemy.damage
      gsap.to('.player-health', {
        width: player.health + '%'
      })
      player.velocity.dy -= 20
    }
  }

  // PLAYER DEATH
  if (player.health <= 0) {
    player.isAlive = false
  }
  if (player.isAlive === false) {
    keys.right.pressed = false
    keys.left.pressed = false
    player.velocity.dx = 0
    player.frameCount = player.sprites.idle.frameCount
    player.currentSprite = player.sprites.idle.right
  }
  console.log(player.velocity.dx)
}
animate()

window.onload = function () {
  if (!window.location.hash) {
    window.location = window.location + "#loaded"; // this adds the hash to the location after one reload, meaning that the location will then HAVE a hash and the code will not run a second time.
    window.location.reload();
  }
};

addEventListener('keydown', (e)=> {
    
  if (player.isAlive === true) {
    switch (e.key) {
        case ' ':
          keys.jump.pressed = true
        break
        case 'd':
        keys.right.pressed = true
        keys.lastKey = 'd'
        break
        case 'a':
        keys.left.pressed = true
        keys.lastKey = 'a'
        break
        case 'e':
        keys.attack.pressed = true
        break
    }
  }
})

addEventListener("keyup", (e) => {
  if (player.isAlive === true) {
  switch (e.key) {
    case " ":
      keys.jump.pressed = false
      break;
    case "d":
      keys.right.pressed = false;
      keys.lastKey = 'd'
      break
    case 'a':
      keys.left.pressed = false;
      keys.lastKey = 'a'
  }
}
});
