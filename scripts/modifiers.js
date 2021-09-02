// the sL of all the modifiers (they all have the same size)
const sL = 20

class ModifierBase {
	constructor(x, y, decayTime, duration, col) {
		this.x = x;
		this.y = y;
		this.maxDecay = decayTime;
		this.decayTime = decayTime;
		this.duration = duration;
		this.col = col;
		this.identifier = random(0,4294967296); // bad solution but it works

		this.decayed = false;
	}

	tegn() {
		// array magic
		fill('rgba(' + [...this.col, (this.decayTime/this.maxDecay)].join(', ') + ')');
		rect(this.x-sL/2, this.y-sL/2, sL, sL)
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

	activate(enemies, change=this.speedModifier, deactivate = false) {
		enemies.forEach(enemy => {
			// If we are activating it apply the changes or if we are deactivating, then change all the affected enemies
			if ((!deactivate || enemy.affectedBy.indexOf(this.identifier) != -1)) {
				if (enemy instanceof GravEnemy) {
					enemy.yspeed *= change;
					enemy.xspeed *= change;
					enemy.grav *= change;
				}
				else if (enemy instanceof SpiralEnemy) {
					enemy.yspeed *= change;
					enemy.rotPeriod /= change;
					enemy.rotTime /= change;
				}
				else {
					console.log('someone forgot to add an enemy to the speed modifier function');
				}
				enemy.affectedBy.push(this.identifier);
			}
		});
		// By running the activate function with the inverse of the change we applied
		// we nullify it changing the speed back to normal
		setTimeout(this.activate, this.duration/60*1000, enemies, 1/change, true) 
	}
}