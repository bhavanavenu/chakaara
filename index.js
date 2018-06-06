
window.onload = function (){
    $('#1').show()
    $('#2').hide()
    $('#3').hide()
    $('#4').hide()
    $('#5').hide()
    $('#6').hide()

    function rollDice() {
	num = Math.floor(Math.random() * 6 + 1);
	console.log('Random gen: ' + num);
    return num;
    // if (num === 2){
    //     $("#dice-div").css({"background-image": "url('./images/dice2.png')"});
    }


var chance = 0;
var greenPath = [
	0,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
	12,
	13,
	14,
	15,
	126,
	17,
	18,
	19,
	20,
	21,
	22,
	23,
	24,
	25,
];
var yellowPath = [
	0,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
	12,
	13,
	14,
	15,
	126,
	17,
	18,
	19,
	20,
	21,
	22,
	23,
	24,
	25,
];
var p1Current = 0;
var p2Current = 0;
var win = 0;
// var p1Coins = [coin];

function resetScore() {
	var chance = 0;
	var greenPath = [
		0,
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		10,
		11,
		12,
		13,
		14,
		15,
		16,
		17,
		18,
		19,
		20,
		21,
		22,
		23,
		24,
		25,
	];
	var yellowPath = [
		0,
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		10,
		11,
		12,
		13,
		14,
		15,
		16,
		17,
		18,
		19,
		20,
		21,
		22,
		23,
		24,
		25,
	];

	return 'score reset!';
}

var Player = function (name,chance,path){
  this.chance = chance;
  this.path = path;
  this.pCurrent = 0;
  this.win = 0;
  this.name= name;
  this.coins=[24,0,0,24] // harcoded, should be [0,0,0,0]
  //this.nbOfCoins=nbOfCoins;
  
}

Player.prototype.play= function(){
    console.log('heyyy')
	if (this.win === 0) {
        var diceNumber = resultDice;
        console.log('dicenumber', diceNumber)
        console.log('resultDice', resultDice)



    //select the coin player wants to move(currentCoin)
    var currentCoin = 2 //index harcoded
		this.coins[currentCoin] = this.coins[currentCoin] + 5; //var  = 5
    console.log(this.coins[currentCoin])
		checkHit(this, this.coins[currentCoin]);
		this.getCurrentPosition();
		if (this.coins.indexOf(24) > -1) {
			this.win ++;
      this.coins = this.coins.map(function(e){
        if (e === 24){
          return "Win";
        }
        else {
          return e
        }
      })
      console.log(this.coins)
			return this.name + 'wins';
		}
		return yellowPath[this.pCurrent];
	} else return ' There is already a winner!, Reset Game!';
  }

Player.prototype.getCurrentPosition= function(){
  console.log(this.name + ": ["+ this.coins + "]");
}
  

var playerOne = new Player("Player 1",1, greenPath)
var playerTwo = new Player("Player 2",2, yellowPath);

var checkHit = function(player, coinPosition){
		if (player.name == "Player 1" && playerTwo.coins.includes(coinPosition)) {
			console.log('P1  hits p2');
			console.log('resetting p2 position back to fresh start');
      var currentCoinTwo = playerTwo.coins.indexOf(coinPosition);
			playerTwo.coins[currentCoinTwo] = 0;

		}

		else if (player.name == "Player 2" && playerOne.coins.includes(coinPosition)) {
      console.log('P2  hits p1');
		  console.log('resetting p2 position back to fresh start');
      var currentCoinOne = playerOne.coins.indexOf(coinPosition);
			playerOne.coins[currentCoinOne] = 0;
		}
	
}


console.log(playerOne.chance, playerOne.path);
while (playerOne.nbOfCoins<4 && playerTwo.nbOfCoins<4) {
playerOne.play();
playerTwo.play();
}
// var scoreBoard = function (){

// }

// var doubleChance= function (){

// }

// var win = function(){

// }

// var reset = function (){

// }


$("#dice").click(function() {
    var resultDice = rollDice();

    if (resultDice === 1){

        $('#1').show()
        $('#2').hide()
        $('#3').hide()
        $('#4').hide()
        $('#5').hide()
        $('#6').hide()

    }
    if (resultDice === 2){

        $('#1').hide()
        $('#2').show()
        $('#3').hide()
        $('#4').hide()
        $('#5').hide()
        $('#6').hide()
    }
    if (resultDice === 3){

        $('#1').hide()
        $('#2').hide()
        $('#3').show()
        $('#4').hide()
        $('#5').hide()
        $('#6').hide()
    }
    if (resultDice === 4){

        $('#1').hide()
        $('#2').hide()
        $('#3').hide()
        $('#4').show()
        $('#5').hide()
        $('#6').hide()
    }
    if (resultDice === 5){

        $('#1').hide()
        $('#2').hide()
        $('#3').hide()
        $('#4').hide()
        $('#5').show()
        $('#6').hide()
    }
    if (resultDice === 6){

        $('#1').hide()
        $('#2').hide()
        $('#3').hide()
        $('#4').hide()
        $('#5').hide()
        $('#6').show()
    }
    playerOne.play()

  });
  
// element.addEventListener("click", function(){

// });

}
