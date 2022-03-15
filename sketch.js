let string;
// let valid;
let words;
let word;
let wordArray;
let currentLetter = 1;
let currentRow = 1;
let keyOrder = "QWERTYUIOPASDFGHJKLZXCVBNM";

let rows = [];
let keys = [];

function preload() {
  string = loadStrings("words.txt");
  // valid = loadStrings("valid.txt")
}

function setup() {
  createCanvas(800, 1200);
  word = random(string).toUpperCase();
  // validWords = split(valid[0], ",");
  // console.log(word);
  wordArray = wordToArray(word);
  let index = 0;
  for (let row = 1; row <= 6; row++) {
    temp_row = [];
    for (let i = 0; i < 5; i++) {
      temp_cell = new Cell(index, word[i]);
      temp_row.push(temp_cell);
      index++;
    }
    rows.push(temp_row);
  }

  for (let i = 0; i < 28; i++) {
    if (i == 26) {
      temp_key = new Key(i, "Enter");
    } else if (i == 27) {
      temp_key = new Key(i, "Backspace");
    } else {
      temp_key = new Key(i, keyOrder[i]);
    }
    keys.push(temp_key);
  }
}

function draw() {
  background(0);

  for (let r = 0; r < rows.length; r++) {
    for (let i = 0; i < rows[r].length; i++) {
      rows[r][i].show();
    }
  }
  for (let i = 0; i < 28; i++) {
    keys[i].show();
  }
}

function mouseClicked() {
  let keyClicked = getKey(mouseX, mouseY);
  // console.log(keyClicked)
  if (keyClicked != "invalid") {
    let currentCell = rows[currentRow - 1][currentLetter - 1];
    //console.log(mouseX, mouseY)
    //console.log(keyClicked)
    if (keyClicked == "Backspace") {
      if (currentLetter > 1) currentLetter--;

      rows[currentRow - 1][currentLetter - 1].value = "";
    } else {
      if (currentLetter < 6) {
        currentCell.addChar(keyOrder[keyClicked]);
      }
      if (currentLetter < 6) {
        currentLetter++;
      }
    }

    if (keyClicked == "Enter") {
      if (checkRow(currentRow - 1)) {
        checkAnswer(currentRow - 1);
        currentRow++;
        currentLetter = 1;
      }
    }
  }
}

function keyPressed() {
  let currentCell = rows[currentRow - 1][currentLetter - 1];

  if (key == "Backspace") {
    if (currentLetter > 1) currentLetter--;

    rows[currentRow - 1][currentLetter - 1].value = "";
  } else if (isValidLetter(keyCode)) {
    if (currentLetter < 6) {
      currentCell.addChar(key.toUpperCase());
    }
    if (currentLetter < 6) {
      currentLetter++;
    }
  }

  if (key == "Enter") {
    if (checkRow(currentRow - 1)) {
      checkAnswer(currentRow - 1);
      currentRow++;
      currentLetter = 1;
    }
  }
}

function isValidLetter(keyCode) {
  return keyCode >= 65 && keyCode <= 90;
}

function checkRow(row) {
  let letter_array = [];
  for (let i = 0; i < 5; i++) {
    if (rows[row][i].value == "") {
      console.log("enter 5 letters");
      return false;
    } else {
      letter_array.push(rows[row][i].value);
    }
  }
  console.log(letter_array.join("").toLowerCase());
  // if (!validWords.includes(letter_array.join(""))) {
  //   console.log("Not a valid word");
  //   return false;
  // }
  return true;
}

function checkAnswer(row) {
  tempArray = [...wordArray];
  let count = 0;

  for (let i = 0; i < 5; i++) {
    tempCell = rows[row][i];
    tempLetter = tempCell.value.toUpperCase();
    tempIndex = keyOrder.indexOf(tempLetter);

    if (tempArray.includes(tempCell.value)) {
      if (tempCell.value.toUpperCase() == tempCell.correct) {
        tempCell.true = true;
        tempCell.bg = color(39, 196, 0);

        keys[tempIndex].changeState(3);

        tempArray.splice(tempArray.indexOf(tempCell.value, 0), 1);
      } else {
        tempCell.bg = color(204, 194, 0);

        keys[tempIndex].changeState(2);

        tempArray.splice(tempArray.indexOf(tempCell.value, 0), 1);
      }
    } else {
      tempCell.bg = color(122, 121, 116);
      keys[tempIndex].changeState(1);
    }
  }

  if (currentRow > 5) {
    push();

    console.log(`the word was: ${word}`);
    pop();
    noLoop();
  }
  for (let i = 0; i < 5; i++) {
    if (rows[row][i].true) count++;
  }
  if (count == 5) {
    // stroke(255);
    // fill(39, 196, 0);
    // textSize(50);
    // text("CONGRATULATIONS", 100, 825);

    console.log("congratulations");
    noLoop();
  }
}

function wordToArray(word) {
  let arr = [];
  for (let letter of word) {
    arr.push(letter.toUpperCase());
  }
  return arr;
}

function check_if_word_exists(word) {
  const url =
    "https://api.wordnik.com/v4/word.json/" +
    word.toLowerCase() +
    "/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";

  if (loadJSON(url).id) {
    return true;
  } else if (loadJSON(url).error) {
    return false;
  }
}

function letterToIndex(letter) {
  return keyOrder.indexOf(letter);
}

function getKey(x, y) {
  if (x >= 85 && x <= 715 && y >= 900 && y <= 1145) {
    if (y <= 975) {
      if (f(x, 105) && x >= 105 && x <= 695) {
        return f(x, 105) - 100;
      }
    } else if (y <= 1060) {
      if (f(x, 135) && x >= 135 && x <= 665) {
        return f(x, 135) - 100 + 10;
      }
    } else {
      if (f(x, 195) && x >= 195 && x <= 605) {
        return f(x, 195) - 100 + 19;
      } else if (x >= 85 && x <= 185) {
        return "Enter";
      } else if (x >= 615 && x <= 715) {
        return "Backspace";
      }
    }
  }
  return "invalid";
}

function f(x, starting) {
  let v1 = floor((x - starting) / 60);
  let v2 = floor((x - starting - 50) / 60);

  if (v1 != v2) {
    return v1 + 100;
  }

  return false;
}
