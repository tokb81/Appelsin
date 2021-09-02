// array til objekter
let frugter = [];
let modifiers = [];

//
const AMOUNT_OF_ENEMY_TYPES = 4;
const AMOUNT_OF_MODIFIER_TYPES = 2;
const START_NUMBER = 1;
const LOST_COLOR = [230, 110, 0];
const WON_COLOR = [0, 255, 0];

//intervals
let enemyInterval = [1*60, 1.5*60]; // the time between shots
let timeToNextEnemy = random(enemyInterval[0], enemyInterval[1]);

let modifierInterval = [15*60, 25*60]; // the tine between modifiers
let timeToNextModifier = random(modifierInterval[0], modifierInterval[1]);

// Turbanen
let turban;

// Øvrige
let type = null;
let score = 0;
let missed = 0;
let maxliv = 8; // bruges til at beregne hvor mange frugter man ikke har grebet
let liv = maxliv;
let removed = 0; // holder styr på om der er blevet slettet flere end 1 appelsin
				 // når vi sletter dem for frugter
let spilIgang = true;   // flag
let spilWon = false;    // har vi vundet eller tabt

function setup() {  // kører kun en gang, når programmet startes
	createCanvas(750, 600);

	textAlign(CENTER, CENTER);
	
	for (let i = 0; i < START_NUMBER; i++) {
		shootNew();
	}
	
	// parametrene til Kurv-konstruktøren er (x, y, bredde, dybde, speed)
	turban = new Kurv(670, 100, 70, 50, 10);
}

function draw() {
	background(0);
	
	if (spilIgang) {
		move(); // rykker alt og checker om de er grebet eller røget ud
		display();
		turban.move();

		timeToNextEnemy -=1;
		if (timeToNextEnemy <= 0) { // skal vi spawne en ny appelsin?
			timeToNextEnemy = random( enemyInterval[0], enemyInterval[1] );
			shootNew();
		} 
		
		timeToNextModifier -=1
		if (timeToNextModifier <= 0) { // skal vi spawne en ny powerup/debuff?
			timeToNextModifier = random( modifierInterval[0], modifierInterval[1] );
			modifierNew();
		} 

	}
	else if (!spilWon){ // så er Game Over det der skal vises
		fill(LOST_COLOR);
		textSize(46);
		text("Game Over", width/2 + random(-5,5), height/2 + random(3 ));
		text("Score: "+score, width/2, height/2 + 50);
	}
	else { // ellers er spillet vundet
		fill(WON_COLOR);
		textSize(46);
		text("Game Won", width/2 + random(-5,5), height/2 + random(3 ));
		text("Score: "+score, width/2, height/2 + 50);
	}
}

function display() {
	fill(255);
	textSize(12);
	text("Score: " + score, width-80, 30);
	text("Liv: " + liv, width-160, 30);
	text("Tabt: " + (maxliv - liv), width-240, 30);

	// Vi får appesinerne til at chekke om de skal tegnes
	frugter.forEach(appelsin => {
		appelsin.tegn();
	});

	// Her vises turbanen
	turban.tegn();
};
	
function move() {

	// vi lader frugterne håndtere deres bevægelse
	frugter.forEach(appelsin => {
		appelsin.move();
	});

	checkMissOrHit();
};

function checkMissOrHit() {
	removed = 0;
	// vi tjekker hvor mange frugter der er grebet og ude
	for (let i = 0; i < frugter.length; i++) {
		if (frugter[i].x > width || frugter[i].y > height) {
			frugter.splice(i, 1);
			removed += 1;
			i -= 1; // fordi vi nu har fjernet en skal indekset rykkes
			miss();
		}
		else if (frugter[i].yspeed > 0) {
			if (turban.grebet(frugter[i])) {
				frugter.splice(i, 1);
				removed += 1;
				i -= 1; // fordi vi nu har fjernet en skal indekset rykkes
				score += 1;
			}
		}
	}
	checkWinLoss() // checker om vi nu har vundet et eller tabt
};

function miss() {
	missed += 1;
	liv -= 1;
	checkWinLoss()
};

function checkWinLoss() {
	if (liv < 1) {
		spilIgang = false;
	}
	else if (score >= 30) {
		spilWon = true;
		spilIgang = false;
	}
}    

function shootNew(amount = 1, type = null) {

	//Her skal vi sørge for at en ny appelsin skydes afsted
	for (let i = 0; i < amount; i++) {
		if (type == null) {
			type = Math.floor(Math.random()*AMOUNT_OF_ENEMY_TYPES);
		}
		rad = random(18,22);
		switch (type) {
			case 0:
				frugter.push(new Appelsin(rad));
				break;
			case 1:
				frugter.push(new Appel(rad));
				break;
			case 2:
				frugter.push(new Pear(rad));
				break;
			case 3:
				frugter.push(new Banana(rad));
				break;
			default:
				console.log('someone forgot to update the shootNew() function after creating a new enemy type');
				break;
		}
		type = null; // reset the type
	}
}

function modifierNew(amount = 1, type = null) {
	// Her skal vi sørge for at en ny modifier spawnes
	// Det er essentielt det samme som shootNew, og kunne godt integreres i den
	for (let i = 0; i < amount; i++) {
		if (type == null) {
			type = Math.floor(Math.random()*AMOUNT_OF_MODIFIER_TYPES);
		}
		rad = random(18,22);
		switch (type) {
			case 0:
				modifiers.push(new ChangeSpeed(0.5)); // slows the enemy down
				break;
			case 1:
				modifiers.push(new ChangeSpeed(2)); // speeds the enemy up
				break;
			case 2:
				
				break;
			case 3:
				
				break;
			default:
				console.log('someone forgot to update the modifierNew() function after creating a new modifier type');
				break;
		}
		type = null // reset the type
	}
}

function keyPressed() {
	// Funktionen gør ingenting lige nu
	return false;  // Forebygger evt. browser default behaviour
}