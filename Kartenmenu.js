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
    buttonErstellen("Karte auf jemanden spielen", "KarteAufMitspielerSpielen", "karteAufMitspielerSpielenMenu(" + kartenId + ", 'offen')", "buttons");
    buttonErstellen("Karte an jemanden abgeben", "KarteWeitergeben", "karteWeitergebenMenu(" + kartenId + ", 'offen')", "buttons");
}

function mitteKarteMenu(kartenId) {
    vordergrundErstellen(kartenId);
    buttonErstellen("Karte ablegen", "KarteAblegen", "vordergrundEntfernen(), karteAblegen(" + kartenId + ", 'mitte')", "buttons");
    buttonErstellen("Karte aufnehmen", "KarteAufnehmen", "vordergrundEntfernen(), karteAufnehmen(" + kartenId + ", 'mitte')", "buttons");
    buttonErstellen("Karte flaggen", "KarteFlaggen", "vordergrundEntfernen(), karteFlaggen(" + kartenId + ")", "buttons");
}

function fremdeOffeneKarteMenu(kartenId, spielerId) {
    vordergrundErstellen(kartenId);
    buttonErstellen("Karte klauen", "KarteKlauen", "vordergrundEntfernen(), offeneKarteKlauen(" + kartenId + ", " + spielerId + ")", "buttons");
}

function vordergrundErstellen(kartenId) {
    grosseKarte = document.createElement("div");
    grosseKarte.setAttribute("id", "karteImVordergrund");
    grosseKarte.setAttribute("onclick", ""); // TODO: onclick für den Hintergrund machen und vom Bild wegnehmen
    
    buttonDiv = document.createElement("div");
    buttonDiv.setAttribute("id", "buttons");
    
    grosseKarteBildDiv = document.createElement("div");
    grosseKarteBildDiv.setAttribute("id", "grosseKarteBildDiv");
    
    grosseKarteBild = document.createElement("img");
    grosseKarteBild.src = "karten/" + kartenId + ".jpg";
    grosseKarteBild.width = "375";
    grosseKarteBild.setAttribute("class", "karte");
    grosseKarteBild.setAttribute("onclick", "vordergrundEntfernen()");
    
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
    window.document.body.removeChild(window.document.getElementById("karteImVordergrund"));
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
    xhr.send("datei=2spieler.txt");
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
    xhr.send("datei=2spieler.txt");
}

function aufMitspielerSpielenMenuAusblenden(kartenId, positionVorher) {
    window.document.getElementById("buttonKarteAufMitspielerSpielen").removeChild(window.document.getElementById("buttonsKarteAufMitspielerSpielen"));
    window.document.getElementById("buttonKarteAufMitspielerSpielenSchaltflaeche").setAttribute("onclick", "karteAufMitspielerSpielenMenu(" + kartenId + ", '" + positionVorher + "')");
}

function karteFlaggen(kartenId) {
    var div = window.document.getElementById("mitteKarte" + kartenId);
    if (div.style.top == "20px") {
        div.style.top = "0px";
    }
    else {
        div.style.top = "20px";
    }
}
