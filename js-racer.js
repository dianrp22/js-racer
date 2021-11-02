const inputArgv = process.argv.slice(2);
const numberOfPlayer = Number(inputArgv[0]);
const maxTrackLength = Number(inputArgv[1]);
const numberOfObstacles = Number(inputArgv[2]);

const players = generatePlayerName(numberOfPlayer);
const playerNameList = Object.keys(players);
const positionList = Object.values(players);
const obstacleList = generateObstacle();
let currentWinner = 0;
//s1
//s2

main();

function main() {
  if (numberOfPlayer < 2) {
    return console.log(`Minimal player 2`);
  }
  if (maxTrackLength < 15) {
    return console.log(`Minimal track 15`);
  }
  printBoard(playerNameList, positionList);
  sleep(1000);
  let playerTurn = 0;
  while (!finished()) {
    clearScreen();
    advance(playerTurn);
    playerTurn++;
    if (playerTurn >= numberOfPlayer) {
      playerTurn = 0;
    }
    printBoard(playerNameList, positionList);
    sleep(1000);
  }
  console.log(winner(playerNameList[currentWinner]));
}

function diceRoll() {
  return Math.floor(Math.random() * 6);
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}

function printBoard(players, position) {
  for (let i = 0; i < numberOfPlayer; i++) {
    console.log(printLine(players[i], position[i], i));
  }
}

function printLine(player, pos, index) {
  const result = Array(maxTrackLength).fill(" ");
  for (const key of obstacleList) {
    result[key] = "x";
  }
  let hitObstacle = false;
  for (const key of obstacleList) {
    if (key === pos) {
      hitObstacle = true;
    }
  }
  if (hitObstacle) {
    result[pos] = "x";
    result[0] = player;
    positionList[index] = 0;
  } else {
    result[pos] = player;
  }
  return `|${result.join("|")}|`;
}

function generatePlayerName(num) {
  const players = {};
  const reference = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < num; i++) {
    players[reference[i]] = 0;
  }
  return players;
}

function generateObstacle() {
  const obstacle = [];
  for (let i = 0; i < numberOfObstacles; i++) {
    let isValid = false;
    let value = 0;
    while (!isValid) {
      value = getRandomInt(1, maxTrackLength - 1);
      if (!obstacle.includes(value)) {
        isValid = true;
      }
    }
    obstacle.push(value);
  }
  return obstacle;
}

function advance(playerTurn) {
  const diceValue = diceRoll();
  if (positionList[playerTurn] + diceValue < maxTrackLength - 1) {
    positionList[playerTurn] += diceValue;
  } else {
    positionList[playerTurn] = maxTrackLength - 1;
  }

  if (positionList[playerTurn] > positionList[currentWinner]) {
    currentWinner = playerTurn;
  }
}

function finished() {
  for (const key in positionList) {
    if (positionList[key] === maxTrackLength - 1) {
      return true;
    }
  }
  return false;
}

function winner(currentWinner) {
  return `pemenang adalah player: ${currentWinner}`;
}

function clearScreen() {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
