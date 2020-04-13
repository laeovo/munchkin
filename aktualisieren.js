const maximaleSpieldauerStunden = 0.5;
const maximaleSpieldauerMillisekunden = maximaleSpieldauerStunden * 3600000;

var spielerIntervall;
var kartenIntervall;

var eigeneHandkarten = [];
var eigeneOffeneKarten = [];

var spielerObenLinksHandkarten = [];
var spielerObenLinksOffeneKarten = [];

var spielerObenRechtsHandkarten = [];
var spielerObenRechtsOffeneKarten = [];

var spielerUntenRechtsHandkarten = [];
var spielerUntenRechtsOffeneKarten = [];

var mitte = [];

const anzahlTuerkarten = 162;

function getEigeneId() {
    const cookies = document.cookie.split("; ");
    for (var i = 0; i < cookies.length; i++) {
        var cookieParts = cookies[i].split("=");
        if (cookieParts[0] == "spielerId") {
            return parseInt(cookieParts[1]);
        }
    }
    return -1;
}

function automatischeSpielerAktualisierung() {
    spielerIntervall = setInterval(spielerAktualisieren, 3000);
}

function spielerAktualisieren() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        const data = this.responseText;
        const spieler = data.split('/');
        for (var i = 0; i < spieler.length; i++) {
            const spielerDaten = spieler[i].split(';');
            const name = spielerDaten[0];
            const neueStufe = spielerDaten[1];
            var anzeige = window.document.getElementById("punktestand" + i);
            if (anzeige.innerHTML != neueStufe) {
                if (parseInt(anzeige.innerHTML) < neueStufe) {
                    spielstandAufblinken(i, "gruen");
                }
                else {
                    spielstandAufblinken(i, "rot");
                }
                anzeige.innerHTML = neueStufe;
            }
        }
    };
    xhr.open("GET", "spieler.txt");
    xhr.send();
}

function spielstandAufblinken(spielerId, farbe) {
    // TODO blinken kann noch optimiert werden
    if (farbe == "rot") {
        for (let f = 0; f <= 20; f++) { // muss let sein, sonst funktioniert es nicht... :(
            setTimeout(function() {
                var wert = 1- (f * 0.05);
                window.document.getElementById("punktestand" + spielerId).style.backgroundColor = "rgba(255, 0, 0, " + wert + ")";
            }, f * 50);
        }
    }
    else {
        for (let f = 0; f <= 20; f++) { // muss let sein, sonst funktioniert es nicht... :(
            setTimeout(function() {
                var wert = 1- (f * 0.05);
                window.document.getElementById("punktestand" + spielerId).style.backgroundColor = "rgba(0, 255, 0, " + wert + ")";
            }, f * 50);
        }
    }
}

function automatischeKartenAktualisierung() {
    kartenAktualisieren();
    kartenIntervall = setInterval(kartenAktualisieren, 3000);
}

function kartenAktualisieren() {
    kartenregionAktualisierenWrapper("eigeneHandkarten");
    kartenregionAktualisierenWrapper("eigeneOffeneKarten");
    kartenregionAktualisierenWrapper("handkartenObenLinks");
    kartenregionAktualisierenWrapper("offeneKartenObenLinks");
    kartenregionAktualisierenWrapper("handkartenObenRechts");
    kartenregionAktualisierenWrapper("offeneKartenObenRechts");
    kartenregionAktualisierenWrapper("handkartenUntenRechts");
    kartenregionAktualisierenWrapper("offeneKartenUntenRechts");
    kartenregionAktualisierenWrapper("mitte");
    ablagestapelAktualisieren();
}

function kartenregionAktualisierenWrapper(region) {
    if (region == "eigeneHandkarten") {
        kartenregionAktualisieren("karten" + getEigeneId() + "verdeckt.txt", "eigeneHandkarte", "eigeneHandkarten", "handkarteMenu");
    }
    else if (region == "eigeneOffeneKarten") {
        kartenregionAktualisieren("karten" + getEigeneId() + "offen.txt", "eigeneOffeneKarte", "eigeneOffeneKarten", "eigeneOffeneKarteMenu");
    }
    else if (region == "handkartenObenLinks") {
        kartenregionAktualisieren("karten" + (getEigeneId()+1)%4 + "verdeckt.txt", "spielerObenLinksHandkarte", "spielerObenLinksHandkarten", ""); // TODO Aktion zum Ziehen hinzufügen, auch bei den anderen Spielern
    }
    else if (region == "offeneKartenObenLinks") {
        kartenregionAktualisieren("karten" + (getEigeneId()+1)%4 + "offen.txt", "spielerObenLinksOffeneKarte", "spielerObenLinksOffeneKarten", ""); // TODO Aktion zum Klauen hinzufügen, auch bei den anderen Spielern
    }
    else if (region == "handkartenObenRechts") {
        kartenregionAktualisieren("karten" + (getEigeneId()+2)%4 + "verdeckt.txt", "spielerObenRechtsHandkarte", "spielerObenRechtsHandkarten", "");
    }
    else if (region == "offeneKartenObenRechts") {
        kartenregionAktualisieren("karten" + (getEigeneId()+2)%4 + "offen.txt", "spielerObenRechtsOffeneKarte", "spielerObenRechtsOffeneKarten", "");
    }
    else if (region == "handkartenUntenRechts") {
        kartenregionAktualisieren("karten" + (getEigeneId()+3)%4 + "verdeckt.txt", "spielerUntenRechtsHandkarte", "spielerUntenRechtsHandkarten", "");
    }
    else if (region == "offeneKartenUntenRechts") {
        kartenregionAktualisieren("karten" + (getEigeneId()+3)%4 + "offen.txt", "spielerUntenRechtsOffeneKarte", "spielerUntenRechtsOffeneKarten", "");
    }
    else if (region == "mitte") {
        kartenregionAktualisieren("mitte.txt", "mitteKarte", "mitte", "mitteKarteMenu");
    }
    else {
        console.log("Für die Region '" + region + "' steht keine Aktualisierungsfunktion bereit :(");
    }
}

function kartenregionAktualisieren(dateiname, klasse, kontainer, menuAktion) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var kartenLautServer = this.responseText.split(";");
        if (kartenLautServer[0] == "") {
            kartenLautServer = [];
        }
        var neueKarten = [];
        var unveraenderteKarten = [];
        var gespielteKarten = [];
        var kartenLautBrowser = [];
        if (kontainer == "eigeneHandkarten") {
            kartenLautBrowser = eigeneHandkarten;
        }
        else if (kontainer == "eigeneOffeneKarten") {
            kartenLautBrowser = eigeneOffeneKarten;
        }
        else if (kontainer == "spielerObenLinksHandkarten") {
            kartenLautBrowser = spielerObenLinksHandkarten;
        }
        else if (kontainer == "spielerObenLinksOffeneKarten") {
            kartenLautBrowser = spielerObenLinksOffeneKarten;
        }
        else if (kontainer == "spielerObenRechtsHandkarten") {
            kartenLautBrowser = spielerObenRechtsHandkarten;
        }
        else if (kontainer == "spielerObenRechtsOffeneKarten") {
            kartenLautBrowser = spielerObenRechtsOffeneKarten;
        }
        else if (kontainer == "spielerUntenRechtsHandkarten") {
            kartenLautBrowser = spielerUntenRechtsHandkarten;
        }
        else if (kontainer == "spielerUntenRechtsOffeneKarten") {
            kartenLautBrowser = spielerUntenRechtsOffeneKarten;
        }
        else if (kontainer == "mitte") {
            kartenLautBrowser = mitte;
        }
        else {
            
        }
        
        for (var i = 0; i < kartenLautServer.length; i++) {
            if (kartenLautBrowser.includes(kartenLautServer[i])) {
                unveraenderteKarten.push(kartenLautServer[i]);
            }
            else {
                neueKarten.push(kartenLautServer[i]);
            }
        }
        for (var i = 0; i < kartenLautBrowser.length; i++) {
            if (!kartenLautServer.includes(kartenLautBrowser[i])) {
                gespielteKarten.push(kartenLautBrowser[i]);
            }
        }
        // Neue Karten hinzufügen
        const anzahlBisherigeKarten = unveraenderteKarten.length + gespielteKarten.length;
        for (var i = 0; i < neueKarten.length; i++) {
            neueKarte = document.createElement("div");
            neueKarte.setAttribute("id", klasse + neueKarten[i]);
            neueKarte.setAttribute("class", "karte " + klasse);
            window.document.getElementById(kontainer).appendChild(neueKarte);
            
            neuerKarteninhalt = document.createElement("img");
            if (kontainer == "spielerObenLinksHandkarten" || kontainer == "spielerObenRechtsHandkarten" || kontainer == "spielerUntenRechtsHandkarten") {
                if (neueKarten[i] < anzahlTuerkarten) {
                    neuerKarteninhalt.setAttribute("src", "karten/tuerkarte.jpg");
                }
                else {
                    neuerKarteninhalt.setAttribute("src", "karten/schatzkarte.jpg");
                }
            }
            else {
                neuerKarteninhalt.setAttribute("src", "karten/" + neueKarten[i] + ".jpg");
            }
            neuerKarteninhalt.setAttribute("width", breiteMitteKarten);
            neuerKarteninhalt.setAttribute("onclick", menuAktion + "(" + neueKarten[i] + ")");
            window.document.getElementById(klasse + neueKarten[i]).appendChild(neuerKarteninhalt);
        }
        
        // alte Karten entfernen
        for (var i = 0; i < gespielteKarten.length; i++) {
            window.document.getElementById(kontainer).removeChild(window.document.getElementById(klasse + gespielteKarten[i]));
        }
        
        // Array mit allen aktuellen Karten zusammenstellen
        aktuelleKarten = [];
        for (var i = 0; i < unveraenderteKarten.length; i++) {
            aktuelleKarten.push(unveraenderteKarten[i]);
        }
        for (var i = 0; i < neueKarten.length; i++) {
            aktuelleKarten.push(neueKarten[i]);
        }
        
        // speichern
        if (kontainer == "eigeneHandkarten") {
            eigeneHandkarten = aktuelleKarten;
        }
        else if (kontainer == "eigeneOffeneKarten") {
            eigeneOffeneKarten = aktuelleKarten;
        }
        else if (kontainer == "spielerObenLinksHandkarten") {
            spielerObenLinksHandkarten = aktuelleKarten;
        }
        else if (kontainer == "spielerObenLinksOffeneKarten") {
            spielerObenLinksOffeneKarten = aktuelleKarten;
        }
        else if (kontainer == "spielerObenRechtsHandkarten") {
            spielerObenRechtsHandkarten = aktuelleKarten;
        }
        else if (kontainer == "spielerObenRechtsOffeneKarten") {
            spielerObenRechtsOffeneKarten = aktuelleKarten;
        }
        else if (kontainer == "spielerUntenRechtsHandkarten") {
            spielerUntenRechtsHandkarten = aktuelleKarten;
        }
        else if (kontainer == "spielerUntenRechtsOffeneKarten") {
            spielerUntenRechtsOffeneKarten = aktuelleKarten;
        }
        else if (kontainer == "mitte") {
            mitte = aktuelleKarten;
        }
    }
    xhr.open("GET", dateiname);
    xhr.send();
}

function ablagestapelAktualisieren() {
    ablagestapelTuerAktualisieren();
    ablagestapelSchatzAktualisieren();
}

function ablagestapelTuerAktualisieren() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        const kartenString = this.responseText;
        const karten = kartenString.split(";");
        if (karten != "") { // Der Fall ohne Ablagestapel tritt nur am Anfang auf, da ansonsten immer mindestens fünf Karten pro Ablagestapel da liegen.
            window.document.getElementById("ablagestapelTuerBild").src = "karten/" + karten[karten.length-1] + ".jpg";
        }
    }
    xhr.open("GET", "ablagestapelTuer.txt");
    xhr.send();
}

function ablagestapelSchatzAktualisieren() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        const kartenString = this.responseText;
        const karten = kartenString.split(";");
        if (karten != "") { // Der Fall ohne Ablagestapel tritt nur am Anfang auf, da ansonsten immer mindestens fünf Karten pro Ablagestapel da liegen.
            window.document.getElementById("ablagestapelSchatzBild").src = "karten/" + karten[karten.length-1] + ".jpg";
        }
    }
    xhr.open("GET", "ablagestapelSchatz.txt");
    xhr.send();
}

function stop() {
    clearInterval(spielerIntervall);
    clearInterval(kartenIntervall);
    console.log("Stop");
}

function autostop() {
    var minuten = 10; // TODO ändern
    setTimeout(function() {
        console.log("Automatischer Stop nach " + minuten + " Minuten");
        stop();
    }, 60000*minuten);
}
