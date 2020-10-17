<?php
    /**
     Karte flaggen:
        von = "spieler(...)offen" / "mitte"
        karte = Zahl in [0, $anzahlKartenGesamt-1]
        neueFlag = "" / "x" ( = "normal" / "geflaggt")
     
     Karte bewegen:
        stapel = bei Ziehen vom Nachziehstapel: "Tuer" oder "Schatz"
        von = Kartenregion
        nach = Kartenregion
        karte = Zahl in [0, $anzahlKartenGesamt-1]
        mitKindern = "true" / "false"
        append = Zahl (diese Karte muss in "nach" vorhanden sein) oder "x"
     
     */
    
    $von = $_POST["von"];
    $vonDatei = "3" . $von . $_POST["stapel"] . ".txt";
    $nach = $_POST["nach"];
    $nachDatei = "3" . $nach . ".txt";
    $karte = $_POST["karte"];
    
    // TODO: Funktion, um Karte zu flaggen
    
    $fpQuelle = fopen($vonDatei, "a+");
    if (flock($fpQuelle, LOCK_EX)) {
        $bisherigeKartenVonString = fgets($fpQuelle, 4096);
        $bisherigeKartenVon = explode("/", $bisherigeKartenVonString);

        $neueKartenVon = "";
        if ($von == "nachziehstapel") {
            $karteExistiertNochInDerQuelle = true;
            $karte = $bisherigeKartenVon[0];
            
            // TODO: Nachziehstapel wieder auffüllen, dabei Karten entflaggen
            
            for ($i = 1; $i < count($bisherigeKartenVon); $i++) {
                if ($neueKartenVon != "") {
                    $neueKartenVon .= "/";
                }
                $neueKartenVon .= $bisherigeKartenVon[$i];
            }
        }
        else {
            for ($i = 0; $i < count($bisherigeKartenVon); $i++) {
                $kartenImKartenSpace = explode(";", $bisherigeKartenVon[$i]);
                for ($j = 0; $j < count($kartenImKartenSpace); $j++) {
                    if (explode("x", $kartenImKartenSpace[$j])[0] != explode("x", $karte)[0]) {
                        $karteExistiertNochInDerQuelle = true;
                        if (mitKindern == "true" && $j+1 < count($bisherigeKartenVon)) {
                            for ($k = $j+1; $k < count($kartenImKartenSpace); $k++) {
                                $karte .= ";" . explode("x", $kartenImKartenSpace[$k])[0]; // Karte ist nach Bewegen nicht mehr geflaggt
                            }
                            break;
                        }
                    }
                    else {
                        if ($j == 0) {
                            if ($neueKartenVon != "") {
                                $neueKartenVon .= "/";
                            }
                        }
                        else {
                            $neueKartenVon .= ";";
                        }
                        $neueKartenVon .= $kartenImKartenSpace[$j][0];
                    }
                }
            }
        }
        ftruncate($fpQuelle, 0);
        fwrite($fpQuelle, $neueKartenVon);
        flock($fpQuelle, LOCK_UN);
        fclose($fpQuelle);
    }
    else {
        echo "Konnte Quelldatei \"" . $vonDatei . "\" nicht sperren";
    }
    
    if ($karteExistiertNochInDerQuelle) {
        $fpZiel = fopen($nachDatei, "a+");
        if (flock($fpZiel, LOCK_EX)) {
            $bisherigeKartenNach = fgets($fpZiel, 4096);
            $karte = str_replace("x", "", $karte);
            $parentKarte = $_POST["append"];
            if ($parentKarte != "x") {
                echo "Karte soll angehängt werden, denn append ist '" . $_POST["append"] . "'\n";
                $bisherigeKartenNach = str_replace($parentKarte, $parentKarte . ";" . $karte, $bisherigeKartenNach);
                ftruncate($fpZiel, 0);
                fwrite($fpZiel, $bisherigeKartenNach);
                flock($fpZiel, LOCK_UN);
                fclose($fpZiel);
            }
            else {
                if ($nach == "ablagestapelTuer" || $nach == "ablagestapelSchatz") {
                    for ($i = 0; $i < count(explode(";", $karte)); $i++) {
                        if ($bisherigeKartenNach != "") { // TODO: das wird nicht funktionieren...
                            fwrite($fpZiel, "/");
                        }
                        fwrite($fpZiel, explode(";", $karte)[$i]);
                    }
                }
                else {
                    if ($bisherigeKartenNach != "") {
                        fwrite($fpZiel, "/");
                    }
                    fwrite($fpZiel, $karte);
                }
                flock($fpZiel, LOCK_UN);
                fclose($fpZiel);
            }
            echo "Die Karte " . $karte . " wurde von " . $vonDatei . " nach " . $nachDatei . " bewegt.";
        }
        else {
            echo "Die Zieldatei '" . $nachDatei . "' konnte nicht gesperrt werden.\n";
        }
    }
    else {
        echo "Die Karte wurde bereits von jemandem anders bewegt";
    }
    
// Stapel neu mischen:
//                if ($karte == "") {
//                    echo "Stapel ist leer.\n";
//                    // Annahme: der Ablagestapel hat mindestens sechs Karten
//                    $ablagestapelDatei = "3" . "ablagestapel" . $stapel . ".txt";
//                    $nachziehstapelDatei = "3" . "nachziehstapel" . $stapel . ".txt";
//
//                    $fpAblagestapel = fopen($ablagestapelDatei, "a+");
//                    if (flock($fpAblagestapel, LOCK_EX)) {
//                        $alterAblagestapel = fgets($fpAblagestapel, 4096);
//
//                        $kartenAblagestapel = explode(";", $alterAblagestapel);
//                        $neueNachziehkarten = [];
//                        $neuerAblagestapel = "";
//
//                        for ($i = 0; $i < count($kartenAblagestapel); $i++) {
//                            if ($i < count($kartenAblagestapel)-5) {
//                                array_push($neueNachziehkarten, $kartenAblagestapel[$i]);
//                            }
//                            else {
//                                $neuerAblagestapel .= $kartenAblagestapel[$i];
//                                if ($i != count($kartenAblagestapel)-1) {
//                                    $neuerAblagestapel .= ";";
//                                }
//                            }
//                        }
//                        shuffle($neueNachziehkarten);
//                        $neuerNachziehstapel = "";
//                        for ($i = 0; $i < count($neueNachziehkarten); $i++) {
//                            $neuerNachziehstapel .= $neueNachziehkarten[$i];
//                            if ($i != count($neueNachziehkarten)-1) {
//                                $neuerNachziehstapel .= ";";
//                            }
//                        }
//                        fwrite($fpQuelleStapel, $neuerNachziehstapel);
//                        fflush($fpQuelleStapel);
//
//                        ftruncate($fpAblagestapel, 0);
//                        fwrite($fpAblagestapel, $neuerAblagestapel);
//                        flock($fpAblagestapel, LOCK_UN);
//                        fclose($fpAblagestapel);
//                    }
//                    else {
//                        echo "Die Datei des Ablagestapels konnte nicht gesperrt werden.\n";
//                    }
//
//                    $alterstapel = $neuerNachziehstapel;
//                    $karten = explode(";", $alterstapel);
//                    $karte = $karten[0];
//                }
//


    
//    else if (isset($_POST["neueFlag"])) {
//        $karte = $_POST["karte"];
//        $fp = fopen($vonDatei, "a+");
//        if (flock($fp, LOCK_EX)) {
//            $bisherigeKartenString = fgets($fp, 4096);
//            $bisherigeKarten = explode(";", $bisherigeKartenString);
//
//            ftruncate($fp, 0);
//            for ($i = 0; $i < count($bisherigeKarten); $i++) {
//                if ($i != 0) {
//                    fwrite($fp, ";");
//                }
//
//                if (explode("x", $bisherigeKarten[$i])[0] == $karte) {
//                    fwrite($fp, $karte . $_POST["neueFlag"]);
//                }
//                else {
//                    fwrite($fp, $bisherigeKarten[$i]);
//                }
//            }
//            flock($fp, LOCK_UN);
//            fclose($fp);
//        }
//        if ($_POST["neueFlag"] == "x") {
//            echo "Die Karte " . $karte . " wurde geflaggt.";
//        }
//        else {
//            echo "Die Karte " . $karte . " wurde entflaggt.";
//        }
//    }
    
    ?>
