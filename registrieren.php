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
                        window.document.getElementById("inhalt").setAttribute("style", "cursor: pointer; width: 250px; height: 50px; margin: 0px auto; background-color: green; line-height: 50px;");
                    }
                }
                xhr.open("GET", "spielstatus.txt");
                xhr.send();
            }
            </script>
        </head>
    <body onload="automatischAktualisieren()" style="font-family: Avenir, Sans-Serif">
        <div id="inhalt" align="center" style="cursor: ; width: 250px; height: 50px; margin: 0px auto; background-color: #aaa; line-height: 50px;">
            <a id="link" href="" style="color: #777; text-decoration: none; cursor: default;">Los gehts!</a>
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
