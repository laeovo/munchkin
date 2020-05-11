function handkarteMenu(kartenId) {
    vordergrundErstellen(kartenId);
    buttonErstellen("Karte in die Mitte spielen", "KarteSpielen", "vordergrundEntfernen(), karteSpielen(" + kartenId + ", 'verdeckt')", "buttons");
    buttonErstellen("Karte ablegen", "KarteAblegen", "vordergrundEntfernen(), karteAblegen(" + kartenId + ", 'verdeckt')", "buttons");
    buttonErstellen("Karte auslegen", "karteAuslegen", "vordergrundEntfernen(), karteAuslegen(" + kartenId + ")", "buttons");
    buttonErstellen("Karte auf jemanden spielen", "KarteAufMitspielerSpielen", "karteAufMitspielerSpielenMenu(" + kartenId + ", 'verdeckt')", "buttons");
    buttonErstellen("Karte an jemanden abgeben", "KarteWeitergeben", "karteWeitergebenMenu(" + kartenId + ", 'verdeckt')", "buttons");
}

function eigeneOffeneKarteMenu(kartenId) {
    vordergrundErstellen(kartenId);
    buttonErstellen("Karte in die Mitte spielen", "KarteSpielen", "vordergrundEntfernen(), karteSpielen(" + kartenId + ", 'offen')", "buttons");
    buttonErstellen("Karte ablegen", "KarteAblegen", "vordergrundEntfernen(), karteAblegen(" + kartenId + ", 'offen')", "buttons");
    buttonErstellen("Karte aufnehmen", "KarteAufnehmen", "vordergrundEntfernen(), karteAufnehmen(" + kartenId + ", 'offen')", "buttons");
    if (karteIstGeflaggt(kartenId, eigeneOffeneKarten)) {
        buttonErstellen("Karte aus dem Rucksack auspacken", "KarteFlaggen", "vordergrundEntfernen(), karteFlaggen(" + kartenId + ", '')", "buttons");
    }
    else {
        buttonErstellen("Karte in den Rucksack packen", "KarteFlaggen", "vordergrundEntfernen(), karteFlaggen(" + kartenId + ", 'x')", "buttons");
    }
    buttonErstellen("Karte auf jemanden spielen", "KarteAufMitspielerSpielen", "karteAufMitspielerSpielenMenu(" + kartenId + ", 'offen')", "buttons");
    buttonErstellen("Karte an jemanden abgeben", "KarteWeitergeben", "karteWeitergebenMenu(" + kartenId + ", 'offen')", "buttons");
}

function mitteKarteMenu(kartenId) {
    vordergrundErstellen(kartenId);
    buttonErstellen("Karte ablegen", "KarteAblegen", "vordergrundEntfernen(), karteAblegen(" + kartenId + ", 'mitte')", "buttons");
    buttonErstellen("Karte aufnehmen", "KarteAufnehmen", "vordergrundEntfernen(), karteAufnehmen(" + kartenId + ", 'mitte')", "buttons");
    if (karteIstGeflaggt(kartenId, mitte)) {
        buttonErstellen("Karte entflaggen", "KarteFlaggen", "vordergrundEntfernen(), karteFlaggen(" + kartenId + ", '')", "buttons");
    }
    else {
        buttonErstellen("Karte flaggen", "KarteFlaggen", "vordergrundEntfernen(), karteFlaggen(" + kartenId + ", 'x')", "buttons");
    }
}

function fremdeOffeneKarteMenu(kartenId, spielerId) {
    vordergrundErstellen(kartenId);
    buttonErstellen("Karte klauen", "KarteKlauen", "vordergrundEntfernen(), offeneKarteKlauen(" + kartenId + ", " + spielerId + ")", "buttons");
}

function fremdeHandkarteMenu(spielerId) {
    var position = (spielerId-getEigeneId()+4) % 4;
    leerenVordergrundErstellen(position);
    buttonErstellen("Karte klauen", "KarteKlauen", "vordergrundEntfernen(), handkarteKlauen(" + spielerId + ")", "button");
}

function ablagestapelMenu(stapel) {
    
}

function hintergrundErstellen() {
    hintergrund = document.createElement("div");
    hintergrund.setAttribute("id", "hintergrundZumKlicken");
    hintergrund.setAttribute("style", "position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background-color: rgba(50,50,50,0.5); cursor: pointer;");
    hintergrund.setAttribute("onclick", "vordergrundEntfernen()");
    return hintergrund;
}

function leerenVordergrundErstellen(position) {
    // position ist hier eine Zahl in [1,3]; 1 = oben links, 2 = oben rechts, 3 = unten rechts
    vordergrund = document.createElement("div");
    vordergrund.setAttribute("id", "karteImVordergrund");
    vordergrund.style.cursor = "pointer";
    
    vordergrund.appendChild(hintergrundErstellen());
    
    buttonDiv = document.createElement("div");
    buttonDiv.setAttribute("id", "button");
    switch(position) {
        case 1:
            buttonDiv.setAttribute("style", "position: absolute; top: 0px; left: 0px;");
            break;
        case 2:
            buttonDiv.setAttribute("style", "position: absolute; top: 0px; right: 0px;");
            break;
        case 3:
            buttonDiv.setAttribute("style", "position: absolute; bottom: 0px; right: 0px;");
            break;
    }

    vordergrund.appendChild(buttonDiv);
    window.document.body.appendChild(vordergrund);
}

function vordergrundErstellen(kartenId) {
    grosseKarte = document.createElement("div");
    grosseKarte.setAttribute("id", "karteImVordergrund");
    
    grosseKarte.appendChild(hintergrundErstellen());
    
    buttonDiv = document.createElement("div");
    buttonDiv.setAttribute("id", "buttons");
    
    grosseKarteBildDiv = document.createElement("div");
    grosseKarteBildDiv.setAttribute("id", "grosseKarteBildDiv");
    
    grosseKarteBild = document.createElement("img");
    grosseKarteBild.src = "karten/" + kartenId + ".jpg";
    grosseKarteBild.width = "375";
    grosseKarteBild.setAttribute("class", "karte");
    
    grosseKarteBildDiv.appendChild(grosseKarteBild);
    grosseKarteBildDiv.appendChild(buttonDiv);
    grosseKarte.appendChild(grosseKarteBildDiv);
    window.document.body.appendChild(grosseKarte);
}

function buttonErstellen(buttonText, buttonId, onclickAktion, kontainer) {
    button = document.createElement("div");
    button.setAttribute("id", "button" + buttonId);
    button.setAttribute("class", "menuButton");
    schaltflaeche = document.createElement("div");
    schaltflaeche.setAttribute("class", "schaltflaeche");
    schaltflaeche.setAttribute("id", "button" + buttonId + "Schaltflaeche");
    schaltflaeche.setAttribute("onclick", onclickAktion);
    buttonTextSpan = document.createElement("span");
    buttonTextSpan.setAttribute("id", "button" + buttonId + "Text");
    buttonTextSpan.setAttribute("class", "buttonText");
    buttonTextSpan.innerHTML = buttonText;
    schaltflaeche.appendChild(buttonTextSpan);
    button.appendChild(schaltflaeche)
    window.document.getElementById(kontainer).appendChild(button);
}

function vordergrundEntfernen() {
    vordergrund = window.document.getElementById("karteImVordergrund");
    if (vordergrund) {
        window.document.body.removeChild(vordergrund);
    }
}

function karteWeitergebenMenu(kartenId, positionVorher) {
    if (window.document.getElementById("buttonsKarteAufMitspielerSpielen") != null) {
        aufMitspielerSpielenMenuAusblenden(kartenId, positionVorher);
    }
    window.document.getElementById("buttonKarteWeitergebenSchaltflaeche").setAttribute("onclick", "weitergebenMenuAusblenden(" + kartenId + ", '" + positionVorher + "')");
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        const data = this.responseText;
        const spieler = data.split('/');
        
        weitergebenMenuDiv = window.document.createElement("div");
        weitergebenMenuDiv.setAttribute("id", "buttonsKarteWeitergeben");
        window.document.getElementById("buttonKarteWeitergeben").appendChild(weitergebenMenuDiv);
        
        buttonErstellen(spieler[(getEigeneId()+1)%4].split(";")[0], "KarteAnSpielerObenLinksWeitergeben", "vordergrundEntfernen(), karteWeitergeben(" + kartenId + ", " + (getEigeneId()+1)%4 + ", '" + positionVorher + "')", "buttonsKarteWeitergeben");
        buttonErstellen(spieler[(getEigeneId()+2)%4].split(";")[0], "KarteAnSpielerObenRechtsWeitergeben", "vordergrundEntfernen(), karteWeitergeben(" + kartenId + ", " + (getEigeneId()+2)%4 + ", '" + positionVorher + "')", "buttonsKarteWeitergeben");
        buttonErstellen(spieler[(getEigeneId()+3)%4].split(";")[0], "KarteAnSpielerUntenRechtsWeitergeben", "vordergrundEntfernen(), karteWeitergeben(" + kartenId + ", " + (getEigeneId()+3)%4 + ", '" + positionVorher + "')", "buttonsKarteWeitergeben");
        
    };
    xhr.open("POST", "getDatei.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("datei=" + "3" + "spieler.txt");
}

function weitergebenMenuAusblenden(kartenId, positionVorher) {
    window.document.getElementById("buttonKarteWeitergeben").removeChild(window.document.getElementById("buttonsKarteWeitergeben"));
    window.document.getElementById("buttonKarteWeitergebenSchaltflaeche").setAttribute("onclick", "karteWeitergebenMenu(" + kartenId + ", '" + positionVorher + "')");
}

function karteAufMitspielerSpielenMenu(kartenId, positionVorher) {
    if (window.document.getElementById("buttonsKarteWeitergeben") != null) {
        weitergebenMenuAusblenden(kartenId, positionVorher);
    }
    window.document.getElementById("buttonKarteAufMitspielerSpielenSchaltflaeche").setAttribute("onclick", "aufMitspielerSpielenMenuAusblenden(" + kartenId + ", '" + positionVorher + "')");
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        const data = this.responseText;
        const spieler = data.split('/');
        
        aufMitspielerSpielenMenuDiv = window.document.createElement("div");
        aufMitspielerSpielenMenuDiv.setAttribute("id", "buttonsKarteAufMitspielerSpielen");
        window.document.getElementById("buttonKarteAufMitspielerSpielen").appendChild(aufMitspielerSpielenMenuDiv);
        
        buttonErstellen(spieler[(getEigeneId()+1)%4].split(";")[0], "KarteAnSpielerObenLinksAufMitspielerSpielen", "vordergrundEntfernen(), karteAufMitspielerSpielen(" + kartenId + ", " + (getEigeneId()+1)%4 + ", '" + positionVorher + "')", "buttonsKarteAufMitspielerSpielen");
        buttonErstellen(spieler[(getEigeneId()+2)%4].split(";")[0], "KarteAnSpielerObenRechtsAufMitspielerSpielen", "vordergrundEntfernen(), karteAufMitspielerSpielen(" + kartenId + ", " + (getEigeneId()+2)%4 + ", '" + positionVorher + "')", "buttonsKarteAufMitspielerSpielen");
        buttonErstellen(spieler[(getEigeneId()+3)%4].split(";")[0], "KarteAnSpielerUntenRechtsAufMitspielerSpielen", "vordergrundEntfernen(), karteAufMitspielerSpielen(" + kartenId + ", " + (getEigeneId()+3)%4 + ", '" + positionVorher + "')", "buttonsKarteAufMitspielerSpielen");
        
    };
    xhr.open("POST", "getDatei.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("datei=" + "3" + "spieler.txt");
}

function aufMitspielerSpielenMenuAusblenden(kartenId, positionVorher) {
    window.document.getElementById("buttonKarteAufMitspielerSpielen").removeChild(window.document.getElementById("buttonsKarteAufMitspielerSpielen"));
    window.document.getElementById("buttonKarteAufMitspielerSpielenSchaltflaeche").setAttribute("onclick", "karteAufMitspielerSpielenMenu(" + kartenId + ", '" + positionVorher + "')");
}
