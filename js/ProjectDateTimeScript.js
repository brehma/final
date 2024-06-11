// JavaScript source code

// set up date and time in every page's footer section

// should be only one since we only have one of these per page...
let dateDisplayArray = document.getElementsByClassName("DateDisplay");

// update page date and time every second.
window.setInterval(function () {
    let currentDateTime = 0;

    currentDateTime = new Date();
    dateDisplayArray[0].innerHTML = currentDateTime;

    console.log("just did date time");
}, 1000);

