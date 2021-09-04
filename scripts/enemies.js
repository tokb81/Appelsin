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
// Til fjender som bliver påvirket af tyngdekraften
class GravEnemy extends Enemy {
	constructor(rad, x, y, xspeed, yspeed, col, tid, grav=0.1) {
		super(rad, x, y, xspeed, yspeed, col, tid);
		this.grav = grav;
	}

	// Hvordan man bevæger sig med tyngdekraft
	move() {
		if (this.tid <= 0) {
			this.x += this.xspeed;
			this.y += this.yspeed;
			this.yspeed += this.grav;
		}
	}

	// Definere hvordan man ændre objektets hastighed
	changeSpeed(change, duration, deactivate=false, enemy=this) {
		enemy.yspeed *= change;
		enemy.xspeed *= change;
		enemy.grav *= change;
		if (deactivate) { return; }
		setTimeout(this.changeSpeed, duration/60*1000, 1/change, 0, true, enemy); 
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
// Til fjender som kører i en cirkel lignende bevægelse
class SpiralEnemy extends Enemy {
	constructor(rad, x=width/2, y=0, yspeed=1, rotPeriod=60, rotRadius=50, col, tid) {
		super(rad, x, y, 0, yspeed, col, tid);
		this.xstart = x;
		this.ypos = y;
		this.rotTime = 0; // keeping track of rotation timing
		this.rotPeriod = rotPeriod; // how long one rotation takes in frames
		this.rotRadius = rotRadius; // the radius of the cirkular motion
		this.xincrement = 0; // used to create circle motion
		this.yincrement = 0;
	}

	move() {
		if (this.tid <= 0) {
			// We take the differential of cos and sin and use increments instead of exact position
			this.xCircle = (Math.cos(this.rotTime/this.rotPeriod*2*Math.PI)*this.rotRadius);
			this.yCircle = (Math.sin(this.rotTime/this.rotPeriod*2*Math.PI)*this.rotRadius);
			this.x = this.xCircle + this.xstart;
			// It is easier to calculate the total distance traveled that add in every frame
			this.ypos += this.yspeed;
			this.y = this.yCircle + this.ypos;
			
			this.rotTime += 1;
		}
	}

	changeSpeed(change, duration, deactivate=false, enemy=this) {
		enemy.yspeed *= change;
		enemy.rotPeriod /= change;
		enemy.rotTime /= change;
		enemy.tid /= change;
		// Bruges til at ændre hastigheden tilbage igen
		if (deactivate) { return; }
		setTimeout(this.changeSpeed, duration/60*1000, 1/change, 0, true, enemy);
	}
}

class Pear extends SpiralEnemy {
	constructor(rad, x=null, y=null, yspeed=random(1,2), rotTime=60, rotRadius=50, col=[20,230,20], tid=random(100,200)) {
		super(rad, x, y, yspeed, rotTime, rotRadius, col, tid);
		if (x == null) {
			this.x = random(0+this.rad+this.rotRadius, width-this.rad-this.rotRadius) + rotRadius;
			this.xstart = this.x - rotRadius;
		} else {
			this.xstart = x;
		} 
		if (y == null) { this.y = this.rad; };
	}

	// alters functionality of SpiralEnemys move() function
	move() {
		super.move();
		if (this.tid <= 0) {
			this.ypos += this.yspeed;
			this.y = this.ypos + this.rad;
		}
	}
}

class Banana extends SpiralEnemy {
	constructor(rad, x=null, y=null, yspeed=random(0.75,1.5), rotTime=120, rotRadius=100, col=[220,220,20], tid=random(100,200)) {
		super(rad, x, y, yspeed, rotTime, rotRadius, col, tid);
		if (x == null) {
			this.x = random(0+this.rad+this.rotRadius, width-this.rad-this.rotRadius) + this.rotRadius;
			this.xstart = this.x - rotRadius;
		} else {
			this.xstart = x;
		}
		if (y == null) { this.y = this.rad; };
	}
}