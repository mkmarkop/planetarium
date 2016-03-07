"use strict";

function centerOf(point, width, height) {
    var dx = (point.x + point.x + width) / 2;
    var dy = (point.y + point.y + height) / 2;
    return new Point(dx, dy);
}

function Point(x, y) {
    this.x = (x);
    this.y = (y);
}

Point.prototype.distanceTo = function (point) {
    assert(point instanceof Point, "Not a point object!");
    var dx = Math.abs(this.x - point.x);
    var dy = Math.abs(this.y - point.y);
    dx = dx * dx;
    dy = dy * dy;
    return (Math.sqrt(dx + dy));
};

Point.prototype.fromTo = function (distance, theta) {
    var nx = this.x + distance * Math.cos(theta);
    var ny = this.y + distance * Math.sin(theta);
    return (new Point(nx, ny));
};

Point.prototype.angleTo = function (point) {
    var dx = point.x - this.x;
    var dy = point.y - this.y;
    return Math.atan2(dy, dx);
};

function Rect(x, y, width, height) {
    var top = new Point(x, y);
    var visible = true;
    var center = centerOf(top, width, height);

    this.setTop = function (point) {
        top.x = point.x;
        top.y = point.y;
        center = centerOf(top, width, height);
    };

    this.setCenter = function (point) {
        var old_cx = center.x;
        var old_cy = center.y;
        center.x = point.x;
        center.y = point.y;
        top.x += (center.x - old_cx);
        top.y += (center.y - old_cy);
    };

    this.getCenter = function () {
        return center;
    };

    this.translate = function (dx, dy) {
        top.x += dx;
        top.y += dy;
        center = centerOf(top, width, height);
    };

    this.getTop = function () {
        return top;
    };

    this.getWidth = function () {
        return width;
    };

    this.getHeight = function () {
        return height;
    };

    this.insideRect = function (rect) {
        var min_x = rect.getTop().x;
        var max_x = rect.getTop().x + rect.getWidth();
        var min_y = rect.getTop().y;
        var max_y = rect.getTop().y + rect.getHeight();

        if (min_x > top.x + width || max_x < top.x) {
            return false;
        }

        if (min_y > top.y + height || max_y < top.y) {
            return false;
        }

        return true;
    };

    this.hasPoint = function (point) {
        return (point.x >= top.x && point.x <= top.x + width) &&
            (point.y >= top.y && point.y <= top.y + height);
    };

    this.scale = function (amount) {
        width *= amount;
        height *= amount;

        if (width < 1.0 || height < 1.0) {
            visible = false;
        } else {
            visible = true;
        }

        var old_center = center;
        center = centerOf(top, width, height);
        this.setCenter(old_center);
    };
}
