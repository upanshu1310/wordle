class Key {
  constructor(index, value) {
    this.index = index;
    this.value = value;
    this.state = 0;
    if (index >= 0 && index < 10) {
      this.row = 1
      this.y = 900;
      this.xStart = (800 - (10*50+9*10)) / 2;
      this.pos = this.index;
    } else if (index >= 10 && index < 19) {
      this.row = 2;
      this.y = 990;
      this.xStart = (800 - (9*50+8*10)) / 2;
      this.pos = this.index - 10;
    } else if (index >= 19 && index < 26) {
      this.row = 3;
      this.y = 1080;
      this.xStart = (800 - (7*50+6*10)) / 2;
      this.pos = this.index - 19;
    } 
    this.x = this.xStart + this.pos*60;
    this.width = 50;
    this.height = 75;
      if (index == 26) { // enter
        this.row = 3;
        this.width = 100;
        this.x = 85;
        this.y = 1080;
      } else if (index == 27) { // backspace
        this.row = 3;
        this.width = 100;
        this.x = 615;
        this.y = 1080;
      }
  }

  show() {
    stroke(255);
    switch(this.state) {
      case 0:
        fill(0);
        break;
      case 1:
        fill(122, 121, 116);
        break;
      case 2:
        fill(204, 194, 0);
        break;
      case 3:
        fill(39, 196, 0);
        break;
    }
    rect(this.x, this.y, this.width, this.height, 5);
    push();
    fill(255);
    if (this.index < 26) {
    textSize(30);
    text(this.value, this.x + 25, this.y + 37.5);
    } else if (this.index == 26) {
      textSize(30);
      text(this.value, this.x + 50, this.y + 37.5);
    } else if (this.index == 27) {
      textSize(45);
      text("⌫", this.x + 50, this.y + 40);
    }
    pop();
    textAlign(CENTER, CENTER);
  }
  
  changeState(state) {
    if (this.state < state)
      this.state = state;
  }
}

