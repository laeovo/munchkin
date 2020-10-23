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
    
    karteBewegenOhneCheck(karte, "karten" + spielerId + "verdeckt", "karten" + getEigeneId() + "verdeckt", "false", "x");
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

function karteBewegen(kartenId, von, nach, appendAn) {
    const region = getRegion(kartenId);
    if (region.split("Handkarten").length == 2) {
        // Quellregion ist eine Handkartenregion, da gibts keine Kinder
        karteBewegenOhneCheck(kartenId, von, nach, "false", appendAn);
    }
    else if (document.getElementById(kartenId).children.length == 1) {
        // Karte hat gar keine Kinder
        karteBewegenOhneCheck(kartenId, von, nach, "false", appendAn);
    }
    else if (selberKartenspace(kartenId, appendAn)) {
        // Karte und appendAn sind im selben Kartenspace --> Kinder werden nicht mitgenommen, sonst könnten die Karten verschwinden.
        karteBewegenOhneCheck(kartenId, von, nach, "false", appendAn);
    }
    else {
        var hintergrund = document.createElement("div");
        hintergrund.setAttribute("id", "kinderOption");
        hintergrund.setAttribute("style", "position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background-color: rgba(50,50,50,0.5); cursor: pointer;");
        window.document.body.appendChild(hintergrund);
        buttonErstellen("Mit Kindern", "MitKindern", "window.document.body.removeChild(document.getElementById('kinderOption')), karteBewegenOhneCheck('" + kartenId + "', '" + von + "', '" + nach + "', 'true', '" + appendAn + "')", "kinderOption");
        buttonErstellen("Ohne Kindern", "OhneKindern", "window.document.body.removeChild(document.getElementById('kinderOption')), karteBewegenOhneCheck('" + kartenId + "', '" + von + "', '" + nach + "', 'false', '" + appendAn + "')", "kinderOption");
        buttonErstellen("Abbrechen", "AktionAbbrechen", "window.document.body.removeChild(document.getElementById('kinderOption'))", "kinderOption");
    }
}

function karteBewegenOhneCheck(kartenId, von, nach, mitKindern, appendAn) {
    if (nach == "ablagestapel") {
        nach += getKartenArt(kartenId);
        if (mitKindern) {
            mitKindern = "false";
            
        }
    }
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

function karteAnheften(childId, parentId) {
    const von = getDateiname(getRegion(childId.split("x")[0]));
    const nach = getDateiname(getRegion(parentId.split("x")[0]));
    karteBewegen(childId, von, nach, parentId);
}

function mitteAufraeumen() {
    for (let i = 0; i < mitte.length; i++) {
        const kartenspace = mitte[i];
        const karten = kartenspace.split(";");
        for (j = 0; j < karten.length; j++) {
            const karte = karten[karten.length-j-1];
            const kartenId = karte.split("x")[0];
            karteBewegenOhneCheck(kartenId, "mitte", "ablagestapel", "false", "x")
        }
    }
    kartenregionAktualisierenWrapper("mitte");
}
