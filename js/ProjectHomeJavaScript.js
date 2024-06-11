// JavaScript source code



const HOME_AUDIO = document.querySelector("#HomeAudioButton");
let myAudio = document.querySelector("#MainAudio");
let bAudioOn = false;
let bAudioFirstRun = true;
let bButtonFocus = false;


// animation accompanyment
let myTL1 = new TimelineMax();
let myTL2 = new TimelineMax();
let myTL3 = new TimelineMax();


console.log("button is: " + HOME_AUDIO);

/////////////////////////////////////////////////////////////////////////////////////////
// preload images method.  Requires the creation of new "images"
// and assigning the image objects the source of the image you want to preload.
// Unfortunately, it appears you can't use these image object.src in code below to 
// assign to an existing page element.  Have to use the url with the same path.
let ImagesToPreload = [];
ImagesToPreload[0] = new Image();
ImagesToPreload[0].src = "Images/USSEnterpriseFixed.png";
ImagesToPreload[1] = new Image();
ImagesToPreload[1].src = "Images/EnterpriseLeaving.png";
ImagesToPreload[1] = new Image();
ImagesToPreload[1].src = "Images/OrionNebula_cropped_1400.png";
//////////////////////////////////////////////////////////////////////////////////////////



// add event listeners
HOME_AUDIO.addEventListener("click", ToggleHomeAudio, false);
HOME_AUDIO.addEventListener("focus", ToggleButtonBorder, false);
HOME_AUDIO.addEventListener("blur", ToggleButtonBorder, false);
myAudio.addEventListener("ended", ResetAudio, false);

//FIRE_BTN.addEventListener("click", fireTorpedoHandler, false)
//window.addEventListener("keydown", keydownHandler, false);



function ToggleHomeAudio() {

    console.log("in Toggle");

    if (!bAudioOn) {
        // turning audio on.
        if (bAudioFirstRun) {
            myAudio.currentTime = 0;   // sets it to start at beginning of sound track.
            myAudio.volume = 0.5;
            myAudio.play();


            myTL1.delay(10.0)
                .to('#myHeader', 2.0, { opacity: 0, scale: 0.01, rotation: 720, ease: Power0.easeNone })
                .to('#HomeMainText', 2.0, { opacity: 0, scale: 0.01, ease: Power0.easeNone }, "-=2.0")

                //Enter the USS Enterprise!
                //first make the ship and warp star displayable, then reset start locations for ship and warpstar incase this is not the first time through.
                .to('#Enterprise', 0.01, { display: "initial", ease: Power0.easeNone })
                .to('#WarpStar', 0.01, { display: "initial", ease: Power0.easeNone })
                .to('#Enterprise', 0.01, { scale: 0.001, backgroundImage: "url('Images/USSEnterpriseFixed.png')", top: 100, left: 0, ease: Power0.easeNone })
                .to('#WarpStar', 0.01, { scale: 0.01, top: 240, left: 275, ease: Power0.easeNone })
                .to('#WarpStar', 0.5, { opacity: 1, scale: 0.5, rotation: 360, ease: Power0.easeNone })
                .to('#Enterprise', 0.01, { opacity: 1, scale: 0.001, ease: Power0.easeNone })
                .to('#WarpStar', 0.5, { opacity: 0, scale: 0.01, rotation: -360, ease: Power0.easeNone })
                .to('#Enterprise', 12.0, { scale: 1, top: 200, left: 50, ease: Power0.easeNone }, '-=0.3')
                //.to('#Enterprise', 0.01, { backgroundImage: Enterprise[1].src, ease: Power0.easeNone }) this didn't work.
                .to('#Enterprise', 0.01, { backgroundImage: "url('Images/EnterpriseLeaving.png')", ease: Power0.easeNone })
                .to('#Enterprise', 12.0, { scale: 0.01, top: 300, left: 650, ease: Power0.easeNone })
                .to('#Enterprise', 0.01, { opacity: 0, display: "none", ease: Power0.easeNone })
                .to('#WarpStar', 0.01, { top: 440, left: 925, ease: Power0.easeNone })
                .to('#WarpStar', 0.01, { opacity: 1, scale: 0.01, ease: Power0.easeNone })
                .to('#WarpStar', 0.5, { scale: 0.5, rotation: 360, ease: Power0.easeNone })
                .to('#WarpStar', 0.5, { opacity: 0, rotation: -360, scale: 0.01, ease: Power0.easeNone })


                // start starfield fadein right as the warp star is fading out. Current total time for above: 38.08 - 1.3 = 36.78
                .call(MakeStarfield, [false, 400, 800, 500, 2, 10000, 50, 100], this, '-=0.0')
                .to('html', 0.1, { backgroundImage: "none", ease: Power0.easeNone }, '-=0.25')
                .to('#WarpStarfield', 0.5, { opacity: 1, ease: Power0.easeNone });
                //.call(MakeStarfield, [false, 400, 800, 500, 2, 10000, 50, 100], this, '-=1.25');
               

            // ok, end starfield and do rest of animation: have to delay for all the above: 
            myTL2.delay(44.0)
                .to('#WarpStar', 0.01, { top: 350, left: 550, ease: Power0.easeNone })
                .to('#WarpStar', 0.01, { opacity: 1, scale: 0.01, ease: Power0.easeNone })
                .to('#WarpStarfield', 1.0, { opacity: 0, ease: Power0.easeNone })
                //.to('#WarpStarfield', 0.01, { display: "none", ease: Power0.easeNone })
                .to('#WarpStar', 1.0, { scale: 18, rotation: 720, ease: Power0.easeNone }, "-=0.5")
                .to('html', 0.1, { backgroundColor: "white", ease: Power0.easeNone })
                .to('#WarpStar', 0.1, { opacity: 0, scale: 0.01, ease: Power0.easeNone })
                //.to('#WarpStar', 0.1, { display: "none", ease: Power0.easeNone })
                .to('html', 0.01, { backgroundColor: "black", ease: Power0.easeNone })
                .to('#DeepSpace9', 0.01, { display: "initial", top: 80, left: 120, ease: Power0.easeNone })
                .to('#DeepSpace9', 0.01, { scale: 0.001, backgroundImage: "url('Images/DS9MessyTrans.png')", ease: Power0.easeNone })
                .to('#DeepSpace9', 3.0, { opacity: 1, scale: 1, ease: Power0.easeNone })
                .to('#DeepSpace9', 3.0, { scale: 1.01, ease: Power0.easeNone })

                // Create sun..
                .to('#SunInSpace', 0.01, { display: "initial", ease: Power0.easeNone })
                .to('#SunInSpace', 0.01, { opacity: 1, scale: 0.05, ease: Power0.easeNone })


                // start turn to left
                .to('#DeepSpace9', 5.0, { left: 1500, ease: Power0.easeNone })
                .to('#SunInSpace', 5.0, { left: 300, ease: Power0.easeNone }, '-=5.0')

                // Advance toward sun
                .to('#SunInSpace', 3.0, { scale: 0.5, ease: Power0.easeNone })
                .to('#DeepSpace9', 0.01, { opacity: 0, ease: Power0.easeNone })
                .to('#SunInSpace', 1.0, { scale: 3.0, ease: Power0.easeNone })
                .to('#SunInSpace', 0.7, { top: 500, left: 1200, ease: Power0.easeNone }, '-=0.25')

                // next warp sequence;  going back to nebula
                //.to('#WarpStar', 0.1, { display: "initial", ease: Power0.easeNone })
                .to('#WarpStar', 0.01, { opacity: 1, ease: Power0.easeNone })
                .to('#WarpStar', 1.0, { scale: 18, rotation: -720, ease: Power0.easeNone }, "-=0.5")

                // make sun disapear in the whiteness and reset ships, ds9 and sun to starting positions.
                .to('#SunInSpace', 0.1, { opacity: 0, ease: Power0.easeNone }, "-= 0.75")
                .to('html', 0.1, { backgroundColor: "white", ease: Power0.easeNone })
                .to('#SunInSpace', 0.01, { scale: 1.0, top: 100, left: -1000, display: "none", ease: Power0.easeNone })
                .to('#DeepSpace9', 0.01, { scale: 1.0, top: 100, left: 100, display: "none", ease: Power0.easeNone })
                .to('#Enterprise', 0.01, { scale: 1.0, top: 125, left: 0, display: "none", ease: Power0.easeNone })



               
                .to('#WarpStar', 0.1, { opacity: 0, scale: 0.01, ease: Power0.easeNone })
                //.to('#WarpStar', 0.1, { display: "none", ease: Power0.easeNone })
                .to('html', 0.01, { backgroundColor: "black", ease: Power0.easeNone })
                //.to('#WarpStarfield', 0.01, { display: "initial", ease: Power0.easeNone })
                .to('#WarpStarfield', 0.1, { opacity: 1, ease: Power0.easeNone })
                .call(MakeStarfield, [false, 400, 800, 500, 2, 10000, 50, 100], this, '-=1.0');
                //.to('#WarpStarfield', 2.0, { rotation: 720, ease: Power0.easeNone });

            // due to call to makestarfield, need new timeline here.
            myTL3.delay(70)
                .to('#WarpStar', 0.01, { top: 350, left: 550, ease: Power0.easeNone })
                .to('#WarpStar', 0.01, { opacity: 1, scale: 0.001, ease: Power0.easeNone })
                .to('#WarpStarfield', 1.0, { opacity: 0, ease: Power0.easeNone })
                //.to('#WarpStarfield', 0.01, { display: "none", ease: Power0.easeNone })
                .to('#WarpStar', 1.0, { scale: 18, rotation: 720, ease: Power0.easeNone }, "-=0.5")
                .to('html', 0.1, { backgroundColor: "white", ease: Power0.easeNone })
                .to('#WarpStar', 0.1, { opacity: 0, scale: 0.01, ease: Power0.easeNone })
                //.to('#WarpStar', 0.1, { display: "none", ease: Power0.easeNone })

                // bring in endOrion pic on a black screen.
                .to('#EndOrion', 0.01, { display: "initial", ease: Power0.easeNone })
                .to('#EndOrion', 0.01, { scale: 0.001, ease: Power0.easeNone })
                .to('html', 0.1, { backgroundColor: "black", ease: Power0.easeNone })
               
                .to('#EndOrion', 3.0, { opacity: 1, scale: 1.0, ease: Power0.easeNone })
                .to('#EndOrion', 0.5, { opacity: 0, scale: 1.2, ease: Power0.easeNone })
                // now switch to real background etc.
                .to('html', 0.1, { backgroundImage: "url('Images/OrionNebula_cropped_1400.jpg')", ease: Power0.easeNone }, "-=0.25")

                .to('#EndOrion', 0.01, { display: "none", ease: Power0.easeNone })

                // bring back header and text.
                .to('#myHeader', 1.0, { opacity: 1, scale: 1.0, rotation: 360, ease: Power0.easeNone })
                .to('#HomeMainText', 1.0, { opacity: 1, scale: 1.0, ease: Power0.easeNone }, "-=1.0");



            bAudioFirstRun = false;
        }
        else {
            // not first run. don't redisplay animation.
            if (myAudio.ended) {
                myAudio.currentTime = 0;   // sets it to start at beginning of sound track.
                myAudio.volume = 0.5;
            }
            myAudio.play();
        }
        console.log("src = " + myAudio.src);
        bAudioOn = true;
        HOME_AUDIO.textContent = "Audio Off";

    }
    else {
        // turning audio off.
        myAudio.pause();    // pauses Audio
        bAudioOn = false;
        HOME_AUDIO.textContent = "Audio On";
    }


}// end ToggleHomeAudio


function ToggleButtonBorder() {
// make border green if we have focus
    if (!bButtonFocus) {
        // did not have focus but will now.
        // set button border to green. 
        console.log("in toggle to aqua");
        HOME_AUDIO.style.borderColor = 'aqua';
        bButtonFocus = true;
    }
    else {
        console.log("in toggle to normal");
        HOME_AUDIO.style.borderColor = '';
        bButtonFocus = false;
    }

}// end toggle button border


function ResetAudio() {
// audio has ended.  reset button state and bAudioFirstRun
// so we can do it all, including animation, again..
    myAudio.currentTime = 0;   // sets it to start at beginning of sound track.
    myAudio.volume = 0.5;
    bAudioFirstRun = true;
    bAudioOn = false;
    HOME_AUDIO.textContent = "Audio On";
}


/* I can't get on the fly to have both mp3 and ogg .  So defaulting to audio tags on the html page version
// set up audio
let myAudio = document.createElement("audio");
myAudio.src = photon;
*/

//let myAudio = document.querySelector("#TorpSound");
//myAudio.currentTime = 0;   // sets it to start at beginning of sound track.
//console.log("src = " + myAudio.src);
//myAudio.volume = 0.5;
//myAudio.play();


//var myTL1 = new TimelineMax({ onRepeat: AudioReset, repeat: -1 });

//myTL1.to('#Enterprise', 5.0, { opacity: 1, width: 300, height 250, top: 400, left: 200, ease: Power0.easeNone })
//    .to('#Enterprise', 0.1, { src: "images/USS_Enterprise_Leaving.jpg", top: 400, left: 200, ease: Power0.easeNone })
//    .to('#Enterprise', 5.0, { opacity: 0, width: 4, height 4, top: 200, left: 400, ease: Power0.easeNone })
//    ; // end timeline

