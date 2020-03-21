// DIG24 Assignment 3, by Aaron Bramich, Curtin Student #19366050

// colour codes
var black =   "#000000";
var white =   "#FFFFFF";
var lgrey =   "#FAFAFA";
var mgrey =   "#F0F0F0";
var dgrey =   "#C8C8C8";
var lblue =   "#00A8F3";
var dblue =   "#0000FF";
var lgreen =  "#7DEB7D";
var dgreen =  "#006400";
var lyellow = "#FFFF96";
var dyellow = "#FFFF00";
var lorange = "#FFDCB4";
var dorange = "#FFC882";
var lred =    "#FF5050";
var dred =    "#FF0000";
var lbrown =  "#AA8264";
var dbrown =  "#503228";

// margin offset values
var top_margin_height;
var left_margin_width;

// current click/touch coordinates
var x_pos = -1;
var y_pos = -1;

var shape = "none"; // shape selected
var cell = -1;      // cell selected
var empty_cells;    // number of empty cells remaining
var i;              // for loop index

// arrays for contents of all cell
var cells = [];

// init cells array
for (i = 0; i < 80; i = i + 1) {
    cells.push("none");
}

// arrays for preset cells contents
var cells_start = ["square", "square", "square", "square",
                   "square", "square", "square", "square",         // end row1
                   "square", "circle", "square", "square",
                   "square", "square", "square", "square",         // end row2
                   "square", "square", "square", "square",
                   "square", "square", "square", "square",         // end row3
                   "square", "square", "square", "square",
                   "triangle_top", "square", "square", "square",   // end row4
                   "square", "square", "square", "triangle_left",
                   "square", "triangle_right", "square", "square", // end row5
                   "square", "square", "square", "square",
                   "square", "square", "square", "square",         // end row6
                   "square", "square", "square", "square",
                   "square", "square", "square", "square",         // end row7
                   "square", "square", "square", "square",
                   "square", "square", "square", "square",         // end row8
                   "square", "square", "square", "square",
                   "square", "square", "square", "square",         // end row9
                   "square", "square", "square", "square",
                   "square", "square", "square", "square"];        // end row10

var colours_start = [mgrey, mgrey, mgrey, mgrey,
                    mgrey, mgrey, mgrey, mgrey, // end row1
                    mgrey, dgrey, mgrey, mgrey,
                    mgrey, mgrey, mgrey, mgrey, // end row2
                    mgrey, mgrey, mgrey, mgrey,
                    mgrey, mgrey, mgrey, mgrey, // end row3
                    mgrey, mgrey, mgrey, mgrey,
                    dgrey, mgrey, mgrey, mgrey, // end row4
                    mgrey, mgrey, mgrey, dgrey,
                    dgrey, dgrey, mgrey, mgrey, // end row5
                    mgrey, mgrey, mgrey, dgrey,
                    dgrey, dgrey, mgrey, mgrey, // end row6
                    mgrey, dgrey, mgrey, dgrey,
                    dgrey, dgrey, mgrey, mgrey, // end row7
                    mgrey, dgrey, mgrey, dgrey,
                    dgrey, dgrey, mgrey, mgrey, // end row8
                    dgrey, dgrey, dgrey, dgrey,
                    dgrey, dgrey, dgrey, dgrey, // end row9
                    dgrey, dgrey, dgrey, dgrey,
                    dgrey, dgrey, dgrey, dgrey]; // end row10

var colours_end = [lblue, lblue, lblue, lblue,
                   lblue, lblue, lblue, lblue, // end row1
                   lblue, lyellow, lblue, lblue,
                   lblue, lblue, lblue, lblue, // end row2
                   lblue, lblue, lblue, lblue,
                   lblue, lblue, lblue, lblue, // end row3
                   lblue, lblue, lblue, lblue,
                   lred, lblue, lblue, lblue, // end row4
                   lblue, lblue, lblue, lred,
                   lred, lred, lblue, lblue, // end row5
                   lblue, lblue, lblue, lorange,
                   lorange, lorange, lblue, lblue, // end row6
                   lblue, lred, lblue, lorange,
                   lorange, lorange, lblue, lblue, // end row7
                   lblue, lbrown, lblue, lorange,
                   lorange, lorange, lblue, lblue, // end row8
                   lgreen, lgreen, lgreen, lgreen,
                   lgreen, lgreen, lgreen, lgreen, // end row9
                   lgreen, lgreen, lgreen, lgreen,
                   lgreen, lgreen, lgreen, lgreen]; // end row10

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
    
    document.getElementById("hide").style.display = "none";
}

// nav button functionality.
function go_to_index() {
    "use strict";
    
    window.location.href = "./index.html";
}

// saves coordinates of touchend event in position globals.
function touch_pos(e) {
    "use strict";
    
    x_pos = e.changedTouches[0].clientX - left_margin_width;
    y_pos = e.changedTouches[0].clientY - top_margin_height;
}

// saves coordinates of click event in position globals.
function mouse_pos(e) {
    "use strict";
    
    x_pos = e.clientX - left_margin_width;
    y_pos = e.clientY - top_margin_height;
}

// helper function for drawing a filled rectangle
function draw_rectangle(context, colour, x1, y1, width, height) {
    "use strict";
    
    context.fillStyle = colour;
    context.fillRect(x_pos + x1, y_pos + y1, width, height);
}

// helper function for drawing an empty rectangle
function draw_rect_border(context, weight, colour, x1, y1, width, height) {
    "use strict";
    
    context.lineWidth = weight;
    context.strokeStyle = colour;
    context.strokeRect(x_pos + x1, y_pos + y1, width, height);
}

// helper function for drawing a triangle
function draw_triangle(context, colour, x1, y1, x2, y2, x3, y3) {
    "use strict";
    
    context.beginPath();
    context.moveTo(x_pos + x1, y_pos + y1);
    context.lineTo(x_pos + x2, y_pos + y2);
    context.lineTo(x_pos + x3, y_pos + y3);
    context.lineTo(x_pos + x1, y_pos + y1);
    context.fillStyle = colour;
    context.fill();
}

// helper function for drawing a border around a shape
function draw_border(context, weight, colour) {
    "use strict";
    
    context.lineWidth = weight;
    context.strokeStyle = colour;
    context.stroke();
}

// display final reveal when empty cells = 0
function final_sequence() {
    "use strict";
    
    var context = document.getElementById("canvas").getContext("2d");
    
    // decrement empty cell counter
    empty_cells = 0;
    for (i = 0; i < cells.length; i = i + 1) {
        if (cells[i] === "none") {
            empty_cells = empty_cells + 1;
        }
    }
    
    // final reveal
    if (empty_cells === 0) {
        
        for (i = 0; i < cells.length; i = i + 1) {
            
            x_pos = 0;
            y_pos = i;
            while (y_pos > 7) {
                y_pos = y_pos - 8;
                x_pos = x_pos + 1;
            }
            y_pos = x_pos * 75;
            
            x_pos = i;
            while (x_pos > 7) {
                x_pos = x_pos - 8;
            }
            x_pos = x_pos * 75;
            
            if (i === 49) { // letterbox detail
                draw_rectangle(context, black, 10, 20, 55, 10);
                draw_rect_border(context, 3, dred, 10, 20, 55, 10);
                
            } else if (i === 52) { // door top detail
                draw_rectangle(context, white, 10, 30, 55, 45);
                draw_rectangle(context, dorange, 14, 34, 47, 41);
                
            } else if (i === 60) { // door bottom detail
                draw_rectangle(context, white, 10, 0, 55, 72);
                draw_rectangle(context, dorange, 14, 0, 47, 72);
                
            } else if (i === 43) { // left window detail
                draw_rectangle(context, white, 19, 19, 56, 56);
                draw_rectangle(context, lblue, 23, 23, 22, 22);
                draw_rectangle(context, lblue, 49, 23, 22, 22);
                draw_rectangle(context, lblue, 23, 49, 22, 22);
                draw_rectangle(context, lblue, 49, 49, 22, 22);
                
            } else if (i === 45) { // right window detail
                draw_rectangle(context, white, 0, 19, 56, 56);
                draw_rectangle(context, lblue, 4, 23, 22, 22);
                draw_rectangle(context, lblue, 30, 23, 22, 22);
                draw_rectangle(context, lblue, 4, 49, 22, 22);
                draw_rectangle(context, lblue, 30, 49, 22, 22);
            }
        }
    }
}

// transfers coordinates from cells array onto convas.
function paint() {
    "use strict";
    
    var context = document.getElementById("canvas").getContext("2d");
    
    for (i = 0; i < cells.length; i = i + 1) {
        
        x_pos = 0;
        y_pos = i;
        while (y_pos > 7) {
            y_pos = y_pos - 8;
            x_pos = x_pos + 1;
        }
        y_pos = x_pos * 75;
        
        x_pos = i;
        while (x_pos > 7) {
            x_pos = x_pos - 8;
        }
        x_pos = x_pos * 75;
        
        // grey cells (colours_start)
        if (cells[i] === "none") {
            
            if (cells_start[i] === "square") {
                draw_rectangle(context, lgrey, 4, 4, 65, 65);
                draw_rect_border(context, 3, colours_start[i], 4, 4, 65, 65);
                
            } else if (cells_start[i] === "triangle_top") {
                draw_triangle(context, lgrey, 4, 69, 37, 37, 69, 69);
                draw_border(context, 3, colours_start[i]);
                
            } else if (cells_start[i] === "triangle_left") {
                draw_triangle(context, lgrey, 69, 4, 4, 69, 69, 69);
                draw_border(context, 3, colours_start[i]);
                
            } else if (cells_start[i] === "triangle_right") {
                draw_triangle(context, lgrey, 4, 4, 69, 69, 4, 69);
                draw_border(context, 3, colours_start[i]);
                
            } else if (cells_start[i] === "circle") {
                context.beginPath();
                context.arc(x_pos + 37, y_pos + 37, 34, 0, 2 * Math.PI, false);
                context.fillStyle = lgrey;
                context.fill();
                draw_border(context, 3, colours_start[i]);
            }
        }
        
        // coloured cells (colours_end)
        if (cells[i] === "square" && cells_start[i] === "square") {
            
            draw_rectangle(context, colours_end[i], 0, 0, 75, 75);
            
            context.lineWidth = 3;
            if (colours_end[i] === lblue) { // blue
                context.strokeStyle = dblue;
            } else if (colours_end[i] === lgreen) { // green
                context.strokeStyle = dgreen;
            } else if (colours_end[i] === lred) { // red
                context.strokeStyle = dred;
            } else if (colours_end[i] === lorange) { // orange
                context.strokeStyle = dorange;
            }
            context.strokeRect(x_pos, y_pos, 75, 75);
            
            if (colours_end[i] === lbrown) { // brown
                draw_rectangle(context, lblue, 0, 0, 75, 75);
                draw_rectangle(context, lbrown, 27, 0, 20, 75);
                draw_rect_border(context, 3, dblue, 0, 0, 75, 75);
                draw_rect_border(context, 3, dbrown, 27, 0, 20, 75);
            }
            
        } else if (cells[i] === "triangle") {
            
            draw_rectangle(context, lblue, 0, 0, 75, 75);
            
            if (cells_start[i] === "triangle_top") {
                draw_triangle(context, colours_end[i], 0, 75, 37, 37, 75, 75);
                draw_rect_border(context, 3, dblue, 0, 0, 75, 75);
                draw_border(context, 3, dred);
                
            } else if (cells_start[i] === "triangle_left") {
                draw_triangle(context, colours_end[i], 75, 0, 0, 75, 75, 75);
                draw_rect_border(context, 3, dblue, 0, 0, 75, 75);
                draw_border(context, 3, dred);
                
            } else if (cells_start[i] === "triangle_right") {
                draw_triangle(context, colours_end[i], 0, 0, 75, 75, 0, 75);
                draw_rect_border(context, 3, dblue, 0, 0, 75, 75);
                draw_border(context, 3, dred);
            }
            
        } else if (cells[i] === "circle" && cells_start[i] === "circle") {
            
            draw_rectangle(context, lblue, 0, 0, 75, 75);
            
            context.beginPath();
            context.arc(x_pos + 37, y_pos + 37, 34, 0, 2 * Math.PI, false);
            context.fillStyle = lyellow;
            context.fill();
            
            draw_rect_border(context, 3, dblue, 0, 0, 75, 75);
            draw_border(context, 3, dyellow);
        }
    }
    
    x_pos = -1;
    y_pos = -1;
    cell = -1;
    
    final_sequence();
}

// determine selected cell number.
function get_cell() {
    "use strict";
    
    var offset_x = Math.floor(x_pos / 75),
        offset_y = Math.floor(y_pos / 75);
    
    if (offset_x > -1 && offset_x < 8 && offset_y > -1 && offset_y < 10) {
        cell = offset_x + (offset_y * 8);
    } else {
        cell = -1;
        x_pos = -1;
        y_pos = -1;
    }
}

function allow(e) {
    "use strict";
    
    e.preventDefault();
}

// selects a shape at the beginning of a correct drag event.
function drag(e) {
    "use strict";
    
    var shape1 = document.getElementById("square"),
        shape2 = document.getElementById("triangle"),
        shape3 = document.getElementById("circle");
    
    if (e.target === shape1) {
        shape = "square";
    } else if (e.target === shape2) {
        shape = "triangle";
    } else if (e.target === shape3) {
        shape = "circle";
    }
    
    if (shape !== "none") {
        document.getElementById("select_shape").play();
    }
}

// initiate placement of a shape on the canvas.
function drop(e) {
    "use strict";
    
    var canvas = document.getElementById("canvas");
    
    if (e.type === "click" && e.target === canvas && shape !== "none") {
        mouse_pos(e);
        get_cell();
    } else if (e.type === "touchend" && shape !== "none") {
        touch_pos(e);
        get_cell();
    } else if (e.type === "drop" && e.target === canvas && shape !== "none") {
        allow(e);
        mouse_pos(e);
        get_cell();
    }
    
    if (cell !== -1 && cells[cell] === "none" &&
            cells_start[cell][0] === shape[0]) {
        
        document.getElementById("paste_shape").play();
        cells[cell] = shape;
        paint();
        
    } else {
        x_pos = -1;
        y_pos = -1;
    }
}

// disables touch scroll and passes touch event to relevant function.
function touch_to_mouse(e) {
    "use strict";
    
    var item1 = document.getElementById("body_id"),
        item2 = document.getElementById("canvas"),
        item3 = document.getElementById("shapes"),
        item4 = document.getElementById("square"),
        item5 = document.getElementById("triangle"),
        item6 = document.getElementById("circle");
    
    if (e.target === item1 || e.target === item2 ||
            e.target === item3 || e.target === item4 ||
            e.target === item5 || e.target === item6) {
        
        allow(e);
        
        if (e.type === "touchstart") {
            drag(e);
        } else if (e.type === "touchend") {
            drop(e);
        }
    }
}