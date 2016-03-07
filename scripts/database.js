function AstronomicalDatabase() {
    "use strict";
    var instance = this;

    var name = ["Sun",
        "Mercury",
        "Venus",
        "Earth",
        "Moon",
        "Mars",
        "Phobos",
        "Deimos",
        "Ceres",
        "Jupiter",
        "Io",
        "Europa",
        "Ganymede",
        "Callisto",
        "Saturn",
        "Mimas",
        "Enceladus",
        "Tethys",
        "Dione",
        "Rhea",
        "Titan",
        "Iapetus",
        "Uranus",
        "Miranda",
        "Ariel",
        "Umbriel",
        "Titania",
        "Oberon",
        "Neptune",
        "Triton"
        // sorry, Pluto
    ];

    var parent = [null,
        "Sun",
        "Sun",
        "Sun",
        "Earth",
        "Sun",
        "Mars",
        "Mars",
        "Sun",
        "Sun",
        "Jupiter",
        "Jupiter",
        "Jupiter",
        "Jupiter",
        "Sun",
        "Saturn",
        "Saturn",
        "Saturn",
        "Saturn",
        "Saturn",
        "Saturn",
        "Saturn",
        "Sun",
        "Uranus",
        "Uranus",
        "Uranus",
        "Uranus",
        "Uranus",
        "Sun",
        "Neptune"

    ];

    var distance = [0,
        0.4,
        0.7,
        1,
        0.00257,
        1.5,
        0.00006267,
        0.0001568,
        2.77,
        5.2,
        0.002819,
        0.004485,
        0.099059,
        0.071919,
        9.5,
        0.001240,
        0.001591,
        0.001969,
        0.002523,
        0.003523,
        0.008168,
        0.023803,
        19.2,
        0.000865,
        0.001277,
        0.001780,
        0.002914,
        0.003901,
        30.1,
        0.002371
    ];

    var radius = [109,
        0.3829,
        0.9499,
        1,
        0.273,
        0.532,
        1.76941e-3,
        0.97316e-3,
        0.07424,
        10.9733,
        0.286,
        0.245,
        0.413,
        0.378,
        9.14,
        0.0311,
        0.0395,
        0.083,
        0.0881,
        0.1199,
        0.404,
        0.1153,
        3.98,
        0.037,
        0.0908,
        0.092,
        0.1235,
        0.1194,
        3.8647,
        0.2122
    ];

    var orbital_period = [0,
        87.9691,
        224.701,
        365.256,
        27.322,
        686.971,
        0.3189,
        1.263,
        1681.63,
        4332.59,
        1.769,
        3.551,
        7.155,
        16.689,
        10759.22,
        0.942,
        1.370,
        1.888,
        2.737,
        4.518,
        15.945,
        79.3215,
        30688.5,
        1.413,
        2.520,
        4.144,
        8.706,
        13.463,
        60182,
        -5.876854
    ];

    var fillColor = ["#ffffff",
        "#96918b",
        "#cdcdc9",
        "#26626a",
        "#35302d",
        "#a17a4f",
        "#8f8579",
        "#8f8579",
        "#ceres",
        "#8b7661",
        "#e2ad3b",
        "#e5d9b1",
        "#857462",
        "#39333f",
        "#dbc999",
        "#8c8c8c",
        "#a8a8a8",
        "#a8a8a8",
        "#8c8c8c",
        "#a8a8a8",
        "#c2b35e",
        "#515151",
        "#abc7dc",
        "#a4a4a4",
        "#a4a4a4",
        "#626262",
        "#aea49b",
        "#9a8e8e",
        "#495877",
        "#686868"
    ];

    this.getSize = function () {
        return name.length;
    };

    this.getNameAt = function (i) {
        assert(i < name.length, "Array index out of bounds.");
        return name[i];
    };

    this.getParentAt = function (i) {
        assert(i < name.length, "Array index out of bounds.");
        return parent[i];
    };

    this.getAUDistanceAt = function (i) {
        assert(i < name.length, "Array index out of bounds.");
        return distance[i];
    };

    this.getEarthRadiusAt = function (i) {
        assert(i < name.length, "Array index out of bounds.");
        return radius[i];
    };

    this.getOrbitalPeriod = function (i) {
        assert(i < name.length, "Array index out of bounds.");
        return orbital_period[i];
    };

    this.getColor = function (i) {
        assert(i < name.length, "Array index out of bounds.");
        return fillColor[i];
    };

    this.getIndexByName = function (nominus) {
        return name.indexOf(nominus);
    };

    AstronomicalDatabase = function () {
        return instance;
    };
}