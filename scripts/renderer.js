"use strict";

function Renderer(context, screen) {
    assert(context !== null, "Couldn't get 2D context.");

    return {
        clear: function () {
            context.save();
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.clearRect(0, 0, screen.getWidth(), screen.getHeight());
            context.restore();
        },

        fillScreen: function (color) {
            assert(color !== null, "Can't fill the screen with null.");
            context.save();
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.beginPath();
            context.fillStyle = color;
            context.fillRect(0, 0, screen.getWidth(), screen.getHeight());
            context.closePath();
            context.restore();
        },

        drawCircle: function (center, radius, lineWidth, lineColor, fillColor) {
            context.save();
            context.beginPath();
            context.arc(center.x, center.y, radius,
                0, 2 * Math.PI, false);
            if (fillColor) {
                context.fillStyle = fillColor;
                context.fill();
            }
            context.lineWidth = lineWidth;
            context.strokeStyle = lineColor;
            context.stroke();
            context.closePath();
            context.restore();
        },

        drawRect: function (top, width, height, lineWidth, lineColor, fillColor) {
            context.save();
            if (fillColor) {
                context.fillStyle = fillColor;
                context.fillRect(top.x, top.y, width, height);
            }
            context.lineWidth = lineWidth;
            context.strokeStyle = lineColor;
            context.strokeRect(top.x, top.y, width, height);
            context.restore();
        }
    };
}

function Layer(context, screen, scalable) {
    var renderer = new Renderer(context, screen);
    var assets = [];

    this.addAsset = function (asset) {
        assets.push(asset);
    };

    this.pan = function (dx, dy) {
        assets.forEach(function (gfx) {
            var drag = gfx.entity.drag ? gfx.entity.drag : 1;
            gfx.entity.rect.translate(dx/drag, dy/drag);
        });
    };

    this.scale = function (amount) {
        if (!scalable) {
            return;
        }
        
        assets.forEach(function (gfx) {
            gfx.entity.rect.scale(amount);
            gfx.entity.scaleDistance(amount);
        });
    };

    this.draw = function () {
        renderer.clear();
        assets.forEach(function (gfx) {
            if (gfx.alwaysVisible || 
                    gfx.entity.rect.insideRect(screen)) {
                gfx.draw(renderer);
            }
        });
    };
}

function RenderManager(canvas) {
    var screen = new Rect(0, 0, canvas.scrollWidth, canvas.scrollHeight);
    var layers = new Map();
    var layerArray = [];

    this.addLayer = function (name, canv, scalable) {
        var context = canv.getContext("2d");
        var layer = new Layer(context, screen, scalable);
        layers.set(name, layer);
        layerArray.push(layer);
    }

    this.add = function (layer, asset) {
        layers.get(layer).addAsset(asset);
    }

    this.pan = function (dx, dy) {
        layerArray.forEach(function (layer) {
            layer.pan(dx, dy);
        });
    };

    this.scale = function (amount) {
        layerArray.forEach(function (layer) {
            layer.scale(amount);
        });
    };

    this.draw = function () {
        layerArray.forEach(function (layer) {
            layer.draw();
        });
    };

    this.getWidth = function() {
        return screen.getWidth();
    }

    this.getHeight = function() {
        return screen.getHeight();
    }

    this.getScreen = function() {
        return screen;
    }
}
