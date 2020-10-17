function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// TODO: Diese Funktionn sehen alle gleich aus!

function vomStapelZiehen(stapel, offenOderVerdeckt) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(this.responseText);
        if (offenOderVerdeckt == "offen") {
            kartenregionAktualisierenWrapper("mitte");
        }
        else {
            kartenregionAktualisierenWrapper("eigeneHandkarten");
        }
    }
    xhr.open("POST", "kartenBewegen.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    if (offenOderVerdeckt == "offen") {
        xhr.send("von=nachziehstapel&stapel=" + stapel + "&nach=mitte&append=x&mitKindern=false");
    }
    else {
        xhr.send("von=nachziehstapel&stapel=" + stapel + "&nach=karten" + getEigeneId() + "verdeckt&append=x&mitKindern=false");
    }
}

function tuerkarteVerdecktZiehen() {
    vomStapelZiehen("Tuer", "verdeckt");
}

function tuerkarteOffenZiehen() {
    vomStapelZiehen("Tuer", "offen");
}

function schatzkarteVerdecktZiehen() {
    vomStapelZiehen("Schatz", "verdeckt");
}

function schatzkarteOffenZiehen() {
    vomStapelZiehen("Schatz", "offen");
}

function karteVomAblagestapelZiehen(stapel, kartenId) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(this.responseText);
        ablagestapelAktualisieren(stapel);
        kartenregionAktualisierenWrapper("eigeneHandkarten");
    }
    xhr.open("POST", "kartenBewegen.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("von=" + "ablagestapel" + stapel + "&nach=karten" + getEigeneId() + "verdeckt&karte=" + kartenId); // TODO: wirklich verdeckt?
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
        if (istTuerkarte(kartenId)) {
            ablagestapelAktualisieren("Tuer");
        }
        else {
            ablagestapelAktualisieren("Schatz");
        }
    }
    xhr.open("POST", "kartenBewegen.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var ablagestapelString = "";
    if (istTuerkarte(kartenId)) {
        ablagestapelString = "ablagestapelTuer";
    }
    else {
        ablagestapelString = "ablagestapelSchatz";
    }
    if (positionVorher == "mitte") {
        xhr.send("von=mitte&nach=" + ablagestapelString + "&karte=" + kartenId);
    }
    else {
        xhr.send("von=karten" + getEigeneId() + positionVorher + "&nach=" + ablagestapelString + "&karte=" + kartenId);
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

function karteAufnehmen(kartenId, positionVorher) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(this.responseText);
        if (positionVorher == "mitte") {
            kartenregionAktualisierenWrapper("mitte");
        }
        else {
            kartenregionAktualisierenWrapper("eigeneOffeneKarten");
        }
        kartenregionAktualisierenWrapper("eigeneHandkarten");
    }
    xhr.open("POST", "kartenBewegen.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    if (positionVorher == "mitte") {
        xhr.send("von=mitte&nach=karten" + getEigeneId() + "verdeckt&karte=" + kartenId);
    }
    else {
        xhr.send("von=karten" + getEigeneId() + "offen&nach=karten" + getEigeneId() + "verdeckt&karte=" + kartenId);
    }
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
        
        if ((spielerId-getEigeneId()+4)%4 == 1) {
            kartenregionAktualisierenWrapper("handkartenObenLinks");
        }
        else if ((spielerId-getEigeneId()+4)%4 == 2) {
            kartenregionAktualisierenWrapper("handkartenObenRechts");
        }
        else if ((spielerId-getEigeneId()+4)%4 == 3) {
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
        
        if ((spielerId-getEigeneId()+4)%4 == 1) {
            kartenregionAktualisierenWrapper("offeneKartenObenLinks");
        }
        else if ((spielerId-getEigeneId()+4)%4 == 2) {
            kartenregionAktualisierenWrapper("offeneKartenObenRechts");
        }
        else if ((spielerId-getEigeneId()+4)%4 == 3) {
            kartenregionAktualisierenWrapper("offeneKartenUntenRechts");
        }
    }
    xhr.open("POST", "kartenBewegen.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("von=karten" + getEigeneId() + positionVorher + "&nach=karten" + spielerId + "offen&karte=" + kartenId);
}

function offeneKarteKlauen(kartenId, spielerId) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(this.responseText);
        kartenregionAktualisierenWrapper("eigeneOffeneKarten");
        
        if ((spielerId-getEigeneId()+4)%4 == 1) {
            kartenregionAktualisierenWrapper("offeneKartenObenLinks");
        }
        else if ((spielerId-getEigeneId()+4)%4 == 2) {
            kartenregionAktualisierenWrapper("offeneKartenObenRechts");
        }
        else if ((spielerId-getEigeneId()+4)%4 == 3) {
            kartenregionAktualisierenWrapper("offeneKartenUntenRechts");
        }
    }
    xhr.open("POST", "kartenBewegen.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("von=karten" + spielerId + "offen&nach=karten" + getEigeneId() + "offen&karte=" + kartenId);
}

function handkarteKlauen(spielerId) {
    verfuegbareKarten = [];
    switch((spielerId-getEigeneId()+4)%4) {
        case 0:
            // Dann würde man von sich selber ziehen --> geht nicht.
            break;
        case 1:
            verfuegbareKarten = spielerObenLinksHandkarten;
            break;
        case 2:
            verfuegbareKarten = spielerObenRechtsHandkarten;
            break;
        case 3:
            verfuegbareKarten = spielerUntenRechtsHandkarten;
            break;
    }
    const karte = verfuegbareKarten[getRandomInt(verfuegbareKarten.length)];
        
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(this.responseText);
        kartenregionAktualisierenWrapper("eigeneHandkarten");
        
        if ((spielerId-getEigeneId()+4)%4 == 1) {
            kartenregionAktualisierenWrapper("handkartenObenLinks");
        }
        else if ((spielerId-getEigeneId()+4)%4 == 2) {
            kartenregionAktualisierenWrapper("handkartenObenRechts");
        }
        else if ((spielerId-getEigeneId()+4)%4 == 3) {
            kartenregionAktualisierenWrapper("handkartenUntenRechts");
        }
    }
    xhr.open("POST", "kartenBewegen.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("von=karten" + spielerId + "verdeckt&nach=karten" + getEigeneId() + "verdeckt&karte=" + karte);
}

function karteFlaggen(kartenId, neueFlag) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(this.responseText);
        if (mitte.includes(kartenId.toString()) || mitte.includes(kartenId.toString() + "x")) {
            kartenregionAktualisierenWrapper("mitte");
        }
        else if (eigeneOffeneKarten.includes(kartenId.toString()) || eigeneOffeneKarten.includes(kartenId.toString() + "x")) {
            kartenregionAktualisierenWrapper("eigeneOffeneKarten");
        }
    }
    xhr.open("POST", "kartenBewegen.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    if (mitte.includes(kartenId.toString()) || mitte.includes(kartenId.toString() + "x")) {
        xhr.send("von=mitte&karte=" + kartenId + "&neueFlag=" + neueFlag);
    }
    else if (eigeneOffeneKarten.includes(kartenId.toString()) || eigeneOffeneKarten.includes(kartenId.toString() + "x")) {
        xhr.send("von=karten" + getEigeneId() + "offen&karte=" + kartenId + "&neueFlag=" + neueFlag);
    }
    else {
        console.log("Die Karte " + kartenId + " ist weder in mitte.txt noch in eigeneOffeneKarten");
    }
}

function karteBewegen(kartenId, von, nach, mitKindern, appendAn) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(this.responseText);
        kartenregionAktualisierenWrapper(von);
        kartenregionAktualisierenWrapper(nach);
    }
    xhr.open("POST", "kartenBewegen.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("von=" + von + "&nach=" + nach + "&karte=" + kartenId + "&mitKindern=" + mitKindern + "&append=" + appendAn);
}

function karteAnheften(childId, parentId) {
    document.getElementById(parentId).appendChild(document.getElementById(childId));
    // Alle angehängten Karten flaggen
    var zuFlaggendeKarte = document.getElementById(childId);
    do {
        const zuFlaggendeKarteId = zuFlaggendeKarte.id;
        karteFlaggen(zuFlaggendeKarteId, "");
        zuFlaggendeKarte = zuFlaggendeKarte.children[1];
        
    }
    while (zuFlaggendeKarte != null);
}
