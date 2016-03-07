"use strict";

function log_info(message) {
    console.log(message);
}

function log_warning(message) {
    console.warn(message);
}

function log_error(message) {
    console.error(message);
}

function assert(condition, message) {
    if (!condition) {
        throw message || "Assertion failed.";
    }
}

(function () {
    var lastTime = 0;
    var vendors = ["ms", "moz", "webkit", "o"];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame =
            window[vendors[x] + "RequestAnimationFrame"];
        window.cancelAnimationFrame =
            window[vendors[x] + "CancelAnimationFrame"] ||
            window[vendors[x] + "CancelRequestAnimationFrame"];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currentTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currentTime - lastTime));
            var timerID = window.setTimeout(
                function () {
                    callback(currentTime + timeToCall);
                },
                timeToCall);
            lastTime = currentTime + timeToCall;
            return timerID;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (timerID) {
            clearTimeout(timerID);
        };

})();
