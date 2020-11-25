function einstellungen() {
    var einstellungenFenster = document.createElement("div");
    einstellungenFenster.setAttribute("id", "einstellungenFenster");
    var hintergrund = document.createElement("div");
    hintergrund.setAttribute("id", "einstellungenHintergrund");
    hintergrund.setAttribute("style", "position: fixed; top: 0px; left: 0px; width: 100vw; height: 100vh; background-color: rgba(50,50,50,0.5); cursor: pointer;");
    hintergrund.setAttribute("onclick", "document.body.removeChild(window.document.getElementById('einstellungenFenster'))")
    einstellungenFenster.appendChild(hintergrund);
    var slider = document.createElement("input");
    slider.setAttribute("type", "range");
    slider.setAttribute("min", "3");
    slider.setAttribute("max", "10");
    slider.setAttribute("step", "0.5");
    slider.setAttribute("value", kartenbreite.split("vw")[0]);
    slider.setAttribute("style", "position: absolute; top: 50vh; left: 50vw; transform: translateX(-50%) translateY(-50%);");
    slider.setAttribute("oninput", "kartenbreiteAnpassen(this.value)");
    einstellungenFenster.appendChild(slider);
    window.document.body.appendChild(einstellungenFenster);
}
