/*
 * Dette script definerer klassen Kurv
 * Den har nogle koordinater og nogle andre variabler, som definere
 * hvor stor den tegnes (men som lige nu ikke har noget at gøre med
 * om den griber appelsinen
 * Den har en function, som heder tegn, som bliver kaldt i sketch.js
 * når det er at turbanen skal tegnes
 * Den har også moveX og moveY som bliver kladt i sketch når der
 * bliver trykket på piltasterne for at rykke på turbanes placering
 * Grebet er en function som bliver kaldt i Sketch hele tiden, når
 * appelsinen falder nedaf. Den test for om appelsinen er "nede i"
 * turbanen
*/

let turbanIMG;
let BOOMmp3;

function preload() {
	turbanIMG = loadImage('assets/turban.png');
	BOOMmp3 = loadSound('assets/boom.mp3');
}

class Kurv {
	/* Den første del er en "konstruktør".
	 * Den tager parametrene og konstruerer et nyt objekt 
	 * ud fra dem. Værdierne huskes som hørende til netop 
	 * dette objekt ved hjælp af nøgleordet this
	 */
	constructor(x, y, bredde, dybde, speed) {
		this.x = x;
		this.y = y;
		this.bred = bredde;
		this.dyb = dybde;
		this.speed = speed;
		this.col = [250,230,150];
		this.img = turbanIMG.resize(this.bred,0);
	}   
	
	// Tegner kurven. Her kan evt. sættes et billede ind i stedet
	tegn() {
		fill(this.col);
		//rect(this.x, this.y, this.bred, this.dyb);
		image(turbanIMG,this.x,this.y);
	}

	// Flytter kurvens position
	move() {
		this.x = mouseX-this.bred/2;
		this.y = mouseY-this.dyb/2;
	}

	/* Tjekker om bolden/appelsinen er grebet ved at se om den rammer
	 * "rent" ned gennem kurvens overkant. Parametrene er hhv. boldens
	 * midtpunkts koordinater og boldens radius
	 */
	grebet(object) {
		if (object instanceof Enemy) {
			if (object.y < this.y+7 && object.y > this.y-3 && object.x > this.x+object.rad && object.x < this.x+this.bred-object.rad) {
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
			else {
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