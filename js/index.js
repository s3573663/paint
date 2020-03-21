// DIG24 Assignment 3, by Aaron Bramich, Curtin Student #19366050

// centers body element vertically in window
function fit_screen() {
    "use strict";
    
    // top margin offset value
    var margin_height;
    
    if (window.innerHeight > 750) {
        margin_height = (window.innerHeight - 750) / 2;
    } else {
        margin_height = 0;
    }
    
    document.body.style.marginTop = margin_height + "px";
    document.body.style.marginBottom = margin_height + "px";
    
    document.getElementById("hide").style.display = "none";
}

// fade 3 elements then navigate to link address
function fade_load(link, delay, fade_id1, fade_id2, fade_id3) {
    "use strict";
    
    document.getElementById(fade_id1).style.opacity = 0;
    document.getElementById(fade_id2).style.opacity = 0;
    document.getElementById(fade_id3).style.opacity = 0;
    
    setTimeout(function () {
        window.location.href = link;
    }, delay);
}

// menu buttons...
function go_to_paint() {
    "use strict";
    
    document.getElementById("select_icon").play();
    fade_load("1_paint.html", 1000, "title", "sketch", "play");
}

function go_to_sketch() {
    "use strict";
    
    document.getElementById("select_icon").play();
    fade_load("2_sketch.html", 1000, "title", "paint", "play");
}

function go_to_play() {
    "use strict";
    
    document.getElementById("select_icon").play();
    fade_load("3_play.html", 1000, "title", "paint", "sketch");
}