class Cell {
  constructor(index, correctValue) {
    this.index = index;
    this.value = "";
    this.bg = color(0)
    this.correct = correctValue;
    this.true = false;
    this.side = 100;
    this.row = floor(index / 5) + 1;
    this.column = (index % 5) + 1;
    this.x = 100 + (this.column-1)*120 ;
    this.y = 50 + (this.row-1)*120;
  }
  
  show() {
    if (this.value != "") {
      stroke(255)
    } else {
      stroke(122, 121, 116)
    }
    fill(this.bg)
    square(this.x, this.y, this.side)
    push()
    fill(255);
    textSize(75)
    textAlign(CENTER, CENTER);
    text(this.value, this.x + 50, this.y+55);
    pop()
  }
  
  addChar(char) {
    this.value = char;
  }
  
  update() {
    this.side += 10;
  }
}