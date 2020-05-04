<?php
    $cookieGesetzt = false;
    if (isset($_POST["name"])) {
        $fp = fopen("spielstatus.txt", r);
        $status = fgets($fp, filesize("spielstatus.txt")+1);
        fclose($fp);
        
        if ($status != "spielLaeuft") {
            $cookieGesetzt = true;
            setcookie("spielerName", $_POST["name"], time()+86400);
            $fp = fopen("2spieler.txt", "a+");
            $data = fgets($fp, filesize("2spieler.txt"));
            $bisherigeSpieler = explode("/", $data);
            $anzahlBisherigeSpieler = count($bisherigeSpieler);
            if ($data == "") {
                $anzahlBisherigeSpieler = 0;
            }
            setcookie("spielerId", $anzahlBisherigeSpieler, time()+86400);
            if ($anzahlBisherigeSpieler > 0) {
                fputs($fp, "/");
            }
            fputs($fp, $_POST["name"] . ";1;" . $_POST["geschlecht"]);
            fclose($fp);
        }
    }
    
    if ($cookieGesetzt || isset($_COOKIE["spielerName"])) {
        ?>
<html>
    <head>
        <title>Munchkin</title>
        <script type="text/JavaScript">
            var ticker;
            function automatischAktualisieren() {
                ticker = setInterval(aktualisieren, 200);
                setTimeout(function() {
                    clearInterval(ticker);
                }, 60000);
            }

            function aktualisieren() {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    const status = this.responseText;
                    if (status == "spielLaeuft") {
                        clearInterval(ticker);
                        var link = window.document.getElementById("link");
                        link.setAttribute("href", "munchkin.php");
                        link.setAttribute("style", "color: #fff; text-decoration: none; cursor: pointer;");
                        window.document.getElementById("inhalt").setAttribute("style", "cursor: pointer; background-color: green; line-height: 50px;");
                    }
                }
                xhr.open("GET", "spielstatus.txt");
                xhr.send();
            }
            </script>
        </head>
    <body onload="automatischAktualisieren()" style="font-family: Avenir, Sans-Serif">
        <div style="width: 250px; heigt: 50px; position: absolute; top: 50vh; left: 50vw; transform: translate(-50%, -50%);">
            <a id="link" href="" style="color: #777; text-decoration: none; cursor: default;">
                <div id="inhalt" align="center" style="cursor: default; background-color: #aaa; line-height: 50px;">
                    Los gehts!
                    </div>
                </a>
            </div>
        </body>
    </html>
<?php
    }
    else {
    ?>
<html>
    <head>
        <title>Munchkin</title>
        <script type="text/JavaScript">
            var ticker;
            function automatischAktualisieren() {
                ticker = setInterval(aktualisieren, 200);
                setTimeout(function() {
                    clearInterval(ticker);
                }, 60000);
            }

            function aktualisieren() {
                console.log("aktualisieren()");
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    const status = this.responseText;
                    if (status == "spielLaeuft") {
                        var formular = window.document.getElementById("formular");
                        window.document.getElementById("inhalt").removeChild(formular);
                        clearInterval(ticker);
                        var text = document.createElement("p");
                        text.innerHTML = "Munchkin - gerade spielt schon jemand anders :/";
                        window.document.getElementById("inhalt").appendChild(text);
                        
                    }
                }
                xhr.open("GET", "spielstatus.txt");
                xhr.send();
            }
            </script>
        </head>
    <body onload="aktualisieren(), automatischAktualisieren()" style="font-family: Avenir, Sans-Serif" align="center">
        <div style="width: 400px; heigt: 50px; position: absolute; top: 50vh; left: 50vw; transform: translate(-50%, -50%);" id="inhalt">
            <form id="formular" action="registrieren.php" method="post">
                <input type="radio" name="geschlecht" value="w" id="w" /><label for="w">&#9792;</label>
                <input type="radio" name="geschlecht" value="m" id="m" /><label for="m">&#9794;</label>
                <input type="text" name="name" /><input type="submit" value="Anmelden" />
                </form>
            </div>
        </body>
    </html>
<?php
    }
    ?>
