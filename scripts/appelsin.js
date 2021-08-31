class Appelsin {
	// nogle variable for appelsiner er standart
	constructor(rad, x=null, y=height-100, col=[220,110,0], tid=random(100,200), grav=0.1) {
		
		this.rad = rad; // appelsiner kan haver forskellige størelser
		if ( x == null) { this.x = this.rad; }; // hvis x ikke får en bestem størelse 
								   // giver vi den stadart størelsen
		this.y = y; // appelsiner kan starte forskellige steder
		this.col = col; // og farver hvis man vil
		this.tid = tid;
		this.grav = grav; // grav er her kun for sjov så man kan have
						  // appelsiner med forskellige tygdekrafter

		// UDREGNING AF START HASTIGHEDER

		// formel udledt til at beregne den maksimale hastighed, som appelsinen må have
		// så den ikke hopper ud af skærmen
		this.ymaxStartSpeed = -Math.sqrt(2*this.grav*(this.y-this.rad))
		this.yspeed = random(this.ymaxStartSpeed/3, this.ymaxStartSpeed);
		// Samme som for y hastigheden bare her med x hastigheden
		// matematikken er dog lidt anderledes
		this.xmaxspeed = (width-this.rad-this.x)/((-this.yspeed+Math.sqrt(this.yspeed*this.yspeed-2*this.grav*(this.y-height)))/this.grav);
		this.xspeed = random(this.xmaxspeed);
	}
	
	// vi har en function der tegner appelsinerne så de er lette at loope
	// igennem og tegne
	tegn() {
		this.tid -= 1;
		if (this.tid < 100) {
			fill(this.col);
			ellipse(this.x, this.y, this.rad*2, this.rad*2);
		}
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