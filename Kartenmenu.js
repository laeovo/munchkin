function handkarteMenu(kartenId) {
    vordergrundErstellen(kartenId);
    buttonErstellen("Karte in die Mitte spielen", "KarteSpielen", "karteSpielen(" + kartenId + ", 'verdeckt')");
    buttonErstellen("Karte ablegen", "KarteAblegen", "karteAblegen(" + kartenId + ", 'verdeckt')");
    buttonErstellen("Karte auslegen", "karteAuslegen", "karteAuslegen(" + kartenId + ")");
    buttonErstellen("Karte auf jemanden spielen", "KarteAufJemandenSpielen", "karteAufJemandenSpielen(" + kartenId + ", 'verdeckt')");
    buttonErstellen("Karte an jemanden abgeben", "KarteAbgeben", "karteAbgeben(" + kartenId + ", 'verdeckt')");
}

function eigeneOffeneKarteMenu(kartenId) {
    vordergrundErstellen(kartenId);
    buttonErstellen("Karte in die Mitte spielen", "KarteSpielen", "karteSpielen(" + kartenId + ", 'offen')");
    buttonErstellen("Karte ablegen", "KarteAblegen", "karteAblegen(" + kartenId + ", 'offen')");
    buttonErstellen("Karte auf jemanden spielen", "KarteAufJemandenSpielen", "karteAufJemandenSpielen(" + kartenId + ", 'offen')");
    buttonErstellen("Karte an jemanden abgeben", "KarteAbgeben", "karteAbgeben(" + kartenId + ", 'offen')");
    // Button erstellen, mit dem man eine Karte flaggen kann
}

function mitteKarteMenu(kartenId) {
    vordergrundErstellen(kartenId);
    buttonErstellen("Karte ablegen", "KarteAblegen", "karteAblegen(" + kartenId + ", 'mitte')");
    buttonErstellen("Karte aufnehmen", "KarteAufnehmen", "karteAufnehmen(" + kartenId + ")");
}

function vordergrundErstellen(kartenId) {
    grosseKarte = document.createElement("div");
    grosseKarte.setAttribute("id", "karteImVordergrund");
    
    buttonDiv = document.createElement("div");
    buttonDiv.setAttribute("id", "buttons");
    
    grosseKarteBildDiv = document.createElement("div");
    grosseKarteBildDiv.setAttribute("id", "grosseKarteBildDiv");
    
    grosseKarteBild = document.createElement("img");
    grosseKarteBild.src = "karten/" + kartenId + ".jpg";
    grosseKarteBild.width = "375";
    grosseKarteBild.setAttribute("onclick", "vordergrundEntfernen()");
    
    grosseKarteBildDiv.appendChild(grosseKarteBild);
    grosseKarteBildDiv.appendChild(buttonDiv);
    grosseKarte.appendChild(grosseKarteBildDiv);
    window.document.body.appendChild(grosseKarte);
}

function buttonErstellen(buttonText, buttonId, onclickAktion) {
    button = document.createElement("div");
    button.setAttribute("id", "button" + buttonId);
    button.setAttribute("class", "menuButton");
    button.setAttribute("onclick", "vordergrundEntfernen(), " + onclickAktion);
    buttonTextSpan = document.createElement("span");
    buttonTextSpan.setAttribute("id", "button" + buttonId + "Text");
    buttonTextSpan.setAttribute("class", "buttonText");
    buttonTextSpan.innerHTML = buttonText;
    button.appendChild(buttonTextSpan);
    window.document.getElementById("buttons").appendChild(button);
}

function vordergrundEntfernen() {
    window.document.body.removeChild(window.document.getElementById("karteImVordergrund"));
}
