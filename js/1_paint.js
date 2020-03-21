// DIG24 Assignment 3, by Aaron Bramich, Curtin Student #19366050

// colour codes
var lblack =  "#323232";
var dblack =  "#000000";
var lwhite =  "#FDFEFD";
var dwhite =  "#F0F0F0";
var lblue =   "#00A8F3";
var dblue =   "#0000FF";
var lgreen =  "#7DEB7D";
var dgreen =  "#006400";
var lyellow = "#FFFF96";
var dyellow = "#FFFF00";
var lred =    "#FF5050";
var dred =    "#FF0000";
var lbrown =  "#AA8264";
var dbrown =  "#503228";
var lpurple = "#A000A0";
var dpurple = "#500050";
var lpink =   "#FFC8FF";
var dpink =   "#FF00FF";

// margin offset values
var top_margin_height;
var left_margin_width;

// selected colour code and name
var selected_colour = lblue;
var colour_name;

// current click/touch coordinates
var x_pos;
var y_pos;

// arrays for all coordinate and colour values
var mouse = false;
var mouse_x = [];
var mouse_y = [];
var mouse_drag = [];
var mouse_colour = [];

var i; // for loop index

// centers body element vertically in window and
// saves margin offset values as globals for use later.
function fit_screen() {
    "use strict";
    
    if (window.innerHeight > 750) {
        top_margin_height = (window.innerHeight - 750) / 2;
    } else {
        top_margin_height = 0;
    }
    
    if (window.innerWidth > 750) {
        left_margin_width = (window.innerWidth - 750) / 2;
    } else {
        left_margin_width = 0;
    }
    
    document.body.style.marginTop = top_margin_height + "px";
    document.body.style.marginBottom = top_margin_height + "px";
    
    document.getElementById("trash").style.opacity = 0.1;
    document.getElementById("trash").style.cursor = "default";
    
    document.getElementById("hide").style.display = "none";
}

// nav button functionality.
function go_to_index() {
    "use strict";
    
    window.location.href = "./index.html";
}

// helper function for select_colour() function
function set_colour(light, dark, sound) {
    "use strict";
    
    selected_colour = light;
    document.body.style.background = "radial-gradient(" +
        dark + ", " + light + ")";
    document.getElementById(sound).play();
}

// colour selection functionality - changes background colour and
// plays audio title of the colour chosen.
function select_colour(e, id) {
    "use strict";
    
    if (id === "img_black") {
        set_colour(lblack, dblack, "audio_black");
    } else if (id === "img_white") {
        set_colour(lwhite, dwhite, "audio_white");
    } else if (id === "img_brown") {
        set_colour(lbrown, dbrown, "audio_brown");
    } else if (id === "img_green") {
        set_colour(lgreen, dgreen, "audio_green");
    } else if (id === "img_blue") {
        set_colour(lblue, dblue, "audio_blue");
    } else if (id === "img_purple") {
        set_colour(lpurple, dpurple, "audio_purple");
    } else if (id === "img_pink") {
        set_colour(lpink, dpink, "audio_pink");
    } else if (id === "img_red") {
        set_colour(lred, dred, "audio_red");
    } else if (id === "img_yellow") {
        set_colour(lyellow, dyellow, "audio_yellow");
    }
}

// saves coordinates of touch event in position globals.
function touch_pos(e) {
    "use strict";
    
    x_pos = e.touches[0].clientX - left_margin_width;
    y_pos = e.touches[0].clientY - top_margin_height;
}

// saves coordinates of click event in position globals.
function mouse_pos(e) {
    "use strict";
    
    x_pos = e.clientX - left_margin_width;
    y_pos = e.clientY - top_margin_height;
}

// Functions paint(), add_coord(), down(), move() and up(),
// were inspired by the following article:

// William Malone. 2014.
// "CREATE A DRAWING APP WITH HTML5 CANVAS AND JAVASCRIPT".
// Accessed 5 Aug 2018.
// <http://www.williammalone.com/articles/
// create-html5-canvas-javascript-drawing-app/#demo-simple>

// transfers coordinates from mouse arrays onto convas.
function paint() {
    "use strict";
    
    var context = document.getElementById("canvas").getContext("2d");
    
    context.lineWidth = 7;
    context.lineJoin = "round";
    
    for (i = 0; i < mouse_x.length; i = i + 1) {
        context.beginPath();
        if (mouse_drag[i] && i) {
            context.moveTo(mouse_x[i - 1], mouse_y[i - 1]);
        } else {
            context.moveTo(mouse_x[i] - 1, mouse_y[i]);
        }
        context.lineTo(mouse_x[i], mouse_y[i]);
        context.closePath();
        
        context.strokeStyle = mouse_colour[i];
        context.stroke();
    }
    
    document.getElementById("trash").style.opacity = 1;
    document.getElementById("trash").style.cursor = "pointer";
}

// clears the canvas and coordinate arrays
function clear_canvas() {
    "use strict";
    
    if (mouse_x.length > 0) {
        document.getElementById("audio_trash").play();
    
        mouse_x.length = 0;
        mouse_y.length = 0;
        mouse_drag.length = 0;
        mouse_colour.length = 0;
    
        var context = document.getElementById("canvas").getContext("2d");
    
        context.fillStyle = "white";
        context.fillRect(0, 0, 750, 650);
        
        document.getElementById("trash").style.opacity = 0.1;
        document.getElementById("trash").style.cursor = "default";
    }
}

// adds coordinate values in position globals to the mouse arrays.
function add_coord(x, y, drag) {
    "use strict";
    
    mouse_x.push(x);
    mouse_y.push(y);
    mouse_drag.push(drag);
    mouse_colour.push(selected_colour);
}

// mousedown or touchstart event - determines input type,
// gets input coordinates and begins paint function.
function down(e) {
    "use strict";
    
    if (e.type === "touchstart") {
        touch_pos(e);
    } else {
        mouse_pos(e);
    }
    
    mouse = true;
    add_coord(x_pos, y_pos);
    paint();
}

// mousemove or touchmove event - determines input type,
// gets input coordinates and continues paint function.
function move(e) {
    "use strict";
    
    if (e.type === "touchmove") {
        touch_pos(e);
    } else {
        mouse_pos(e);
    }
    
    if (mouse) {
        add_coord(x_pos, y_pos, true);
        paint();
    }
}

// mouseup, touchend or mouseleave event - halts paint function.
function up() {
    "use strict";
    
    mouse = false;
}

// disables touch scroll and passes touch event to relevant function.
function touch_to_mouse(e) {
    "use strict";
    
    var item1 = document.getElementById("canvas"),
        item2 = document.getElementById("body_id");
    
    if (e.target === item1 || e.target === item2) {
        
        e.preventDefault();
        
        if (e.type === "touchstart") {
            down(e);
        } else if (e.type === "touchmove") {
            move(e);
        } else if (e.type === "touchend") {
            up();
        }
    }
}