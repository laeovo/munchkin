function test() {
    window.document.getElementById("154").appendChild(window.document.getElementById("73"));
}
function test2() {
    window.document.getElementById("eigeneOffeneKarten").appendChild(window.document.getElementById("73"));
    return 0;
}

function kartenZuruecksetzen() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log("Karten zurücksetzen");
        kartenAktualisieren();
    }
    xhr.open("POST", "spielleitung/start.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("spielversionen=1");
}
