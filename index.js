
function trace(msg) { console.log(msg);}
window.onload = function (){
    $('#1').show()
    $('#2').hide()
    $('#3').hide()
    $('#4').hide()
    $('#5').hide()
    $('#6').hide()
    var gameCoins = {
        green: [],
        yellow: []   
    }
    function init() {
        trace("Init function");
        $(".buttons-green .btn-green").each(function (i,element) {
            $(element).addClass('btn-green-' + i);
            $(element).attr('data-index-coin', i);
            trace(element);
            var $gameCoin = $('<div class="actual-coin green-coin green-coin-' + i + '"></div>');
            var coinObject = {
                $coinElement: $gameCoin,
                coords: greenPath[0],
                coinPositionIndex: 0,
            }
            gameCoins.green.push(coinObject);
        })

        $(".buttons-yellow .btn-yellow").each(function (i,element) {
            $(element).addClass('btn-yellow-' + i);
            $(element).attr('data-index-coin', i);
            var $gameCoin = $('<div class="actual-coin yellow-coin yellow-coin-' + i + '"></div>');
            var coinObject = {
                $coinElement: $gameCoin,
                coords: yellowPath[0],
                coinPositionIndex: 0,
            }
            gameCoins.yellow.push(coinObject);
        })
    }
  
    trace(gameCoins);
    
    function rollDice() {
        num = Math.floor(Math.random() * 6 + 1);
        console.log('Random gen: ' + num);
        return num;
        // if (num === 2){
        //     $("#dice-div").css({"background-image": "url('./images/dice2.png')"});
    }


var chance = 0;
var greenPath = [
    "2-0",
	"1-0",
	"0-0",
	"0-1",
	"0-2",
	"0-3",
	"0-4",
	"1-4",
	"2-4",
	"3-4",
    "4-4",
    "4-3",
    "4-2",
    "4-1",
    "4-0",
    "3-0",
    "3-1",
    "3-2",
    "3-3",
    "2-3",
    "1-3",
    "1-2",
    "1-1",
    "2-1",
    "2-2"
    
];
var yellowPath = [
    "2-4",
    "3-4",
    "4-4",
    "4-3",
    "4-2",
    "4-1",
    "4-0",
    "3-0",
    "2-0",
    "1-0",
    "0-0",
    "0-1",
    "0-2",
    "0-3",
    "0-4",
    "1-4",
    "1-3",
    "1-2",
    "1-1",
    "2-1",
    "3-1",
    "3-2",
    "3-3",
    "2-3",
    "2-2"
];
var p1Current = 0;
var p2Current = 0;
var win = 0;
// var p1Coins = [coin];

function resetScore() {
	var chance = 0;
	// var greenPath = [
	// 	0,
	// 	1,
	// 	2,
	// 	3,
	// 	4,
	// 	5,
	// 	6,
	// 	7,
	// 	8,
	// 	9,
	// 	10,
	// 	11,
	// 	12,
	// 	13,
	// 	14,
	// 	15,
	// 	16,
	// 	17,
	// 	18,
	// 	19,
	// 	20,
	// 	21,
	// 	22,
	// 	23,
	// 	24,
	// 	25,
	// ];
	// var yellowPath = [
	// 	0,
	// 	1,
	// 	2,
	// 	3,
	// 	4,
	// 	5,
	// 	6,
	// 	7,
	// 	8,
	// 	9,
	// 	10,
	// 	11,
	// 	12,
	// 	13,
	// 	14,
	// 	15,
	// 	16,
	// 	17,
	// 	18,
	// 	19,
	// 	20,
	// 	21,
	// 	22,
	// 	23,
	// 	24,
	// 	25,
	// ];

	return 'score reset!';
}

var Player = function (name, chance, path, coins){
  //this.chance = chance;
  this.path = path;
//   this.pCurrent = 0;
  this.win = 0;
  this.name= name;
  this.coins=coins; // position of every coin in the Path array  [indexCoinOne, indexCoinTwo, indexCoinThree, indexCoinFour]
  //this.nbOfCoins=nbOfCoins;
  

  
}

Player.prototype.move = function ( number ){ //for jquery with this.coins[indexCoin].coords

    
};

Player.prototype.play= function(indexCoin, diceNumber){  //we need to know the coin the player has selected, and the number of the dice.
    console.log('this',this.coins)
    console.log('indexCoin: ',indexCoin)
    if (this.win < 4) {
        console.log('dicenumber', diceNumber)
    //select the coin player wants to move(currentCoin)
        var coinCurrentPosition = this.coins[indexCoin].coinPositionIndex //position of the coin
        console.log('coinCurrentPosition', coinCurrentPosition)
		coinCurrentPosition += diceNumber; //positon of the coin after we move it
        console.log('coinCurrentPosition2', coinCurrentPosition)

        this.coins[indexCoin].coords = this.path[coinCurrentPosition] //set the coords of the current position into de coords property

        console.log(this.coins[indexCoin].coords)
		checkHit(this, coinCurrentPosition);
        this.getCurrentPosition();
		if (coinCurrentPosition === 25) {
			this.win ++;
            if(this.win===4){
                console.log("Player " + this.name + " have won");
                //reset()  for the future
            }        
        }		
    
    }
  }

Player.prototype.getCurrentPosition= function(){  // to fix
  console.log(this.name + ": ["+ this.coins + "]");
}
  

var playerOne = new Player("Player 1",1, greenPath, gameCoins.green)
var playerTwo = new Player("Player 2",2, yellowPath, gameCoins.yellow);

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

init();
console.log(playerOne.chance, playerOne.path);
// while (playerOne.nbOfCoins<4 && playerTwo.nbOfCoins<4) {
// playerOne.play();
// playerTwo.play();
// }

// var scoreBoard = function (){

// }

// function updateCoinPosition() {}

// var reset = function (){

// }


$('#dice').click(function() {
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
    var $buttons = $("button.btn-green, button.btn-yellow");//green or yellow
    $buttons.on("click", function(event) {
        var $btn = $(event.currentTarget); 
        var coinIndex = $btn.attr('data-index-coin');
        $buttons.off("click");

        playerOne.play(coinIndex, resultDice);

    })
    
    //playerOne.play()
    //playerTwo.play()

});
  
// element.addEventListener("click", function(){

// });

}
function scoreBoard() {
    $('#pairs_clicked').text(memoryGame.pairsClicked);
    $('#pairs_guessed').text(memoryGame.pairsGuessed);
  }
