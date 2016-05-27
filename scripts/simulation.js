function Simulation(canvas, orbitCanv, starCanv) {
    var manager = new RenderManager(canvas);
    manager.addLayer(STAR_LAYER, starCanv, false);
    manager.addLayer(ORBITS_LAYER, orbitCanv, true);
    manager.addLayer(SOLAR_LAYER, canvas, true);
    var solarSystem = new SolarSystem(manager);
    var center = new Point((canvas.scrollWidth / 2), (canvas.scrollHeight / 2));
    var mouse = new Mouse(canvas);
    var camera = new Camera(manager, center);

    var db = new AstronomicalDatabase();
    fillDom(solarSystem, db, center);

    this.update = function (now) {
        camera.setMouse(mouse.getCoordinates());
        if (mouse.isOnCanvas()) {
            solarSystem.unpause();
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
    var canvas = $("canvas-system");
    var orbitsLayer = $("canvas-orbits");
    var starsLayer = $("canvas-stars");
    var simulation = new Simulation(canvas, orbitsLayer, starsLayer);

    var tick = function (now) {
        simulation.update(now);
        window.requestAnimationFrame(tick);
    };

    window.requestAnimationFrame(tick);
};
