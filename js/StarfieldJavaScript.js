// JavaScript source code
// Created by Cary Gibson
// March 16, 2019

// for testing.  comment out for actual use:
//window.onload = MakeStarfield(false, 400, 500, 400, 2, 10000);


/* ******************************************************************************************************
 * Function MakeStarfield(bCreateNew, numStars, width, height, starSize, maxTime, colorSaturation, brightness)
 * 
 * Description:  creates a canvas and populates with an animated, colored (depending on colorSaturation) starfield.
 * when finished running, leaves a canvas of id = WarpStarfield on the page (appended to the body element) with the stars showing
 * in their various positions and distances at time of stop.
 * IF bCreateNew == false, then this function assumes a canvas element of Id = "WarpStarfield" has already been defined on the page.  
 * POSITIONING:  Position of the canvas element MUST be done via a css file or style statement on the page. Nothing else works at this time.
 * This animation will use significant CPU time while it is running. Smaller canvas sizes, and smaller
 * number of stars will lessen the CPU % use.
 * 
 * Arguments:
 * Required:
 * bMakeNew:  true if you want the function to create a new canvas false to use an existing canvas If using existing canvas
 *            it's HTML page id MUST be "WarpStarfield"
 * numStars:  the number of stars to be used in the starfield
 * brightness:  the actual brightness of the stars.
 * width: the width of the canvas to use for the starfield
 * height:  the height of the canvas to use for the starfield
 * starSize:  The radius size to use for the stars when they are at min distance from the viewer.
 * maxTime: the time for the animation to run in miliseconds. A 0 will result in an infinite loop
 * 
 * Optional:
 * colorSaturation:  from 1 to 100 amount of color to be included in stars
 * brightness:  from 1 to 100 how bright should the stars be at closest approach.
 *
 * 
 * *************************************************************************************************************************
*/

function MakeStarfield(bMakeNew, numStars, width, height, starSize, maxTime, colorSaturation, brightness) {


    const MAX_DEPTH = 40;
    const MAX_SPACING = 50;
    const MIN_SPACING = -50;
    const MAX_RUN_TIME = maxTime;  // in mili seconds

    // Global variables for when it runs.
    let startTime = new Date();
    let loopIntervalVar = "";



    // to get viewport dims minus scroll bars: 
    // document.documentElement.clientWidth and.clientHeight

    let canvas, ctx;
    let stars = new Array(numStars);
    let screenWidth = width;
    let screenHeight = height;
    let colorSat = colorSaturation;
    let maxBrightness = brightness;

    console.log("screenWidth: " + width + "  screenHeight: " + height);

    // insure we have some color and brightness.
    if (!colorSat) {
        colorSat = 20;
    }

    if (!maxBrightness) {
        maxBrightness = 100;
    }


    // check if we are making a new canvas element.
    if (bMakeNew) {

        // NOTE, there is NO good way to position any canvas element except through an actual
        // css file.  I'm not sure if this is an implimentation error on the browser part or a
        // missing piece of the standard.  Even setting the attributes for top and left on the 
        // fly don't work.  SO, MUST assume the user has set up their css file correctly.
        // Current date and time of this note:  March 18, 2019.

        canvas = document.createElement("canvas");
        canvas.setAttribute("width", screenWidth.toString());
        canvas.setAttribute("height", screenHeight.toString());
        canvas.setAttribute("id", "WarpStarfield");

        console.log("Made new canvas: " + canvas);

        // append canvas object to body
        document.body.appendChild(canvas);

    }// end if make new canvas
    else {
        // use existing canvas that should have id: WarpStarfield
        canvas = document.getElementById("WarpStarfield");
        console.log("getting existing canvas: " + canvas );
    }// end else not creating a new canvas.

    if (canvas && canvas.getContext) {

        console.log("In main if to init and start loop going.");

        ctx = canvas.getContext("2d");
        initStars();
        loopIntervalVar = setInterval(loop, 40);
    }

    //************************************************************************************************
    //************************ END MAIN GLOBAL STUFF *************************************************
    //************************************************************************************************



    //--------------------------------------------------------------------
    // randomRange:  Returns a random number in the range [minVal,maxVal] 
    //--------------------------------------------------------------------
    function randomRange(minVal, maxVal) {
        return Math.floor(Math.random() * (maxVal - minVal - 1)) + minVal;
    }


    //--------------------------------------------------------------------
    // initStars:  
    // initializes the stars array including color
    //--------------------------------------------------------------------
    function initStars() {
        for (var i = 0; i < stars.length; i++) {
            stars[i] = {
                x: randomRange(-50, 50),
                y: randomRange(-50, 50),
                z: randomRange(1, MAX_DEPTH),
                color: (Math.random() * 360)
            }

            // adjust color to not include greens
            while ((stars[i].color < 210 && stars[i].color > 60) || (stars[i].color < 310 && stars[i].color > 260)) {
                // keep getting new color if still in green  or purple range.
                stars[i].color = (Math.random() * 360);
            }// end while
        }
    }// end initStars


    //--------------------------------------------------------------------
    // fillCircle:
    // creates and fills a circle at the give coordinates with the 
    // currently existing fill style (color etc).
    //--------------------------------------------------------------------
    function fillCircle(x, y, r) {
        // context.arc(x, y, r, sAngle, eAngle, counterclockwise);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();
    }


    //--------------------------------------------------------------------
    // loop:
    // loops through the stars array, calculating new distance from viewer
    // and then new perspective coordinates and redisplays them.
    // Continuous loop until max run time is reached.
    //--------------------------------------------------------------------
    function loop() {

        // check run time:
        let currentTime = new Date();
        if (MAX_RUN_TIME < (currentTime - startTime)) {
            // hit max time.  shut it down.
            clearInterval(loopIntervalVar);
        }

        var halfWidth = canvas.width / 2;
        var halfHeight = canvas.height / 2;

        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < stars.length; i++) {
            stars[i].z -= 0.5;

            if (stars[i].z <= 0) {
                stars[i].x = randomRange(-50, 50);
                stars[i].y = randomRange(-50, 50);
                stars[i].z = MAX_DEPTH;
            }


            var k = 128.0 / stars[i].z;
            var px = stars[i].x * k + halfWidth;
            var py = stars[i].y * k + halfHeight;

            if (px >= 0 && px <= screenWidth && py >= 0 && py <= screenHeight) {
                var size = (1 - stars[i].z / 40.0) * starSize;

                // here we want to calculate the number for the satuation (0 to 100% and lightness (0 to 50%) to be based on from distance.
                var relativeFactor = (1 - stars[i].z / 40.0);

                //console.log(size);
                //console.log('hsl(' + stars[i].color + ', ' + (dimness * 100) + '%, ' + (dimness * 50) + '%)');

                ctx.fillStyle = 'hsl(' + stars[i].color + ', ' + (relativeFactor * colorSat) + '%, ' + (relativeFactor * maxBrightness) + '%)'; //"rgb(" + shade + "," + shade + "," + shade + ")";
                fillCircle(px, py, size);

                //ctx.fillRect(px, py, size, size);
            }// end if px >=0 etc.
        }// end for i
    }// end function loop


}// end wrapper function MakeStarField