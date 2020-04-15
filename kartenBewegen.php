<?php
    $anzahlTuerkartenGesamt = 162; // TODO: muss ganz am Ende angepasst werden
    
    /**
     Vom Stapel ziehen:
        von = "nachziehstapel"
        stapel = "Tuer" / "Schatz"
        nach = "spieler(...)offen" / "spieler(...)verdeckt" / "mitte"
     
     Alles andere:
        von = "spieler(...)offen" / "spieler(...)verdeckt" / "mitte"
        nach = "spieler(...)offen" / "spieler(...)verdeckt" / "mitte" / "ablagestapel"
        karte = Zahl in [0, $anzahlKartenGesamt-1]
     */
    
    $von = $_POST["von"];
    $vonDatei = $von . ".txt";
    
    $karte = "";
    
    if ($von == "nachziehstapel") {
        $stapel = "nachziehstapel" . $_POST["stapel"];
        $stapelDatei = $stapel . ".txt";
        
        $fp = fopen($stapelDatei, r);
        $alterstapel = fgets($fp, filesize($stapelDatei)+1);
        fclose($fp);
        $karten = explode(";", $alterstapel);
        $karte = $karten[0];
        
        if ($alterstapel == "") {
            echo "Stapel ist leer.\n";
            stapelAuffuellen($stapel);

            $fp = fopen($stapelDatei, r);
            $alterstapel = fgets($fp, filesize($stapelDatei)+1);
            fclose($fp);
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
        $fp = fopen($stapelDatei, w);
        fputs($fp, $neuerStapel);
        fclose($fp);
    }
    else {
        $karte = $_POST["karte"];

        $fp = fopen($vonDatei, r);
        $bisherigeKartenVonString = fgets($fp, filesize($vonDatei)+1);
        $bisherigeKartenVon = explode(";", $bisherigeKartenVonString);
        fclose($fp);

        $neueKartenVon = "";
        for ($i = 0; $i < count($bisherigeKartenVon); $i++) {
            if ($bisherigeKartenVon[$i] != $karte) {
                if ($neueKartenVon != "") {
                    $neueKartenVon .= ";";
                }
                $neueKartenVon .= $bisherigeKartenVon[$i];
            }
        }
        $fp = fopen($vonDatei, w);
        fputs($fp, $neueKartenVon);
        fclose($fp);
    }
    
    $nach = $_POST["nach"];
    if ($nach == "ablagestapel") {
        if (intval($karte) < $anzahlTuerkartenGesamt) {
            $nach .= "Tuer";
        }
        else {
            $nach .= "Schatz";
        }
    }
    $nachDatei = $nach . ".txt";
    $fp = fopen($nachDatei, "a+");
    $bisherigeKartenNach = fgets($fp, filesize($nachDatei)+1);
    if ($bisherigeKartenNach != "") {
        fputs($fp, ";");
    }
    fputs($fp, $karte);
    fclose($fp);

    echo "Die Karte " . $karte . " wurde von " . $vonDatei . " nach " . $nachDatei . " bewegt.";
    
    
    
    function stapelAuffuellen($stapel) {
        // Annahme: der Ablagestapel hat mindestens sechs Karten
        $ablagestapelDatei = "ablagestapel" . $stapel . ".txt";
        $nachziehstapelDatei = "nachziehstapel" . $stapel . ".txt";

        $fp = fopen($ablagestapelDatei, r);
        $alterAblagestapel = fgets($fp, filesize($ablagestapelDatei)+1);
        fclose($fp);

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

        $fp = fopen($nachziehstapelDatei, w);
        fputs($fp, $neuerNachziehstapel);
        fclose($fp);

        $fp = fopen($ablagestapelDatei, w);
        fputs($fp, $neuerAblagestapel);
        fclose($fp);

        nachziehstapelMischen();
    }
    
    function nachziehstapelMischen() {
        stapelMischen("nachziehstapelTuer.txt");
        stapelMischen("nachziehstapelSchatz.txt");
    }

    function stapelMischen($dateiName) {
        $fp = fopen($dateiName, r);
        $alterStapel = fgets($fp, filesize($dateiName)+1);
        fclose($fp);

        $karten = explode(";", $alterStapel);
        shuffle($karten);

        $neuerStapel = "";
        for ($i = 0; $i < count ($karten); $i++) {
            $neuerStapel .= $karten[$i];
            if ($i != count($karten)-1) {
                $neuerStapel .= ";";
            }
        }

        $fp = fopen($dateiName, w);
        fputs($fp, $neuerStapel);
        fclose($fp);
    }
    
    ?>
