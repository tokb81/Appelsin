// array til appelsiner
let appelsiner = [];

//
const grav = 0.1;
const col = [220,110,0];
let interval = [0.5*60,1*60];
let timeToNext = interval[1];

// Turbanen
let turban;

// Øvrige
let score = 0;
let missed = 0;
const maxliv = 8 // bruges til at beregne hvor mange appelsiner man ikke har grebet
let liv = maxliv;
let removed = 0; // holder styr på om der er blevet slettet flere end 1 appelsin
				 // når vi sletter dem for appelsiner
let spilIgang = true;   // flag
let spilWon = false;    // har vi vundet eller tabt

function setup() {  // kører kun en gang, når programmet startes
	createCanvas(750, 600);

	textAlign(CENTER, CENTER);

	shootNew();
	shootNew();
	// parametrene til Kurv-konstruktøren er (x, y, bredde, dybde, speed)
	turban = new Kurv(670, 100, 70, 50, 10);
}

function draw() {
	background(0);
	
	if (spilIgang) {
		move(); // rykker alt og checker om de er grebet eller røget ud
		display();
		turban.move()

		if (timeToNext <= 0) { // skal vi spawne en ny appelsin?
			timeToNext = random( interval[0], interval[1] );
			shootNew();
		} 
		timeToNext -=1

	}
	else if (!spilWon){ // så er Game Over det der skal vises
		fill(col);
		textSize(46);
		text("Game Over", width/2 + random(-5,5), height/2 + random(3 ));
		text("Score: "+score, width/2, height/2 + 50);
	}
	else { // ellers er spillet vundet
		fill([0,255,0]);
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
	appelsiner.forEach(appelsin => {
		appelsin.tegn();
	});

	// Her vises turbanen
	turban.tegn();
};
	
function move() {

	// vi lader appelsinerne håndtere deres bevægelse
	appelsiner.forEach(appelsin => {
		appelsin.move()
	});

	checkMissOrHit();
};

function checkMissOrHit() {
	removed = 0;
	// vi tjekker hvor mange appelsiner der er grebet og ude
	for (let i = 0; i < appelsiner.length; i++) {
		if (appelsiner[i].x > width || appelsiner[i].y > height) {
			appelsiner.splice(i, 1);
			removed += 1;
			i -= 1; // fordi vi nu har fjernet en skal indekset rykkes
			miss();
		}
		else if (appelsiner[i].yspeed > 0) {
			if (turban.grebet(appelsiner[i])) {
				appelsiner.splice(i, 1);
				removed += 1;
				i -= 1 // fordi vi nu har fjernet en skal indekset rykkes
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
		spilWon = true
		spilIgang = false;
	}
}    

function shootNew(amount = 1) {

	//Her skal vi sørge for at en ny appelsin skydes afsted
	for (let i = 0; i < amount; i++) {
		rad = random(18,22);
		y = random(height/10*3, height/10*9);
		appelsiner.push(new Appelsin(rad, null, y))
	}
}

function keyPressed() {
	// Funktionen gør ingenting lige nu
	return false;  // Forebygger evt. browser default behaviour
}