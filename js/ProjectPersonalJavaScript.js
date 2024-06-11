// JavaScript source code


/* *********************************************************************************************
 * ***********************  Space Slide Show related *******************************************
*/

//-----------------------------------------
//----- Global Image Array with captions

// NOTE: for arrays.  [ [], [] ] is an array whose first index only goes to 1 (0, 1) and the second index 
// can go as far as desired.  ie a 2 by infinite array.  a [[], [], []] creates a 3 by infinite and so on.
// a [ [ [], [] ] ] creates a 1 by 2 by infinte...  similarly [ [ [], [] ], [ [], [] ] ] creates a 2 by 2 by infinte.


// we need an array of 5 slides with 5 captions.  so a 5 by infinite will work fine.

const G_MainSlideArray = [[], [], [], [], []];

const G_MainSlide = document.getElementById("SpaceMainSlide");
const G_MainCaption = document.getElementById("SpaceMainCaption");

const G_MaxIndex = 4;  // 5 slides only, 0 - 4. 
let G_SlideNum = 0;  // slide index tracker


let G_IntervalTimer = ""; // this will be the interval timer variable when it is set.

const G_WaitTime = 6000;  // time between slides in milliseconds  NOTE:  make sure this matches fade time!

// set up variable for buttons:
let BtnPrevious = document.getElementById("SpacePrevBtn");
let BtnNext = document.getElementById("SpaceNextBtn");
let BtnResStop = document.getElementById("SpaceStopResume");

// disable buttons for now:
// make sure buttons are non operational till we enable in init function
// to avoid problems during load.
//BtnPrevious.disabled = true;
//BtnPrevious.hidden = true;
//BtnNext.disabled = true;
//BtnNext.hidden = true;
//BtnResStop.disabled = true;
//BtnResStop.hidden = true;


// add event listeners for them:
BtnPrevious.addEventListener("click", previousHit, false);
BtnNext.addEventListener("click", nextHit, false);
BtnResStop.addEventListener("click", ResStopHit, false);


// load main array with images and captions  second index 0 is the image,
// second index 1 is the caption.
G_MainSlideArray[0][0] = "Images/Space/TitanIVLauchB.jpg";
G_MainSlideArray[0][1] = "A Helicopter view of a Titan IV Launch";
G_MainSlideArray[1][0] = "Images/Space/TitanIVLaunchA.jpg";
G_MainSlideArray[1][1] = "Ground View of Titan IV Launch";
G_MainSlideArray[2][0] = "Images/Space/SpaceShuttle1.jpg";
G_MainSlideArray[2][1] = "Shuttle on the Pad Looking Good";
G_MainSlideArray[3][0] = "Images/Space/SpaceShuttleLaunch1.jpg";
G_MainSlideArray[3][1] = "Shuttle Launch";
G_MainSlideArray[4][0] = "Images/Space/DSPSatellite.jpg";
G_MainSlideArray[4][1] = "The DSP Satellite";



///////////////////////////////////////////////////////////////////////////////



/* *****************************************************************************
 * ************** Main Page Audio Set up ***************************************
 * *****************************************************************************
 */


const HOME_AUDIO = document.querySelector("#PersonalHomeAudioButton");

let bAudioOn = false;
let bAudioFirstRun = true;
let bButtonFocus = false;
let currentSong = "";

// Song play list:
let MyPlayList = [];

// will be our audio object
let myAudio = document.createElement("audio");

// animation accompanyment
//var myTL1 = new TimelineMax();

console.log("button is: " + HOME_AUDIO);

// add event listeners
HOME_AUDIO.addEventListener("click", ToggleHomeAudio, false);
HOME_AUDIO.addEventListener("focus", ToggleButtonBorder, false);
HOME_AUDIO.addEventListener("blur", ToggleButtonBorder, false);
myAudio.addEventListener("ended", ResetAudio, false);

// window event to call init function
window.addEventListener("load", Init, false);


/* *****************************************************************************
 * ************** Space X Launch Video Set up **********************************
 * *****************************************************************************
 */

let bLaunchPlaying = false;
let myLaunchVideo = document.querySelector("#SpaceXLaunch");
myLaunchVideo.addEventListener("click", GoLaunch, false);



/* ******************************************************
 * init:
 * sets up the main image, enables the buttons, and starts the show.
 * ******************************************************* */
function Init() {

    console.log("in init function");
    //----------------------------------------------------------------------------------------------
    // NOTE:  on slower connections, image loading time is causing a stutter effect first time through..
    // sooooo, trying something here to eliminate that. Kind of a preload effort for the images:
    //-----------------------------------------------------------------------------------------
    G_MainSlide.setAttribute("class", "");  // eliminate the animation for the main slide.. 
    G_MainSlide.style.opacity = 0; // insure it can't be seen.

    // Attempt to load all images into main slide so the browser will have them available during main run.
    let i = 0;
    for (i = 0; i <= G_MaxIndex; i++) {
        G_MainSlide.setAttribute("src", G_MainSlideArray[i][0]);
    }

    // --------------------------------------------------------------------------------------
    // At this point, we have hopefully forced the load of the images without showing them...
    //-----------------------------------------------------------------------------------------


    // set up for static showing to start:
    G_MainSlide.setAttribute("class", "");
    G_MainSlide.style.opacity = 1;
    G_MainCaption.setAttribute("class", "");
    G_MainCaption.style.opacity = 1;

    // logs.
    console.log("main slide var:");
    console.log(G_MainSlide);
    console.log(G_MainCaption);

    // make sure buttons are visable and operational
    BtnPrevious.disabled = false;
    BtnPrevious.hidden = false;
    BtnNext.disabled = false;
    BtnNext.hidden = false;
    BtnResStop.disabled = false;
    BtnResStop.hidden = false;


    // set starting slide number
    G_SlideNum = 0;

    // finally, show the 1st slide and caption.
    ShowCurrentSlide();

    //////////////////////////////////////////////////////
    // init play list and set up song counter
    //myAudio = document.createElement("audio");

    myAudio.setAttribute("type", "audio/mpeg");

    MyPlayList[0] = "Audio/Star_Trek_2009_Original_Theme_720p.mp3";
    MyPlayList[1] = "Audio/David_Bowie_Space_Oddity_Lyrics.mp3";
    MyPlayList[2] = "Audio/The_Ballad_of_Serenity_ECV3.mp3";
    MyPlayList[3] = "Audio/The_Expanse_Intro_Song.mp3";
    MyPlayList[4] = "Audio/Serenity_Main_Theme.mp3";
    MyPlayList[5] = "Audio/Mals_Song_by_Vixy_and_Tony_Lyrics.mp3";
    MyPlayList[6] = "Audio/The_Beatles_Yellow_Submarine.mp3";
    //MyPlayList[7] = "Audio/The_Beatles_Yellow_Submarine.mp3";

    myAudio.setAttribute("src", MyPlayList[3]);
    currentSong = 3;
}// end init


/* ******************************************************
 * ToggleHomeAudio:
 * toggles Audio button on or off and stops or resumes Audio.
 * ******************************************************* */
function ToggleHomeAudio() {

    console.log("in Toggle");

    if (!bAudioOn) {
        // turning audio on.
        if (bAudioFirstRun) {
            myAudio.currentTime = 0;   // sets it to start at beginning of sound track.
            myAudio.volume = 0.5;
            myAudio.play();

            // Enter the USS Enterprise!
            // reset start locations for ship and warpstar incase this is not the first time through.
            //myTL1.to('#Enterprise', 10, { scale: 0.001, backgroundImage: "url('Images/USSEnterpriseFixed.png')", top: 100, left: 0, ease: Power0.easeNone })
            //    .to('#WarpStar', 0.01, { scale: 0.01, top: 240, left: 275, ease: Power0.easeNone })
            //    .to('#WarpStar', 0.5, { opacity: 1, scale: 0.5, rotation: 360, ease: Power0.easeNone })
            //    .to('#Enterprise', 0.01, { opacity: 1, scale: 0.001, ease: Power0.easeNone })
            //    .to('#WarpStar', 0.5, { opacity: 0, scale: 0.01, rotation: -360, ease: Power0.easeNone })
            //    .to('#Enterprise', 12.0, { scale: 1, top: 200, left: 50, ease: Power0.easeNone }, '-=0.3')
            //    .to('#Enterprise', 0.01, { backgroundImage: "url('Images/EnterpriseLeaving.png')", ease: Power0.easeNone })
            //    .to('#Enterprise', 12.0, { scale: 0.01, top: 300, left: 650, ease: Power0.easeNone })
            //    .to('#Enterprise', 0.01, { opacity: 0, ease: Power0.easeNone })
            //    .to('#WarpStar', 0.01, { top: 440, left: 925, ease: Power0.easeNone })
            //    .to('#WarpStar', 0.01, { opacity: 1, scale: 0.01, ease: Power0.easeNone })
            //    .to('#WarpStar', 0.5, { scale: 0.5, rotation: 360, ease: Power0.easeNone })
            //    .to('#WarpStar', 0.5, { opacity: 0, rotation: -360, scale: 0.01, ease: Power0.easeNone });

            bAudioFirstRun = false;
        }
        else {
            // not first run. don't redisplay animation.
            if (myAudio.ended) {
                console.log("song ended. trying to do next one.");
                console.log("current Song: " + currentSong);

                // increment song counter
                if (currentSong < (MyPlayList.length - 1)) {
                    currentSong += 1;
                    console.log("New Song: " + currentSong);
                }
                else {
                    currentSong = 0;
                }

                // set new song from playlist
                myAudio.setAttribute("src", MyPlayList[currentSong]);

                myAudio.currentTime = 0;   // sets it to start at beginning of sound track.
                myAudio.volume = 0.5;
            }
            myAudio.play();
        }
        console.log("src = " + myAudio.src);
        bAudioOn = true;
        HOME_AUDIO.textContent = "Play List Off";

        console.log("turned audio on.");

    }
    else {
        // turning audio off.
        myAudio.pause();    // pauses Audio
        bAudioOn = false;
        HOME_AUDIO.textContent = "Play List On";
        console.log("turned audio off.");
    }


}// end ToggleHomeAudio



/* ******************************************************
 * ToggleButtonBorder:
 * toggles Audio button border to indicate focus. 
 * ******************************************************* */
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



/* ******************************************************
 * ResetAudio:
 * Resets Audio: called by system in response to the user
 * hitting the stop button or if the current song ended.
 * Will either insure Stop or start new song.
 * ******************************************************* */
function ResetAudio() {
    // if we are here and bAudioOn == false then the user elected to pause the song
    // which tripped the event that called us. In such a case, Dont turn it back on!
    console.log("hit reset. bAudioON: " + bAudioOn);

    if (!bAudioOn) {
        // Set audio state to off.
        myAudio.volume = 0.5;
        bAudioFirstRun = true;
        bAudioOn = false;
        HOME_AUDIO.textContent = "Play List On";
    }
    else {
        // current song ended.  set up the next one. 
        // increment song counter
        if (currentSong < (MyPlayList.length - 1)) {
            currentSong += 1;
        }
        else {
            currentSong = 0;
        }

        console.log("currentSong Number: " + currentSong);

        // set new song from playlist
        myAudio.setAttribute("src", MyPlayList[currentSong]);

        myAudio.currentTime = 0;   // sets it to start at beginning of sound track.
        myAudio.volume = 0.5;
        myAudio.play();
    }// end else switch to new song

} // end Reset



/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////



/* ******************************************************
 * ShowCurrentSlide()
 * Shows the current slide with caption.
 * ******************************************************* */
function ShowCurrentSlide() {
    // logs
    console.log("in show slide.  current slide num: " + G_SlideNum);
    console.log(G_MainSlide.getAttribute("src"));
    console.log(G_MainSlide.innerHTML);

    // set up slide souce and caption which will force the change on the screen.
    G_MainSlide.setAttribute("src", G_MainSlideArray[G_SlideNum][0]);
    G_MainCaption.innerHTML = G_MainSlideArray[G_SlideNum][1];

    // if in slideshow running mode, then increment the slide for the next round.
    let buttonState = BtnResStop.getAttribute("data-State");
    if (buttonState === "Stop") {
        // currently running.
        // increment the slide counter and go around end if needed
        G_SlideNum += 1;
        if (G_SlideNum > G_MaxIndex) {
            G_SlideNum = 0;
        }
    }// end if

}// end ShowCurrentSlide




/* ******************************************************
 * ClearTimer()
 * Called to clear the timer.   
 * ******************************************************* */
function ClearTimer() {

    console.log("in ClearTimer");
    clearInterval(G_IntervalTimer);

}// end ClearTimer


// -------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//-------------------  HANDLERS -----------------------------------------------
//---------------------------------------------------------------------------------


/* ******************************************************
 * previousHit()
 * previous button was hit. 
 * ******************************************************* */
function previousHit() {

    // if in slideshow running mode, then the slide counter has already been incremented.
    // first stop the show via the button handler so button text and data will be reset.
    // then decrement once to get to correct start slide number then proceed as normal.

    let buttonState = BtnResStop.getAttribute("data-State");
    if (buttonState === "Stop") {
        // currently running.  call stop handler
        ResStopHit();
    }// end if button state == stop

    // now proceed normally:

    // decrement slide number and go around the end if needed.
    G_SlideNum -= 1;
    if (G_SlideNum < 0) {
        G_SlideNum = G_MaxIndex;
    }

    ShowCurrentSlide();

}// end previousHit



/* ******************************************************
 * nextHit()
 * Next button was hit. 
 * ******************************************************* */
function nextHit() {

    // if in slideshow running mode, then the slide counter has already been incremented.
    // first stop the show via the button handler so button text and data will be reset.
    // then decrement once to get to correct start slide number then proceed as normal.

    let buttonState = BtnResStop.getAttribute("data-State");
    if (buttonState === "Stop") {
        // currently running.  call stop handler
        ResStopHit();
    }// end if button state == stop

    // now proceed normally:

    // increment slide number and go around the end if needed.
    G_SlideNum += 1;
    if (G_SlideNum > G_MaxIndex) {
        G_SlideNum = 0;
    }

    ShowCurrentSlide();

}// end nextHit



/* ******************************************************
 * ResStopHit()
 * Resume / Stop button was hit. 
 * ******************************************************* */
function ResStopHit() {
    // check data state of button.  switch based on that.  
    // will either stop or start timer.  

    let buttonState = BtnResStop.getAttribute("data-State");

    switch (buttonState) {

        case "Stop":
            // stop the show and change button text to resume.
            // also stop the animation by clearing the class for the image and caption.
            // then make sure their opacity is 1.
            ClearTimer();
            BtnResStop.setAttribute("data-State", "Resume");
            BtnResStop.innerHTML = "Resume Show";
            G_MainSlide.setAttribute("class", "");
            G_MainSlide.style.opacity = 1;
            G_MainCaption.setAttribute("class", "");
            G_MainCaption.style.opacity = 1;


            console.log("in resStop, case Stop: Before decrement, Current slide: " + G_SlideNum);

            // since we were running and thus ShowCurrentSlide auto increments the current slide number,
            // reset slide number to current one being shown so next and previous button handlers work.
            G_SlideNum -= 1;
            if (G_SlideNum < 0) {
                G_SlideNum = G_MaxIndex;
            }

            console.log(" case Stop: After Decrement, slide Number is: " + G_SlideNum);
            break;

        case "Resume":
            // restart show and change button text to stop.
            // increment slide number and go around the end if needed.
            // reset animation to work by resetting the class and opacity.

            // slide number is current slide, so increment so we start show 
            // with next slide.

            console.log("in resStop, case Resume: Before increment, Current slide: " + G_SlideNum);

            // once...
            G_SlideNum += 1;
            if (G_SlideNum > G_MaxIndex) {
                G_SlideNum = 0;
            }
            console.log(" case Resume: After increment, slide Number is: " + G_SlideNum);

            G_MainSlide.setAttribute("class", "myfading");
            G_MainSlide.style.opacity = "";
            G_MainCaption.setAttribute("class", "myfading");
            G_MainCaption.style.opacity = "";

            console.log("case Resume: calling setInterval with slide Number: " + G_SlideNum);

            G_IntervalTimer = setInterval(ShowCurrentSlide, G_WaitTime);
            BtnResStop.setAttribute("data-State", "Stop");
            BtnResStop.innerHTML = "Stop Show";

            console.log("case Resume: calling ShowCurrentSlide with slide Number: " + G_SlideNum);
            ShowCurrentSlide(); // showing next slide so I don't wait for interval showing the same slide.
            break;

    }// end switch


}// end ResStopHit



/* ******************************************************
 * GoLaunch:
 * starts / stops video
 * ******************************************************* */
function GoLaunch() {

    if (myLaunchVideo.ended) {
        // video ended.  so reset play indicator
        bLaunchPlaying = false;
    }


    if (!bLaunchPlaying) {
        // start video
        myLaunchVideo.play();
        bLaunchPlaying = true;
    }
    else {
        myLaunchVideo.pause();
        bLaunchPlaying = false;
    }
    
   

}// end GoLaunch