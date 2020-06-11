<html>
    <head>
        <title>Munchkin - Spielleitung</title>
        </head>
    <script type="text/Javascript">
        var spielerTicker;
        var ticker;
        function spielerZuruecksetzen() {
            dateiSetzen("3" + "spieler.txt", "");
        }
        
        function spielSchliessen() {
            dateiSetzen("spielstatus.txt", "spielLaeuft");
        }
        
        function spielOeffnen() {
            dateiSetzen("spielstatus.txt", "");
        }
        
        function dateiSetzen(dateiName, neuerStatus) {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (dateiName == "spielstatus.txt") {
                    startStoppButtonSetzen();
                }
                else if (dateiName == "3" + "spieler.txt") {
                    spielerAktualisieren();
                }
            }
            xhr.open("POST", "dateiSetzen.php");
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send("neuerInhalt=" + neuerStatus + "&datei=" + dateiName);
        }
        
        function startStoppButtonSetzen() {
            var button = window.document.getElementById("startStopp");
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                const status = this.responseText;
                if (status == "spielLaeuft") {
                    button.setAttribute("value", "Spiel &ouml;ffnen");
                    button.setAttribute("onclick", "spielOeffnen(), startStoppButtonSetzen()");
                }
                else {
                    button.setAttribute("value", "Spiel schliessen");
                    button.setAttribute("onclick", "spielSchliessen(), startStoppButtonSetzen()");
                }
            }
            xhr.open("POST", "../getDatei.php");
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send("datei=spielstatus.txt");
        }
        
        function automatischAktualisieren() {
            const xhr = new XMLHttpRequest();
            xhr.onload = function() {
                console.log(this.responseText);
                window.document.getElementById("spielerInput").value = this.responseText;
            }
            xhr.open("GET", "../" + "3" + "spieler.txt");
            xhr.send();
            console.log("automatisch aktualisieren");
            spielerTicker = setInterval(spielerAktualisieren, 100);
            ticker = setInterval(startStoppButtonSetzen, 100);
            setTimeout(function() {
                clearInterval(spielerTicker);
                clearInterval(ticker);
                hinweis = document.createElement("p");
                hinweis.innerHTML = "Aktualisierung angehalten.";
                window.document.getElementById("hinweis").appendChild(hinweis);
            }, 60000)
        }
        
        function spielerAktualisieren() {
            var button = window.document.getElementById("startStopp");
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                const spielerString = this.responseText;
                window.document.getElementById("spieler").innerHTML = spielerString;
            }
            xhr.open("POST", "../getDatei.php");
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send("datei=" + "3" + "spieler.txt");
        }
    
        function kartenZuruecksetzen() {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "start.php");
            xhr.send();
        }
    
        function spielerAendern() {
            dateiSetzen("3" + "spieler.txt", window.document.getElementById("spielerInput").value);
            spielerAktualisieren();
        }
        </script>
    <body onload="automatischAktualisieren()">
        <input type="submit" value="Karten zur&uuml;cksetzen" onclick="kartenZuruecksetzen()" />
        <input type="submit" value="Spieler zur&uuml;cksetzen" onclick="spielerZuruecksetzen()" />
        <input id="startStopp" type="submit" />
        <p id="spieler"></p>
        <form><input type="text" id="spielerInput" /><input type="submit" value="Spieler ändern" onclick="spielerAendern()" /></form>
        <div id="hinweis"></div>
        <?php
            if (isset($_COOKIE["superuser"]) && $_COOKIE["superuser"] == "yes") {
                echo "<div id=\"superuser\">Hallo, du bist ein Superuser</div>";
            }
            ?>
        </body>
    </html>

