<?php
    /**
     Karte bewegen:
        stapel = bei Ziehen vom Nachziehstapel: "Tuer" oder "Schatz"
        von = Kartenregion
        nach = Kartenregion
        karte = Zahl in [0, $anzahlKartenGesamt-1]
        mitKindern = "true" / "false"
        append = Zahl (diese Karte muss in "nach" vorhanden sein) oder "x"
        TODO: Parameter, der angibt, zwischen welchen Karten die neue Karte positioniert werden soll
     
     */
    
    $von = $_POST["von"];
    $vonDatei = "3" . $von . $_POST["stapel"] . ".txt";
    $nach = $_POST["nach"];
    $nachDatei = "3" . $nach . ".txt";
    $karte = $_POST["karte"];
    
    $fpQuelle = fopen($vonDatei, "a+");
    if (flock($fpQuelle, LOCK_EX)) {
        $bisherigeKartenspacesVonString = fgets($fpQuelle, 4096);
        $bisherigeKartenspacesVon = explode("/", $bisherigeKartenspacesVonString);

        $neueKartenspacesVon = "";
        if ($von == "nachziehstapel") {
            $karteExistiertNochInDerQuelle = true;
            $karte = $bisherigeKartenspacesVon[0];
            
            if ($karte == "") {
                echo "Stapel ist leer.\n";
                // Annahme: der Ablagestapel hat mindestens sechs Karten
                $ablagestapelDatei = "3" . "ablagestapel" . $_POST["stapel"] . ".txt";
                $nachziehstapelDatei = $vonDatei;

                $fpAblagestapel = fopen($ablagestapelDatei, "a+");
                if (flock($fpAblagestapel, LOCK_EX)) {
                    $alterAblagestapel = fgets($fpAblagestapel, 4096);

                    $kartenAblagestapel = explode("/", $alterAblagestapel);
                    $neueNachziehkarten = [];
                    $neuerAblagestapel = "";
                    
                    if (count($kartenAblagestapel) < 5) {
                        echo "Kann keine neuen Karten auf den Nachziehstapel nachlegen, da der Ablagestapel weniger als fünf Karten hat";
                    }
                    
                    // Bis auf die fünf letzten Karten im Ablagestapel werden alle Karten später gemischt auf den Nachziehstapel nachgelegt
                    for ($i = 0; $i < count($kartenAblagestapel)-5; $i++) {
                        array_push($neueNachziehkarten, $kartenAblagestapel[$i]);
                    }
                    // Die letzten fünf Karten bleiben auf dem Ablagestapel
                    for ($i = count($kartenAblagestapel)-5; $i < count($kartenAblagestapel); $i++) {
                        if ($neuerAblagestapel != "") {
                            $neuerAblagestapel .= "/";
                        }
                        $neuerAblagestapel .= $kartenAblagestapel[$i];
                    }
                    shuffle($neueNachziehkarten);
                    $neuerNachziehstapel = "";
                    for ($i = 0; $i < count($neueNachziehkarten); $i++) {
                        if ($neuerNachziehstapel != "") {
                            $neuerNachziehstapel .= "/";
                        }
                        $neuerNachziehstapel .= $neueNachziehkarten[$i];
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
            
            for ($i = 1; $i < count($bisherigeKartenspacesVon); $i++) {
                if ($neueKartenspacesVon != "") {
                    $neueKartenspacesVon .= "/";
                }
                $neueKartenspacesVon .= $bisherigeKartenspacesVon[$i];
            }
        }
        else {
            for ($i = 0; $i < count($bisherigeKartenspacesVon); $i++) {
                $kartenImKartenspace = explode(";", $bisherigeKartenspacesVon[$i]);
                $kartenVonDiesemKartenspaceUebernommen = false; // gibt an, ob im aktuellen Kartenspace schon Karten zu $neueKartenspacesVon hinzugefügt wurden. Ist nur eine Variable, um zu speichern, welches Trennzeichen später verwendet werden soll.
                for ($j = 0; $j < count($kartenImKartenspace); $j++) {
                    if (explode("x", $kartenImKartenspace[$j])[0] == explode("x", $karte)[0]) {
                        // Die entsprechende Karte wurde im i-ten Kartenspace an j-ter Stelle gefunden
                        $karteExistiertNochInDerQuelle = true;
                        if ($_POST["mitKindern"] == "true") {
                            for ($k = $j+1; $k < count($kartenImKartenspace); $k++) {
                                $karte .= ";" . explode("x", $kartenImKartenspace[$k])[0]; // Karte ist nach Bewegen nicht mehr geflaggt
                            }
                            break;
                        }
                    }
                    else {
                        if (!$kartenVonDiesemKartenspaceUebernommen) {
                            if ($neueKartenspacesVon != "") {
                                $neueKartenspacesVon .= "/";
                            }
                            $kartenVonDiesemKartenspaceUebernommen = true;
                        }
                        else {
                            $neueKartenspacesVon .= ";";
                        }
                        $neueKartenspacesVon .= $kartenImKartenspace[$j];
                    }
                }
            }
        }
        ftruncate($fpQuelle, 0);
        fwrite($fpQuelle, $neueKartenspacesVon);
        flock($fpQuelle, LOCK_UN);
        fclose($fpQuelle);
    }
    else {
        echo "Konnte Quelldatei \"" . $vonDatei . "\" nicht sperren";
    }
    
    if ($karteExistiertNochInDerQuelle) {
        $fpZiel = fopen($nachDatei, "a+");
        if (flock($fpZiel, LOCK_EX)) {
            $bisherigeKartenNachString = fgets($fpZiel, 4096);
            if ($von != $nach) {
                $karte = str_replace("x", "", $karte);
            }
            $parentKarte = $_POST["append"];
            if ($parentKarte != "x") {
                // Karte soll angehängt werden
                $neueKartenNach = "";
                $bisherigeKartenNach = explode("/", $bisherigeKartenNachString);
                $karteWurdeEingesetzt = false;
                for ($i = 0; $i < count($bisherigeKartenNach); $i++) {
                    if ($i != 0) {
                        $neueKartenNach .= "/";
                    }
                    $kartenspaceString = $bisherigeKartenNach[$i];
                    $kartenspace = explode(";", $kartenspaceString);
                    for ($j = 0; $j < count($kartenspace); $j++) {
                        if ($j != 0) {
                            $neueKartenNach .= ";";
                        }
                        if (explode("x", $kartenspace[$j])[0] == $parentKarte) {
                            $neueKartenNach .= $kartenspace[$j] . ";" . $karte;
                            $karteWurdeEingesetzt = true;
                        }
                        else {
                            $neueKartenNach .= $kartenspace[$j];
                        }
                    }
                }
                if (!$karteWurdeEingesetzt) {
                    echo "Die Parent-Karte wurde nicht gefunden!\n";
                    echo "Karte = " . $karte . "\n";
                    echo "Parentkarte: " . $parentKarte . "\n";
                    echo "bisherigeKartenString: " . $bisherigeKartenNachString . "\n";
                }
                ftruncate($fpZiel, 0);
                fwrite($fpZiel, $neueKartenNach);
                flock($fpZiel, LOCK_UN);
                fclose($fpZiel);
            }
            else {
                // Karte soll nicht an eine andere Karte angehängt werden
                if ($nach == "ablagestapelTuer" || $nach == "ablagestapelSchatz" || count(explode("verdeckt", $nach)) == 2) {
                    // In Handkarten oder Ablagestapel können keine Karten gestapelt werden, deswegen werden alle möglichen Kinder hier einzeln an die Regionen angehängt
                    for ($i = 0; $i < count(explode(";", $karte)); $i++) {
                        if ($bisherigeKartenNachString != "" || $i > 0) {
                            fwrite($fpZiel, "/");
                        }
                        fwrite($fpZiel, explode(";", $karte)[$i]);
                    }
                }
                else {
                    if ($bisherigeKartenNachString != "") {
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
    ?>
