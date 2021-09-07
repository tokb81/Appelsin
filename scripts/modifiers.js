// the sL of all the modifiers (they all have the same size)
const sL = 20;

class ModifierBase {
	constructor(x, y, decayTime, duration, col) {
		this.x = x;
		this.y = y;
		this.maxDecay = decayTime;
		this.decayTime = decayTime;
		this.duration = duration;
		this.col = col;
		this.decayed = false;
	}

	tegn() {
		noStroke();
		// array magig
		fill(color(...[...this.col, (this.decayTime/this.maxDecay)*255]))
		rect(this.x-sL/2, this.y-sL/2, sL, sL);
		stroke([0]);
		this.decayTime -= 1;
		if (this.decayTime <= 0) {
			this.decayed = true;
		}
	}
}

class ChangeSpeed extends ModifierBase {
	constructor(speedModifier, col=[100,100,100], x=random(sL, width-sL), y=random(sL,height-sL), duration=5*60, decayTime=10*60) {
		super(x, y, decayTime, duration, col);
		this.speedModifier = speedModifier;
		this.effected = [];
	}

	activate(enemies) {
		enemies.forEach(enemy => {
			 enemy.changeSpeed(this.speedModifier, this.duration);
		});
	}
}

class LifeChange extends ModifierBase {
	constructor(changeInLives, primeCol=[255,255,255], secCol=[255,0,0], decayTime=5*60, x=random(sL, width-sL), y=random(sL, height-sL)) {
		super(x, y, decayTime, 0, primeCol);
		this.col = primeCol
		this.changeInLives = changeInLives;
		this.secCol = secCol;
		this.cS = sL/2.8; // How "big" the cross is
	}

	tegn() {
		super.tegn();
		noStroke();
		fill(color(...[...this.secCol, (this.decayTime/this.maxDecay)*255]));
		rect(this.x-sL/2, this.y-sL/2, this.cS, this.cS); // upper left
		rect(this.x+sL/2, this.y-sL/2, -this.cS, this.cS); // upper right
		rect(this.x-sL/2, this.y+sL/2, this.cS, -this.cS); // lower left
		rect(this.x+sL/2, this.y+sL/2, -this.cS, -this.cS); // lower right
		stroke([0]);
	}

	activate() {
		extraliv += this.changeInLives
		liv += this.changeInLives;
		checkWinLoss()
		return;
	}
}