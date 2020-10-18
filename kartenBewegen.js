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
        kartenregionAktualisierenWrapper(getRegionName(von));
        kartenregionAktualisierenWrapper(getRegionName(nach));
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
