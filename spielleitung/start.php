<?php
    // Was passiert alles beim Start?
    
    $fp = fopen("../spielstatus.txt", r);
    $status = fgets($fp, filesize("spielstatus.txt")+1);
    fclose($fp);
    if ($status == "spielLaeuft") {
        echo "Spiel läuft";
        // nichts tun!
    }
    else {
        if ($_POST["spielversionen"] == "") {
            echo "Keine Karten";
        }
        else {
            $spielversionen = explode(";", $_POST["spielversionen"]);
            $tuerkarten = [];
            $schatzkarten = [];
            if (in_array("1", $spielversionen)) {
                // Munchkin 1 und 2
                $tuerkarten = array_merge($tuerkarten, range(0, 160));
                $schatzkarten = array_merge($schatzkarten, range(161, 281));
            }
            if (in_array("2", $spielversionen) && isset($_COOKIE["superuser"]) && $_COOKIE["superuser"] == "yes") {
                // Star Munchkin
                $tuerkarten = array_merge($tuerkarten, range(282, 447));
                $schatzkarten = array_merge($schatzkarten, range(448, 559));
            }
            shuffle($tuerkarten);
            shuffle($schatzkarten);
            
            $tuerkartenString = "";
            $schatzkartenString = "";
            for ($i = 0; $i < count($tuerkarten); $i++) {
                if ($i != 0) {
                    $tuerkartenString .= ";";
                }
                $tuerkartenString .= $tuerkarten[$i];
            }
            for ($i = 0; $i < count($schatzkarten); $i++) {
                if ($i != 0) {
                    $schatzkartenString .= ";";
                }
                $schatzkartenString .= $schatzkarten[$i];
            }
            
            $fp = fopen("../" . "3" . "nachziehstapelTuer.txt", w);
            fputs($fp, $tuerkartenString);
            fclose($fp);
            $fp = fopen("../" . "3" . "nachziehstapelSchatz.txt", w);
            fputs($fp, $schatzkartenString);
            fclose($fp);
            
            // Andere Stapel leeren
            $fp = fopen("../" . "3" . "ablagestapelTuer.txt", w);
            fputs($fp, "");
            fclose($fp);
            $fp = fopen("../" . "3" . "ablagestapelSchatz.txt", w);
            fputs($fp, "");
            fclose($fp);
            
            // Mitte iniziieren
            $fp = fopen("../" . "3" . "mitte.txt", w);
            fputs($fp, "");
            fclose($fp);
            
            // Dateien für Spieler anlegen
            $fp = fopen("../" . "3" . "spieler.txt", r);
            $data = fgets($fp, filesize("../" . "3" . "spieler.txt")+1);
            fclose($fp);
            $spieler = explode("/", $data);
            for ($i = 0; $i < 4; $i++) {
                $fp = fopen("../" . "3" . "karten" . $i . "verdeckt.txt", w);
                fputs($fp, "");
                fclose($fp);
                $fp = fopen("../" . "3" . "karten" . $i . "offen.txt", w);
                fputs($fp, "");
                fclose($fp);
            }
        }
    }
    ?>
