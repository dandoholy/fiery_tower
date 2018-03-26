class Avatar {
  constructor(props) {
    this.image = new Image();
    this.image.src = "./assets/images/fiery_tower_character.png"
    this.pos = props.pos;
    this.vel = [0, 0];
    this.jumping = false;
    this.onLand = false;
    this.falling = false;
    this.height = 52;
    this.width = 30;
    this.gravity = 600;
  }

  accelerate(dir) {
    // debugger
    switch (dir) {
      case "L":
        if (this.vel[0] > 0) { this.vel[0] -= 10 }
        if (Math.abs(this.vel[0]) < Avatar.MAX_SPEED ) { this.vel[0] -= 15; }
        if (Math.abs(this.vel[0]) > Avatar.MAX_SPEED ) { this.vel[0] =  -Avatar.MAX_SPEED; }
        break;
      case "R":
        if (Math.abs(this.vel[0]) < Avatar.MAX_SPEED ) { this.vel[0] += 15; }
        if (this.vel[0] < 0) { this.vel[0] += 10 }
        if (Math.abs(this.vel[0]) > Avatar.MAX_SPEED ) { this.vel[0] = Avatar.MAX_SPEED; }
        break;
      default:
        return;
    }
  }

  correctPositions() {
    if ( this.pos[0] < 0 ) { this.pos[0] = 0; this.vel[0] = -this.vel[0]; }
    if ( this.pos[0] > 570 ) { this.pos[0] = 570; this.vel[0] = -this.vel[0];}
    if ( this.pos[1] > 11685 ) { this.pos[1] = 11685; this.vel[1] = 0; this.jumping = false; }
  }

  decelerate(timeDelta) {
    if (this.vel[0] > 0) { this.vel[0] -= 2; }
    if (this.vel[0] < 0) { this.vel[0] += 2; }
    // SIMULATED GRAVITY
    this.vel[1] += this.gravity * timeDelta;
  }

  draw(ctx) {
    const { sourceX, sourceY, sourceWidth, sourceHeight } = this.sprite();
    ctx.drawImage(this.image, sourceX, sourceY, sourceWidth, sourceHeight, this.pos[0], this.pos[1], this.width, this.height);
  }

  jump() {
    if (!this.jumping) {
      this.onLand = false;
      this.jumping = true;
      if (Math.abs(this.vel[0]) < Avatar.MAX_SPEED * .25) {
        this.vel[1] -= 330;
      }
      else if (Math.abs(this.vel[0]) < Avatar.MAX_SPEED * .5) {
        this.vel[1] -= 380;
      }
      else if (Math.abs(this.vel[0]) < Avatar.MAX_SPEED * .75) {
        this.vel[1] -= 430;
      }
      else {
        this.vel[1] -= 480;
      }
    }
  }

  landed(platform) {
    this.jumping = false;
    this.falling = false;
    this.onLand = true;
    // debugger
    this.vel[1] = 0;
    this.pos[1] = platform.pos[1]-this.height-.001;
  }

  landedOn(platform) {
    if (this.falling) {
      if (this.pos[1]+this.height < platform.pos[1]+10
        && this.pos[1]+this.height > platform.pos[1]
        && this.pos[0]+this.width > platform.pos[0]
        && this.pos[0] < platform.pos[0] + platform.width) {
          this.landed(platform);
        }
        else {
          return;
        }
    }
    return;
  }

  move(timeDelta) {
    (this.vel[1] > 0) ? this.falling = true : this.falling = false;
    const scaledOffset = [this.vel[0] * timeDelta, this.vel[1] * timeDelta];
    this.pos = [this.pos[0] + scaledOffset[0], this.pos[1] + scaledOffset[1]];
    this.correctPositions();
    // DECELERATE EVERY TICK
    this.decelerate(timeDelta);
  }

  sprite() {
    // HANDLES LOGIC FOR WHAT SPRITE TO USE, PLACEHOLDER
    return {
      sourceHeight: 52,
      sourceWidth: 30,
      sourceX: 1,
      sourceY: 4
    };
  }
}

Avatar.MAX_SPEED = 550;

module.exports = Avatar;