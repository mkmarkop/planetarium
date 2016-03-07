function fillDom(solarSystem, database, center) {
    var i;
    var n = database.getSize();
    var name;
    var parent;
    var dist;
    var period;
    var radius;
    var temp = null;
    var ref = null;
    var color = null;

    var selection = document.createElement("select");
    var option = document.createElement("option");
    option.value = "None";
    option.innerHTML = "None";
    selection.appendChild(option);
    $("data").appendChild(selection);

    for (i = 0; i < n; i++) {
        name = database.getNameAt(i);
        parent = database.getParentAt(i);
        period = database.getOrbitalPeriod(i);
        dist = database.getAUDistanceAt(i);
        radius = database.getEarthRadiusAt(i);
        color = database.getColor(i);
        if (parent) {
            ref = solarSystem.getCelestial(parent);
        } else {
            ref = center;
        }

        temp = new Celestial(ref, dist, radius, period);
        solarSystem.addCelestial(name, temp,
            new CelestialModel(temp, color, color));
        option = document.createElement("option");
        option.value = name;
        var add = "";
        if (parent === "Sun") {
            add = "- ";
        }
        else {
            add = "-- "
        }
        option.innerHTML = add + name;
        selection.appendChild(option);
    }

    selection.onchange = function () {
        solarSystem.setSelected(selection.value);
        var i = database.getIndexByName(selection.value);
        parent = database.getParentAt(i);
        period = database.getOrbitalPeriod(i);
        dist = database.getAUDistanceAt(i);
        radius = database.getEarthRadiusAt(i);
        $("orbit").innerHTML = period + " days";
        $("distance").innerHTML = dist + " AU from " + parent;
        $("radius").innerHTML = radius + " Earth radius";
    };

    temp = null;
}