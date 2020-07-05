<html>
    <head>
        <title>Munchkin</title>
        <script type="text/JavaScript" src="aktualisieren.js"></script>
        <script type="text/JavaScript" src="kartenBewegen.js"></script>
        <script type="text/JavaScript" src="Kartenmenu.js"></script>
        <script type="text/JavaScript" src="spielstandManipulieren.js"></script>
        <?php
            if (!isset($_COOKIE["spielerId"])) { echo "<meta http-equiv=\"refresh\" content=\"0; URL=http://www.leo.vornberger.net/munchkin/registrieren.php\">"; }
            ?>
        <link rel="stylesheet" txpe="text/css" href="style.css" />
        </head>
    <body onload="automatischeSpielerAktualisierung(), automatischeKartenAktualisierung(), autostop()">
        <div id="stapel">
            <div id="ablagestapelTuer" class="stapelKarte"><img id="ablagestapelTuerBild" style="max-width: 100%; max-height: 100%" onclick="ablagestapelMenu('Tuer')" /></div>
            <div id="nachziehstapelTuer" class="stapelKarte"><img src="karten/tuerkarte_oben_mitSchrift.jpg" style="max-width: 100%; max-height: 50%" onclick="tuerkarteOffenZiehen()" /><img src="karten/tuerkarte_unten_mitSchrift.jpg" style="max-width: 100%; max-height: 50%" onclick="tuerkarteVerdecktZiehen()" /></div>
            <div id="nachziehstapelSchatz" class="stapelKarte"><img src="karten/schatzkarte_oben_mitSchrift.jpg" style="max-width: 100%; max-height: 50%" onclick="schatzkarteOffenZiehen()" /><img src="karten/schatzkarte_unten_mitSchrift.jpg" style="max-width: 100%; max-height: 50%" onclick="schatzkarteVerdecktZiehen()" /></div>
            <div id="ablagestapelSchatz" class="stapelKarte"><img id="ablagestapelSchatzBild" style="max-width: 100%; max-height: 100%" onclick="ablagestapelMenu('Schatz')" /></div>
            </div>
        <div id="mitte"></div>
        
        <div id="spielerObenLinksHandkarten"></div>
        <div id="spielerObenLinksOffeneKarten"></div>
        
        <div id="spielerObenRechtsHandkarten"></div>
        <div id="spielerObenRechtsOffeneKarten"></div>
        
        <div id="spielerUntenRechtsHandkarten"></div>
        <div id="spielerUntenRechtsOffeneKarten"></div>

        <div id="eigeneHandkarten"></div>
        <div id="eigeneOffeneKarten"></div>
        
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
