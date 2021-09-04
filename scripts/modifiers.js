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
		// array magic (kan skrives mere læseligt men det her er sjovere)
		fill('rgba(' + [...this.col, (this.decayTime/this.maxDecay)].join(', ') + ')');
		rect(this.x-sL/2, this.y-sL/2, sL, sL);
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

	// NB: kræver at alle enemies har en changeSpeed function
	// også selvom den ikke gør noget
	activate(enemies) {
		enemies.forEach(enemy => {
			 enemy.changeSpeed(this.speedModifier, this.duration);
		});
	}
}