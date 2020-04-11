function tuerkarteVerdecktZiehen() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(this.responseText);
        kartenregionAktualisierenWrapper("eigeneHandkarten");
    }
    xhr.open("POST", "kartenManager.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("aktion=verdecktKarteZiehen&stapel=Tuer");
}

function tuerkarteOffenZiehen() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(this.responseText);
        kartenregionAktualisierenWrapper("mitte");
    }
    xhr.open("POST", "kartenManager.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("aktion=offenKarteZiehen&stapel=Tuer");
}

function schatzkarteVerdecktZiehen() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(this.responseText);
        kartenregionAktualisierenWrapper("eigeneHandkarten");
    }
    xhr.open("POST", "kartenManager.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("aktion=verdecktKarteZiehen&stapel=Schatz");
}

function schatzkarteOffenZiehen() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(this.responseText);
        kartenregionAktualisierenWrapper("mitte");
    }
    xhr.open("POST", "kartenManager.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("aktion=offenKarteZiehen&stapel=Schatz");
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
    xhr.open("POST", "kartenManager.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("aktion=karteAblegen&kartenId=" + kartenId + "&positionVorher=" + positionVorher);
}

function karteAuslegen(kartenId) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(this.responseText);
        kartenregionAktualisierenWrapper("eigeneHandkarten");
        kartenregionAktualisierenWrapper("eigeneOffeneKarten");
    }
    xhr.open("POST", "kartenManager.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("aktion=karteAuslegen&kartenId=" + kartenId);
}

function karteAufnehmen(kartenId) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(this.responseText);
        kartenregionAktualisierenWrapper("mitte");
        kartenregionAktualisierenWrapper("eigeneHandkarten");
    }
    xhr.open("POST", "kartenManager.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("aktion=karteAufnehmen&kartenId=" + kartenId);
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
    xhr.open("POST", "kartenManager.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("aktion=karteSpielen&kartenId=" + kartenId + "&positionVorher=" + positionVorher);
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
    xhr.open("POST", "kartenManager.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("aktion=karteWeitergeben&kartenId=" + kartenId + "&empfaenger=" + spielerId + "&positionVorher=" + positionVorher);
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
    xhr.open("POST", "kartenManager.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("aktion=karteAufMitspielerSpielen&kartenId=" + kartenId + "&empfaenger=" + spielerId + "&positionVorher=" + positionVorher);
}
