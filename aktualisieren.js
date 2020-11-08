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

function getKartenArt(kartenId) {
    if (istTuerkarte(kartenId)) {
        return "Tuer";
    }
    else {
        return "Schatz";
    }
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

function getRegionName(dateiName) {
    if (dateiName.includes("karten")) {
        const spielerId = parseInt(dateiName.charAt(6));
        if (dateiName.includes("verdeckt")) {
            switch((spielerId-getEigeneId()+4)%4) {
                case 0:
                    return "eigeneHandkarten";
                    break;
                case 1:
                    return "spielerObenLinksHandkarten";
                    break;
                case 2:
                    return "spielerObenRechtsHandkarten";
                    break;
                case 3:
                    return "spielerUntenRechtsHandkarten";
                    break;
            }
        }
        else if (dateiName.includes("offen")) {
            switch((spielerId-getEigeneId()+4)%4) {
                case 0:
                    return "eigeneOffeneKarten";
                    break;
                case 1:
                    return "spielerObenLinksOffeneKarten";
                    break;
                case 2:
                    return "spielerObenRechtsOffeneKarten";
                    break;
                case 3:
                    return "spielerUntenRechtsOffeneKarten";
                    break;
            }
        }
        else {
            console.log("Ungültiger Dateiname: '" + dateiName + "'");
            return "ungueltigeRegion";
        }
    }
    else {
        return dateiName;
    }
}

function getDateiname(region) {
    if (region == "mitte") {
        return "mitte";
    }
    else if (region == "eigeneHandkarten") {
        return "karten" + getEigeneId() + "verdeckt";
    }
    else if (region == "eigeneOffeneKarten") {
        return "karten" + getEigeneId() + "offen";
    }
    else if (region == "spielerObenLinksHandkarten") {
        return "karten" + (getEigeneId()+1)%4 + "verdeckt";
    }
    else if (region == "spielerObenLinksOffeneKarten") {
        return "karten" + (getEigeneId()+1)%4 + "offen";
    }
    else if (region == "spielerObenRechtsHandkarten") {
        return "karten" + (getEigeneId()+2)%4 + "verdeckt";
    }
    else if (region == "spielerObenRechtsOffeneKarten") {
        return "karten" + (getEigeneId()+2)%4 + "offen";
    }
    else if (region == "spielerUntenRechtsHandkarten") {
        return "karten" + (getEigeneId()+3)%4 + "verdeckt";
    }
    else if (region == "spielerUntenRechtsOffeneKarten") {
        return "karten" + (getEigeneId()+3)%4 + "offen";
    }
    else {
        console.log("Die Region " + region + " kenne ich nicht... Joa, da stimmt irgendwas nicht");
    }
}

function getRegion(kartenId) {
    if (document.getElementById(kartenId) == null) {
        console.log("getRegion:: kartenId '" + kartenId + "' existiert nicht auf dem Feld");
        return "";
    }
    var region = kartenId;
    while (!isNaN(region)) {
        region = document.getElementById(region).parentElement.id;
    }
    return region;
}

function haengtAn(karte1, karte2) {
    var karteObjekt = document.getElementById(karte1);
    while (!isNaN(karteObjekt.id)) {
        karteObjekt = karteObjekt.parentElement;
        if (karteObjekt.id == karte2) {
            return true;
        }
    }
    return false;
}

function selberKartenspace(karte1, karte2) {
    if (isNaN(karte1) || isNaN(karte2)) {
        return false;
    }
    return haengtAn(karte1, karte2) || haengtAn(karte2, karte1);
}

function karteIstGeflaggt(kartenId) {
    var kartenInDerRegion = [];
    if (getRegion(kartenId) == "mitte") {
        kartenInDerRegion = mitte;
    }
    else if (getRegion(kartenId) == "eigeneOffeneKarten") {
        kartenInDerRegion = eigeneOffeneKarten;
    }
    else {
        // TODO: ...?
        console.log("Die Funktion 'karteIstGeflaggt' geht nicht davon aus, dass die Karte in der Region '" + getRegion(kartenId) + "' liegt");
    }
    for (var i = 0; i < kartenInDerRegion.length; i++) {
        const kartenspace = kartenInDerRegion[i];
        const kartenImKartenspace = kartenspace.split(";");
        for (let i = 0; i < kartenImKartenspace.length; i++) {
            if (kartenImKartenspace[i] == kartenId + "x") {
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
    kartenregionAktualisierenWrapper("eigeneOffeneKarten");
    kartenregionAktualisierenWrapper("spielerObenLinksHandkarten");
    kartenregionAktualisierenWrapper("spielerObenLinksOffeneKarten");
    kartenregionAktualisierenWrapper("spielerObenRechtsHandkarten");
    kartenregionAktualisierenWrapper("spielerObenRechtsOffeneKarten");
    kartenregionAktualisierenWrapper("spielerUntenRechtsHandkarten");
    kartenregionAktualisierenWrapper("spielerUntenRechtsOffeneKarten");
    kartenregionAktualisierenWrapper("mitte");
    kartenregionAktualisierenWrapper("nachziehstapelTuer");
    kartenregionAktualisierenWrapper("nachziehstapelSchatz");
    kartenregionAktualisierenWrapper("ablagestapelTuer");
    kartenregionAktualisierenWrapper("ablagestapelSchatz");
}

function kartenregionAktualisierenWrapper(region) {
    if (region == "eigeneHandkarten") {
        kartenregionAktualisieren("karten" + getEigeneId() + "verdeckt.txt", "eigeneHandkarten");
    }
    else if (region == "eigeneOffeneKarten") {
        kartenregionAktualisieren("karten" + getEigeneId() + "offen.txt", "eigeneOffeneKarten");
    }
    else if (region == "spielerObenLinksHandkarten") {
        kartenregionAktualisieren("karten" + (getEigeneId()+1)%4 + "verdeckt.txt", "spielerObenLinksHandkarten");
    }
    else if (region == "spielerObenLinksOffeneKarten") {
        kartenregionAktualisieren("karten" + (getEigeneId()+1)%4 + "offen.txt", "spielerObenLinksOffeneKarten");
    }
    else if (region == "spielerObenRechtsHandkarten") {
        kartenregionAktualisieren("karten" + (getEigeneId()+2)%4 + "verdeckt.txt", "spielerObenRechtsHandkarten");
    }
    else if (region == "spielerObenRechtsOffeneKarten") {
        kartenregionAktualisieren("karten" + (getEigeneId()+2)%4 + "offen.txt", "spielerObenRechtsOffeneKarten");
    }
    else if (region == "spielerUntenRechtsHandkarten") {
        kartenregionAktualisieren("karten" + (getEigeneId()+3)%4 + "verdeckt.txt", "spielerUntenRechtsHandkarten");
    }
    else if (region == "spielerUntenRechtsOffeneKarten") {
        kartenregionAktualisieren("karten" + (getEigeneId()+3)%4 + "offen.txt", "spielerUntenRechtsOffeneKarten");
    }
    else if (region == "mitte") {
        kartenregionAktualisieren("mitte.txt", "mitte");
    }
    else if (region == "nachziehstapelTuer") {
        // nichts zu tun
    }
    else if (region == "nachziehstapelSchatz") {
        // nichts zu tun
    }
    else if (region == "ablagestapelTuer") {
        ablagestapelAktualisieren("Tuer");
    }
    else if (region == "ablagestapelSchatz") {
        ablagestapelAktualisieren("Schatz");
    }
    else {
        console.log("Für die Region '" + region + "' steht keine Aktualisierungsfunktion bereit :(");
    }
}

function kartenregionAktualisieren(dateiname, kontainer) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
//        console.log(this.responseText);
        var kartenspacesLautServer = [];
        var kartenLautServer = [];
        var kartenspacesLautBrowser = [];
        var kartenLautBrowser = [];
        
        kartenspacesLautServer = this.responseText.split("/");
        if (kartenspacesLautServer[0] == "") {
            kartenspacesLautServer = [];
        }
        
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
        
        for (let i = 0; i < kartenspacesLautServer.length; i++) {
            const kartenImKartenspace = kartenspacesLautServer[i].split(";");
            for (let j = 0; j < kartenImKartenspace.length; j++) {
                kartenLautServer.push(kartenImKartenspace[j]);
            }
        }
        for (let i = 0; i < kartenspacesLautBrowser.length; i++) {
            const kartenImKartenspace = kartenspacesLautBrowser[i].split(";");
            for (let j = 0; j < kartenImKartenspace.length; j++) {
                kartenLautBrowser.push(kartenImKartenspace[j]);
            }
        }
        
        for (let i = 0; i < kartenLautServer.length; i++) {
            let kartenIdServer = kartenLautServer[i].split("x")[0];
            var karteExistiertSchonImBrowser = false;
            for (let j = 0; j < kartenLautBrowser.length; j++) {
                let kartenIdBrowser = kartenLautBrowser[j].split("x")[0];
                if (kartenIdServer == kartenIdBrowser) {
                    karteExistiertSchonImBrowser = true;
                    break;
                }
            }
            if (!karteExistiertSchonImBrowser) {
                let karte = document.getElementById(kartenIdServer);
                if (karte != null) {
//                    console.log("Die karte " + kartenIdServer + " existiert schon irgendwo!");
                    // Karte existiert schon irgendwo --> klauen
                    if (karte.children.length == 2) {
                        // Falls die Karte Kinder hat, werden die erstmal dem Parent der Karte angehängt.
                        karte.parentElement.appendChild(karte.children[1]);
                    }
                    let schaltflaeche = karte.children[0];
                    setzeKarteOnclick(schaltflaeche, kontainer, kartenIdServer);
                    setzeDragDropAttribute(schaltflaeche, kontainer);
                    setzeKarteBild(karte, kontainer, kartenIdServer);
                    document.getElementById(kontainer).appendChild(karte);
                }
                else {
//                    console.log("Die karte " + kartenIdServer + " existiert noch nicht, wird also neu erzeugt!");
                    // Karte erzeugen und erstmal dem Kontainer anhängen
                    document.getElementById(kontainer).appendChild(erzeugeKarte(kartenIdServer, kontainer));
                }
                if (kartenLautServer[i].split("x").length == 2) {
                    objektFlaggen(kartenIdServer, true, kontainer);
                }
                else {
                    objektFlaggen(kartenIdServer, false, kontainer);
                }
                kartenLautBrowser.push(kartenLautServer[i]);
            }
        }
        
        // alte Karten entfernen, dabei Kinder in Ruhe lassen
        for (var i = 0; i < kartenLautBrowser.length; i++) {
            let kartenIdBrowser = kartenLautBrowser[i].split("x")[0];
            var karteExistiertNochAufServer = false;
            for (let j = 0; j < kartenLautServer.length; j++) {
                let kartenIdServer = kartenLautServer[j].split("x")[0];
                if (kartenIdBrowser == kartenIdServer) {
                    karteExistiertNochAufServer = true;
                    break;
                }
            }
            
            if (!karteExistiertNochAufServer) {
                let karteBefindetSichNochInKontainer = false;
                for (let j = 0; j < document.getElementById(kontainer).children.length; j++) {
                    let karte = document.getElementById(kontainer).children[j];
                    if (karte.id == kartenIdBrowser) {
                        karteBefindetSichNochInKontainer = true;
                        break;
                    }
                    while (karte.children.length == 2) {
                        karte = karte.children[1];
                        if (karte.id == kartenIdBrowser) {
                            karteBefindetSichNochInKontainer = true;
                            break;
                        }
                    }
                    if (karteBefindetSichNochInKontainer) {
                        break;
                    }
                }
                if (karteBefindetSichNochInKontainer) {
                    let karte = document.getElementById(kartenIdBrowser);
                    // Die Karte, die beweget wurde wurde noch nicht vom Ziel-Kontainer übernommen
                    if (karte.children.length == 2) {
                        karte.parentElement.appendChild(karte.children[1]);
                    }
                    karte.parentElement.removeChild(karte);
                }
                kartenLautBrowser.splice(kartenLautBrowser.indexOf(kartenLautBrowser[i]), 1);
                i--;
            }
        }
        
        // geflaggte Karten behandeln
        for (let i = 0; i < kartenLautBrowser.length; i++) {
            if (kartenLautServer.includes(kartenLautBrowser[i])) {
                // nichts zu tun
            }
            else if (kartenLautServer.includes(kartenLautBrowser[i] + "x")) {
                // Karte ist auf dem Server geflaggt im Browser aber noch nicht
                objektFlaggen(kartenLautBrowser[i].split("x")[0], true, kontainer);
                kartenLautBrowser[i] = kartenLautBrowser[i] + "x";
            }
            else if (kartenLautServer.includes(kartenLautBrowser[i].split("x")[0])) {
                // Karte im Browser geflaggt, auf dem Server aber nicht mehr
                objektFlaggen(kartenLautBrowser[i].split("x")[0], false, kontainer);
                kartenLautBrowser[i] = kartenLautBrowser[i].split("x")[0];
            }
            else {
                console.log("Was ist denn mit den Flags los?!")
                console.log("Kontainer: " + kontainer + ", Karten laut Browser: " + kartenLautBrowser);
                console.log("Kontainer: " + kontainer + ", Karten laut Server: " + kartenLautServer);
            }
        }
        
        // Kartenspaces zusammenstellen und Reihenfolge fixen
        // TODO: nur Kartenspaces aktualisieren, die noch nicht stimmen
//        console.log("kontainer: " + kontainer + ", kartenspaces laut server: " + kartenspacesLautServer);
        for (let i = 0; i < kartenspacesLautServer.length; i++) {
            const kartenspace = kartenspacesLautServer[i].split(";");
            for (let j = 0; j < kartenspace.length; j++) {
                if (j == 0) {
                    // der Region/dem Kontainer anhängen
//                    console.log("kontainer = " + kontainer + ", j = " + j + ", kartenspace = " + kartenspace + ", kartenspace[0] = " + kartenspace[0]);
                    document.getElementById(kontainer).appendChild(document.getElementById(kartenspace[0].split("x")[0]));
                    document.getElementById(kartenspace[j].split("x")[0]).setAttribute("class", "karte");
                    if (kontainer != "mitte") {
                        var inDiesemKartenspaceSindKartenGeflaggt = false;
                        for (let k = 0; k < kartenspace.length; k++) {
                            if (kartenspace[k].split("x").length == 2) {
                                inDiesemKartenspaceSindKartenGeflaggt = true;
                                break;
                            }
                        }
                        if (inDiesemKartenspaceSindKartenGeflaggt) {
                            document.getElementById(kartenspace[j].split("x")[0]).style.width = "160px"; // TODO: verallgemeinern
                            document.getElementById(kartenspace[j].split("x")[0]).style.transform = "translateX(18.75%)";
                        }
                        else {
                            document.getElementById(kartenspace[j].split("x")[0]).style.width = "100px"; // TODO: verallgemeinern
                            document.getElementById(kartenspace[j].split("x")[0]).style.transform = "";
                        }
                    }
                }
                else {
                    // der Parentkarte anhängen
//                    console.log("kontainer = " + kontainer + ", j = " + j + ", kartenspace = " + kartenspace + ", kartenspace[j-1] = " + kartenspace[j-1]);
                    document.getElementById(kartenspace[j-1].split("x")[0]).appendChild(document.getElementById(kartenspace[j].split("x")[0]));
                    document.getElementById(kartenspace[j].split("x")[0]).setAttribute("class", "karte angehaengteKarte");
                }
            }
        }
        
        // speichern
        if (kontainer == "eigeneHandkarten") {
            eigeneHandkarten = kartenspacesLautServer;
        }
        else if (kontainer == "eigeneOffeneKarten") {
            eigeneOffeneKarten = kartenspacesLautServer;
        }
        else if (kontainer == "spielerObenLinksHandkarten") {
            spielerObenLinksHandkarten = kartenspacesLautServer;
        }
        else if (kontainer == "spielerObenLinksOffeneKarten") {
            spielerObenLinksOffeneKarten = kartenspacesLautServer;
        }
        else if (kontainer == "spielerObenRechtsHandkarten") {
            spielerObenRechtsHandkarten = kartenspacesLautServer;
        }
        else if (kontainer == "spielerObenRechtsOffeneKarten") {
            spielerObenRechtsOffeneKarten = kartenspacesLautServer;
        }
        else if (kontainer == "spielerUntenRechtsHandkarten") {
            spielerUntenRechtsHandkarten = kartenspacesLautServer;
        }
        else if (kontainer == "spielerUntenRechtsOffeneKarten") {
            spielerUntenRechtsOffeneKarten = kartenspacesLautServer;
        }
        else if (kontainer == "mitte") {
            mitte = kartenspacesLautServer;
            if (window.document.getElementById("aufraeumenButton")) {
                window.document.getElementById("mitte").removeChild(window.document.getElementById("aufraeumenButton"));
            }
            if (kartenLautServer.length >= 4) {
                aufraeumenButton();
            }
        }

    }
    xhr.open("POST", "getDatei.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("datei=" + "3" + dateiname);
}

function erzeugeKarte(kartenId, kontainer) {
    var neueKarte = document.createElement("div");
    neueKarte.setAttribute("id", kartenId);
    neueKarte.setAttribute("class", "karte");
    schaltflaeche = document.createElement("img");
    schaltflaeche.setAttribute("class", "kartenSchaltflaeche");
    schaltflaeche.setAttribute("width", "100");
    setzeDragDropAttribute(schaltflaeche, kontainer);
    setzeKarteOnclick(schaltflaeche, kontainer, kartenId)
    neueKarte.appendChild(schaltflaeche);
    setzeKarteBild(neueKarte, kontainer, kartenId);
    return neueKarte;
}

function setzeDragDropAttribute(schaltflaeche, kontainer) {
    if (kontainer.split("Handkarten").length != 2) {
        schaltflaeche.setAttribute("draggable", "true");
        schaltflaeche.setAttribute("ondragover", "ablegenErlauben(event)"); // TODO: Karte verdunkeln
        schaltflaeche.setAttribute("ondrop", "ablegen(event)")
        schaltflaeche.setAttribute("ondragstart", "ziehen(event)");
    }
    else if (kontainer == "eigeneHandkarten") {
        schaltflaeche.setAttribute("draggable", "true");
        // Auf Handkarten dürfen andere Karten nicht abgelegt werden, da Handkarten nicht gestapelt werden dürfen
        schaltflaeche.setAttribute("ondragstart", "ziehen(event)");
    }
    else {
        schaltflaeche.setAttribute("draggable", "false");
        schaltflaeche.setAttribute("ondragover", "");
        schaltflaeche.setAttribute("ondrop", "")
        schaltflaeche.setAttribute("ondragstart", "");
    }
}

function setzeKarteOnclick(schaltflaeche, kontainer, kartenId) {
    if (kontainer == "eigeneHandkarten") {
        schaltflaeche.setAttribute("onclick", "eigeneHandkarteMenu(" + kartenId + ")");
    }
    else if (kontainer == "eigeneOffeneKarten") {
        schaltflaeche.setAttribute("onclick", "eigeneOffeneKarteMenu(" + kartenId + ")");
    }
    else if (kontainer == "spielerObenLinksHandkarten") {
        schaltflaeche.setAttribute("onclick", "fremdeHandkarteMenu(" + (getEigeneId()+1)%4 + ")");
    }
    else if (kontainer == "spielerObenLinksOffeneKarten") {
        schaltflaeche.setAttribute("onclick", "fremdeOffeneKarteMenu(" + kartenId + ", " + (getEigeneId()+1)%4 + ")");
    }
    else if (kontainer == "spielerObenRechtsHandkarten") {
        schaltflaeche.setAttribute("onclick", "fremdeHandkarteMenu(" + (getEigeneId()+2)%4 + ")");
    }
    else if (kontainer == "spielerObenRechtsOffeneKarten") {
        schaltflaeche.setAttribute("onclick", "fremdeOffeneKarteMenu(" + kartenId + ", " + (getEigeneId()+2)%4 + ")");
    }
    else if (kontainer == "spielerUntenRechtsHandkarten") {
        schaltflaeche.setAttribute("onclick", "fremdeHandkarteMenu(" + (getEigeneId()+3)%4 + ")");
    }
    else if (kontainer == "spielerUntenRechtsOffeneKarten") {
        schaltflaeche.setAttribute("onclick", "fremdeOffeneKarteMenu(" + kartenId + ", " + (getEigeneId()+3)%4 + ")");
    }
    else if (kontainer == "mitte") {
        schaltflaeche.setAttribute("onclick", "mitteKarteMenu(" + kartenId + ")");
    }
    else {
        console.log("Für den Kontainer '" + kontainer + "' ist kein Menu vorgesehen");
    }
}

function setzeKarteBild(karte, kontainer, kartenId) {
    if (kontainer.split("Handkarten").length == 2 && kontainer != "eigeneHandkarten") {
        // Es handelt sich beim Kontainer um fremde Handkarten
        if (istTuerkarte(kartenId)) {
            karte.children[0].src = "karten/tuerkarte.jpg";
        }
        else {
            karte.children[0].src = "karten/schatzkarte.jpg";
        }
    }
    else {
        karte.children[0].src = "karten/" + kartenId + ".jpg";
    }
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

function ablagestapelAktualisieren(stapel) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        const kartenString = this.responseText;
        if (kartenString == "") {
            window.document.getElementById("ablagestapel" + stapel + "Bild").src = "karten/leererAblagestapel.png";
        }
        else {
            const karten = kartenString.split("/");
            window.document.getElementById("ablagestapel" + stapel + "Bild").src = "karten/" + karten[karten.length-1] + ".jpg";
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

function objektFlaggen(kartenId, jaodernein, kontainer) {
    var schaltflaeche = document.getElementById(kartenId).children[0];
    if (jaodernein) {
        if (kontainer == "mitte") {
            schaltflaeche.style.padding = "10% 0px 0px 0px";
        }
        else if (kontainer.split("ffeneKarten").length == 2) {
            schaltflaeche.style.transform = "rotate(90deg) translateX(-30%)"; // Man könnte hier noch ein "translateY(18.75%)" einbauen, wenn man wöllte
        }
        else {
            console.log("Die Karte " + kartenId + " im Kontainer " + kontainer + " sollte eigentlich nicht geflaggt werden können");
        }
    }
    else {
        schaltflaeche.style.padding = "0px";
        schaltflaeche.style.transform = "";
    }
}
