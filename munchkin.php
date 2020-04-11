<html>
    <head>
        <title>Munchkin</title>
        <script type="text/JavaScript" src="aktualisieren.js"></script>
        <script type="text/JavaScript" src="kartenBewegen.js"></script>
        <script type="text/JavaScript" src="Kartenmenu.js"></script>
        <script type="text/JavaScript" src="script.js"></script>
        <script type="text/JavaScript" src="spielstandManipulieren.js"></script>
        <link rel="stylesheet" txpe="text/css" href="style.css" />
        </head>
    <body onload="ablagestapelAktualisieren(), automatischeSpielerAktualisierung(), automatischeKartenAktualisierung(), autostop()">
        <a href="registrieren.php" align="center">Neustart</a>
<!--    <body onload="kartenAktualisieren()">-->
        <!-- Dieser Block wird noch umgeschrieben, sodass die Buttons schöner aussehen -->
        <!--
        <?php
            $fp = fopen("spieler.txt", r);
            $data = fgets($fp, filesize("spieler.txt")+1);
            fclose($fp);
            
            $spieler = explode("/", $data);
            for ($i = 0; $i < count($spieler); $i++) {
                $spielerName = explode(";", $spieler[$i])[0];
                $spielerStufe = explode(";", $spieler[$i])[1];
                echo "<p><span id=\"spielerName" . $i . "\">" . $spielerName . "</span>: <span id=\"spielerStufe" . $i . "\">" . $spielerStufe . "</span>";
                if (isset($_COOKIE["spielerName"]) && $i == $_COOKIE["spielerId"]) {
                    echo "<input type=\"submit\" value=\"erh&ouml;hen\" onclick=\"spielerSteigtAuf()\" /><input type=\"submit\" value=\"erniedrigen\" onclick=\"spielerSteigtAb()\" />";
                }
                echo "</p>\n";
            }
            ?>
        <input type="submit" onclick="stop()" value="Stop" />
        <a href="registrieren.php">Neustart</a>
        -->
        
        <div id="stapel">
            <div id="ablagestapelTuer" class="stapelKarte"><img id="ablagestapelTuerBild" style="max-width: 100%; max-height: 100%" /></div>
            <div id="nachziehstapelTuer" class="stapelKarte"><img src="karten/tuerkarte_oben.jpg" style="max-width: 100%; max-height: 50%%" onclick="tuerkarteOffenZiehen()" /><img src="karten/tuerkarte_unten.jpg" style="max-width: 100%; max-height: 50%%" onclick="tuerkarteVerdecktZiehen()" /></div>
            <div id="nachziehstapelSchatz" class="stapelKarte"><img src="karten/schatzkarte_oben.jpg" style="max-width: 100%; max-height: 50%" onclick="schatzkarteOffenZiehen()" /><img src="karten/schatzkarte_unten.jpg" style="max-width: 100%; max-height: 50%" onclick="schatzkarteVerdecktZiehen()" /></div>
            <div id="ablagestapelSchatz" class="stapelKarte"><img id="ablagestapelSchatzBild" style="max-width: 100%; max-height: 100%" /></div>
            </div>
        <div id="mitte"></div>
        
        <div id="eigeneHandkarten"></div>
        <div id="eigeneOffeneKarten"></div>
        
        <div id="spielerObenLinksHandkarten"></div>
        <div id="spielerObenLinksOffeneKarten"></div>
        
        <div id="spielerObenRechtsHandkarten"></div>
        <div id="spielerObenRechtsOffeneKarten"></div>
        
        <div id="spielerUntenRechtsHandkarten"></div>
        <div id="spielerUntenRechtsOffeneKarten"></div>
        
        <div id="eigeneInfo" class="spielerInfo">
            <div id="spielstandKlicker">
                <div id="spielstandErhoehen" align="center" onclick="spielerSteigtAuf()">
                    +
                    </div>
                <div id="spielstandErniedrigen" align="center" onclick="spielerSteigtAb()">
                    -
                    </div>
                </div>
            </div>
        <div id="spielerObenLinksInfo" class="spielerInfo"></div>
        <div id="spielerObenRechtsInfo" class="spielerInfo"></div>
        <div id="spielerUntenRechtsInfo" class="spielerInfo"></div>
        
        <script type="text/JavaScript" src="style.js"></script>
        </body>
    </html>
