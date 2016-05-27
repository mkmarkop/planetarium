"use strict";

function Celestial(reference, distance_in_au, rad, period) {
    var axis = reference;
    var last_time = null;
    var dt = 0;
    var theta = 0;
    var distance = (distance_in_au * ASTRONOMICAL_UNIT);
    var radius = rad * EARTH_SIZE;
    var angularVelocity = period === 0 ? 0 : (2 * Math.PI) / (period * NORMALIZE);

    this.rect = new Rect(0, 0, 2 * radius, 2 * radius);

    if (!(reference instanceof Celestial)) {
        this.rect.setCenter(axis);
    } else {
        this.rect.setCenter(axis.rect.getCenter().fromTo(distance, theta));
    }

    this.update = function (now) {
        if (angularVelocity === 0) {
            return;
        }

        if (!last_time) {
            last_time = now;
        }
        dt = now - last_time;
        last_time = now;

        if (dt < 145.0) {
            var dtheta = angularVelocity * dt;
            theta = (theta + dtheta) % (2 * Math.PI);
            this.rect.setCenter(axis.rect.getCenter().fromTo(distance, theta));
            distance = this.rect.getCenter().distanceTo(axis.rect.getCenter());
        }
    };

    this.getReference = function () {
        return axis;
    };

    this.getDist = function () {
        return distance;
    };

    this.scaleDistance = function (amount) {
        distance *= amount;
    };
}

function Dummy() {
    this.rect = new Rect(0, 0, 1, 1);
    this.scaleDistance = function(amount) {};
}

var dummy = new Dummy();

function OrbitModel(reference, celestial) {

    this.alwaysVisible = true;
    this.entity = dummy;

    this.draw = function(renderer) {
        renderer.drawCircle(reference.rect.getCenter(), celestial.getDist(), 
            1, ORBIT_COLOR, null);
    };
}

function CelestialModel(celestial, fillColor, lineColor) {

    this.alwaysVisible = false;
    this.entity = celestial;

    this.draw = function (renderer) {
        renderer.drawCircle(celestial.rect.getCenter(), celestial.rect.getWidth() / 2,
            2, fillColor, lineColor);
    };
}

function SolarSystem(renderManager) {
    var bodies = new Map();
    var paused = false;
    var selected = "None";
    var starfield = new Starfield(renderManager, 100);

    this.addCelestial = function (name, body, bodyModel) {
        bodies.set(name, body);
        renderManager.add(SOLAR_LAYER, bodyModel);
        var reference = body.getReference();
        if (reference !== null && reference instanceof Celestial) {
            renderManager.add(ORBITS_LAYER, new OrbitModel(reference, body));
        }
    };

    this.getCelestial = function (name) {
        return bodies.get(name);
    };

    this.getSelected = function () {
        return selected;
    };

    this.setSelected = function (target) {
        selected = target;
    };

    this.pause = function () {
        paused = true;
    };

    this.unpause = function () {
        paused = false;
    };

    this.update = function (now) {
        if (paused) {
            return;
        }

        bodies.forEach(function (value, key) {
            value.update(now);
        });

        starfield.update(now);
    };
}