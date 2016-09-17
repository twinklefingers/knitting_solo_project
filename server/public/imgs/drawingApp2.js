var colorBlack = 'black';
var colorRed = 'red';
var colorGreen = 'green';
var colorWhite = 'white';
var chosenColor = colorBlack;


function setup() {
    createCanvas(500, 500);
    background(255, 255, 255); // white canvas
}

function draw() {

    if (mouseIsPressed == true) {
        stroke(chosenColor);
        strokeWeight(3);
    } else {
        noStroke();
    }
    line(mouseX, mouseY, pmouseX, pmouseY);

    //color palette
    strokeWeight(0);
    fill(0, 0, 0); //black
    var chooseBlack = rect(25, 25, 45, 45);
    fill(255, 0, 0); //red
    var chooseRed = rect(75, 25, 45, 45);
    fill(0, 100, 0); //green
    var chooseGreen = rect(125, 25, 45, 45);
    //eraser
    stroke(0);
    strokeWeight(1);
    fill(255, 255, 255); //white (eraser)
    var chooseEraser = rect(175, 25, 45, 45);
    noStroke();

    // selection of color
    // add hover effect
    if ((mouseY >= 25) && (mouseY <= 70)) {
        hover = 8;
        if ((mouseX >= 25) && (mouseX <= 70)) {
            if (mouseIsPressed == true) {
                chosenColor = colorBlack;
            }
        } else if ((mouseX >= 75) && (mouseX <= 115)) {
            if (mouseIsPressed == true) {
                chosenColor = colorRed;
            }
        } else if ((mouseX >= 125) && (mouseX <= 160)) {
            if (mouseIsPressed == true) {
                chosenColor = colorGreen;
            }
        } else if ((mouseX >= 175) && (mouseX <= 205)) {
            if (mouseIsPressed == true) {
                chosenColor = colorWhite;
            }
        }
    }
}
