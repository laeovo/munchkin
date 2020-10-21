function ziehen(ev) {
    ev.dataTransfer.setData("gedraggteKarte", ev.target.id);
}

function ablegenErlauben(ev) {
    ev.preventDefault();
}

function ablegen(ev) {
    ev.preventDefault();
    var childId = ev.dataTransfer.getData("gedraggteKarte");
    var parentKarte = ev.target.parentElement;
    var parentId = parentKarte.id;
    console.log("ablegen:: childId = " + childId + ", parentId = " + parentId);
    karteAnheften(childId, parentId, "true");
    parentKarte.appendChild(document.getElementById(childId));
}

