var pikachu = {
	// name
	name: "Pikachu",
	// health
	health: 50,
	// Type
	type: "Electric",
	// attack:
	attack: 20,
	// Counter Attack
	counterAttack: 10,
};

var charizard = {
	// name
	name: "Charizard",
	// health
	health: 20,
	// Type
	type: "Fire",
	// attack:
	attack: 5,
	// Counter Attack
	counterAttack: 12,
};

var blastoise = {
	// name
	name: "Blastoise",
	// health
	health: 75,
	// Type
	type: "Water",
	// attack:
	attack: 10,
	// Counter Attack
	counterAttack: 14,
}

var venasaur = {
	// name
	name: "Venasaur",
	// health
	health: 100,
	// Type
	type: "Grass",
	// attack:
	attack: 5,
	// Counter Attack
	counterAttack: 3,
}
// Set all character divs to be enemies.
$("#pikachuDiv, #charizardDiv, #blastoiseDiv, #venasaurDiv").addClass('enemyCharacter');
// Booleans to check if selected character and enemy.
var selectedEnemy = false;
var selectedCharacter = false;
// Keep a counter to how many enemies are left.
var enemyCounter = 3;
// If one of characters is selected. Change that class to the selected character instead of enemy character.
$(document).ready(function(){
	// Give divs desired attributes.
	// Play song in background.
	myAudio = new Audio('assets/audio/pokemonThemeSong.mp3'); 
	myAudio.addEventListener('ended', function() {
	    this.currentTime = 0;
	    this.play();
	}, false);
	myAudio.play();
	// health
	$("#pikachuDiv").attr("health", pikachu.health);
	var healthCaption1 = $("<p></p>").text("health: " + $("#pikachuDiv").attr("health"));
	$("#pikachuHealth").html(healthCaption1);

	$("#charizardDiv").attr("health", charizard.health);
	var healthCaption2 = $("<p></p>").text("health: " + $("#charizardDiv").attr("health"));
	$("#charizardHealth").html(healthCaption2);

	$("#blastoiseDiv").attr("health", blastoise.health);
	var healthCaption3 = $("<p></p>").text("health: " + $("#blastoiseDiv").attr("health"));
	$("#blastoiseHealth").append("health:" + $("#blastoiseDiv").attr('health'));

	$("#venasaurDiv").attr("health", venasaur.health);
	var healthCaption4 = $("<p></p>").text("health: " + $("#venasaurDiv").attr("health"));
	$("#venasaurDiv").append("health:" + $("#venasaurDiv").attr('health'));

	// attack
	$("#pikachuDiv").attr("attack", pikachu.attack);
	$("#charizardDiv").attr("attack", charizard.attack);
	$("#pikachuDiv").attr("attack", pikachu.attack);
	$("#pikachuDiv").attr("attack", pikachu.attack);
	// counter attack
	$("#pikachuDiv").attr("counterAttack", pikachu.counterAttack);
	$("#charizardDiv").attr("counterAttack", charizard.counterAttack);
	$("#blastoiseDiv").attr("counterAttack", blastoise.counterAttack);
	$("#venasaurDiv").attr("counterAttack", venasaur.counterAttack);
	// name
	$("#pikachuDiv").attr("name", pikachu.name);
	$("#charizardDiv").attr("name", charizard.name);
	$("#blastoiseDiv").attr("name", blastoise.name);
	$("#venasaurDiv").attr("name", venasaur.name);
	// Selecting your Character
	$(".characterDiv").on("click", function(){
		if($(this).hasClass("characterDiv")) {
			$(this).addClass("selectedCharacter").removeClass("enemyCharacter");
			$(".characterDiv").removeClass("characterDiv");
			$(".selectedCharacter").appendTo("#yourCharacterDiv");
			$(".enemyCharacter").appendTo("#enemyListDiv");
			selectedCharacter = true;
		}
	})
	// Selecting your Enemy Character
	$(".enemyCharacter").on("click", function(){
		if( $(this).hasClass("enemyCharacter") && (selectedEnemy === false)) {
			$(this).addClass("selectedEnemyDiv").removeClass("enemyListDiv");
			$(".selectedEnemyDiv").appendTo("#enemyDiv")
			// We have selected an enemy. This makes it so can't select another one til defeat the one there.
			selectedEnemy=true;
		};
	})
	//Attacking.
	var characterHealthCaption;
	var enemyHealthCaption;
	var defeatedEnemyText;
	var allEnemiesDefeatedText;
	var youLoseText;
	$("#attackButton").on("click", function() {
		if(selectedCharacter === true && selectedEnemy === true) {
			if($(".selectedEnemyDiv").attr('health')>0 && $(".selectedCharacter").attr('health')>0)  {
				var characterHealth = $(".selectedCharacter").attr('health');
				var enemyHealth = $(".selectedEnemyDiv").attr('health');
				var characterAttack = $(".selectedCharacter").attr('attack');
				var enemyCounterAttack = $(".selectedEnemyDiv").attr('counterAttack');
				enemyHealth -= characterAttack;
				// Only counterattack if enemies health is above 0.
				if(enemyHealth > 0) {
					characterHealth = characterHealth - enemyCounterAttack;
				}
				// Let's edit the health caption of our character.
				characterHealthCaption = $("<p></p>").text("health: " + characterHealth);
				$(".selectedCharacter .health").html(characterHealthCaption);
				// Same thing for enemy Character.
				enemyHealthCaption = $("<p></p>").text("health: " + enemyHealth);
				$(".selectedEnemyDiv .health").html(enemyHealthCaption);
				// Put in captions for what's going on with the attacks.
				var attackText1 = $("<p></p>").text("You attacked " + $(".selectedEnemyDiv").attr('name') + " for " + characterAttack + " damage.");
				$("#fightDiv").html(attackText1);
				var attackText2 = $("<p></p>").text($(".selectedEnemyDiv").attr('name') + " countered with an attack dealing " + enemyCounterAttack + " damage.");
				$("#fightDiv").append(attackText2);
				// Double character attack every turn.
				characterAttack = 2*characterAttack;
				// edit the attributes.
				$(".selectedCharacter").attr('health',characterHealth);
				$(".selectedEnemyDiv").attr('health', enemyHealth);
				$(".selectedCharacter").attr('attack',characterAttack);
			}	
			if ($(".selectedEnemyDiv").attr('health') <= 0) {
				defeatedEnemyText = $("<p></p>").text("You have defeated " + $(".selectedEnemyDiv").attr('name') + ". Choose another character to fight!");
				$("#fightDiv").html(defeatedEnemyText);
				$("#enemyDiv").empty();
				selectedEnemy=false;
				enemyCounter--;
				allEnemiesDefeatedText = $("<p></p>").text("You have defeated all enemies You WIN!");
				if(enemyCounter === 0) {
					$("#fightDiv").html(allEnemiesDefeatedText);
					var restartButton = $("<button class = 'btn btn-primary' id= 'restartButton'></button>").text("Restart!");
					$("#fightDiv").append(restartButton);
					$("#restartButton").on("click", function() {
						location.reload();
					});
				}
			}
			if ($(".selectedCharacter").attr('health') <= 0) {
				youLoseText = $("<p></p>").text("You've been defeated. You lose!");
				$("#fightDiv").html(youLoseText);
				var restartButton = $("<button class = 'btn btn-primary' id= 'restartButton'></button>").text("Restart!");
				$("#fightDiv").append(restartButton);
				$("#restartButton").on("click", function() {
					location.reload();
				});
			}
		} 
		// if(($(".selectedEnemyDiv").attr('health') > 0) (selectedCharacter === true) && (selectedEnemy === true)) {
		// 	$(".selectedEnemyDiv").attr('health') -= $(".selectedCharacter").attr('attack')
		// }
	});
	
});