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

function RenderManager(canvas) {
    var context = canvas.getContext("2d");
    var screen = new Rect(0, 0, canvas.scrollWidth, canvas.scrollHeight);

    var renderer = new Renderer(context, screen);
    var assets = [];

    this.add = function (asset) {
        assets.push(asset);
    };

    this.pan = function (dx, dy) {
        assets.forEach(function (gfx) {
            gfx.entity.rect.translate(dx, dy);
        });
    };

    this.scale = function (amount) {
        assets.forEach(function (gfx) {
            gfx.entity.rect.scale(amount);
            gfx.entity.scaleDistance(amount);
        });
    };

    this.draw = function () {
        renderer.clear();
        renderer.fillScreen("black");
        assets.forEach(function (gfx) {
            // need to implement different layers, that's why always true for now
            if (true || gfx.entity.rect.insideRect(screen)) {
                gfx.draw(renderer);
            }
        });
    };
}
