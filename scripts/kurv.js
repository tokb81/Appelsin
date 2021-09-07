/*
 * Denne klasse bliver styret af spilleren og står for at gribe
 * frugter, powerups og debufs
 */
class Kurv {
	constructor(x, y, bredde, dybde) {
		this.x = x;
		this.y = y;
		this.bred = bredde;
		this.dyb = dybde;
		this.col = [250,230,150];
		this.img = turbanIMG.resize(this.bred,0);
	}   
	
	// Tegner kurven.
	tegn() {
		fill(this.col);
		image(turbanIMG,this.x,this.y);
	}

	// Flytter kurvens position
	move() {
		this.x = mouseX-this.bred/2;
		this.y = mouseY-this.dyb/2;
	}

	grebet(object) {
		if (object instanceof Enemy) {
			if (object.y < this.y+this.dyb/2 && object.y > this.y-3 && object.x > this.x+object.rad && object.x < this.x+this.bred-object.rad) {
				BOOMmp3.play();
				return true;
			}
			else {
				return false;
			}
		} else if (object instanceof ModifierBase) {
			// sL is the sidelength of the modifiers
			if (object.y < this.y+7 && object.y > this.y-3 && object.x > this.x+sL && object.x < this.x+this.bred-sL ) {
				return true;
			}
			else { // Egentlig behøves else ikke her
				return false;
			}
		}
		else {
			console.log('wrong object passed to grebet()');
			console.log(object);
			return false;
		}
	}
}