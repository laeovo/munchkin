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
        $bisherigeKarten = fgets($fp, 4096);
        
        if ($_POST["neueFlag"] == "") {
            ftruncate($fp, 0);
            $kartenspaces = explode("/", $bisherigeKarten);
            for ($i = 0; $i < count($kartenspaces); $i++) {
                if ($i != 0) {
                    fwrite($fp, "/");
                }
                $kartenspace = $kartenspaces[$i];
                $kartenImKartenspace = explode(";", $kartenspace);
                for ($j = 0; $j < count($kartenImKartenspace); $j++) {
                    if ($j != 0) {
                        fwrite($fp, ";");
                    }
                    if ($kartenImKartenspace[$j] == $karte . "x") {
                        fwrite($fp, $karte);
                    }
                    else {
                        fwrite($fp, $kartenImKartenspace[$j]);
                    }
                }
            }
            echo "Die Karte " . $karte . " wurde entflaggt.";
        }
        elseif ($_POST["neueFlag"] == "x") {
            ftruncate($fp, 0);
            $kartenspaces = explode("/", $bisherigeKarten);
            for ($i = 0; $i < count($kartenspaces); $i++) {
                if ($i != 0) {
                    fwrite($fp, "/");
                }
                $kartenspace = $kartenspaces[$i];
                $kartenImKartenspace = explode(";", $kartenspace);
                for ($j = 0; $j < count($kartenImKartenspace); $j++) {
                    if ($j != 0) {
                        fwrite($fp, ";");
                    }
                    if ($kartenImKartenspace[$j] == $karte) {
                        fwrite($fp, $karte . "x");
                    }
                    else {
                        fwrite($fp, $kartenImKartenspace[$j]);
                    }
                }
            }
            echo "Die Karte " . $karte . " wurde geflaggt.";
        }
        else {
            echo "Die Flag '" . $_POST["neueFlag"] . "' ist ungültig\n";
        }
        flock($fp, LOCK_UN);
        fclose($fp);
    }
    else {
        echo "Die Datei " . $vonDatei . " konnte nicht gesperrt werden";
    }
    ?>
