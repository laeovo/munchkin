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
    if (parentId == "ablagestapelTuer" || parentId == "ablagestapelSchatz") {
        // Karte wird abgelegt
        karteBewegen(childId, getDateiname(getRegion(childId)), "ablagestapel" + getKartenArt(childId), "false", "x");
    }
    else {
        if (childId != parentId) {
            console.log("ablegen:: childId = " + childId + ", parentId = " + parentId);
            karteAnheften(childId, parentId, "false"); // TODO: Option für Kinder, aber nur wenn parentId kein Kind (oder Enkelkind) von ChildId ist
        }
        else {
            console.log("Die Karte " + childId + " kann nicht an sich selbst angeheftet werden");
        }
    }
}

