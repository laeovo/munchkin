<?php
    $anzahlTuerkartenGesamt = 10; // TODO: muss ganz am Ende angepasst werden
    
    /**
     Vom Stapel ziehen:
        von = "nachziehstapel"
        stapel = "Tuer" / "Schatz"
        nach = "spieler(...)offen" / "spieler(...)verdeckt" / "mitte"
     
     Karte flaggen:
        von = "spieler(...)offen" / "mitte"
        karte = Zahl in [0, $anzahlKartenGesamt-1]
        neueFlag = "" / "x" ( = "normal" / "geflaggt")
     
     Alles andere:
        von = "spieler(...)offen" / "spieler(...)verdeckt" / "mitte"
        nach = "spieler(...)offen" / "spieler(...)verdeckt" / "mitte" / "ablagestapel"
        karte = Zahl in [0, $anzahlKartenGesamt-1]
     
     */
    
    $von = $_POST["von"];
    $vonDatei = "3" . $von . ".txt";
    
    
    if (isset($_POST["nach"])) {
        $karte = "";
        $karteExistiertNochInDerQuelle = false;
        
        /////////// Quelle
        
        if ($von == "nachziehstapel") {
            $karteExistiertNochInDerQuelle = true; // Die oberste Karte existiert immer - und sei es, dass der Stapel aufgefüllt wurde
            $stapel = $_POST["stapel"];
            $stapelDatei = "3" . "nachziehstapel" . $stapel . ".txt";
            $vonDatei = $stapelDatei;
            
            $fpQuelleStapel = fopen($stapelDatei, "a+");
            if (flock($fpQuelleStapel, LOCK_EX)) {
                $alterstapel = fgets($fpQuelleStapel, 4096);
                $karten = explode(";", $alterstapel);
                $karte = $karten[0];

                if ($karte == "") {
                    echo "Stapel ist leer.\n";
                    // Annahme: der Ablagestapel hat mindestens sechs Karten
                    $ablagestapelDatei = "3" . "ablagestapel" . $stapel . ".txt";
                    $nachziehstapelDatei = "3" . "nachziehstapel" . $stapel . ".txt";

                    $fpAblagestapel = fopen($ablagestapelDatei, "a+");
                    if (flock($fpAblagestapel, LOCK_EX)) {
                        $alterAblagestapel = fgets($fpAblagestapel, 4096);

                        $kartenAblagestapel = explode(";", $alterAblagestapel);
                        $neueNachziehkarten = [];
                        $neuerAblagestapel = "";

                        for ($i = 0; $i < count($kartenAblagestapel); $i++) {
                            if ($i < count($kartenAblagestapel)-5) {
                                array_push($neueNachziehkarten, $kartenAblagestapel[$i]);
                            }
                            else {
                                $neuerAblagestapel .= $kartenAblagestapel[$i];
                                if ($i != count($kartenAblagestapel)-1) {
                                    $neuerAblagestapel .= ";";
                                }
                            }
                        }
                        shuffle($neueNachziehkarten);
                        $neuerNachziehstapel = "";
                        for ($i = 0; $i < count($neueNachziehkarten); $i++) {
                            $neuerNachziehstapel .= $neueNachziehkarten[$i];
                            if ($i != count($neueNachziehkarten)-1) {
                                $neuerNachziehstapel .= ";";
                            }
                        }
                        fwrite($fpQuelleStapel, $neuerNachziehstapel);
                        fflush($fpQuelleStapel);

                        ftruncate($fpAblagestapel, 0);
                        fwrite($fpAblagestapel, $neuerAblagestapel);
                        flock($fpAblagestapel, LOCK_UN);
                        fclose($fpAblagestapel);
                    }
                    else {
                        echo "Die Datei des Ablagestapels konnte nicht gesperrt werden.\n";
                    }

                    $alterstapel = $neuerNachziehstapel;
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
                    if (explode("x", $bisherigeKartenVon[$i])[0] != explode("x", $karte)[0]) {
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
            $karte = explode("x", $karte)[0];
            $nach = $_POST["nach"];
            if ($nach == "ablagestapel") {
                if (intval($karte) < $anzahlTuerkartenGesamt) {
                    $nach .= "Tuer";
                }
                else {
                    $nach .= "Schatz";
                }
            }
            $nachDatei = "3" . $nach . ".txt";
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
    else if (isset($_POST["neueFlag"])) {
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
                    fwrite($fp, $karte . $_POST["neueFlag"]);
                }
                else {
                    fwrite($fp, $bisherigeKarten[$i]);
                }
            }
            flock($fp, LOCK_UN);
            fclose($fp);
        }
        if ($_POST["neueFlag"] == "x") {
            echo "Die Karte " . $karte . " wurde geflaggt.";
        }
        else {
            echo "Die Karte " . $karte . " wurde entflaggt.";
        }
    }
    
    ?>
