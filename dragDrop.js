function ziehen(ev) {
    var kartenId = ev.target.parentElement.id;
    ev.dataTransfer.setData("gedraggteKarte", kartenId);
    dropzonenErstellen(kartenId);
}

function ablegenErlauben(ev) {
    ev.preventDefault();
}

function ablegen(ev) {
    ev.preventDefault();
    var childId = ev.dataTransfer.getData("gedraggteKarte");
    if (document.getElementById(childId) == null) {
        console.log("Was auch immer gerade gedraggt wurde - nö!");
        return;
    }
    var parentKarte = ev.target.parentElement;
    var parentId = parentKarte.id;
//    console.log("ablegen:: childId = " + childId + ", parentId = " + parentId);
    if (parentId == "ablagestapelTuer" || parentId == "ablagestapelSchatz") {
        if (getRegion(childId).split("spieler").length == 1) {
            // Karte wird abgelegt, aber nur wenn die Region nicht die Karten eines anderen Spielers sind
            karteBewegen(childId, getDateiname(getRegion(childId)), "ablagestapel", "x");
        }
    }
    // TODO: Warum ist dieser Block auskommentiert?
//    else if (getRegion(parentId).split("Handkarten").length == 2) {
//        console.log("Karte wird zu Handkarten bewegt");
//        // Karte kann nicht an Handkarten angeheftet werden, wird also in die entsprechende Region bewegt
//        karteBewegen(childId, getRegion(childId), getRegion(parentId), "x");
//    }
    else if (parentId == "eigeneOffeneKarten") {
        karteBewegen(childId, getDateiname(getRegion(childId)), "karten" + getEigeneId() + "offen", "x");
    }
    else if (parentId == "spielerObenLinksOffeneKarten") {
        karteBewegen(childId, getDateiname(getRegion(childId)), "karten" + (getEigeneId()+1)%4 + "offen", "x");
    }
    else if (parentId == "spielerObenRechtsOffeneKarten") {
        karteBewegen(childId, getDateiname(getRegion(childId)), "karten" + (getEigeneId()+2)%4 + "offen", "x");
    }
    else if (parentId == "spielerUntenRechtsOffeneKarten") {
        karteBewegen(childId, getDateiname(getRegion(childId)), "karten" + (getEigeneId()+3)%4 + "offen", "x");
    }
    else if (parentId == "mitte") {
        karteBewegen(childId, getDateiname(getRegion(childId)), "mitte", "x");
    }
    else {
        if (childId != parentId) {
            karteAnheften(childId, parentId);
        }
        else {
            console.log("Die Karte " + childId + " kann nicht an sich selbst angeheftet werden");
        }
    }
}

function dropzonenErstellen(kartenId) {
    einzelneDropzoneErstellen("dropzoneEigeneOffeneKarten", "eigeneOffeneKarten");
    einzelneDropzoneErstellen("dropzoneSpielerObenLinksOffeneKarten", "spielerObenLinksOffeneKarten");
    einzelneDropzoneErstellen("dropzoneSpielerObenRechtsOffeneKarten", "spielerObenRechtsOffeneKarten");
    einzelneDropzoneErstellen("dropzoneSpielerUntenRechtsOffeneKarten", "spielerUntenRechtsOffeneKarten");
    einzelneDropzoneErstellen("dropzoneMitte", "mitte");
}

function einzelneDropzoneErstellen(name, kontainer) {
    var dropzone = document.createElement("div");
    dropzone.setAttribute("id", name);
    dropzone.setAttribute("class", "dropzone karte");
    dropzone.setAttribute("ondragover", "ablegenErlauben(event)");
    dropzone.setAttribute("ondrop", "ablegen(event)");
    dropzone.style.position = "relative";
    dropzone.style.width = kartenbreite;
    dropzone.style.height = kartenhoehe;
    document.getElementById(kontainer).appendChild(dropzone);
}

function dropzonenLoeschen() {
    document.getElementById("eigeneOffeneKarten").removeChild(document.getElementById("dropzoneEigeneOffeneKarten"));
    document.getElementById("spielerObenLinksOffeneKarten").removeChild(document.getElementById("dropzoneSpielerObenLinksOffeneKarten"));
    document.getElementById("spielerObenRechtsOffeneKarten").removeChild(document.getElementById("dropzoneSpielerObenRechtsOffeneKarten"));
    document.getElementById("spielerUntenRechtsOffeneKarten").removeChild(document.getElementById("dropzoneSpielerUntenRechtsOffeneKarten"));
    document.getElementById("mitte").removeChild(document.getElementById("dropzoneMitte"));
}
