function tuerkarteVerdecktZiehen() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(this.responseText);
        kartenregionAktualisierenWrapper("eigeneHandkarten");
    }
    xhr.open("POST", "kartenBewegen.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("von=nachziehstapel&stapel=Tuer&nach=karten" + getEigeneId() + "verdeckt");
}

function tuerkarteOffenZiehen() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(this.responseText);
        kartenregionAktualisierenWrapper("mitte");
    }
    xhr.open("POST", "kartenBewegen.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("von=nachziehstapel&stapel=Tuer&nach=mitte");
}

function schatzkarteVerdecktZiehen() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(this.responseText);
        kartenregionAktualisierenWrapper("eigeneHandkarten");
    }
    xhr.open("POST", "kartenBewegen.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("von=nachziehstapel&stapel=Schatz&nach=karten" + getEigeneId() + "verdeckt");
}

function schatzkarteOffenZiehen() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(this.responseText);
        kartenregionAktualisierenWrapper("mitte");
    }
    xhr.open("POST", "kartenBewegen.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("von=nachziehstapel&stapel=Schatz&nach=mitte");
}

function karteAblegen(kartenId, positionVorher) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(this.responseText);
        if (positionVorher == "verdeckt") {
            kartenregionAktualisierenWrapper("eigeneHandkarten");
        }
        else if (positionVorher == "offen") {
            kartenregionAktualisierenWrapper("eigeneOffeneKarten");
        }
        else if (positionVorher == "mitte") {
            kartenregionAktualisierenWrapper("mitte");
        }
        ablagestapelAktualisieren();
    }
    xhr.open("POST", "kartenBewegen.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    if (positionVorher == "mitte") {
        xhr.send("von=mitte&nach=ablagestapel&karte=" + kartenId);
    }
    else {
        xhr.send("von=karten" + getEigeneId() + positionVorher + "&nach=ablagestapel&karte=" + kartenId);
    }
}

function karteAuslegen(kartenId) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(this.responseText);
        kartenregionAktualisierenWrapper("eigeneHandkarten");
        kartenregionAktualisierenWrapper("eigeneOffeneKarten");
    }
    xhr.open("POST", "kartenBewegen.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("von=karten" + getEigeneId() + "verdeckt&nach=karten" + getEigeneId() + "offen&karte=" + kartenId);
}

function karteAufnehmen(kartenId) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(this.responseText);
        kartenregionAktualisierenWrapper("mitte");
        kartenregionAktualisierenWrapper("eigeneHandkarten");
    }
    xhr.open("POST", "kartenBewegen.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("von=mitte&nach=karten" + getEigeneId() + "verdeckt&karte=" + kartenId);
}

function karteSpielen(kartenId, positionVorher) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(this.responseText);
        if (positionVorher == "verdeckt") {
            kartenregionAktualisierenWrapper("eigeneHandkarten");
        }
        else if (positionVorher == "offen") {
            kartenregionAktualisierenWrapper("eigeneOffeneKarten");
        }
        kartenregionAktualisierenWrapper("mitte");
    }
    xhr.open("POST", "kartenBewegen.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("von=karten" + getEigeneId() + positionVorher + "&nach=mitte&karte=" + kartenId);
}

// Karte weitergeben = Karte landet auf der Hand von irgendwem anders
function karteWeitergeben(kartenId, spielerId, positionVorher) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(this.responseText);
        if (positionVorher == "verdeckt") {
            kartenregionAktualisierenWrapper("eigeneHandkarten");
        }
        else if (positionVorher == "offen") {
            kartenregionAktualisierenWrapper("eigeneOffeneKarten");
        }
        
        if ((spielerId-getEigeneId())%4 == 1) {
            kartenregionAktualisierenWrapper("handkartenObenLinks");
        }
        else if ((spielerId-getEigeneId())%4 == 2) {
            kartenregionAktualisierenWrapper("handkartenObenRechts");
        }
        else if ((spielerId-getEigeneId())%4 == 3) {
            kartenregionAktualisierenWrapper("handkartenUntenRechts");
        }
    }
    xhr.open("POST", "kartenBewegen.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("von=karten" + getEigeneId() + positionVorher + "&nach=karten" + spielerId + "verdeckt&karte=" + kartenId);
}

// Karte auf Mitspieler spielen = Karte landet in der Auslage von irgendwem anders (z.B. Flüche)
function karteAufMitspielerSpielen(kartenId, spielerId, positionVorher) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(this.responseText);
        if (positionVorher == "verdeckt") {
            kartenregionAktualisierenWrapper("eigeneHandkarten");
        }
        else if (positionVorher == "offen") {
            kartenregionAktualisierenWrapper("eigeneOffeneKarten");
        }
        
        if ((spielerId-getEigeneId())%4 == 1) {
            kartenregionAktualisierenWrapper("offeneKartenObenLinks");
        }
        else if ((spielerId-getEigeneId())%4 == 2) {
            kartenregionAktualisierenWrapper("offeneKartenObenRechts");
        }
        else if ((spielerId-getEigeneId())%4 == 3) {
            kartenregionAktualisierenWrapper("offeneKartenUntenRechts");
        }
    }
    xhr.open("POST", "kartenBewegen.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("von=karten" + getEigeneId() + positionVorher + "&nach=karten" + spielerId + "offen&karte=" + kartenId);
}
