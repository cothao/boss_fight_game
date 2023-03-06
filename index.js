const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

c.fillRect(0, 0, canvas.width, canvas.height)

const createImage = function(imageSrc) {
    const image = new Image()
    image.src = imageSrc
    return image
}

class Objects {
    constructor({position, width, height, image}) {
        this.image = image
        this.position = position
        this.width = width
        this.height = height
    }

    draw() {
        c.fillStyle = 'blue'
        c.fillRect(
            this.position.x, 
            this.position.y,
            this.width,
            this.height
        )
        // c.drawImage(
        //     this.image,
        //     this.image.width,
        //     this.image.height
        // )
    }

    update() {
        this.draw()
    }
}

class Player {
    constructor({position, width, height, velocity}) {
        this.position = position
        this.width = width
        this.height = height
        this.velocity = velocity
        this.gravity = 1
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
            )
    }

    update() {
        this.position.x += this.velocity.dx
        this.position.y += this.velocity.dy
        if (this.position.y + this.height < canvas.height) {
            this.velocity.dy += this.gravity
        }
        if (this.position.y + this.height > canvas.height) {
          this.velocity.dy = 0;
        } else if (
          player.position.y + player.height < platform.position.y &&
          player.position.y + player.height + player.velocity.dy >
            platform.position.y
        ) {
          player.velocity.dy = 0;
          console.log("hey");
        }
        this.draw()
    }
}

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

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
    }
})

const platform = new Objects({
    position: {
        x: 100,
        y: 300
    },
    width: 150,
    height: 20
})

const animate = () => {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0, canvas.width, canvas.height)
    player.update()
    platform.update()
    if (keys.right.pressed) {
        player.velocity.dx += 2
    } else if (keys.left.pressed) {
        player.velocity.dx -= 2
    } else {
        player.velocity.dx = 0
    }
    if (
        player.position.y + player.height < platform.position.y &&
        player.position.y + player.height + player.velocity.dy > platform.position.y) 
        {
        player.velocity.dy = 0
        console.log('hey')
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
        break
        case 'a':
        keys.left.pressed = true
        break
    }
})

addEventListener("keyup", (e) => {
  switch (e.key) {
    case " ":
      player.velocity.dy -= 20;
      break;
    case "d":
      keys.right.pressed = false;
      break
    case 'a':
      keys.left.pressed = false;
  }
});