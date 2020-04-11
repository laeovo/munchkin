function spielerSteigtAuf() {
    const aufsteigenRequest = new XMLHttpRequest();
    aufsteigenRequest.onload = function() {
        console.log(aufsteigenRequest.responseText);
        spielerAktualisieren();
    };
    aufsteigenRequest.open("POST", "spielstandManager.php");
    aufsteigenRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    aufsteigenRequest.send("deltaStufe=1");
}

function spielerSteigtAb() {
    const absteigenRequest = new XMLHttpRequest();
    absteigenRequest.onload = function() {
        console.log(absteigenRequest.responseText);
        spielerAktualisieren();
    };
    absteigenRequest.open("POST", "spielstandManager.php");
    absteigenRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    absteigenRequest.send("deltaStufe=-1");
}
