function ziehen(ev) {
    ev.dataTransfer.setData("gedraggteKarte", ev.target.parentElement.id);
}

function ablegenErlauben(ev) {
    // TODO: Eine Karte darf nicht auf sich selber gelegt werden können
    ev.preventDefault();
}

function ablegen(ev) {
    ev.preventDefault();
    var childId = ev.dataTransfer.getData("gedraggteKarte");
    var parentKarte = ev.target.parentElement;
    var parentId = parentKarte.id;
    console.log("ablegen:: childId = " + childId + ", parentId = " + parentId);
    karteAnheften(childId, parentId, "true"); // TODO: Option für Kinder
}

