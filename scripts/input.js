"use strict";

function Mouse(canvas) {
    var pressed = false;
    var onCanvas = false;
    var dirty = false;
    var delta = 0;
    var dragging = false;
    var coordinates = new Point(0, 0);

    canvas.onmouseout = function (e) {
        onCanvas = false;
    };

    canvas.onmousemove = function (e) {
        onCanvas = true;
        coordinates.x = e.pageX - canvas.offsetLeft;
        coordinates.y = e.pageY - canvas.offsetTop;
        e.preventDefault();
        if (pressed) {
            dragging = true;
        }
    };

    canvas.onmousedown = function (e) {
        pressed = true;
    };

    canvas.onmouseup = function (e) {
        pressed = false;
        dragging = false;
    };

    this.handleWheel = function (e) {
        var e = window.event || e;
        delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        dirty = true;
        e.preventDefault();
    };

    if (canvas.addEventListener) {
        canvas.addEventListener("mousewheel", this.handleWheel, false);
        canvas.addEventListener("DOMMouseScroll", this.handleWheel, false);
    } else {
        canvas.attachEvent("onmousewheel", this.handleWheel, false);
    }


    this.getCoordinates = function () {
        return coordinates;
    };

    this.getDelta = function () {
        return delta;
    };

    this.isDragging = function () {
        return dragging;
    };

    this.isPressed = function () {
        return pressed;
    };

    this.isOnCanvas = function () {
        return onCanvas;
    };

    this.isDirty = function () {
        return dirty;
    };

    this.notDirty = function () {
        dirty = false;
    };
}
