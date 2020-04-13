<?php
    if (isset($_COOKIE["spielerName"])) {
        echo "<html><head><meta http-equiv=\"refresh\" content=\"0; URL=http://www.leo.vornberger.net/munchkin/munchkin.php\"></head><body></body></html>";
    }
    else {
        $fp = fopen("spielstatus.txt", r);
        $status = fgets($fp, filesize("spielstatus.txt")+1);
        fclose($fp);
        
        if ($status == "spielLaeuft") {
    ?>
            <html>
                <head>
                    <title>Munchkin</title>
                    </head>
                <body>
                    <p>Es l&auml;uft bereits ein Spiel; Sorry :/</p>
                </body>
            </html>
<?php
        }
        else {
    ?>
            <html>
                <head>
                    <title>Munchkin</title>
                    </head>
                <body>
                    <form action="registrieren.php" method="post"><input type="text" name="name" /><input type="submit" value="Loslegen" /></form><br />
                </body>
            </html>
<?php
        }
    }
    ?>
//
//<?php
//
//    if (isset($_POST["name"])) {
//        setcookie("spielerName", $_POST["name"], time()+86400);
//        $fp = fopen("spieler.txt", "a+");
//        $data = fgets($fp, filesize("spieler.txt"));
//        $bisherigeSpieler = explode("/", $data);
//        $anzahlBisherigeSpieler = count($bisherigeSpieler);
//        if ($data == "") {
//            $anzahlBisherigeSpieler = 0;
//        }
//        setcookie("spielerId", $anzahlBisherigeSpieler, time()+86400);
//        if ($anzahlBisherigeSpieler > 0) {
//            fputs($fp, "/");
//        }
//        fputs($fp, $_POST["name"] . ";1");
//        fclose($fp);
//    }
//    else {
//        setcookie("spielerName", "---", time()-1);
//        setcookie("spielerId", "---", time()-1);
//    }
//    ?>
//<html>
//    <head>
//        <title>Munchkin - anmelden</title>
//        <script type="text/JavaScript" src="kartenBewegen.js"></script>
//        <script type="text/JavaScript" src="aktualisieren.js"></script>
//        <script type="text/JavaScript">
//            function starten() {
//                const xhr = new XMLHttpRequest();
//                xhr.open("GET", "start.php");
//                xhr.send();
//            }
//
//            function spielerResetten() {
//                const xhr = new XMLHttpRequest();
//                xhr.onload = function() {
//                    window.document.getElementById("spieler").innerHTML = this.responseText;
//                }
//                xhr.open("GET", "spielerResetten.php");
//                xhr.send();
//            }
//            </script>
//        </head>
//    <body>
//        <?php
//            if (isset($_POST["name"])) {
//                echo "<input type=\"submit\" value=\"start.php\" onclick=\"starten()\" /><a href=\"munchkin.php\">Los gehts!</a>";
//            }
//            else {
//                echo "<form action=\"registrieren.php\" method=\"post\"><input type=\"text\" name=\"name\" /><input type=\"submit\" value=\"Loslegen\" /></form><br />";
//                echo "<input type=\"submit\" value=\"reset spieler.txt\" onclick=\"spielerResetten()\" /> Spieler: <span id=\"spieler\" color=\"red\">";
//                $fp = fopen("spieler.txt", r);
//                $spieler = fgets($fp, filesize("spieler.txt")+1);
//                fclose($fp);
//                echo $spieler . "</span>";
//            }
//            ?>
//        </body>
//    </html>
