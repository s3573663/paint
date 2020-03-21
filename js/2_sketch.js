// DIG24 Assignment 3, by Aaron Bramich, Curtin Student #19366050

// colour codes
var offwhite = "#F0F0F0";
var lgrey =    "#C8C8C8";
var dgrey =    "#5A5A5A";

// margin offset values
var top_margin_height;
var left_margin_width;

// current click/touch coordinates
var x_pos;
var y_pos;

// arrays for all coordinate values
var mouse_x = [];
var mouse_y = [];

var i; // for loop index

//array starting values
mouse_x.push(370);
mouse_y.push(270);

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

// transfers coordinates from mouse arrays onto convas.
function paint() {
    "use strict";
    
    var context = document.getElementById("canvas").getContext("2d");
    
    for (i = 0; i < mouse_x.length; i = i + 1) {
        if (i === mouse_x.length - 1) {
            context.fillStyle = lgrey;
            context.fillRect(mouse_x[i], mouse_y[i], 10, 10);
        } else {
            context.fillStyle = dgrey;
            context.fillRect(mouse_x[i], mouse_y[i], 10, 10);
            
            document.getElementById("trash").style.opacity = 1;
            document.getElementById("trash").style.cursor = "pointer";
        }
    }
}

// clears the canvas and coordinate arrays
function clear_canvas() {
    "use strict";
    
    if (mouse_x.length > 1) {
        document.getElementById("audio_scrape").play();
    
        mouse_x.length = 1;
        mouse_y.length = 1;
    
        var context = document.getElementById("canvas").getContext("2d");
    
        context.fillStyle = offwhite;
        context.fillRect(0, 0, 750, 550);
    
        paint();
        
        document.getElementById("trash").style.opacity = 0.1;
        document.getElementById("trash").style.cursor = "default";
    }
}

// push coordinates of valid directions into mouse_x and mouse_y arrays.
function calc_coords(x, y) {
    "use strict";
    
    if (x > -1 && x < 741 && y > -1 && y < 541) {
        mouse_x.push(x);
        mouse_y.push(y);
        
        document.getElementById("etch").load();
        document.getElementById("etch").play();
        
        paint();
    }
}

// determine intended draw direction
function get_direction() {
    "use strict";
    
    var offset = 10; // space between pixels
    
    if (x_pos > 79 && x_pos < 121 && y_pos > 19 && y_pos < 81) { //N
        calc_coords(mouse_x[mouse_x.length - 1],
                    mouse_y[mouse_y.length - 1] - offset);
    } else if (x_pos > 79 && x_pos < 121 && y_pos > 129 && y_pos < 191) { //S
        calc_coords(mouse_x[mouse_x.length - 1],
                    mouse_y[mouse_y.length - 1] + offset);
    } else if (x_pos > 19 && x_pos < 81 && y_pos > 89 && y_pos < 131) { //W
        calc_coords(mouse_x[mouse_x.length - 1] - offset,
                    mouse_y[mouse_y.length - 1]);
    } else if (x_pos > 129 && x_pos < 191 && y_pos > 89 && y_pos < 131) { //E
        calc_coords(mouse_x[mouse_x.length - 1] + offset,
                    mouse_y[mouse_y.length - 1]);
    } else if (x_pos > 579 && x_pos < 641 && y_pos > 29 && y_pos < 91) { //NW
        calc_coords(mouse_x[mouse_x.length - 1] - offset,
                    mouse_y[mouse_y.length - 1] - offset);
    } else if (x_pos > 659 && x_pos < 721 && y_pos > 29 && y_pos < 91) { //NE
        calc_coords(mouse_x[mouse_x.length - 1] + offset,
                    mouse_y[mouse_y.length - 1] - offset);
    } else if (x_pos > 579 && x_pos < 641 && y_pos > 119 && y_pos < 181) { //SW
        calc_coords(mouse_x[mouse_x.length - 1] - offset,
                    mouse_y[mouse_y.length - 1] + offset);
    } else if (x_pos > 659 && x_pos < 721 && y_pos > 119 && y_pos < 181) { //SE
        calc_coords(mouse_x[mouse_x.length - 1] + offset,
                    mouse_y[mouse_y.length - 1] + offset);
    }
}

// saves coordinates of touch event in position globals.
function touch_pos(touch_event) {
    "use strict";
    
    x_pos = touch_event.touches[0].clientX - left_margin_width;
    y_pos = touch_event.touches[0].clientY - (top_margin_height + 550);
    
    get_direction();
}

// saves coordinates of click event in position globals.
function mouse_pos(mouse_event) {
    "use strict";
    
    x_pos = mouse_event.clientX - left_margin_width;
    y_pos = mouse_event.clientY - (top_margin_height + 550);
    
    get_direction();
}

// disables touch scroll and passes touch event to relevant function.
function touch_to_mouse(e) {
    "use strict";
    
    var item1 = document.getElementById("body_id"),
        item2 = document.getElementById("canvas"),
        item3 = document.getElementById("tools"),
        item4 = document.getElementById("etch_left"),
        item5 = document.getElementById("etch_right");
    
    if (e.target === item1 || e.target === item2 ||
            e.target === item3 || e.target === item4 ||
            e.target === item5) {
        
        e.preventDefault();
        touch_pos(e);
    }
}