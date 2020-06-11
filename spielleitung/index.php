<html>
    <head>
        <title>Munchkin - Spielleitung</title>
        <style type="text/css">
            .spielversion {
                cursor: pointer;
                opacity: 0.3;
            }
            </style>
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
            var spielversionenString = "";
            for (var i = 0; i < spielversionen.length; ++i) {
                if (i != 0) {
                    spielversionenString += ";";
                }
                spielversionenString += spielversionen[i];
            }
            const xhr = new XMLHttpRequest();
            xhr.onload = function() {
                console.log("Antwort von start.php: " + this.responseText);
            }
            xhr.open("POST", "start.php");
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send("spielversionen=" + spielversionenString);
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
                ?>
            <div id="superuser">Du bist ein Superuser!<br />
            <img src="spielversionen/1.jpg" id="spielversion1" class="spielversion" onclick="spielversionenSetzen('1')" /><img src="spielversionen/2.jpg" id="spielversion2" class="spielversion" onclick="spielversionenSetzen('2')" /></div>
            <script type="text/JavaScript">
                var spielversionen = ["1"];
                spielversionenSetzen("");
                function spielversionenSetzen(spielversion) {
                    if (spielversion == "") {
                        for (var i = 0; i < spielversionen.length; ++i) {
                            window.document.getElementById("spielversion" + spielversionen[i]).style.opacity = "1";
                        }
                    }
                    else {
                        if (spielversionen.includes(spielversion)) {
                            spielversionenAlt = spielversionen;
                            spielversionen = [];
                            for (var i = 0; i < spielversionenAlt.length; ++i) {
                                if (spielversionenAlt[i] != spielversion) {
                                    spielversionen.push(spielversionenAlt[i]);
                                }
                            }
                            window.document.getElementById("spielversion" + spielversion).style.opacity = "0.3";
                        }
                        else {
                            spielversionen.push(spielversion);
                            window.document.getElementById("spielversion" + spielversion).style.opacity = "1";
                        }
                    }
                }
                </script>
        <?php
            }
            ?>
        </body>
    </html>

