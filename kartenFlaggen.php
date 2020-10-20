<?php
    /**
     Karte flaggen:
        von = "spieler(...)offen" / "mitte"
        karte = Zahl in [0, $anzahlKartenGesamt-1]
        neueFlag = "" / "x" ( = "normal" / "geflaggt")
     */
    
    $von = $_POST["von"];
    $vonDatei = "3" . $von . ".txt";
    $karte = $_POST["karte"];
    $fp = fopen($vonDatei, "a+");
    if (flock($fp, LOCK_EX)) {
        $bisherigeKartenString = fgets($fp, 4096);
        $bisherigeKarten = explode("/", $bisherigeKartenString);
        
        ftruncate($fp, 0);
        for ($i = 0; $i < count($bisherigeKarten); $i++) {
            if ($i != 0) {
                fwrite($fp, "/");
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
    else {
        echo "Die Datei " . $vonDatei . " konnte nicht gesperrt werden";
    }
    
    
    if ($_POST["neueFlag"] == "x") {
        echo "Die Karte " . $karte . " wurde geflaggt.";
    }
    else {
        echo "Die Karte " . $karte . " wurde entflaggt.";
    }
    
    
    ?>
