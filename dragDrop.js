function ziehen(ev) {
    ev.dataTransfer.setData("gedraggteKarte", ev.target.parentElement.id);
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
        // Karte wird abgelegt
        karteBewegen(childId, getDateiname(getRegion(childId)), "ablagestapel", "x");
    }
//    else if (getRegion(parentId).split("Handkarten").length == 2) {
//        console.log("Karte wird zu Handkarten bewegt");
//        // Karte kann nicht an Handkarten angeheftet werden, wird also in die entsprechende Region bewegt
//        karteBewegen(childId, getRegion(childId), getRegion(parentId), "x");
//    }
    else {
        if (childId != parentId) {
            karteAnheften(childId, parentId);
        }
        else {
            console.log("Die Karte " + childId + " kann nicht an sich selbst angeheftet werden");
        }
    }
}

