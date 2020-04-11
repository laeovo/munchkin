<?php
    if (isset($_COOKIE["spielerId"])) {
        $spielerId = $_COOKIE["spielerId"];
        if (isset($_POST["deltaStufe"])) {
            $fp = fopen("spieler.txt", r);
            $data = fgets($fp, filesize("spieler.txt")+1);
            fclose($fp);
            
            $spieler = explode("/", $data);
            $nameDesSpielersMitDerNeuenStufe = explode(";", $spieler[$spielerId])[0];
            
            $dataNeu = "";
            for ($i = 0; $i < count($spieler); $i++) {
                if ($i == $spielerId) {
                    $alteStufe = explode(";", $spieler[$spielerId])[1];
                    $dataNeu = $dataNeu . $nameDesSpielersMitDerNeuenStufe . ";" . ($alteStufe + $_POST["deltaStufe"]);
                }
                else {
                    $dataNeu = $dataNeu . $spieler[$i];
                }
                if ($i != count($spieler) - 1) {
                    $dataNeu = $dataNeu . "/";
                }
            }
            
            $fp = fopen("spieler.txt", w);
            fputs($fp, $dataNeu);
            fclose($fp);
            
            // Antwort:
            $fp = fopen("spieler.txt", r);
            $data = fgets($fp, filesize("spieler.txt")+2);
            fclose($fp);
            
            $neuesteStufe = explode(";", explode("/", $data)[$spielerId])[1];
            echo "Spieler " . $spielerId . " (" . $nameDesSpielersMitDerNeuenStufe . ") ist jetzt auf Stufe " . $neuesteStufe . ". Data = '" . $data . "'";
        }
    }
    ?>
