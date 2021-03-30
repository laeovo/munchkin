<?php
    // Was passiert alles beim Start?
    
    $fp = fopen("../spielstatus.txt", r);
    $status = fgets($fp, filesize("../spielstatus.txt")+1);
    fclose($fp);
    if ($status == "spielLaeuft") {
        echo "Spiel läuft. Hier passiert gar nichts.\n";
        // nichts tun!
    }
    else {
        if ($_POST["spielversionen"] == "") {
            echo "Keine Karten ausgewählt! Hier passiert gar nichts.\n";
        }
        else {
            echo "Setze Karten zurück. Spielversionen:\n";
            $spielversionen = explode(";", $_POST["spielversionen"]);
            $tuerkarten = [];
            $schatzkarten = [];
            if (in_array("1", $spielversionen)) {
                // Munchkin 1 und 2
                echo "1 - Munchkin 1 + 2\n";
                $neueTuerkarten = range(0, 160);
                for ($i = 0; $i < count($neueTuerkarten); $i++) {
                    $neueTuerkarten[$i] = "1.t." . $neueTuerkarten[$i];
                }
                $neueSchatzkarten = range(0, 120);
                for ($i = 0; $i < count($neueSchatzkarten); $i++) {
                    $neueSchatzkarten[$i] = "1.s." . $neueSchatzkarten[$i];
                }
                $tuerkarten = array_merge($tuerkarten, $neueTuerkarten);
                $schatzkarten = array_merge($schatzkarten, $neueSchatzkarten);
            }
            if (in_array("2", $spielversionen) && isset($_COOKIE["superuser"]) && $_COOKIE["superuser"] == "yes") {
                // Star Munchkin
                echo "2 - Star Munchkin\n";
                $neueTuerkarten = range(0, 165);
                for ($i = 0; $i < count($neueTuerkarten); $i++) {
                    $neueTuerkarten[$i] = "2.t." . $neueTuerkarten[$i];
                }
                $neueSchatzkarten = range(0, 111);
                for ($i = 0; $i < count($neueSchatzkarten); $i++) {
                    $neueSchatzkarten[$i] = "2.s." . $neueSchatzkarten[$i];
                }
                $tuerkarten = array_merge($tuerkarten, $neueTuerkarten);
                $schatzkarten = array_merge($schatzkarten, $neueSchatzkarten);
            }
            if (in_array("3", $spielversionen) && isset($_COOKIE["superuser"]) && $_COOKIE["superuser"] == "yes") {
                // Munchkin 5 und 6
                echo "3 - Munchkin 5 + 6\n";
                $neueTuerkarten = range(0, 67); // TODO: Mit Portal geht es bis 99
                for ($i = 0; $i < count($neueTuerkarten); $i++) {
                    $neueTuerkarten[$i] = "3.t." . $neueTuerkarten[$i];
                }
                $neueSchatzkarten = range(0, 54);
                for ($i = 0; $i < count($neueSchatzkarten); $i++) {
                    $neueSchatzkarten[$i] = "3.s." . $neueSchatzkarten[$i];
                }
                $tuerkarten = array_merge($tuerkarten, $neueTuerkarten);
                $schatzkarten = array_merge($schatzkarten, $neueSchatzkarten);
            }
            if (in_array("4", $spielversionen) && isset($_COOKIE["superuser"]) && $_COOKIE["superuser"] == "yes") {
                // Munchkin Cthulhu
                echo "4 - Munchkin Cthulhu\n";
                $neueTuerkarten = range(0, 161); // TODO: Eventuell bis 165, da gibts noch vier problematische Karten
                for ($i = 0; $i < count($neueTuerkarten); $i++) {
                    $neueTuerkarten[$i] = "4.t." . $neueTuerkarten[$i];
                }
                $neueSchatzkarten = range(0, 113);
                for ($i = 0; $i < count($neueSchatzkarten); $i++) {
                    $neueSchatzkarten[$i] = "4.s." . $neueSchatzkarten[$i];
                }
                $tuerkarten = array_merge($tuerkarten, $neueTuerkarten);
                $schatzkarten = array_merge($schatzkarten, $neueSchatzkarten);
            }
            shuffle($tuerkarten);
            shuffle($schatzkarten);
            
            $tuerkartenString = "";
            $schatzkartenString = "";
            for ($i = 0; $i < count($tuerkarten); $i++) {
                if ($i != 0) {
                    $tuerkartenString .= "/";
                }
                $tuerkartenString .= $tuerkarten[$i];
            }
            for ($i = 0; $i < count($schatzkarten); $i++) {
                if ($i != 0) {
                    $schatzkartenString .= "/";
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
            echo "Nachzieh- und Ablagestapel fertig\n";
            
            // Mitte iniziieren
            $fp = fopen("../" . "3" . "mitte.txt", w);
            fputs($fp, "");
            fclose($fp);
            echo "Mitte fertig\n";
            
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
            echo "Spieler fertig\n";
        }
    }
    ?>
