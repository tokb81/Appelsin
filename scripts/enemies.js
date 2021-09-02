class Enemy {
	constructor(rad, x, y, xspeed=0, yspeed=0, col=[255, 255, 255], tid=random(100,200)) {
		this.rad = rad;
		this.x = x;
		this.y = y;
		this.xspeed = xspeed;
		this.yspeed = yspeed;
		this.col = col;
		this.tid = tid;
		this.affectedBy = [];
	}

	// everything needs to be drawn
	tegn() {
		this.tid -= 1;
		if (this.tid < 100) {
			fill(this.col);
			ellipse(this.x, this.y, this.rad*2, this.rad*2);
		}
	}
}

class GravEnemy extends Enemy {
	constructor(rad, x, y, xspeed, yspeed, col, tid, grav=0.1) {
		super(rad, x, y, xspeed, yspeed, col, tid);
		this.grav = grav;
	}

	move() {
		if (this.tid <= 0) {
			this.x += this.xspeed;
			this.y += this.yspeed;
			this.yspeed += this.grav;
		}
	}
}

class Appelsin extends GravEnemy {
	constructor(rad, x=null, y=random(height/10*3, height/10*9), col=[220,110,0], tid=random(100,200), grav=0.1) {
		super(rad, x, y, 0, 0, col, tid, grav);
		
		if ( x == null) { this.x = this.rad; };

		// UDREGNING AF START HASTIGHEDER
		// formel udledt til at beregne den maksimale hastighed, som appelsinen må have
		// så den ikke hopper ud af skærmen
		this.ymaxStartSpeed = -Math.sqrt(2*this.grav*(this.y-this.rad));
		this.yspeed = random(this.ymaxStartSpeed/3, this.ymaxStartSpeed);
		// Samme som for y hastigheden bare her med x hastigheden
		// matematikken er dog lidt anderledes
		this.xmaxspeed = (width-this.rad-this.x)/((-this.yspeed+Math.sqrt(this.yspeed*this.yspeed-2*this.grav*(this.y-height)))/this.grav);
		this.xspeed = random(this.xmaxspeed);
	}
}

class Appel extends GravEnemy {
	constructor(rad, x=null, y=null, col=[220,10,0], tid=random(100,200), grav=0.1, xmaxspeed = 5) {
		super(rad, x, y, 0, 0, col, tid, grav);
		
		if (x == null) { this.x = random(0+this.rad, width-this.rad) };
		if (y == null) { this.y = this.rad };

		this.fallTime = (Math.sqrt(2*(height-this.y-this.rad)/this.grav));
		this.minDistanceToWall = min(this.x, width - this.x) - rad; // rad is there on purpose
		
		this.xmaxspeed = this.minDistanceToWall/this.fallTime;
		this.xmaxspeed = min(this.xmaxspeed, xmaxspeed); // make sure xmaxspeed is not higher than the max allowed horisontal speed
		this.xspeed = random(-this.xmaxspeed, this.xmaxspeed);
	}
}
let test;
class SpiralEnemy extends Enemy {
	constructor(rad, x=width/2, y=0, yspeed=1, rotPeriod=60, rotRadius=50, col, tid) {
		super(rad, x, y, 0, yspeed, col, tid);
		this.xstart = x;
		this.rotTime = 0; // keeping track of rotation timing
		this.rotPeriod = rotPeriod; // how long one rotation takes in frames
		this.rotRadius = rotRadius; // the radius of the cirkular motion
		this.xCircle = 0; // used to create circle motion
		this.yCircle = 0;
	}

	move() {
		if (this.tid <= 0) {
			this.xCircle = (Math.cos(this.rotTime/this.rotPeriod*2*Math.PI)*this.rotRadius);
			this.yCircle = (Math.sin(this.rotTime/this.rotPeriod*2*Math.PI)*this.rotRadius);
			this.x = this.xCircle + this.xstart;
			// it is easier to calculate the total distance traveled that add in every frame
			this.y = this.yCircle + this.yspeed*(-this.tid);
			console.log(this.y)
		}
	}
}
// TODO FIX WEIRD MODIFIER BEHAVIOR WHEN CHANGING YSPEED ON SPIRAL ENEMY BECAUSE YSPEED*(-THIS.TID)
class Pear extends SpiralEnemy {
	constructor(rad, x=null, y=null, yspeed=random(1,2), rotTime=60, rotRadius=50, col=[20,230,20], tid=random(100,200)) {
		super(rad, x, y, yspeed, rotTime, rotRadius, col, tid)
		if (x == null) {
			this.x = random(0+this.rad+this.rotRadius, width-this.rad-this.rotRadius) + rotRadius;
			this.xstart = this.x - rotRadius;
		} else {
			this.xstart = x
		} 
		if (y == null) { this.y = this.rad; };
	}

	// alters functionality of SpiralEnemys move() function
	move() {
		super.move();
		if (this.tid <= 0) { this.y = this.yspeed*(-this.tid) + this.rad }
	}
}

class Banana extends SpiralEnemy {
	constructor(rad, x=null, y=null, yspeed=random(0.75,1.5), rotTime=120, rotRadius=100, col=[220,220,20], tid=random(100,200)) {
		super(rad, x, y, yspeed, rotTime, rotRadius, col, tid)
		if (x == null) {
			this.x = random(0+this.rad+this.rotRadius, width-this.rad-this.rotRadius) + this.rotRadius;
			this.xstart = this.x - rotRadius;
		} else {
			this.xstart = x
		} 
		if (y == null) { this.y = this.rad; };
	}
}