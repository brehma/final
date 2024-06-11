// JavaScript source code
"use strict";

// set up init event so we can have an init function
window.addEventListener("load", init);  // so we can do some init stuff.

// selection events so we can change the color of the color input displays
var EvenSelector = document.querySelector("#colorEven");
EvenSelector.addEventListener("input", showEvenColorHandler, false);

var OddSelector = document.querySelector("#colorOdd");
OddSelector.addEventListener("input", showOddColorHandler, false);


// ----------------------------------------------------------
//  Function init
//  called by load handler
//  Used to set initial stuff. In this case, the color input display boxes.
// ----------------------------------------------------------
function init() {
    // set the initial colors in the colorboxes so they show.
    showEvenColorHandler();
    showOddColorHandler();
}


// ----------------------------------------------------------
//  Function showEvenColorHandler
//  called by init and event handler
//  Used to set the even color input display box.
// ----------------------------------------------------------
function showEvenColorHandler() {
    var colorInput = "";
    var colorSelector = document.getElementById("colorEven");
    if (colorSelector != null) {
        colorInput = colorSelector.options[colorSelector.selectedIndex].value;
    }

   EvenColorPic.style.backgroundColor = colorInput;
}


// ----------------------------------------------------------
//  Function showOddColorHandler
//  called by init and event handler
//  Used to set the odd color input display box.
// ----------------------------------------------------------
function showOddColorHandler() {
    var colorInput = "";
    var colorSelector = document.getElementById("colorOdd");
    if (colorSelector != null) {
        colorInput = colorSelector.options[colorSelector.selectedIndex].value;
    }

    OddColorPic.style.backgroundColor = colorInput;
}


// ----------------------------------------------------------
//  Function createRhombus
//  called by display rhombus button click
//  Creates multiline rhombus and "prints" to the upside and downside
//  elements in the page.
// ----------------------------------------------------------
function createRhombus(pHeight, pColorEven, pColorOdd, pSymbol) {
 
// NOTE:  we are going to use text align to center each line so no worries about spaceing.

// do upside part first
    var rLine = "";

    // NOTE:  this doesn't seem to work.  this backgroundColor prop is never set via the .css 
    // though it works via the .css.  If you set this style.backgroundColor, it will override the css file
    // and show the color.  Unfortunately it doesn not initially have the actual background color.
   // var backColor = document.querySelector("body").style.backgroundColor;

   
    var i = 0;
    var j = 0;

    for (i = 0; i < pHeight; i++) {
        rLine += "<p>";
 
        //Create each line on the Rhombus
        for (j = 0; j <= (2*i); j++) {

            //Is the position even or odd so we change the color
            if (j % 2) {
                //even
                rLine += "<span style='color:" + pColorEven + ";'>" + pSymbol + "</span>";
            }
            else {
                //odd
                rLine += "<span style='color:" + pColorOdd + ";'>" + pSymbol + "</span>";
            }
        } // end for j

        rLine += "</p>";

    }// end for i 

    // print to page for upside:
    document.getElementById("upSide").innerHTML = rLine;

    // ******************************************************************
    // ***** now do the down side.  same idea just reverse i direction.

    rLine = "";  // reset variables.
    i = 0;
    j = 0;

    for (i = (pHeight-1); i > -1; i--) {
        rLine += "<p>";
 
        //Create each line on the Rhombus
        for (j = 0; j <= (2*i); j++) {

            //Is the position even or odd so we change the color
            if (j % 2) {
                //even
                rLine += "<span style='color:" + pColorEven + ";'>" + pSymbol + "</span>";
            }
            else {
                //odd
                rLine += "<span style='color:" + pColorOdd + ";'>" + pSymbol + "</span>";
            }
        }// end for j

        rLine += "</p>";

    }// end for i

    // now print to page via downSide
    document.getElementById("downSide").innerHTML = rLine;
}

