<?php
    $anzahlTuerkartenGesamt = 162; // TODO: muss ganz am Ende angepasst werden
    
    /**
     Vom Stapel ziehen:
        von = "nachziehstapel"
        stapel = "Tuer" / "Schatz"
        nach = "spieler(...)offen" / "spieler(...)verdeckt" / "mitte"
     
     Eigene offene Karte drehen:
        von = "spieler(...)offen"
        karte = Zahl in [0, $anzahlKartenGesamt-1]
        neueDrehung = "" / "x" ( = "normal" / "gedreht")
     
     Alles andere:
        von = "spieler(...)offen" / "spieler(...)verdeckt" / "mitte"
        nach = "spieler(...)offen" / "spieler(...)verdeckt" / "mitte" / "ablagestapel"
        karte = Zahl in [0, $anzahlKartenGesamt-1]
     */
    
    $von = $_POST["von"];
    $vonDatei = "2" . $von . ".txt";
    
    
    if (isset($_POST["nach"])) {
        $karte = "";
        $karteExistiertNochInDerQuelle = false;
        
        /////////// Quelle
        
        if ($von == "nachziehstapel") {
            $karteExistiertNochInDerQuelle = true; // Die oberste Karte existiert immer - und sei es, dass der Stapel aufgefüllt wurde
            $stapel = "nachziehstapel" . $_POST["stapel"];
            $stapelDatei = "2" . $stapel . ".txt";
            $vonDatei = $stapelDatei;
            
            $fpQuelleStapel = fopen($stapelDatei, "a+");
            if (flock($fpQuelleStapel, LOCK_EX)) {
                $alterstapel = fgets($fpQuelleStapel, 4096);
                $karten = explode(";", $alterstapel);
                $karte = $karten[0];

                // TODO: Was passiert hier?
                if ($alterstapel == "") {
                    echo "Stapel ist leer.\n";
                    stapelAuffuellen($stapel);

                    $alterstapel = fgets($fpQuelleStapel, 4096);
                    $karten = explode(";", $alterstapel);
                    $karte = $karten[0];
                }

                $neuerStapel = "";
                for ($i = 1; $i < count($karten); $i++) {
                    $neuerStapel .= $karten[$i];
                    if ($i != count($karten)-1) {
                        $neuerStapel .= ";";
                    }
                }
                
                ftruncate($fpQuelleStapel, 0);
                fwrite($fpQuelleStapel, $neuerStapel);
                flock($fpQuelleStapel, LOCK_UN);
                fclose($fpQuelleStapel);
            }
        }
        else {
            $karte = $_POST["karte"];

            $fpQuelle = fopen($vonDatei, "a+");
            if (flock($fpQuelle, LOCK_EX)) {
                $bisherigeKartenVonString = fgets($fpQuelle, 4096);
                $bisherigeKartenVon = explode(";", $bisherigeKartenVonString);

                $neueKartenVon = "";
                for ($i = 0; $i < count($bisherigeKartenVon); $i++) {
                    if ($bisherigeKartenVon[$i] != $karte) {
                        if ($neueKartenVon != "") {
                            $neueKartenVon .= ";";
                        }
                        $neueKartenVon .= $bisherigeKartenVon[$i];
                    }
                    else {
                        $karteExistiertNochInDerQuelle = true;
                    }
                }
                ftruncate($fpQuelle, 0);
                fwrite($fpQuelle, $neueKartenVon);
                flock($fpQuelle, LOCK_UN);
                fclose($fpQuelle);
            }
        }
        
        //////////// Ziel
        if ($karteExistiertNochInDerQuelle) {
            $karte = explode($karte, "x")[0];
            $nach = $_POST["nach"];
            if ($nach == "ablagestapel") {
                if (intval($karte) < $anzahlTuerkartenGesamt) {
                    $nach .= "Tuer";
                }
                else {
                    $nach .= "Schatz";
                }
            }
            $nachDatei = "2" . $nach . ".txt";
            $fpZiel = fopen($nachDatei, "a+");
            if (flock($fpZiel, LOCK_EX)) {
                $bisherigeKartenNach = fgets($fpZiel, 4096);
                if ($bisherigeKartenNach != "") {
                    fwrite($fpZiel, ";");
                }
                fwrite($fpZiel, $karte);
                flock($fpZiel, LOCK_UN);
                fclose($fpZiel);
            }
            else {
                echo "Die Datei '" . $nachDatei . "' konnte nicht gesperrt werden.\n";
            }

            echo "Die Karte " . $karte . " wurde von " . $vonDatei . " nach " . $nachDatei . " bewegt.";
        }
        else {
            echo "Die Karte wurde bereits von jemandem anders bewegt";
        }
    }
    else if (isset($_POST["neueDrehung"])) {
        $karte = $_POST["karte"];
        $fp = fopen($vonDatei, "a+");
        if (flock($fp, LOCK_EX)) {
            $bisherigeKartenString = fgets($fp, 4096);
            $bisherigeKarten = explode(";", $bisherigeKartenString);
            
            ftruncate($fp, 0);
            for ($i = 0; $i < count($bisherigeKarten); $i++) {
                if ($i != 0) {
                    fwrite($fp, ";");
                }
                
                if (explode("x", $bisherigeKarten[$i])[0] == $karte) {
                    fwrite($fp, $karte . $_POST["neueDrehung"]);
                }
                else {
                    fwrite($fp, $bisherigeKarten[$i]);
                }
            }
            flock($fp, LOCK_UN);
            fclose($fp);
        }
    }
    
    
    function stapelAuffuellen($stapel) {
        // Annahme: der Ablagestapel hat mindestens sechs Karten
        $ablagestapelDatei = "2ablagestapel" . $stapel . ".txt";
        $nachziehstapelDatei = "2nachziehstapel" . $stapel . ".txt";

        $fpAblagestapel = fopen($ablagestapelDatei, "a+");
        if (flock($fpAblagestapel, LOCK_EX)) {
            $alterAblagestapel = fgets($fpAblagestapel, 4096);

            $karten = explode(";", $alterAblagestapel);
            $neuerNachziehstapel = "";
            $neuerAblagestapel = "";

            for ($i = 0; $i < count($karten); $i++) {
                if ($i < count($karten)-5) {
                    $neuerNachziehstapel .= $karten[$i];
                    if ($i != count($karten)-6) {
                        $neuerNachziehstapel .= ";";
                    }
                }
                else {
                    $neuerAblagestapel .= $karten[$i];
                    if ($i != count($karten)-1) {
                        $neuerAblagestapel .= ";";
                    }
                }
            }

            $fpNachziehstapel = fopen($nachziehstapelDatei, w);
            fwrite($fpNachziehstapel, $neuerNachziehstapel);
            fclose($fpNachziehstapel);

            ftruncate($fpAblagestapel, 0);
            fwrite($fpAblagestapel, $neuerAblagestapel);
            flock($fpAblagestapel, LOCK_UN);
            fclose($fpAblagestapel);
        }

        nachziehstapelMischen();
    }

    function nachziehstapelMischen() {
        stapelMischen("2nachziehstapelTuer.txt");
        stapelMischen("2nachziehstapelSchatz.txt");
    }

    function stapelMischen($dateiName) {
        $fp = fopen($dateiName, "a+");
        if (flock($fp, LOCK_EX)) { // ist wahrscheinlich nicht nötig, da diese Funktion nur von dem Scope aufgerufen werden kann, in dem die Daten bereits gelockt ist. Sollte aber auch nicht schaden.
            $alterStapel = fgets($fp, 4096);

            $karten = explode(";", $alterStapel);
            shuffle($karten);

            $neuerStapel = "";
            for ($i = 0; $i < count ($karten); $i++) {
                $neuerStapel .= $karten[$i];
                if ($i != count($karten)-1) {
                    $neuerStapel .= ";";
                }
            }

            ftruncate($fp, 0);
            fwrite($fp, $neuerStapel);
            flock($fp, LOCK_UN);
            fclose($fp);
        }
    }
    
    ?>
