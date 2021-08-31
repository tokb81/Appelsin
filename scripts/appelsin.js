class Enemy {
	constructor(rad, x, y, col=[255, 255, 255], tid=random(100,200)) {
		this.rad = rad;
		this.x = x;
		this.y = y;
		this.col = col;
		this.tid = tid;
	}

	tegn() {
		this.tid -= 1;
		if (this.tid < 100) {
			fill(this.col);
			ellipse(this.x, this.y, this.rad*2, this.rad*2);
		}
	}
}

class GravEnemy extends Enemy {
	constructor(rad, x, y, col, tid, grav=0.1) {
		super(rad, x, y, col, tid);
		this.grav = grav
		this.xspeed = 0;
		this.yspeed = 0;
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
	constructor(rad, x=null, y=height-100, col=[220,110,0], tid=random(100,200), grav=0.1) {
		super(rad, x, y, col, tid, grav);
		
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
		super(rad, x, y, col, tid, grav)
		
		if (x == null) { this.x = random(0+rad, width-rad) };
		if (y == null) { this.y = rad };

		this.fallTime = (Math.sqrt(2*(height-this.y-this.rad)/this.grav));
		this.minDistanceToWall = min(this.x, width - this.x) - rad; // rad is there on purpose
		
		this.xmaxspeed = this.minDistanceToWall/this.fallTime
		this.xmaxspeed = min(this.xmaxspeed, xmaxspeed) // make sure xmaxspeed is not higher than the max allowed horisontal speed
		this.xspeed = random(-this.xmaxspeed, this.xmaxspeed);
	}
	
	// af samme årsag som tegn
	move() {
		if (this.tid <= 0) {
			this.x += this.xspeed;
			this.y += this.yspeed;
			this.yspeed += this.grav;
		}
	}
}