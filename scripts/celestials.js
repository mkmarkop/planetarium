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

function CelestialModel(celestial, fillColor, lineColor) {

    var reference = celestial.getReference();
    this.entity = celestial;

    if (!(reference instanceof Celestial)) {
        reference = null;
    }

    this.draw = function (renderer) {
        if (reference) {
            renderer.drawCircle(reference.rect.getCenter(), celestial.getDist(), 1, ORBIT_COLOR, null);
        }

        renderer.drawCircle(celestial.rect.getCenter(), celestial.rect.getWidth() / 2,
            2, fillColor, lineColor);

        //renderer.drawRect(celestial.rect.getTop(), celestial.rect.getWidth(),
        //    celestial.rect.getHeight(), 1, "#ffffff", null);
    };
}

function SolarSystem(renderManager) {
    var bodies = new Map();
    var paused = false;
    var selected = "None";

    this.addCelestial = function (name, body, bodyModel) {
        bodies.set(name, body);
        renderManager.add(bodyModel);
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
    };
}

