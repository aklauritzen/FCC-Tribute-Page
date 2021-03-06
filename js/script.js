
function init() {
    getData(); 
    
    // Keyboardarrows browse
    window.addEventListener("keydown", function (event) {
        switch (event.key) {
            case "Right":  // IE/Edge has specific value
            case "ArrowRight":                   
                updateClapboard("forward")
                break;
            case "Left": // IE/Edge has specific value
            case "ArrowLeft":                
                updateClapboard("backward")
                break;
            default:
                return;
        }

        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    }, true);

    // Listen on arrowclicks
    document.getElementById("leftArrow").onclick = function() {updateClapboard("backward")};
    document.getElementById("rightArrow").onclick = function() {updateClapboard("forward")};
   
}

let moviesObj = {};
function getData() {
    // JSON URL    
    let requestURL = 'json/movies.json'

    // Request object instance
    let request = new XMLHttpRequest();
    
    // Use HTTP GET at the request URL
    request.open('GET', requestURL);
    
    // Return JSON data and convert to JavaScript Object
    request.responseType = 'json';
    
    // Make the request
    request.send();
    
    // Wait for server to respond
    request.onload = function() {
        
        // Save responsdata in "movies"
        moviesObj = request.response;

        // Update clapboard
        updateClapboard("initial");
    }
}


let clapboardIndex = 0;
function updateClapboard(direction) {        
    
    // Update clapboard with initial value of 0
    if(direction == "initial") {
        clapboardIndex = 0;

        // Init numbers
        document.getElementById("duration-hh").innerHTML = "00";
        document.getElementById("duration-mm").innerHTML = "00";
        document.getElementById("duration-ss").innerHTML = "00";
        document.getElementById("duration-ms").innerHTML = "00";
    } else if(direction == "forward") { // Right arrow
        clapboardIndex++;

        // If reached length of movieObj, then reset clapboardIndex to 0
        if(clapboardIndex > moviesObj['movies'].length - 1) {
            clapboardIndex = 0;
        }
    } else if(direction == "backward") { // Left arrow
        clapboardIndex--;

        // If reached the first movie, then go to last movie in movieObj
        if(clapboardIndex < 0) {            
            clapboardIndex = moviesObj['movies'].length - 1;
        }
    }    
    
    // Splits "duration" into "02" "55" "24" "31"
    const duration = moviesObj['movies'][clapboardIndex]['duration'].split(" ")
    const hours = duration[0];
    const mins = duration[1];
    const secs = duration[2];
    const millisecs = duration[3];

    numberAnimation("duration-hh", hours, 0, 700); 
    numberAnimation("duration-mm", mins, 500, 100); 
    numberAnimation("duration-ss", secs, 1000, 75); 
    numberAnimation("duration-ms", millisecs, 1500, 75); 
    
    numberAnimation("fps", moviesObj['movies'][clapboardIndex]['fps'], 0, 100);    
    
    document.getElementById("movie-number").innerHTML = moviesObj['movies'][clapboardIndex]['movieNumber'];
    document.getElementById("ratings").innerHTML = moviesObj['movies'][clapboardIndex]['ratings'];    
    document.getElementById("title").innerHTML = moviesObj['movies'][clapboardIndex]['movieTitle'];
    document.getElementById("director").innerHTML = moviesObj['movies'][clapboardIndex]['director'];
    document.getElementById("photographer").innerHTML = moviesObj['movies'][clapboardIndex]['photographer'];
    document.getElementById("camera").innerHTML = moviesObj['movies'][clapboardIndex]['camera'];

    // Makes release date multiline
    const releaseDate = moviesObj['movies'][clapboardIndex]['releaseDate'].split("-");    
    document.getElementById("release-date").innerHTML = releaseDate[0] + "-" + releaseDate[1] + "<br>" + releaseDate[2];    
}

function numberAnimation(elementId, num, delay, animationDuration) {

    setTimeout(function() {
        for(let i = 0; i < num; i++) {
            setTimeout(function() {                
                document.getElementById(elementId).innerHTML = (i < 9) ? "0" + (i + 1) : (i + 1);// + timeVal;            
            }, animationDuration * i / 4)        
        }
    }, delay)    
}

document.addEventListener("DOMContentLoaded", init, false);