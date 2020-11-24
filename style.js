kartenbreite = "6vw";
kartenhoehe = (1.6 * parseFloat(kartenbreite)) + "vw";
offeneKartenOffset = (parseFloat(kartenhoehe.split("vw")[0]) + 1) + "vw";
infoOffset = (parseFloat(kartenhoehe.split("vw")[0]) * 2 + 2) + "vw";
groesseStapelAnpassen();
offsetAnpassen();
spielstaendeErstellen();

function kartenbreiteAnpassen(neueBreite) {
    kartenbreite = neueBreite + "vw";
    kartenhoehe = (1.6 * parseFloat(neueBreite)) + "vw";
    offeneKartenOffset = (parseFloat(kartenhoehe.split("vw")[0]) + 1) + "vw";
    infoOffset = (parseFloat(kartenhoehe.split("vw")[0]) * 2 + 2) + "vw";
    var kontainer = ["eigeneHandkarten", "eigeneOffeneKarten", "spielerObenLinksHandkarten", "spielerObenLinksOffeneKarten", "spielerObenRechtsHandkarten", "spielerObenRechtsOffeneKarten", "spielerUntenRechtsHandkarten", "spielerUntenRechtsOffeneKarten", "mitte"];
    for (var i = 0; i < kontainer.length; i++) {
        var kartenImKontainer = document.getElementById(kontainer[i]).children;
        for (let j = 0; j < kartenImKontainer.length; j++) {
            var karte = kartenImKontainer[j];
            if (karte.id == "aufraeumenButton") {
                // TODO: Aufräumenbutton klären
                continue;
            }
            // TODO: gedrehte (geflaggte) Karten anders behandeln
            breiteZuweisen(karte, neueBreite);
            while (karte.children.length == 2) {
                karte = karte.children[1];
                breiteZuweisen(karte, neueBreite);
            }
        }
    }
    groesseStapelAnpassen();
    offsetAnpassen();
}

function breiteZuweisen(karte, neueBreite) {
    if (karteIstGeflaggt(karte.id)) {
        karte.style.width = neueBreite + "vw";
        karte.children[0].style.width = neueBreite + "vw";
    }
    else {
        karte.style.width = neueBreite + "vw";
        karte.children[0].style.width = neueBreite + "vw";
    }
}

function groesseStapelAnpassen() {
    var stapelKartenImBild = window.document.getElementsByClassName("stapelKarte");
    for (var i = 0; i < stapelKartenImBild.length; i++) {
        stapelKartenImBild[i].style.width = kartenbreite;
        stapelKartenImBild[i].style.height = kartenhoehe;
    }
    window.document.getElementById("stapel").style.width = 4*parseFloat(kartenbreite.split("vw")[0]) + "vw";
}

function offsetAnpassen() {
    window.document.getElementById("eigeneOffeneKarten").style.bottom = offeneKartenOffset;
    window.document.getElementById("spielerObenLinksOffeneKarten").style.top = offeneKartenOffset;
    window.document.getElementById("spielerObenRechtsOffeneKarten").style.top = offeneKartenOffset;
    window.document.getElementById("spielerUntenRechtsOffeneKarten").style.bottom = offeneKartenOffset;
    window.document.getElementById("eigeneInfo").style.bottom = infoOffset;
    window.document.getElementById("spielerObenLinksInfo").style.top = infoOffset;
    window.document.getElementById("spielerObenRechtsInfo").style.top = infoOffset;
    window.document.getElementById("spielerUntenRechtsInfo").style.bottom = infoOffset;
}

function spielstaendeErstellen() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        const spieler = this.responseText.split("/");
        
        eigenerPunktestand = document.createElement("div");
        eigenerPunktestand.setAttribute("id", "punktestand" + getEigeneId());
        eigenerPunktestand.setAttribute("class", "punktestand");
        eigenerPunktestand.setAttribute("align", "center");
        eigenerPunktestand.style.float = "left";
        eigenerPunktestand.innerHTML = spieler[getEigeneId()].split(";")[1];
        eigenerName = document.createElement("div");
        eigenerName.setAttribute("id", "eigenerName");
        eigenerName.setAttribute("class", "spielerName");
        eigenerName.style.float = "left";
        eigenerName.innerHTML = spieler[getEigeneId()].split(";")[0];
        eigenesGeschlechtDiv = document.createElement("div");
        eigenesGeschlechtDiv.setAttribute("id", "eigenesGeschlecht");
        eigenesGeschlechtDiv.setAttribute("class", "geschlecht");
        eigenesGeschlechtDiv.setAttribute("align", "center");
        eigenesGeschlechtDiv.style.float = "left";
        eigenesGeschlechtDiv.style.cursor = "pointer";
        eigenesGeschlechtDiv.setAttribute("onclick", "toggleGeschlecht()");
        eigenesGeschlechtHidden = document.createElement("div");
        eigenesGeschlechtHidden.setAttribute("id", "geschlechtHidden" + getEigeneId());
        eigenesGeschlechtHidden.innerHTML = spieler[getEigeneId()].split(";")[2];
        eigenesGeschlechtHidden.style.display = "none";
        eigenesGeschlechtDiv.appendChild(eigenesGeschlechtHidden);
        eigenesGeschlecht = document.createElement("div");
        eigenesGeschlecht.setAttribute("id", "geschlecht" + getEigeneId());
        if (spieler[getEigeneId()].split(";")[2] == "w") {
            eigenesGeschlecht.innerHTML = "&#9792;";
        }
        else {
            eigenesGeschlecht.innerHTML = "&#9794;";
        }
        eigenesGeschlechtDiv.appendChild(eigenesGeschlecht);
        
        
        eigeneInfo = window.document.getElementById("eigeneInfo");
        eigeneInfo.appendChild(eigenerPunktestand);
        eigeneInfo.appendChild(eigenerName);
        eigeneInfo.appendChild(eigenesGeschlechtDiv);
        eigeneInfo.style.left = "0px";
        eigeneInfo.style.bottom = infoOffset;
        
        spielerObenLinksPunktestand = document.createElement("div");
        spielerObenLinksPunktestand.setAttribute("id", "punktestand" + (getEigeneId()+1)%4);
        spielerObenLinksPunktestand.setAttribute("class", "punktestand");
        spielerObenLinksPunktestand.setAttribute("align", "center");
        spielerObenLinksPunktestand.style.float = "left";
        spielerObenLinksPunktestand.innerHTML = spieler[(getEigeneId()+1)%4].split(";")[1];
        spielerObenLinksName = document.createElement("div");
        spielerObenLinksName.setAttribute("id", "spielerObenLinksName");
        spielerObenLinksName.setAttribute("class", "spielerName");
        spielerObenLinksName.style.float = "left";
        spielerObenLinksName.innerHTML = spieler[(getEigeneId()+1)%4].split(";")[0];
        spielerObenLinksGeschlechtDiv = document.createElement("div");
        spielerObenLinksGeschlechtDiv.setAttribute("class", "geschlecht");
        spielerObenLinksGeschlechtDiv.setAttribute("align", "center");
        spielerObenLinksGeschlechtDiv.style.float = "left";
        spielerObenLinksGeschlechtHidden = document.createElement("div");
        spielerObenLinksGeschlechtHidden.setAttribute("id", "geschlechtHidden" + (getEigeneId()+1)%4);
        spielerObenLinksGeschlechtHidden.innerHTML = spieler[(getEigeneId()+1)%4].split(";")[2];
        spielerObenLinksGeschlechtHidden.style.display = "none";
        spielerObenLinksGeschlechtDiv.appendChild(spielerObenLinksGeschlechtHidden);
        spielerObenLinksGeschlecht = document.createElement("div");
        spielerObenLinksGeschlecht.setAttribute("id", "geschlecht" + (getEigeneId()+1)%4);
        if (spieler[(getEigeneId()+1)%4].split(";")[2] == "w") {
            spielerObenLinksGeschlecht.innerHTML = "&#9792;";
        }
        else {
            spielerObenLinksGeschlecht.innerHTML = "&#9794;";
        }
        spielerObenLinksGeschlechtDiv.appendChild(spielerObenLinksGeschlecht);
        
        spielerObenLinksInfo = window.document.getElementById("spielerObenLinksInfo");
        spielerObenLinksInfo.appendChild(spielerObenLinksPunktestand);
        spielerObenLinksInfo.appendChild(spielerObenLinksName);
        spielerObenLinksInfo.appendChild(spielerObenLinksGeschlechtDiv);
        spielerObenLinksInfo.style.left = "0px";
        spielerObenLinksInfo.style.top = infoOffset;
        
        
        spielerObenRechtsPunktestand = document.createElement("div");
        spielerObenRechtsPunktestand.setAttribute("id", "punktestand" + (getEigeneId()+2)%4);
        spielerObenRechtsPunktestand.setAttribute("class", "punktestand");
        spielerObenRechtsPunktestand.setAttribute("align", "center");
        spielerObenRechtsPunktestand.style.float = "right";
        spielerObenRechtsPunktestand.innerHTML = spieler[(getEigeneId()+2)%4].split(";")[1];
        spielerObenRechtsName = document.createElement("div");
        spielerObenRechtsName.setAttribute("id", "spielerObenRechtsName");
        spielerObenRechtsName.setAttribute("class", "spielerName");
        spielerObenRechtsName.style.float = "right";
        spielerObenRechtsName.innerHTML = spieler[(getEigeneId()+2)%4].split(";")[0];
        spielerObenRechtsGeschlechtDiv = document.createElement("div");
        spielerObenRechtsGeschlechtDiv.setAttribute("class", "geschlecht");
        spielerObenRechtsGeschlechtDiv.setAttribute("align", "center");
        spielerObenRechtsGeschlechtDiv.style.float = "right";
        spielerObenRechtsGeschlechtHidden = document.createElement("div");
        spielerObenRechtsGeschlechtHidden.setAttribute("id", "geschlechtHidden" + (getEigeneId()+2)%4);
        spielerObenRechtsGeschlechtHidden.innerHTML = spieler[(getEigeneId()+2)%4].split(";")[2];
        spielerObenRechtsGeschlechtHidden.style.display = "none";
        spielerObenRechtsGeschlechtDiv.appendChild(spielerObenRechtsGeschlechtHidden);
        spielerObenRechtsGeschlecht = document.createElement("div");
        spielerObenRechtsGeschlecht.setAttribute("id", "geschlecht" + (getEigeneId()+2)%4);
        if (spieler[(getEigeneId()+2)%4].split(";")[2] == "w") {
            spielerObenRechtsGeschlecht.innerHTML = "&#9792;";
        }
        else {
            spielerObenRechtsGeschlecht.innerHTML = "&#9794;";
        }
        spielerObenRechtsGeschlechtDiv.appendChild(spielerObenRechtsGeschlecht);
        
        spielerObenRechtsInfo = window.document.getElementById("spielerObenRechtsInfo");
        spielerObenRechtsInfo.appendChild(spielerObenRechtsPunktestand);
        spielerObenRechtsInfo.appendChild(spielerObenRechtsName);
        spielerObenRechtsInfo.appendChild(spielerObenRechtsGeschlechtDiv);
        spielerObenRechtsInfo.style.right = "0px";
        spielerObenRechtsInfo.style.top = infoOffset;
        
        
        spielerUntenRechtsPunktestand = document.createElement("div");
        spielerUntenRechtsPunktestand.setAttribute("id", "punktestand" + (getEigeneId()+3)%4);
        spielerUntenRechtsPunktestand.setAttribute("class", "punktestand");
        spielerUntenRechtsPunktestand.setAttribute("align", "center");
        spielerUntenRechtsPunktestand.style.float = "right";
        spielerUntenRechtsPunktestand.innerHTML = spieler[(getEigeneId()+3)%4].split(";")[1];
        spielerUntenRechtsName = document.createElement("div");
        spielerUntenRechtsName.setAttribute("id", "spielerUntenRechtsName");
        spielerUntenRechtsName.setAttribute("class", "spielerName");
        spielerUntenRechtsName.style.float = "right";
        spielerUntenRechtsName.innerHTML = spieler[(getEigeneId()+3)%4].split(";")[0];
        spielerUntenRechtsGeschlechtDiv = document.createElement("div");
        spielerUntenRechtsGeschlechtDiv.setAttribute("class", "geschlecht");
        spielerUntenRechtsGeschlechtDiv.setAttribute("align", "center");
        spielerUntenRechtsGeschlechtDiv.style.float = "right";
        spielerUntenRechtsGeschlechtHidden = document.createElement("div");
        spielerUntenRechtsGeschlechtHidden.setAttribute("id", "geschlechtHidden" + (getEigeneId()+3)%4);
        spielerUntenRechtsGeschlechtHidden.innerHTML = spieler[(getEigeneId()+3)%4].split(";")[2];
        spielerUntenRechtsGeschlechtHidden.style.display = "none";
        spielerUntenRechtsGeschlechtDiv.appendChild(spielerUntenRechtsGeschlechtHidden);
        spielerUntenRechtsGeschlecht = document.createElement("div");
        spielerUntenRechtsGeschlecht.setAttribute("id", "geschlecht" + (getEigeneId()+3)%4);
        if (spieler[(getEigeneId()+3)%4].split(";")[2] == "w") {
            spielerUntenRechtsGeschlecht.innerHTML = "&#9792;";
        }
        else {
            spielerUntenRechtsGeschlecht.innerHTML = "&#9794;";
        }
        spielerUntenRechtsGeschlechtDiv.appendChild(spielerUntenRechtsGeschlecht);
        
        spielerUntenRechtsInfo = window.document.getElementById("spielerUntenRechtsInfo");
        spielerUntenRechtsInfo.appendChild(spielerUntenRechtsPunktestand);
        spielerUntenRechtsInfo.appendChild(spielerUntenRechtsName);
        spielerUntenRechtsInfo.appendChild(spielerUntenRechtsGeschlechtDiv);
        spielerUntenRechtsInfo.style.right = "0px";
        spielerUntenRechtsInfo.style.bottom = infoOffset;
    };
    xhr.open("POST", "getDatei.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("datei=" + "3" + "spieler.txt");
}
