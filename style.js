var breiteEigeneHandkarten = 0;
var breiteEigeneOffeneKarten = 0;
var breiteSpielerObenLinksHandkarten = 0;
var breiteSpielerObenLinksOffeneKarten = 0;
var breiteSpielerObenRechtsHandkarten = 0;
var breiteSpielerObenRechtsOffeneKarten = 0;
var breiteSpielerUntenRechtsHandkarten = 0;
var breiteSpielerUntenRechtsOffeneKarten = 0;
var breiteStapelKarten = 0;
var breiteMitteKarten = 0;
var bottomOffsetEigeneHandkarten = -50;
var topOffsetFremdeHandkarten = 0;
var bottomOffsetFremdeHandkarten = 0;
var abstandZwischenKarten = 10;

const breiteFremdeHandkarten = 70;
const breiteFremdeOffeneKarten = 100;

groesseEigeneHandkartenAnpassen(100);
groesseEigeneOffeneKartenAnpassen(100);
groesseSpielerObenLinksHandkartenAnpassen(breiteFremdeHandkarten);
groesseSpielerObenLinksOffeneKartenAnpassen(breiteFremdeOffeneKarten);
groesseSpielerObenRechtsHandkartenAnpassen(breiteFremdeHandkarten);
groesseSpielerObenRechtsOffeneKartenAnpassen(breiteFremdeOffeneKarten);
groesseSpielerUntenRechtsHandkartenAnpassen(breiteFremdeHandkarten);
groesseSpielerUntenRechtsOffeneKartenAnpassen(breiteFremdeOffeneKarten);
groesseStapelAnpassen(100);
groesseMitteAnpassen(100);
spielstaendeErstellen();

function groesseEigeneHandkartenAnpassen(neueBreite) {
    breiteEigeneHandkarten = neueBreite;
    var eigeneHandkartenImBild = window.document.getElementsByClassName("eigeneHandkarte");
    for (var i = 0; i < eigeneHandkartenImBild.length; i++) {
        eigeneHandkartenImBild[i].style.width = breiteEigeneHandkarten + "px";
        eigeneHandkartenImBild[i].style.height = breiteEigeneHandkarten * 1.6 + "px";
    }
    window.document.getElementById("eigeneHandkarten").style.bottom = bottomOffsetEigeneHandkarten + "px";
    window.document.getElementById("eigeneHandkarten").style.left = "0px";
}

function groesseEigeneOffeneKartenAnpassen(neueBreite) {
    breiteEigeneOffeneKarten = neueBreite;
    var eigeneOffeneKartenImBild = window.document.getElementsByClassName("eigeneOffeneKarte");
    for (var i = 0; i < eigeneOffeneKartenImBild.length; i++) {
        eigeneOffeneKartenImBild[i].style.width = breiteEigeneOffeneKarten + "px";
        eigeneOffeneKartenImBild[i].style.height = breiteEigeneOffeneKarten * 1.6 + "px";
    }
    window.document.getElementById("eigeneOffeneKarten").style.bottom = (bottomOffsetEigeneHandkarten + breiteEigeneHandkarten * 1.6 + abstandZwischenKarten) + "px";
    window.document.getElementById("eigeneOffeneKarten").style.left = "0px";
}

function groesseSpielerObenLinksHandkartenAnpassen(neueBreite) {
    breiteSpielerObenLinksHandkarten = neueBreite;
    var spielerObenLinksHandkartenImBild = window.document.getElementsByClassName("spielerObenLinksHandkarte");
    for (var i = 0; i < spielerObenLinksHandkartenImBild.length; i++) {
        spielerObenLinksHandkartenImBild[i].style.width = breiteSpielerObenLinksHandkarten + "px";
        spielerObenLinksHandkartenImBild[i].style.height = breiteSpielerObenLinksHandkarten * 1.6 + "px";
    }
    window.document.getElementById("spielerObenLinksHandkarten").style.top = topOffsetFremdeHandkarten + "px";
    window.document.getElementById("spielerObenLinksHandkarten").style.left = "0px";
}

function groesseSpielerObenLinksOffeneKartenAnpassen(neueBreite) {
    breiteSpielerObenLinksOffeneKarten = neueBreite;
    var spielerObenLinksOffeneKartenImBild = window.document.getElementsByClassName("spielerObenLinksOffeneKarte");
    for (var i = 0; i < spielerObenLinksOffeneKartenImBild.length; i++) {
        spielerObenLinksOffeneKartenImBild[i].style.width = breiteSpielerObenLinksOffeneKarten + "px";
        spielerObenLinksOffeneKartenImBild[i].style.height = breiteSpielerObenLinksOffeneKarten * 1.6 + "px";
    }
    window.document.getElementById("spielerObenLinksOffeneKarten").style.top = (topOffsetFremdeHandkarten + breiteSpielerObenLinksHandkarten * 1.6 + abstandZwischenKarten) + "px";
    window.document.getElementById("spielerObenLinksOffeneKarten").style.left = "0px";
}

function groesseSpielerObenRechtsHandkartenAnpassen(neueBreite) {
    breiteSpielerObenRechtsHandkarten = neueBreite;
    var spielerObenRechtsHandkartenImBild = window.document.getElementsByClassName("spielerObenRechtsHandkarte");
    for (var i = 0; i < spielerObenRechtsHandkartenImBild.length; i++) {
        spielerObenRechtsHandkartenImBild[i].style.width = breiteSpielerObenRechtsHandkarten + "px";
        spielerObenRechtsHandkartenImBild[i].style.height = breiteSpielerObenRechtsHandkarten * 1.6 + "px";
    }
    window.document.getElementById("spielerObenRechtsHandkarten").style.top = topOffsetFremdeHandkarten + "px";
    window.document.getElementById("spielerObenRechtsHandkarten").style.right = "0px";
}

function groesseSpielerObenRechtsOffeneKartenAnpassen(neueBreite) {
    breiteSpielerObenRechtsOffeneKarten = neueBreite;
    var spielerObenRechtsOffeneKartenImBild = window.document.getElementsByClassName("spielerObenRechtsOffeneKarte");
    for (var i = 0; i < spielerObenRechtsOffeneKartenImBild.length; i++) {
        spielerObenRechtsOffeneKartenImBild[i].style.width = breiteSpielerObenRechtsOffeneKarten + "px";
        spielerObenRechtsOffeneKartenImBild[i].style.height = breiteSpielerObenRechtsOffeneKarten * 1.6 + "px";
    }
    window.document.getElementById("spielerObenRechtsOffeneKarten").style.top = (topOffsetFremdeHandkarten + breiteSpielerObenRechtsHandkarten * 1.6 + abstandZwischenKarten) + "px";
    window.document.getElementById("spielerObenRechtsOffeneKarten").style.right = "0px";
}

function groesseSpielerUntenRechtsHandkartenAnpassen(neueBreite) {
    breiteSpielerUntenRechtsHandkarten = neueBreite;
    var spielerUntenRechtsHandkartenImBild = window.document.getElementsByClassName("spielerUntenRechtsHandkarte");
    for (var i = 0; i < spielerUntenRechtsHandkartenImBild.length; i++) {
        spielerUntenRechtsHandkartenImBild[i].style.width = breiteSpielerUntenRechtsHandkarten + "px";
        spielerUntenRechtsHandkartenImBild[i].style.height = breiteSpielerUntenRechtsHandkarten * 1.6 + "px";
    }
    window.document.getElementById("spielerUntenRechtsHandkarten").style.bottom = bottomOffsetFremdeHandkarten + "px";
    window.document.getElementById("spielerUntenRechtsHandkarten").style.right = "0px";
}

function groesseSpielerUntenRechtsOffeneKartenAnpassen(neueBreite) {
    breiteSpielerUntenRechtsOffeneKarten = neueBreite;
    var spielerUntenRechtsOffeneKartenImBild = window.document.getElementsByClassName("spielerUntenRechtsOffeneKarte");
    for (var i = 0; i < spielerUntenRechtsOffeneKartenImBild.length; i++) {
        spielerUntenRechtsOffeneKartenImBild[i].style.width = breiteSpielerUntenRechtsOffeneKarten + "px";
        spielerUntenRechtsOffeneKartenImBild[i].style.height = breiteSpielerUntenRechtsOffeneKarten * 1.6 + "px";
    }
    window.document.getElementById("spielerUntenRechtsOffeneKarten").style.bottom = (bottomOffsetFremdeHandkarten + breiteSpielerUntenRechtsHandkarten * 1.6 + abstandZwischenKarten) + "px";
    window.document.getElementById("spielerUntenRechtsOffeneKarten").style.right = "0px";
}

function groesseStapelAnpassen(neueBreite) {
    breiteStapelKarten = neueBreite;
    var stapelKartenImBild = window.document.getElementsByClassName("stapelKarte");
    for (var i = 0; i < stapelKartenImBild.length; i++) {
        stapelKartenImBild[i].style.width = breiteStapelKarten + "px";
        stapelKartenImBild[i].style.height = breiteStapelKarten * 1.6 + "px";
    }
    window.document.getElementById("stapel").style.width = 4*breiteStapelKarten + "px";
}

function groesseMitteAnpassen(neueBreite) {
    breiteMitteKarten = neueBreite;
    window.document.getElementById("mitte").style.left = "50%";
    window.document.getElementById("mitte").style.top = "50%";
    window.document.getElementById("mitte").style.transform = "translate(-50%, -50%)";
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
        eigenesGeschlechtDiv.setAttribute("id", "geschlechtDiv" + getEigeneId());
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
        eigeneInfo.style.bottom = (2*abstandZwischenKarten + 1.6*(breiteEigeneHandkarten+breiteEigeneOffeneKarten) + bottomOffsetEigeneHandkarten) + "px";
        
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
        spielerObenLinksGeschlechtDiv.setAttribute("id", "geschlechtDiv" + (getEigeneId()+1)%4);
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
        spielerObenLinksInfo.style.top = (2*abstandZwischenKarten + 1.6*(breiteSpielerObenLinksHandkarten+breiteSpielerObenLinksOffeneKarten) + topOffsetFremdeHandkarten) + "px";
        
        
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
        spielerObenRechtsGeschlechtDiv.setAttribute("id", "geschlechtDiv" + (getEigeneId()+2)%4);
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
        spielerObenRechtsInfo.style.top = (2*abstandZwischenKarten + 1.6*(breiteSpielerObenRechtsHandkarten+breiteSpielerObenRechtsOffeneKarten) + topOffsetFremdeHandkarten) + "px";
        
        
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
        spielerUntenRechtsGeschlechtDiv.setAttribute("id", "geschlechtDiv" + (getEigeneId()+3)%4);
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
        spielerUntenRechtsInfo.style.bottom = (2*abstandZwischenKarten + 1.6*(breiteSpielerUntenRechtsHandkarten+breiteSpielerUntenRechtsOffeneKarten) + bottomOffsetFremdeHandkarten) + "px";
    };
    xhr.open("POST", "getDatei.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("datei=2spieler.txt");
}
