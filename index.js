//var chance = 0;
var chance = 0;
var resultDice = 0;
var p1Score = 0;
//document.getElementById("p1score").innerHTML = p1Score;
var p2Score = 0;
//document.getElementById("p2Score").innerHTML = p2Score;
 
 
////////reset///////////////////////
 
function reset_score() {
    for (i = 0; i <= 1; i++) {
        for (j = 0; j <= 3; j++) {
            player[i][j][0].oldPosition = 0;
            player[i][j][1].newPosition = 0;
            player[i][j][3].win = 0;
        }
    }
 
    resetcoins();
    chance = 0;
    return 'score reset!';
}
 
function resetcoins() {
 
    for (i = 0; i <= 3; i++) {
        $(player[0][i][2].coinCss).animate({
            left: "350px",
            top: "0px"
        });
    }
 
    for (i = 0; i <= 3; i++) {
        $(player[1][i][2].coinCss).animate({
            left: "350px",
            top: "650px"
        });
    }
 
}
 
 
///////////Move & Win//////////////////////////
 
function move(turn, coinCss, oldPos, newpos) {
    console.log("MOVE ");
    console.log("old pos: ", oldPos);
    console.log("new pos: ", newpos);
    console.log("coin :", coinCss);
    console.log("turn : ", turn)
 
 
    if (turn == 0) {
        for (i = oldPos; i < newpos; i++) {
            $(coinCss).animate(player1_Path[i][0]);
        }
    } else {
        for (i = oldPos; i < newpos; i++) {
            $(coinCss).animate(player2_Path[i][0]);
        }
 
    }
 
}
 
function moveToWin(turn, coinNumber) {
 
    $(player[turn][coinNumber][2].coinCss).animate({
        left: "340px",
        top: "320px"
    });
 
    //scoreBoard(turn, coinNumber);
 
 
}
 
function play(turn, coinNumber, resultDice) {
 
    if (player[turn][coinNumber][3].win == 0) {
 
        var old = player[turn][coinNumber][0].oldPosition;
        player[turn][coinNumber][1].newPosition = old + resultDice;
 
        if (player[turn][coinNumber][1].newPosition > 25) {
            moveToWin(turn, coinNumber);
            player[turn][coinNumber][3].win = 1;
            scoreBoard(turn);
            // return "Player " + player[turn][coinNumber][4].name + " Coin in Center";
        } else {
 
            hitCheck(turn, player[turn][coinNumber][1].newPosition);
 
 
            move(turn, player[turn][coinNumber][2].coinCss, old, player[turn][coinNumber][1].newPosition);
 
            player[turn][coinNumber][0].oldPosition = player[turn][coinNumber][1].newPosition;
 
            return player1_Path[player[turn][coinNumber][1].newPosition], player2_Path[player[turn][coinNumber][1].newPosition];
        }
    } else return "player " + player[turn][coinNumber][4].name + ' Already won, Choose Another coin!';
}
 
function scoreBoard(turn) {
    for (i = 0; i < 3; i++) {
        if (player[0][i][3].win == 1) {
            p1Score = p1Score + 1;
            console.log("Score of Player 1: ", p1Score);
            document.getElementById("p1Score").innerHTML = p1Score
        }
    }
    for (i = 0; i < 3; i++) {
        if (player[1][i][3].win == 1) {
            p2Score = p2Score + 1;
            console.log("Score of Player 2: ", p2Score);
            document.getElementById("p2Score").innerHTML = p2Score
        }
    }
}
 
 
 
 
//////////////////////hit/////////////////////////
 
function hitCheck(turn, newpos) {
 
    if (turn == 0) {
        var hitornot = player1_Path[newpos][1].hitornot;
        for (i = 0; i <= 3; i++) {
            if (hitornot == getHitorNot(1, player[1][i][1].newPosition)) {
                console.log("HITTTTTTT BY PLAYER 1 ON :", player[1][i][3].name)
                hitReset(1, i);
            }
        }
    } else {
        var hitornot = player2_Path[newpos][1].hitornot;
        for (i = 0; i <= 3; i++) {
            if (hitornot == getHitorNot(0, player[0][i][1].newPosition)) {
                console.log("HITTTTTTT BY PLAYER 2 ON:", player[0][i][3].name)
                hitReset(0, i);
            }
        }
 
    }
 
}
 
function getHitorNot(turn, newPosition) {
    console.log("getHitorNot");
    console.log(turn, newPosition)
    if (turn == 0) {
        console.log(" player1_path hitornot: ", player1_Path[newPosition][1].hitornot)
        return player1_Path[newPosition][1].hitornot;
    } else {
        console.log(" player2_path hitornot: ", player2_Path[newPosition][1].hitornot)
        return player2_Path[newPosition][1].hitornot;
    }
}
 
 
 
function hitReset(turn, coinNumber) {
    if (turn == 0) {
        console.log("HIT ON :", player[0][coinNumber][4].name)
        player[0][coinNumber][0].oldPosition = 0;
        player[0][coinNumber][1].newPosition = 0;
        $(player[0][coinNumber][2].coinCss).animate({
            left: "350px",
            top: "0px"
        });
        chance = 1;
    } else {
        console.log("HIT ON :", player[1][coinNumber][4].name)
        player[1][coinNumber][0].oldPosition = 0;
        player[1][coinNumber][1].newPosition = 0;
        $(player[1][coinNumber][2].coinCss).animate({
            left: "350px",
            top: "650px"
        });
        chance = 0;
    }
 
}
 
 
 
////dice////
 
function rollDice() {
    num = Math.floor(Math.random() * 6 + 1);
    console.log("###################################");
    console.log('Random gen: ' + num);
    return num;
}
 
 
window.onload = function() {
    $('#1').show()
    $('#2').hide()
    $('#3').hide()
    $('#4').hide()
    $('#5').hide()
    $('#6').hide()
 
}
$("#dice").click(function() {
    resultDice = rollDice();
 
    if (resultDice === 1) {
 
        $('#1').show()
        $('#2').hide()
        $('#3').hide()
        $('#4').hide()
        $('#5').hide()
        $('#6').hide()
 
    }
    if (resultDice === 2) {
 
        $('#1').hide()
        $('#2').show()
        $('#3').hide()
        $('#4').hide()
        $('#5').hide()
        $('#6').hide()
    }
    if (resultDice === 3) {
 
        $('#1').hide()
        $('#2').hide()
        $('#3').show()
        $('#4').hide()
        $('#5').hide()
        $('#6').hide()
    }
    if (resultDice === 4) {
 
        $('#1').hide()
        $('#2').hide()
        $('#3').hide()
        $('#4').show()
        $('#5').hide()
        $('#6').hide()
    }
    if (resultDice === 5) {
 
        $('#1').hide()
        $('#2').hide()
        $('#3').hide()
        $('#4').hide()
        $('#5').show()
        $('#6').hide()
    }
    if (resultDice === 6) {
 
        $('#1').hide()
        $('#2').hide()
        $('#3').hide()
        $('#4').hide()
        $('#5').hide()
        $('#6').show()
    }
 
 
});
 
 
////////////// coins////////
$("#coinbutton1").click(function() {
    console.log("Coin1 clicked!");
    if (chance == 0) {
        console.log("player 1 is playing with dice value : ", resultDice)
        play(0, 0, resultDice);
        chance = 1;
    } else {
        console.log("player 2 is playing with dice value : ", resultDice)
        play(1, 0, resultDice);
        chance = 0;
    }
});
 
$("#coinbutton2").click(function() {
    console.log("Coin2 clicked!");
    if (chance == 0) {
        console.log("player 1 is playing with dice value : ", resultDice)
        play(0, 1, resultDice);
        chance = 1;
    } else {
        console.log("player 2 is playing with dice value : ", resultDice)
        play(1, 1, resultDice);
        chance = 0;
    }
});
 
$("#coinbutton3").click(function() {
    console.log("Coin3 clicked!");
    if (chance == 0) {
        console.log("player 1 is playing with dice value : ", resultDice)
        play(0, 2, resultDice);
        chance = 1;
    } else {
        console.log("player 2 is playing with dice value : ", resultDice)
        play(1, 2, resultDice);
        chance = 0;
    }
});
 
$("#coinbutton4").click(function() {
    console.log("Coin4 clicked!");
    if (chance == 0) {
        console.log("player 1 is playing with dice value : ", resultDice)
        play(0, 3, resultDice);
        chance = 1;
    } else {
        console.log("player 2 is playing with dice value : ", resultDice)
        play(1, 3, resultDice);
        chance = 0;
    }
});
 
 
 
///Variables/////////////
var player = [
    [
        [{ oldPosition: 0 }, { newPosition: 0 }, { coinCss: ".boxgreen" }, { win: 0 }, { name: "P1 green" }],
        [{ oldPosition: 0 }, { newPosition: 0 }, { coinCss: ".boxyellow" }, { win: 0 }, { name: "P1 yellow" }],
        [{ oldPosition: 0 }, { newPosition: 0 }, { coinCss: ".boxred" }, { win: 0 }, { name: "P1 red" }],
        [{ oldPosition: 0 }, { newPosition: 0 }, { coinCss: ".boxblue" }, { win: 0 }, { name: "P1 blue" }]
    ],
    [
        [{ oldPosition: 0 }, { newPosition: 0 }, { coinCss: ".dotgreen" }, { win: 0 }, { name: "P2 green" }],
        [{ oldPosition: 0 }, { newPosition: 0 }, { coinCss: ".dotyellow" }, { win: 0 }, { name: "P2 yellow" }],
        [{ oldPosition: 0 }, { newPosition: 0 }, { coinCss: ".dotred" }, { win: 0 }, { name: "P2 red" }],
        [{ oldPosition: 0 }, { newPosition: 0 }, { coinCss: ".dotblue" }, { win: 0 }, { name: "P2 blue" }]
    ]
]
 
var player1_Path = [
    [{
            top: '+=100'
        },
        {
            hitornot: 0
        }
    ],
    [{
            left: '-=130'
        },
        {
            hitornot: 1
        }
    ],
    [{
            left: '-=130'
        },
        {
            hitornot: 2
        }
    ],
    [{
            top: '+=120'
        },
        {
            hitornot: 3
        }
    ],
    [{
            top: '+=120'
        },
        {
            hitornot: 4
        }
    ],
    [{
            top: '+=120'
        },
        {
            hitornot: 5
        }
    ],
    [{
            top: '+=120'
        },
        {
            hitornot: 6
        }
    ],
 
    [{
            left: '+=120'
        },
        {
            hitornot: 7
        }
    ],
    [{
            left: '+=120'
        },
        {
            hitornot: 8
        }
    ],
    [{
            left: '+=120'
        },
        {
            hitornot: 9
        }
    ],
    [{
            left: '+=130'
        },
        {
            hitornot: 10
        }
    ],
    [{
            top: '-=120'
        },
        {
            hitornot: 11
        }
    ],
    [{
            top: '-=120'
        },
        {
            hitornot: 12
        }
    ],
    [{
            top: '-=120'
        },
        {
            hitornot: 13
        }
    ],
    [{
            top: '-=120'
        },
        {
            hitornot: 14
        }
    ],
    [{
            left: '-=110'
        },
        {
            hitornot: 15
        }
    ],
    [{
            top: '+=120'
        },
        {
            hitornot: 16
        }
    ],
    [{
            top: '+=120'
        },
        {
            hitornot: 17
        }
    ],
    [{
            top: '+=120'
        },
        {
            hitornot: 18
        }
    ],
    [{
            left: '-=120'
        },
        {
            hitornot: 19
        }
    ],
    [{
            left: '-=120'
        },
        {
            hitornot: 20
        }
    ],
    [{
            top: '-=120'
        },
        {
            hitornot: 21
        }
    ],
    [{
            top: '-=120'
        },
        {
            hitornot: 22
        }
    ],
    [{
            left: '+=120'
        },
        {
            hitornot: 23
        }
    ],
    [{
            top: '+=120'
        },
        {
            hitornot: 24
        }
    ]
];
 
var player2_Path = [
    [{
            top: '-=100'
        },
        {
            hitornot: 8
        }
    ],
    [{
            left: '+=110'
        },
        {
            hitornot: 9
        }
    ],
    [{
            left: '+=120'
        },
        {
            hitornot: 10
        }
    ],
    [{
            top: '-=120'
        },
        {
            hitornot: 11
        }
    ],
    [{
            top: '-=120'
        },
        {
            hitornot: 12
        }
    ],
    [{
            top: '-=120'
        },
        {
            hitornot: 13
        }
    ],
    [{
            top: '-=110'
        },
        {
            hitornot: 14
        }
    ],
    [{
            left: '-=120'
        },
        {
            hitornot: 15
        }
    ],
    [{
            left: '-=120'
        },
        {
            hitornot: 0
        }
    ],
    [{
            left: '-=120'
        },
        {
            hitornot: 1
        }
    ],
    [{
            left: '-=120'
        },
        {
            hitornot: 2
        }
    ],
    [{
            top: '+=120'
        },
        {
            hitornot: 3
        }
    ],
    [{
            top: '+=120'
        },
        {
            hitornot: 4
        }
    ],
    [{
            top: '+=120'
        },
        {
            hitornot: 5
        }
    ],
    [{
            top: '+=120'
        },
        {
            hitornot: 6
        }
    ],
    [{
            left: '+=120'
        },
        {
            hitornot: 7
        }
    ],
    [{
            top: '-=120'
        },
        {
            hitornot: 20
        }
    ],
    [{
            top: '-=120'
        },
        {
            hitornot: 21
        }
    ],
    [{
            top: '-=120'
        },
        {
            hitornot: 22
        }
    ],
    [{
            left: '+=120'
        },
        {
            hitornot: 23
        }
    ],
    [{
            left: '+=120'
        },
        {
            hitornot: 16
        }
    ],
    [{
            top: '+=120'
        },
        {
            hitornot: 17
        }
    ],
    [{
            top: '+=120'
        },
        {
            hitornot: 18
        }
    ],
    [{
            left: '-=120'
        },
        {
            hitornot: 19
        }
    ],
    [{
            top: '-=120'
        },
        {
            hitornot: 24
        }
    ],
];
 
console.log(reset_score());