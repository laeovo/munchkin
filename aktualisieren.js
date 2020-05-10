// Intervalle zum Aktualisieren, werden nachher gesetzt. Müssen global sein, um angehalten werden zu können
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

// wird benötigt, um die Rückseite der Handkarten der anderen Spieler zu bestimmen
const anzahlTuerkarten = 10;

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

function karteIstGeflaggt(kartenId, kontainer) {
    for (var i = 0; i < kontainer.length; i++) {
        const karte = kontainer[i].split("x")[0];
        if (karte == kartenId) {
            if (kontainer[i].split("x").length > 1) {
                return true;
            }
        }
    }
    return false;
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
            var anzeigeStufe = window.document.getElementById("punktestand" + i);
            if (anzeigeStufe.innerHTML != neueStufe) {
                if (parseInt(anzeigeStufe.innerHTML) < neueStufe) {
                    spielstandAufblinken(i, "gruen");
                }
                else {
                    spielstandAufblinken(i, "rot");
                }
                anzeigeStufe.innerHTML = neueStufe; // darf erst jetzt passieren, damit der Stufenvergleich weiter oben hinhaut
            }
            const neuesGeschlecht = spielerDaten[2];
            var anzeigeGeschlecht = window.document.getElementById("geschlechtHidden" + i);
            if (anzeigeGeschlecht.innerHTML != neuesGeschlecht) {
                anzeigeGeschlecht.innerHTML = neuesGeschlecht;
                if (neuesGeschlecht == "w") {
                    window.document.getElementById("geschlecht" + i).innerHTML = "&#9792;";
                }
                else {
                    window.document.getElementById("geschlecht" + i).innerHTML = "&#9794;";
                }
                geschlechtBlinken(i);
            }
        }
    };
    xhr.open("POST", "getDatei.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("datei=2spieler.txt");
}

function spielstandAufblinken(spielerId, farbe) {
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

function geschlechtBlinken(spielerId) {
    for (let f = 0; f <= 20; f++) { // muss let sein, sonst funktioniert es nicht... :(
        setTimeout(function() {
            var wert = 1- (f * 0.05);
            window.document.getElementById("geschlecht" + spielerId).style.backgroundColor = "rgba(0, 0, 255, " + wert + ")";
        }, f * 50);
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
        kartenregionAktualisieren("karten" + (getEigeneId()+1)%4 + "verdeckt.txt", "spielerObenLinksHandkarte", "spielerObenLinksHandkarten", "fremdeHandkarteMenu");
    }
    else if (region == "offeneKartenObenLinks") {
        kartenregionAktualisieren("karten" + (getEigeneId()+1)%4 + "offen.txt", "spielerObenLinksOffeneKarte", "spielerObenLinksOffeneKarten", "fremdeOffeneKarteMenu");
    }
    else if (region == "handkartenObenRechts") {
        kartenregionAktualisieren("karten" + (getEigeneId()+2)%4 + "verdeckt.txt", "spielerObenRechtsHandkarte", "spielerObenRechtsHandkarten", "fremdeHandkarteMenu");
    }
    else if (region == "offeneKartenObenRechts") {
        kartenregionAktualisieren("karten" + (getEigeneId()+2)%4 + "offen.txt", "spielerObenRechtsOffeneKarte", "spielerObenRechtsOffeneKarten", "fremdeOffeneKarteMenu");
    }
    else if (region == "handkartenUntenRechts") {
        kartenregionAktualisieren("karten" + (getEigeneId()+3)%4 + "verdeckt.txt", "spielerUntenRechtsHandkarte", "spielerUntenRechtsHandkarten", "fremdeHandkarteMenu");
    }
    else if (region == "offeneKartenUntenRechts") {
        kartenregionAktualisieren("karten" + (getEigeneId()+3)%4 + "offen.txt", "spielerUntenRechtsOffeneKarte", "spielerUntenRechtsOffeneKarten", "fremdeOffeneKarteMenu");
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
            const karteLautServer = kartenLautServer[i];
            if (kartenLautBrowser.includes(karteLautServer)) {
                unveraenderteKarten.push(karteLautServer);
            }
            else if (kartenLautBrowser.includes(karteLautServer + "x")) {
                // Karte ist im Browser geflaggt, im Server aber nicht mehr
                objektFlaggen(window.document.getElementById(klasse + karteLautServer), false);
                unveraenderteKarten.push(karteLautServer);
            }
            else if (kartenLautBrowser.includes(karteLautServer.split("x")[0])) {
                // Karte wurde im Server geflaggt, im Browser aber noch nicht
                objektFlaggen(window.document.getElementById(klasse + karteLautServer.split("x")[0]), true);
                unveraenderteKarten.push(karteLautServer);
            }
            else {
                neueKarten.push(kartenLautServer[i]);
            }
        }
        for (var i = 0; i < kartenLautBrowser.length; i++) {
            const karteLautBrowser = kartenLautBrowser[i].split("x")[0];
            var karteImServerEnthalten = false;
            for (var j = 0; j < kartenLautServer.length; j++) {
                const karteLautServer = kartenLautServer[j].split("x")[0];
                if (karteLautServer == karteLautBrowser) {
                    karteImServerEnthalten = true;
                }
            }
            if (!karteImServerEnthalten) {
                gespielteKarten.push(karteLautBrowser);
            }
        }
        // Neue Karten hinzufügen
        const anzahlBisherigeKarten = unveraenderteKarten.length + gespielteKarten.length;
        for (var i = 0; i < neueKarten.length; i++) {
            neueKarte = document.createElement("div");
            neueKarte.setAttribute("id", klasse + neueKarten[i].split("x")[0]);
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
                neuerKarteninhalt.setAttribute("src", "karten/" + neueKarten[i].split("x")[0] + ".jpg");
            }
            if (kontainer == "eigeneHandkarten") {
                neuerKarteninhalt.setAttribute("width", breiteEigeneHandkarten);
            }
            else if (kontainer == "eigeneOffeneKarten") {
                neuerKarteninhalt.setAttribute("width", breiteEigeneOffeneKarten);
            }
            else if (kontainer == "spielerObenLinksHandkarten") {
                neuerKarteninhalt.setAttribute("width", breiteSpielerObenLinksHandkarten);
            }
            else if (kontainer == "spielerObenLinksOffeneKarten") {
                neuerKarteninhalt.setAttribute("width", breiteSpielerObenLinksOffeneKarten);
            }
            else if (kontainer == "spielerObenRechtsHandkarten") {
                neuerKarteninhalt.setAttribute("width", breiteSpielerObenRechtsHandkarten);
            }
            else if (kontainer == "spielerObenRechtsOffeneKarten") {
                neuerKarteninhalt.setAttribute("width", breiteSpielerObenRechtsOffeneKarten);
            }
            else if (kontainer == "spielerUntenRechtsHandkarten") {
                neuerKarteninhalt.setAttribute("width", breiteSpielerUntenRechtsHandkarten);
            }
            else if (kontainer == "spielerUntenRechtsOffeneKarten") {
                neuerKarteninhalt.setAttribute("width", breiteSpielerUntenRechtsOffeneKarten);
            }
            else if (kontainer == "mitte") {
                neuerKarteninhalt.setAttribute("width", breiteMitteKarten);
            }
            if (menuAktion == "fremdeOffeneKarteMenu") {
                if (kontainer == "spielerObenLinksOffeneKarten") {
                    neuerKarteninhalt.setAttribute("onclick", menuAktion + "(" + neueKarten[i].split("x")[0] + ", " + (getEigeneId()+1)%4 + ")");
                }
                else if (kontainer == "spielerObenRechtsOffeneKarten") {
                    neuerKarteninhalt.setAttribute("onclick", menuAktion + "(" + neueKarten[i].split("x")[0] + ", " + (getEigeneId()+2)%4 + ")");
                }
                else if (kontainer == "spielerUntenRechtsOffeneKarten") {
                    neuerKarteninhalt.setAttribute("onclick", menuAktion + "(" + neueKarten[i].split("x")[0] + ", " + (getEigeneId()+3)%4 + ")");
                }
            }
            else if (menuAktion == "fremdeHandkarteMenu") {
                if (kontainer == "spielerObenLinksHandkarten") {
                    neuerKarteninhalt.setAttribute("onclick", menuAktion + "(" + (getEigeneId()+1)%4 + ")");
                }
                else if (kontainer == "spielerObenRechtsHandkarten") {
                    neuerKarteninhalt.setAttribute("onclick", menuAktion + "(" + (getEigeneId()+2)%4 + ")");
                }
                else if (kontainer == "spielerUntenRechtsHandkarten") {
                    neuerKarteninhalt.setAttribute("onclick", menuAktion + "(" + (getEigeneId()+3)%4 + ")");
                }
            }
            else {
                neuerKarteninhalt.setAttribute("onclick", menuAktion + "(" + neueKarten[i].split("x")[0] + ")");
            }
            window.document.getElementById(klasse + neueKarten[i].split("x")[0]).appendChild(neuerKarteninhalt);
            if (neueKarten[i].split("x").length == 2) {
                objektFlaggen(neueKarte, true);
            }
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
    xhr.open("POST", "getDatei.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("datei=2" + dateiname);
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
    xhr.open("POST", "getDatei.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("datei=2ablagestapelTuer.txt");
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
    xhr.open("POST", "getDatei.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("datei=2ablagestapelSchatz.txt");
}

function stop() {
    clearInterval(spielerIntervall);
    clearInterval(kartenIntervall);
    console.log("Stop");
}

function autostop() {
    var minuten = 180;
    setTimeout(function() {
        console.log("Automatischer Stop nach " + minuten + " Minuten");
        stop();
    }, 60000*minuten);
}

function objektFlaggen(objekt, jaodernein) {
    var bild = objekt.children[0];
    const kontainerId = objekt.parentNode.id;
    if (jaodernein) {
        if (kontainerId == "eigeneOffeneKarten") {
            bild.style.transform = "rotate(90deg)";
            objekt.style.padding = "0px " + 0.3*breiteEigeneOffeneKarten + "px";
        }
        else if (kontainerId == "spielerObenLinksOffeneKarten") {
            bild.style.transform = "rotate(90deg)";
            objekt.style.padding = "0px " + 0.3*breiteSpielerObenLinksOffeneKarten + "px";
        }
        else if (kontainerId == "spielerObenRechtsOffeneKarten") {
            bild.style.transform = "rotate(90deg)";
            objekt.style.padding = "0px " + 0.3*breiteSpielerObenRechtsOffeneKarten + "px";
        }
        else if (kontainerId == "spielerUntenRechtsOffeneKarten") {
            bild.style.transform = "rotate(90deg)";
            objekt.style.padding = "0px " + 0.3*breiteSpielerUntenRechtsOffeneKarten + "px";
        }
        else if (kontainerId == "mitte") {
            objekt.style.padding = "20px 0px 0px 0px";
        }
    }
    else {
        bild.style.transform = "rotate(0deg)";
        objekt.style.padding = "0px";
    }
}
