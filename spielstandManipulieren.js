function spielerSteigtAuf() {
    const aufsteigenRequest = new XMLHttpRequest();
    aufsteigenRequest.onload = function() {
        console.log(this.responseText);
        spielerAktualisieren();
    };
    aufsteigenRequest.open("POST", "spielstandManager.php");
    aufsteigenRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    aufsteigenRequest.send("deltaStufe=1");
}

function spielerSteigtAb() {
    const absteigenRequest = new XMLHttpRequest();
    absteigenRequest.onload = function() {
        console.log(this.responseText);
        spielerAktualisieren();
    };
    absteigenRequest.open("POST", "spielstandManager.php");
    absteigenRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    absteigenRequest.send("deltaStufe=-1");
}

function toggleGeschlecht() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(this.responseText);
        spielerAktualisieren();
    };
    xhr.open("POST", "spielstandManager.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("geschlecht=toggle");
}
