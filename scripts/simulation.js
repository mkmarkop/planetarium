function Simulation(canvas) {
    var manager = new RenderManager(canvas);
    var solarSystem = new SolarSystem(manager);
    var center = new Point((canvas.scrollWidth / 2), (canvas.scrollHeight / 2));
    var mouse = new Mouse(canvas);
    var camera = new Camera(manager, center);

    var db = new AstronomicalDatabase();
    fillDom(solarSystem, db, center);

    this.update = function (now) {
        if (mouse.isOnCanvas()) {
            solarSystem.unpause();
            camera.setMouse(mouse.getCoordinates());
            if (mouse.isDirty()) {
                camera.zoom(mouse.getDelta());
                mouse.notDirty();
            } else if (mouse.isDragging()) {
                solarSystem.pause();
                camera.drag();
            } else if (mouse.isPressed()) {
                camera.resetDrag(mouse.getCoordinates());
            }
        } else {
            solarSystem.pause();
        }

        solarSystem.update(now);
        if (solarSystem.getSelected() !== "None") {
            camera.track(solarSystem.getCelestial(solarSystem.getSelected()));
        }

        manager.draw();
    };
}

window.onload = function () {
    var canvas = $("myCanvas");
    var simulation = new Simulation(canvas);

    var tick = function (now) {
        simulation.update(now);
        window.requestAnimationFrame(tick);
    };

    window.requestAnimationFrame(tick);
};