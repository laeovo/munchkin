<?php
    if (isset($_POST["name"])) {
        $fp = fopen("spielstatus.txt", r);
        $status = fgets($fp, filesize("spielstatus.txt")+1);
        fclose($fp);
        
        if ($status != "spielLaeuft") {
            setcookie("spielerName", $_POST["name"], time()+86400);
            $fp = fopen("spieler.txt", "a+");
            $data = fgets($fp, filesize("spieler.txt"));
            $bisherigeSpieler = explode("/", $data);
            $anzahlBisherigeSpieler = count($bisherigeSpieler);
            if ($data == "") {
                $anzahlBisherigeSpieler = 0;
            }
            setcookie("spielerId", $anzahlBisherigeSpieler, time()+86400);
            if ($anzahlBisherigeSpieler > 0) {
                fputs($fp, "/");
            }
            fputs($fp, $_POST["name"] . ";1");
            fclose($fp);
        }
    }
    
    if (isset($_COOKIE["spielerName"])) {
        ?>
<html>
    <head>
        <title>Munchkin</title>
        <script type="text/JavaScript">
            function automatischAktualisieren() {
                var ticker = setInterval(aktualisieren, 200);
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
                        link = window.document.getElementById("link");
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
        // Kein Cookie: entweder Eingabe oder Nichts
        echo "<html>";
        echo "    <head>";
        echo "        <title>Munchkin</title>";
        echo "        </head>";
        echo "    <body>";
        echo "        <div id=\"inhalt\">";
        echo "            <form id=\"eingabe\" action=\"registrieren.php\" method=\"post\"><input type=\"text\" name=\"name\" /><input type=\"submit\" value=\"Loslegen\" /></form><br />";
        echo "            </div>";
        echo "        </body>";
        echo "    </html>";
    }
    ?>
