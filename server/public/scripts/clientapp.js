$(document).ready(function() {
    console.log('jQuery linked'); // this is really important! :P

    // //button listeners
    $('.optionsButton').on('click', toggleOptions);

}); // end doc ready

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
//                              Global Variables                                    //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
var pickedColor = "black";



//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
//                     Function which Shows/Hides Grid Form                         //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
function toggleOptions() {
    // if button class = optionsButton then
    if ($('#optionsReset').hasClass('optionsButton')) {
        var audio = document.getElementById("meow");
        audio.play();
        console.log('toggleOptions() triggered');
        $('.chooseGrid-hide').removeClass('chooseGrid-hide').addClass('chooseGrid');
        $('.chooseGrid').hide();
        $('.chooseGrid').slideToggle(1500);
    }
}

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
//                           Function to Reset Page                                 //
//                                                                                  //
// //////////////////////////////////////////////////////////////////////////////////////
function printPage() {
    window.print();
}


//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
//                       Function to Capture Custom Grid Specs                      //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
function submitGridSpecs() {
    console.log('submitGridSpecs() triggered');
    event.preventDefault();

    // bundle user inputs into a Grid object
    var Grid = {
        sts: $('#gridStitches').val(),
        rows: $('#gridRows').val(),
        horizontal: $('#horizontalGauge').val(),
        vertical: $('#verticalGauge').val()
    };


    // ToggleClass to make Create Grid say Reset
    $('.optionsButton').removeClass('optionsButton').addClass('resetButton');
    $('.resetButton').text('Reset').click(function() {
        var audio = document.getElementById("hiss");
        audio.play();
        audio.volume = 0.2;
        audio.onended = function() {
            window.location.reload();
        }

    });

    $('input').val(''); // clear inputs
    $('.chooseGrid').hide(); // hide form

    // append user-defined sts & rows to DOM
    var stsByRows = document.getElementById('stsByRows');
    var gauge = document.getElementById('gauge');
    stsByRows.innerHTML = stsByRows.innerHTML + Grid.sts + ' x ' + Grid.rows;
    gauge.innerHTML = gauge.innerHTML + Grid.horizontal + ' x ' + Grid.vertical;

    newGrid(Grid); // must be placed after var assignments
    console.log("Grid: ", Grid);


    //if - onclick Submit, input is 200 < # < 1, throw alert
    if (Grid.sts > 100 || Grid.rows > 100) {
        alert("Maximum Grid Size is 100x100. \nThe value you entered for either Stitches or Rows was greater than 100. \n\nThis page will now reload.");
        window.location.reload();
    }
}




//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
//                     Function to Append Custom Grid to DOM                        //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
function newGrid(Grid) {
    console.log('newGrid() triggered');
    console.log("newGrid() Grid: ", Grid);
    // draw
    var i = 1;
    var j = 1;

    // logic to establish # of columns containing 1 div each
    for (j; j <= Grid.sts; j++) {
        $('#gridCanvas').append("<div class='col' id='pixelCol" + j + "'><div class='pixelInitial' id='pixelCol" + j + " " + 'pixelRow' + 1 + "'onclick='drawColor()'></div></div>");
    }

    // this adds divs to each column per the # of inputted rows
    //each column
    for (c = 1; c <= Grid.sts; c++) {
        //each inputted row
        for (i; i <= Grid.rows - 1; i++) {
            $('.col').append("<div class='pixel' id='pixelRow" + (i + 1) + " " + 'pixelCol' + 0 + "'onclick='drawColor()'></div>");
            console.log('row st created');
        }
    }
}



//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
//                Function to Choose Color with which to Draw                       //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
//user clicks on .color in #colorPalette to activate this function
function pickColor(color) {
    pickedColor = color;
    return pickedColor;
}




//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
//                Function to Color BG Color of Individual Divs                     //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
function drawColor() {
    var mousingDown = false;

    window.addEventListener('mousedown', switchMouseState);
    window.addEventListener('mouseup', switchMouseState);

    $('#gridCanvas').mouseover(function() {
        setPixelColor(event);
    });
    $('#gridCanvas').click(function() {
        setPixelColor(event);
        var audio = document.getElementsByTagName("audio")[0];
        audio.play();
    });

    function switchMouseState(event) {
        mousingDown = event.type === 'mousedown';
    }

    function setPixelColor(event) {
        if (event.type === 'click' && $(event.target).attr('class').match(/pixel/)) {
            var thisPixel = event.target;
            $(thisPixel).removeAttr('class');
            $(thisPixel).addClass('pixel' + " " + pickedColor);
            console.log("event.target in setPixelColor() CLICK: ", thisPixel);
        } else if (mousingDown && $(event.target).attr('class').match(/pixel/)) {
            var thisPixel = event.target;
            $(thisPixel).removeAttr('class');
            $(thisPixel).addClass('pixel' + " " + pickedColor);
            console.log("event.target setPixelColor() MOUSEDOWN: ", thisPixel);
        }
    }
}
