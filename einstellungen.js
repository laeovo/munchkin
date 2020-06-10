function einstellungenOeffnen() {
    console.log("Einstellungen öffnen");
    var einstellungen = document.createElement("div");
    einstellungen.setAttribute("id", "einstellungen");
    
    var hintergrund = document.createElement("div");
    hintergrund.setAttribute("id", "hintergrund");
    hintergrund.setAttribute("onclick", "einstellungenSchliessen()");
    hintergrund.setAttribute("style", "position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background-color: rgba(50,50,50,0.5); cursor: pointer;");
    
    var kartenGroesseUntenLinks = document.createElement("div");
    kartenGroesseUntenLinks.setAttribute("id", "kartenGroesseUntenLinks");
    
    
    einstellungen.appendChild(hintergrund);
    einstellungen.appendChild(kartenGroesseUntenLinks);
    window.document.body.appendChild(einstellungen);
}

function einstellungenSchliessen() {
    window.document.body.removeChild(window.document.getElementById("einstellungen"));
    console.log("Einstellungen geschlossen");
}
