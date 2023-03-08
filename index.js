const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

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

const createImage = function(imageSrc) {
    const image = new Image()
    image.src = imageSrc
    return image
}

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    attack: {
        pressed: false
    },
    lastKey: '' 
}

const backgrounds = [
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

const player = new Player({
    position: {
        x: 100,
        y:100
    },
    width: 100,
    height: 100,
    velocity: {
        dx: 0,
        dy:10
    },
    currentSprite: createImage('./img/image.png'),
})



const platforms = []

for (let i = 0; i<20; i++) {
    
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

const enemy = new Enemy({
    position: {
        x: 200,
        y: 100
    },
    velocity: {
        dx: 0,
        dy: 0
    },
    width: 300,
    height: 300
})

const animate = () => {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0, canvas.width, canvas.height)
    backgrounds.forEach(background => {
        background.update()
        if (player.position.x > 400 && keys.right.pressed) {
            background.position.x -= 3
            player.velocity.dx = 0
        } else if (player.position.x < 100 && keys.left.pressed) {
            background.position.x += 3
            player.velocity.dx = 0
        }
    })
    player.update()
    enemy.update()
    platforms.forEach(platform => platform.update())
    platforms.forEach(platform => {
        if (player.position.x > 400 && keys.right.pressed) {
            platform.position.x -= 10
        } else if (player.position.x < 100 && keys.left.pressed) {
            platform.position.x += 10
        }
        if (
            player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.dy >= platform.position.y &&
            player.position.x + player.width > platform.position.x &&
            player.position.x - player.width/2 < platform.position.x + platform.width
            ) 
            {
            player.velocity.dy = 0
        }
        
    })
    if (keys.right.pressed) {
        player.velocity.dx = 10
        if (keys.attack.pressed && keys.lastKey === 'd') {
            player.currentSprite = player.sprites.attack.right
            player.frameCount = player.sprites.attack.frameCount
        }
        if (!keys.attack.pressed) { 
        player.currentSprite = player.sprites.walk.right
        player.frameCount = player.sprites.walk.frameCount
    }
    } else if (keys.left.pressed) {
        player.velocity.dx = -10
        if (keys.attack.pressed && keys.lastKey === 'a') {
            player.currentSprite = player.sprites.attack.left
            player.frameCount = player.sprites.attack.frameCount
        }
        if (!keys.attack.pressed) {
        player.currentSprite = player.sprites.walk.left
        player.frameCount = player.sprites.walk.frameCount
        }
    } else {
        player.velocity.dx = 0
        if (keys.lastKey === 'd') {
        player.currentSprite = player.sprites.idle.right
        player.frameCount = player.sprites.idle.frameCount
    }
        
        if (keys.lastKey === 'a') {
        player.currentSprite = player.sprites.idle.left
        player.frameCount = player.sprites.idle.frameCount
        }
        
    }
    if (keys.attack.pressed === true && keys.lastKey === 'd') {
        player.currentSprite = player.sprites.attack.right
        player.frameCount = player.sprites.attack.frameCount
    } else if (keys.attack.pressed && keys.lastKey === 'a') {
        player.currentSprite = player.sprites.attack.left
        player.frameCount = player.sprites.attack.frameCount
    }
    // PLAYER HIT
        if (player.isAttacking && (player.frames === 5 || player.frames === 6)) {
            if (collisionDetection(player, enemy)) {
                player.isAttacking = false
                console.log('hit')
            }
        }
    
}

animate()

addEventListener('keydown', (e)=> {
    switch (e.key) {
        case ' ':
        player.velocity.dy -= 20
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
})

addEventListener("keyup", (e) => {
  switch (e.key) {
    case " ":
      break;
    case "d":
      keys.right.pressed = false;
      keys.lastKey = 'd'
      break
    case 'a':
      keys.left.pressed = false;
      keys.lastKey = 'a'
  }
});