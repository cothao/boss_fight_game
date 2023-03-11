class Player {
    constructor({position, width, height, velocity, image, damage}) {
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
        this.damage = damage
    }
    draw() {
        c.drawImage(
            this.currentSprite,
            this.currentSprite.width/this.frameCount * this.frames,
            0,
            this.currentSprite.width/this.frameCount,
            this.currentSprite.height,
            this.position.x -30,
            this.position.y,
            this.width +100,
            this.height
        )
    }

    attack() {
    //   c.fillStyle = 'red'
    //   c.fillRect(
    //       this.position.x,
    //       this.position.y,
    //       this.currentSprite.width +40 -250,
    //       this.currentSprite.height
    //       )
    //   c.fillStyle = 'black'
    //   c.fillRect(
    //       this.attackBox.x,
    //       this.attackBox.y,
    //       this.attackBox.atkWidth,
    //       this.attackBox.atkHeight
    //       )
    }

    update() {
        this.attack()
    if (keys.lastKey === 'd') {
        this.attackBox = {
            x: this.position.x +40,
            y: this.position.y,
            atkWidth: 35,
            atkHeight: 90
        }
    } else if (keys.lastKey === 'a') {
        this.attackBox = {
            x: this.position.x -30,
            y: this.position.y + 10,
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
    constructor({position, width, height, velocity, image, damage, isAlive}) {
        this.position = position
        this.width = width
        this.height = height
        this.velocity = velocity
        this.gravity = 1
        this.image = image
        this.frames = 0
        this.currentFrame = 1
        this.frameSpeed = 0
        this.currentFolder = '01_demon_idle'
        this.sprites = {
          idle: {
            right: createImage(
              `./img/monster/01_demon_idle_right/image (${this.currentFrame}).png`
            ),
            left: createImage(
              `./img/monster/01_demon_idle/idle${this.currentFrame}.png`
            ),
            frameCount: 5,
            exactFrame: 5,
          },
          walk: {
            right: createImage(
              `./img/monster/02_demon_walk_right/image (${this.currentFrame}).png`
            ),
            left: createImage(
              `./img/monster/02_demon_walk/demon_walk_${this.currentFrame}.png`
            ),
            frameCount: 8,
          },
          attack: {
            right: createImage(
              `./img/monster/03_demon_cleave_right/image (${this.currentFrame}).png`
            ),
            left: createImage(
              `./img/monster/03_demon_cleave/demon_cleave_${this.currentFrame}.png`
            ),
            frameCount: 7,
          },
          death: {
            left: createImage(
              `./img/monster/05_demon_death/demon_death_${this.currentFrame}.png`
            ),
          },
        };
        this.attackBox = {
            x: this.position.x,
            y: this.position.y,
            atkWidth: 5,
            atkHeight: 100
        }
        this.currentSprite = this.sprites.idle.left
        this.frameCount = this.sprites.idle.frameCount
        this.isAttacking = false
        this.damage = damage
        this.isAlive = true
    }
    draw() {
        c.drawImage(
            this.currentSprite,
            0,
            50,
            this.currentSprite.width,
            this.currentSprite.height,
            this.position.x -375,
            this.position.y,
            this.width + 750,
            this.height + 220
        )
    }

    attack() {
        // c.fillStyle = 'red'
        // c.fillRect(
        //     this.position.x,
        //     this.position.y,
        //     288,
        //     460
        //     )
        // c.fillStyle = 'red'
        // c.fillRect(
        //     this.attackBox.x, 
        //     this.attackBox.y,
        //     this.attackBox.atkWidth,
        //     this.attackBox.atkHeight
        //     )
    }

    update() {
        this.attack()
    this.frameSpeed++
    if (this.frameSpeed % 10 === 0) {
    this.currentFrame++
    }
    if (this.velocity.dx === 0 && enemyHealth.style.width != '0%' && !this.isAttacking) {
        if (this.currentFrame > 6) {
            this.currentFrame = 1
        }
    this.sprites.idle.left = createImage(`./img/monster/01_demon_idle/idle${this.currentFrame}.png`)
    this.currentSprite = this.sprites.idle.left
    }
    if (
      this.velocity.dx === 0 &&
      enemyHealth.style.width != "0%" &&
      playerDetection(player, enemy) &&
      this.position.x < player.position.x &&
      this.isAttacking === false
    ) {
      if (this.currentFrame > 6) {
        this.currentFrame = 1;
      }
      this.sprites.idle.right = createImage(
        `./img/monster/01_demon_idle_right/image (${this.currentFrame}).png`
      );
      this.currentSprite = this.sprites.idle.right;
    }
    if (
      this.velocity.dx === 0 &&
      enemyHealth.style.width != "0%" &&
      playerDetection(player, enemy) &&
      this.currentSprite === this.sprites.walk.left &&
      this.isAttacking === false
    ) {
        if (this.currentFrame > 6) {
      this.currentFrame = 1;
    }
      this.sprites.idle.left = createImage(
        `./img/monster/01_demon_idle/idle${this.currentFrame}.png`
      );
      this.currentSprite = this.sprites.idle.left;
    }
    if (this.isAttacking && enemyHealth.style.width != '0%') {
        if (this.currentFrame > 14) {
            this.currentFrame = 1
        }
    }
    /// ATTACK
    if (this.isAttacking === true) {
        if (enemy.position.x >= enemy.attackBox.x) {
        this.currentSprite = this.sprites.attack.left
        this.sprites.attack.left = createImage(
          `./img/monster/03_demon_cleave/demon_cleave_${this.currentFrame}.png`
        )
        } 
        if (enemy.position.x <= enemy.attackBox.x) {
        this.currentSprite = this.sprites.attack.right
        this.sprites.attack.right = createImage(
          `./img/monster/03_demon_cleave_right/image (${this.currentFrame}).png`)
        }
        ;
    }
    /// END OF ATTACK
    if (enemyHealth.style.width === '0%') {
        // THIS WILL HANDLE THE DEATH ANIMATION STARTING FROM 0. do NOT FORGET//
        // if (this.currentFrame )
        this.velocity.dx = 0
        this.isAttacking = false
        this.sprites.death.left = createImage(`./img/monster/05_demon_death/demon_death_${this.currentFrame}.png`)
        this.currentSprite = this.sprites.death.left
    }
    if (this.velocity.dx < 0) {
        this.sprites.walk.left = createImage(`./img/monster/02_demon_walk/demon_walk_${this.currentFrame}.png`)
        this.currentSprite = this.sprites.walk.left
    }
    if (this.velocity.dx > 0) {
        this.sprites.walk.right = createImage(`./img/monster/02_demon_walk_right/image (${this.currentFrame}).png`)
        this.currentSprite = this.sprites.walk.right
    }
    // FRAMES FOR SPRITES
    if (this.currentFrame > 5 && this.currentSprite === this.sprites.idle.left) {
        this.currentFrame = 1
    }
    if (this.currentFrame > 11 && (this.currentSprite === this.sprites.walk.left || this.currentSprite === this.sprites.walk.right)) {
        this.currentFrame = 1
    }
    if (this.currentFrame > 21 && (this.currentSprite === this.sprites.death.left || this.currentSprite === this.sprites.death.right)) {
        return;
    }
    // UTILITIES

        this.position.x += this.velocity.dx
        this.position.y += this.velocity.dy
        if (this.position.y + this.height < canvas.height) {
            this.velocity.dy += this.gravity
        }
        if (this.position.y + this.height > canvas.height) {
          this.velocity.dy = 0;
        } 
        this.draw()
        // PLAYER DETECTION
        if (this.currentSprite === this.sprites.walk.left) {
        this.attackBox = {
            x: this.position.x -200,
            y: this.position.y + 270,
            atkWidth: 500,
            atkHeight: 200
        }
    } else if (this.currentSprite === this.sprites.walk.right) {
        this.attackBox = {
            x: this.position.x +50,
            y: this.position.y +270,
            atkWidth: 500,
            atkHeight: 200
        }
    }
    //PLAYER DETECTION
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