function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

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
    
    karteBewegen(karte, "karten" + spielerId + "verdeckt", "karten" + getEigeneId() + "verdeckt", "false", "x");
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
    xhr.open("POST", "kartenFlaggen.php");
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
        kartenregionAktualisierenWrapper(getRegionName(nach));
        kartenregionAktualisierenWrapper(getRegionName(von));
    }
    xhr.open("POST", "kartenBewegen.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("von=" + von + "&nach=" + nach + "&karte=" + kartenId + "&mitKindern=" + mitKindern + "&append=" + appendAn);
}

function karteAnheften(childId, parentId, mitKindern) {
    const von = getDateiname(getRegion(childId.split("x")[0]));
    const nach = getDateiname(getRegion(parentId.split("x")[0]));
    karteBewegen(childId, von, nach, mitKindern, parentId);
}

function mitteAufraeumen() {
    for (let i = 0; i < mitte.length; i++) {
        const kartenspace = mitte[i];
        const karten = kartenspace.split(";");
        for (j = 0; j < karten.length; j++) {
            const karte = karten[karten.length-j-1];
            const kartenId = karte.split("x")[0]; // TODO: von oben anfangen und die Karten je nach Art ablegen
            karteBewegen(kartenId, "mitte", "ablagestapel" + getKartenArt(kartenId), "false", "x")
        }
    }
    kartenregionAktualisierenWrapper("mitte");
}

// TODO: --> aktualisieren
//function karteAnheften(childId, parentId) { // TODO: implementieren
//    document.getElementById(parentId).appendChild(document.getElementById(childId));
//    // Alle angehängten Karten flaggen
//    var zuFlaggendeKarte = document.getElementById(childId);
//    do {
//        const zuFlaggendeKarteId = zuFlaggendeKarte.id;
//        karteFlaggen(zuFlaggendeKarteId, "");
//        zuFlaggendeKarte = zuFlaggendeKarte.children[1];
//
//    }
//    while (zuFlaggendeKarte != null);
//}
