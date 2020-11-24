function einstellungen() {
    var einstellungenFenster = document.createElement("div");
    einstellungenFenster.setAttribute("id", "einstellungenFenster");
    var hintergrund = document.createElement("div");
    hintergrund.setAttribute("id", "einstellungenHintergrund");
    hintergrund.setAttribute("style", "position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background-color: rgba(50,50,50,0.5); cursor: pointer; padding-left: 50vw; padding-top: 50vh;");
    hintergrund.setAttribute("onclick", "document.body.removeChild(window.document.getElementById('einstellungenFenster'))")
    einstellungenFenster.appendChild(hintergrund);
    var slider = document.createElement("input");
    slider.setAttribute("type", "range");
    slider.setAttribute("min", "3");
    slider.setAttribute("max", "10");
    slider.setAttribute("step", "0.5");
    slider.setAttribute("value", kartenbreite.split("vw")[0]);
    slider.setAttribute("oninput", "kartenbreiteAnpassen(this.value)");
    einstellungenFenster.appendChild(slider);
    window.document.body.appendChild(einstellungenFenster);
}
