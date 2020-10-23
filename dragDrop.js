function ziehen(ev) {
    ev.dataTransfer.setData("gedraggteKarte", ev.target.parentElement.id);
}

function ablegenErlauben(ev) {
    ev.preventDefault();
}

function ablegen(ev) {
    ev.preventDefault();
    var childId = ev.dataTransfer.getData("gedraggteKarte");
    var parentKarte = ev.target.parentElement;
    var parentId = parentKarte.id;
    if (childId != parentId) {
        console.log("ablegen:: childId = " + childId + ", parentId = " + parentId);
        karteAnheften(childId, parentId, "true"); // TODO: Option für Kinder
    }
    else {
        console.log("Die Karte " + childId + " kann nicht an sich selbst angeheftet werden");
    }
}

