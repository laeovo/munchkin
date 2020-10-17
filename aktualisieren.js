// Intervalle zum Aktualisieren, werden nachher gesetzt. Müssen global sein, um angehalten werden zu können
var spielerIntervall;
var kartenIntervall;

// Kartenregionen
var eigeneHandkarten = [];
var eigeneOffeneKarten = [];

var spielerObenLinksHandkarten = [];
var spielerObenLinksOffeneKarten = [];

var spielerObenRechtsHandkarten = [];
var spielerObenRechtsOffeneKarten = [];

var spielerUntenRechtsHandkarten = [];
var spielerUntenRechtsOffeneKarten = [];

var mitte = [];

var nachziehstapelTuer = [];
var nachziehstapelSchatz = [];
var ablagestapelTuer = [];
var ablagestapelSchatz = [];

function istTuerkarte(kartenNr) {
    if (kartenNr <= 160) {
        return true;
    }
    else if (kartenNr <= 281) {
        return false;
    }
    else if (kartenNr <= 447) {
        return true;
    }
    else if (kartenNr <= 559) {
        return false;
    }
    console.log("Karte " + kartenNr + " ist überhaupt keine Karte");
    return false;
}

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
    xhr.send("datei=" + "3" + "spieler.txt");
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
//    kartenregionAktualisierenWrapper("eigeneOffeneKarten");
//    kartenregionAktualisierenWrapper("handkartenObenLinks");
//    kartenregionAktualisierenWrapper("offeneKartenObenLinks");
//    kartenregionAktualisierenWrapper("handkartenObenRechts");
//    kartenregionAktualisierenWrapper("offeneKartenObenRechts");
//    kartenregionAktualisierenWrapper("handkartenUntenRechts");
//    kartenregionAktualisierenWrapper("offeneKartenUntenRechts");
    kartenregionAktualisierenWrapper("mitte");
    kartenregionAktualisierenWrapper("nachziehstapelTuer");
    kartenregionAktualisierenWrapper("nachziehstapelSchatz");
    kartenregionAktualisierenWrapper("ablagestapelTuer");
    kartenregionAktualisierenWrapper("ablagestapelSchatz");
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
    else if (region == "nachziehstapelTuer") {
        // TODO: implementieren
    }
    else if (region == "nachziehstapelSchatz") {
        // TODO: implementieren
    }
    else if (region == "ablagestapelTuer") {
        // TODO: implementieren
    }
    else if (region == "ablagestapelSchatz") {
        // TODO: implementieren
    }
    else {
        console.log("Für die Region '" + region + "' steht keine Aktualisierungsfunktion bereit :(");
    }
}

function kartenregionAktualisieren(dateiname, klasse, kontainer, menuAktion) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
//        console.log(this.responseText);
        var kartenspacesLautBrowser = [];
        var kartenLautBrowser = [];
        var kartenspacesLautServer = this.responseText.split("/");
        if (kartenspacesLautServer[0] == "") {
            kartenspacesLautServer = [];
        }
        var kartenLautServer = [];
        
        if (kontainer == "eigeneHandkarten") {
            kartenspacesLautBrowser = eigeneHandkarten;
        }
        else if (kontainer == "eigeneOffeneKarten") {
            kartenspacesLautBrowser = eigeneOffeneKarten;
        }
        else if (kontainer == "spielerObenLinksHandkarten") {
            kartenspacesLautBrowser = spielerObenLinksHandkarten;
        }
        else if (kontainer == "spielerObenLinksOffeneKarten") {
            kartenspacesLautBrowser = spielerObenLinksOffeneKarten;
        }
        else if (kontainer == "spielerObenRechtsHandkarten") {
            kartenspacesLautBrowser = spielerObenRechtsHandkarten;
        }
        else if (kontainer == "spielerObenRechtsOffeneKarten") {
            kartenspacesLautBrowser = spielerObenRechtsOffeneKarten;
        }
        else if (kontainer == "spielerUntenRechtsHandkarten") {
            kartenspacesLautBrowser = spielerUntenRechtsHandkarten;
        }
        else if (kontainer == "spielerUntenRechtsOffeneKarten") {
            kartenspacesLautBrowser = spielerUntenRechtsOffeneKarten;
        }
        else if (kontainer == "mitte") {
            kartenspacesLautBrowser = mitte;
        }
        else {
            console.log("Kontainer existiert nicht");
        }
        
        console.log("Kartenspaces laut Browser für " + kontainer + ": " + kartenspacesLautBrowser);
        
        for (let i = 0; i < kartenspacesLautBrowser.length; i++) {
            const kartenImKartenspace = kartenspacesLautBrowser[i].split(";");
            for (let j = 0; j < kartenImKartenspace.length; j++) {
                kartenLautBrowser.push(kartenImKartenspace[j]);
            }
        }
        for (let i = 0; i < kartenspacesLautServer.length; i++) {
            const kartenImKartenspace = kartenspacesLautServer[i].split(";");
            for (let j = 0; j < kartenImKartenspace.length; j++) {
                kartenLautServer.push(kartenImKartenspace[j]);
            }
        }
        
        // neue Karten finden und erzeugen
        var aktuelleKarten = [];
        var neueKarten = [];
        console.log("Kontainer: " + kontainer + ", Karten laut Server: " + kartenLautServer);
        console.log("Kontainer: " + kontainer + ", Karten laut Browser: " + kartenLautBrowser);
        for (let i = 0; i < kartenLautServer.length; i++) {
            aktuelleKarten.push(kartenLautServer[i]);
            var karteExistiertSchonImBrowser = false;
            for (let j = 0; j < kartenLautBrowser.length; j++) {
                if (kartenLautServer[i].split("x")[0] == kartenLautBrowser[j].split("x")[0]) {
                    karteExistiertSchonImBrowser = true;
                    console.log("Karte " + kartenLautServer[i] + " existiert schon im Browser");
                    break;
                }
            }
            if (!karteExistiertSchonImBrowser) {
                // Karte erzeugen und erstmal dem Kontainer anhängen
                neueKarten.push(kartenLautServer[i]);
                var neueKarte = document.createElement("div");
                neueKarte.setAttribute("id", kartenLautServer[i].split("x")[0]);
                neueKarte.setAttribute("class", "karte");
                neueKarte.style.float = "left"; // TODO: Float automatisieren? --> evtl in style.css: .karte {float: left}
                if (kontainer.split("Handkarten").length == 2 && kontainer != "eigeneHandkarten") {
                    if (istTuerkarte(kartenLautServer[i].split("x")[0])) {
                        neueKarte.style.backgroundImage = "url('karten/tuerkarte.jpg')";
                    }
                    else {
                        neueKarte.style.backgroundImage = "url('karten/schatzkarte.jpg')";
                    }
                }
                else {
                    neueKarte.style.backgroundImage = "url('karten/" + kartenLautServer[i].split("x")[0] + ".jpg')";
                }
                neueKarte.style.width = "100px"; // TODO: generalisieren
                neueKarte.style.height = "160px";
                schaltflaeche = document.createElement("div"); // TODO: Schalfläche doch lieber als Bild? Könnte man dann leichter drehen..
                schaltflaeche.setAttribute("class", "kartenSchaltflaeche");
                if (menuAktion == "fremdeOffeneKarteMenu") {
                    if (kontainer == "spielerObenLinksOffeneKarten") {
                        schaltflaeche.setAttribute("onclick", menuAktion + "(" + kartenLautServer[i].split("x")[0] + ", " + (getEigeneId()+1)%4 + ")");
                    }
                    else if (kontainer == "spielerObenRechtsOffeneKarten") {
                        schaltflaeche.setAttribute("onclick", menuAktion + "(" + kartenLautServer[i].split("x")[0] + ", " + (getEigeneId()+2)%4 + ")");
                    }
                    else if (kontainer == "spielerUntenRechtsOffeneKarten") {
                        schaltflaeche.setAttribute("onclick", menuAktion + "(" + kartenLautServer[i].split("x")[0] + ", " + (getEigeneId()+3)%4 + ")");
                    }
                }
                else if (menuAktion == "fremdeHandkarteMenu") {
                    if (kontainer == "spielerObenLinksHandkarten") {
                        schaltflaeche.setAttribute("onclick", menuAktion + "(" + (getEigeneId()+1)%4 + ")");
                    }
                    else if (kontainer == "spielerObenRechtsHandkarten") {
                        schaltflaeche.setAttribute("onclick", menuAktion + "(" + (getEigeneId()+2)%4 + ")");
                    }
                    else if (kontainer == "spielerUntenRechtsHandkarten") {
                        schaltflaeche.setAttribute("onclick", menuAktion + "(" + (getEigeneId()+3)%4 + ")");
                    }
                }
                else {
                    schaltflaeche.setAttribute("onclick", menuAktion + "(" + kartenLautServer[i].split("x")[0] + ")");
                }
                neueKarte.appendChild(schaltflaeche);
                document.getElementById(kontainer).appendChild(neueKarte);
            }
        }
        
        // alte Karten entfernen, dabei Kinder in Ruhe lassen
        for (let i = 0; i < kartenLautBrowser.length; i++) {
            var karteExistiertNochAufServer = false;
            for (let j = 0; j < kartenLautServer.length; j++) {
                if (kartenLautBrowser[i].split("x")[0] == kartenLautServer[j].split("x")[0]) {
                    karteExistiertNochAufServer = true;
                    break;
                }
            }
            if (!karteExistiertNochAufServer) {
                if (document.getElementById(kartenLautBrowser[i].split("x")[0]).children.length == 2) {
                    document.getElementById(kartenLautBrowser[i].split("x")[0]).parentElement.appendChild(document.getElementById(kartenLautBrowser[i].split("x")[0]).children[1]);
                }
                console.log(document.getElementById(kartenLautBrowser[i].split("x")[0]).parentElement);
                document.getElementById(kartenLautBrowser[i].split("x")[0]).parentElement.removeChild(document.getElementById(kartenLautBrowser[i].split("x")[0]));
            }
        }
        
        // geflaggte Karten behandeln
        
        // Kartenspaces zusammenstellen und Reihenfolge fixen
        
        // speichern
//        const aktuelleKarten = neueKarten;
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
            if (window.document.getElementById("aufraeumenButton")) {
                window.document.getElementById("mitte").removeChild(window.document.getElementById("aufraeumenButton"));
            }
            if (aktuelleKarten.length >= 4) {
                aufraeumenButton();
            }
        }
        
        
        
//
//        for (var i = 0; i < kartenspacesLautServer.length; i++) {
//            const karteLautServer = kartenspacesLautServer[i];
//            if (kartenLautBrowser.includes(karteLautServer)) {
//                unveraenderteKarten.push(karteLautServer);
//            }
//            else if (kartenLautBrowser.includes(karteLautServer + "x")) {
//                // Karte ist im Browser geflaggt, im Server aber nicht mehr
//                objektFlaggen(window.document.getElementById(karteLautServer), false);
//                unveraenderteKarten.push(karteLautServer);
//            }
//            else if (kartenLautBrowser.includes(karteLautServer.split("x")[0])) {
//                // Karte wurde im Server geflaggt, im Browser aber noch nicht
//                objektFlaggen(window.document.getElementById(karteLautServer.split("x")[0]), true);
//                unveraenderteKarten.push(karteLautServer);
//            }
//            else {
//                neueKarten.push(kartenspacesLautServer[i]);
//            }
//        }
//        for (var i = 0; i < kartenLautBrowser.length; i++) {
//            const karteLautBrowser = kartenLautBrowser[i].split("x")[0];
//            var karteImServerEnthalten = false;
//            for (var j = 0; j < kartenspacesLautServer.length; j++) {
//                const karteLautServer = kartenspacesLautServer[j].split("x")[0];
//                if (karteLautServer == karteLautBrowser) {
//                    karteImServerEnthalten = true;
//                }
//            }
//            if (!karteImServerEnthalten) {
//                gespielteKarten.push(karteLautBrowser);
//            }
//        }


//
//        // Array mit allen aktuellen Karten zusammenstellen
//        aktuelleKarten = [];
//        for (var i = 0; i < unveraenderteKarten.length; i++) {
//            aktuelleKarten.push(unveraenderteKarten[i]);
//        }
//        for (var i = 0; i < neueKarten.length; i++) {
//            aktuelleKarten.push(neueKarten[i]);
//        }
//

    }
    xhr.open("POST", "getDatei.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("datei=" + "3" + dateiname);
}

function aufraeumenButton() {
    button = document.createElement("div");
    button.setAttribute("id", "aufraeumenButton");
    button.setAttribute("align", "center");
    button.setAttribute("onclick", "mitteAufraeumen()");
    button.style.width = breiteMitteKarten;
    button.style.height = breiteMitteKarten * 1.6;
    button.innerHTML = "Aufräumen";
    window.document.getElementById("mitte").appendChild(button);
}

function mitteAufraeumen() {
    for (var i = 0; i < mitte.length; i++) {
        karteAblegen(mitte[i], "mitte");
    }
}

function ablagestapelAktualisieren(stapel) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        const kartenString = this.responseText;
        const karten = kartenString.split(";");
        if (karten != "") { // Der Fall ohne Ablagestapel tritt nur am Anfang auf, da ansonsten immer mindestens fünf Karten pro Ablagestapel da liegen.
            window.document.getElementById("ablagestapel" + stapel + "Bild").src = "karten/" + karten[karten.length-1] + ".jpg";
        }
        else {
            window.document.getElementById("ablagestapel" + stapel + "Bild").src = "karten/leererAblagestapel.png";
        }
    }
    xhr.open("POST", "getDatei.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("datei=" + "3" + "ablagestapel" + stapel + ".txt");
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
    // TODO: richtig implementieren
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
