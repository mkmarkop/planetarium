"use strict";

var NORMALIZE = 1000;
var EARTH_SIZE = 1;
var ASTRONOMICAL_UNIT = EARTH_SIZE * 23481;
var ORBIT_COLOR = "white";

var STAR_LAYER = "stars";
var ORBITS_LAYER = "orbits";
var SOLAR_LAYER = "default";

function $(id) {
    return document.getElementById(id);
}