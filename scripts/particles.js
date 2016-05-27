function rand(min, max) {
	return Math.round(Math.random() * max - min) + min
}

var STAR_COLOURS = ["#ffffff", "#ffe9c4", "#d4fbff"];

function Star(x, y) {
	var radius = Math.random() * 1.1;
	this.color = STAR_COLOURS[rand(0, STAR_COLOURS.length)];

	this.rect = new Rect(0, 0, 2 * radius, 2 * radius);
	this.rect.setTop(new Point(x, y));

	this.scaleDistance = function (amount) {};

	this.drag = 100;

	this.reset = function (x, y) {
		this.rect.setTop(new Point(x, y));
	}
}

function StarModel(star) {

	this.alwaysVisible = true;
	this.entity = star;

	this.draw = function (renderer) {
		renderer.drawCircle(
			this.entity.rect.getCenter(),
			this.entity.rect.getWidth() / 2,
            1, this.entity.color, this.entity.color
        );
	};
}

function Starfield(renderManager, numStars) {

	var width = renderManager.getWidth();
	var height = renderManager.getHeight();
	var stars = []

	for (var i = 0; i < numStars; i++) {
		var star = new Star(rand(0, width), rand(0, height));
		renderManager.add(STAR_LAYER, new StarModel(star));
		stars.push(star);
	}

	this.update = function (now) {
		var screen = renderManager.getScreen();
		var star;

		for (var i = 0, n = stars.length; i < n; i++) {
			star = stars[i];
			if (!star.rect.insideRect(screen)) {
				star.reset(rand(0, width), rand(0, height));
			}
		}
	}
}