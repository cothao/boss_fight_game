class Player {
    constructor({position, width, height, velocity, image, atkWidth, atkHeight, atkPosition}) {
        this.position = position
        this.width = width
        this.height = height
        this.velocity = velocity
        this.gravity = 1
        this.image = image
        this.frames = 0
        this.frameSpeed = 0
        this.sprites = {
            idle: {
                right: createImage('./img/image.png'),
                left: createImage('./img/Knight-Idle-Sheet.png'),
                frameCount: 4
            },
            walk: {
                right: createImage('./img/walkRight.png'),
                left: createImage('./img/Walk.png'),
                frameCount: 8
            },
            attack: {
                right: createImage('./img/atkRight.png'),
                left: createImage('./img/Knight-Attack-Sheet.png'),
                frameCount: 7
            }
        }
        this.attackBox = {
            x: this.position.x,
            y: this.position.y,
            atkWidth: 5,
            atkHeight: 100
        }
        this.currentSprite = this.sprites.idle.right
        
        this.frameCount = this.sprites.idle.frameCount
    }
    draw() {
        c.drawImage(
            this.currentSprite,
            this.currentSprite.width/this.frameCount * this.frames,
            0,
            this.currentSprite.width/this.frameCount,
            this.currentSprite.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }

    attack() {
        // c.fillStyle = 'red'
        // c.fillRect(
        //     this.attackBox.x, 
        //     this.attackBox.y,
        //     this.attackBox.atkWidth,
        //     this.attackBox.atkHeight
        //     )
    }

    update() {
    if (keys.lastKey === 'd') {
        this.attackBox = {
            x: this.position.x +65,
            y: this.position.y + 20,
            atkWidth: 35,
            atkHeight: 90
        }
    } else if (keys.lastKey === 'a') {
        this.attackBox = {
            x: this.position.x -65,
            y: this.position.y + 20,
            atkWidth: 35,
            atkHeight: 90
        }
    }
        this.frameSpeed++
        if (this.frameSpeed % 5 === 0) {
            this.frames++
        }
        if (this.frames > 3 && this.currentSprite === this.sprites.idle.right 
            || this.frames > 3 && this.currentSprite === this.sprites.idle.left) {
            this.frames = 0
        }
        if (this.frames > 7 && this.currentSprite === this.sprites.walk.right 
            || this.frames > 7 && this.currentSprite === this.sprites.walk.left) {
            this.frames = 0
        }
        if (this.frames > 6 && this.currentSprite === this.sprites.attack.right 
            || this.frames > 6 && this.currentSprite === this.sprites.attack.left) {
            this.frames = 0
        }
        this.position.x += this.velocity.dx
        this.position.y += this.velocity.dy
        if (this.position.y + this.height < canvas.height) {
            this.velocity.dy += this.gravity
        }
        if (this.position.y + this.height > canvas.height) {
          this.velocity.dy = 0;
        } 
        this.draw()
        if (keys.attack.pressed === true) {
            this.attack()
            this.isAttacking = true
            setTimeout (() => {
                this.isAttacking = false
                keys.attack.pressed = false
            }, 400
            )
        }
    }
}

class Enemy {
    constructor({position, width, height, velocity, image, atkWidth, atkHeight, atkPosition}) {
        this.position = position
        this.width = width
        this.height = height
        this.velocity = velocity
        this.gravity = 1
        this.image = image
        this.frames = 0
        this.frameSpeed = 0
        this.sprites = {
            idle: {
                right: createImage('./img/monster/demon.png'),
                left: createImage('./img/Knight-Idle-Sheet.png'),
                frameCount: 5,
                exactFrame: 5
            },
            walk: {
                right: createImage('./img/walkRight.png'),
                left: createImage('./img/Walk.png'),
                frameCount: 8
            },
            attack: {
                right: createImage('./img/atkRight.png'),
                left: createImage('./img/Knight-Attack-Sheet.png'),
                frameCount: 7
            }
        }
        this.attackBox = {
            x: this.position.x,
            y: this.position.y,
            atkWidth: 5,
            atkHeight: 100
        }
        this.currentSprite = this.sprites.idle.right
        
        this.frameCount = this.sprites.idle.frameCount
    }
    draw() {
        c.drawImage(
            this.currentSprite,
            this.currentSprite.width/6 * 0,
            0,
            (this.currentSprite.width - (this.currentSprite.width/16))/20,
            this.currentSprite.height/4,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }

    attack() {
        // c.fillStyle = 'red'
        // c.fillRect(
        //     this.attackBox.x, 
        //     this.attackBox.y,
        //     this.attackBox.atkWidth,
        //     this.attackBox.atkHeight
        //     )
    }

    update() {
    if (keys.lastKey === 'd') {
        this.attackBox = {
            x: this.position.x +65,
            y: this.position.y + 20,
            atkWidth: 35,
            atkHeight: 90
        }
    } else if (keys.lastKey === 'a') {
        this.attackBox = {
            x: this.position.x -65,
            y: this.position.y + 20,
            atkWidth: 35,
            atkHeight: 90
        }
    }
        this.frameSpeed++
        if (this.frameSpeed % 10 === 0) {
            this.frames++
        }
        if (this.frames > 5 && this.currentSprite === this.sprites.idle.right 
            || this.frames > 5 && this.currentSprite === this.sprites.idle.left) {
            this.frames = 0
        }
        if (this.frames > 7 && this.currentSprite === this.sprites.walk.right 
            || this.frames > 7 && this.currentSprite === this.sprites.walk.left) {
            this.frames = 0
        }
        if (this.frames > 6 && this.currentSprite === this.sprites.attack.right 
            || this.frames > 6 && this.currentSprite === this.sprites.attack.left) {
            this.frames = 0
        }
        this.position.x += this.velocity.dx
        this.position.y += this.velocity.dy
        if (this.position.y + this.height < canvas.height) {
            this.velocity.dy += this.gravity
        }
        if (this.position.y + this.height > canvas.height) {
          this.velocity.dy = 0;
        } 
        this.draw()
        if (keys.attack.pressed === true) {
            this.attack()
            this.isAttacking = true
            setTimeout (() => {
                this.isAttacking = false
                keys.attack.pressed = false
            }, 400
            )
        }
    }
}


class Background {
    constructor({position, width, height, image}) {
        this.image = image
        this.position = position
        this.width = width
        this.height = height
    }

    draw() {
        c.fillStyle = 'blue'
        c.drawImage(
            this.image,
            0,
            0,
            this.image.width,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width * 3,
            this.image.height * 3
        )
    }

    update() {
        this.draw()
    }
}

class Objects {
    constructor({position, width, height, image}) {
        this.image = image
        this.position = position
        this.width = width
        this.height = height
    }

    draw() {
        c.drawImage(
            this.image,
            0,
            16,
            this.image.width/3,
            this.image.height/1.5,
            this.position.x,
            this.position.y,
            this.image.width,
            this.image.height /2
        )
    }

    update() {
        this.draw()
    }
}