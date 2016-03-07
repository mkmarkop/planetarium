function Camera(manager, point) {
    var drag_x, drag_y;
    var center = new Point(point.x, point.y);
    var mouse_coords = new Point(0, 0);
    var zoomFactor = 1.0;
    var zoomStep = 0.2;

    this.resetDrag = function (coords) {
        drag_x = coords.x;
        drag_y = coords.y;
    };

    this.drag = function() {
        manager.pan(mouse_coords.x - drag_x, mouse_coords.y - drag_y);
        drag_x = mouse_coords.x;
        drag_y = mouse_coords.y;
    };

    this.zoom = function(mouseDelta) {
        var amount = 1 + mouseDelta * zoomStep;
        zoomFactor *= amount;
        manager.scale(amount);
    };

    this.getZoomStep = function() {
        return zoomStep;
    };

    this.setZoomStep = function(step) {
        zoomStep = step;
    };

    this.setMouse = function(coords) {
        mouse_coords.x = coords.x;
        mouse_coords.y = coords.y;
    }

    this.track = function(target) {
        var target_center = target.rect.getCenter();
        var dx = target_center.x - center.x;
        var dy = target_center.y - center.y;
        manager.pan(-dx, -dy);
    }
}