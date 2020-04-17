<?php
    if (isset($_COOKIE["spielerId"])) {
        $spielerId = $_COOKIE["spielerId"];
        if (isset($_POST["deltaStufe"])) {
            $fp = fopen("spieler.txt", "a+");
            if (flock($fp, LOCK_EX)) {
                $data = fgets($fp, 4096);
                $spieler = explode("/", $data);
                $nameDesSpielersMitDerNeuenStufe = explode(";", $spieler[$spielerId])[0];
                
                $dataNeu = "";
                $neueStufe = "";
                for ($i = 0; $i < count($spieler); $i++) {
                    if ($i == $spielerId) {
                        $alteStufe = explode(";", $spieler[$spielerId])[1];
                        $neueStufe = ($alteStufe + $_POST["deltaStufe"]) . "";
                        $dataNeu = $dataNeu . $nameDesSpielersMitDerNeuenStufe . ";" . $neueStufe;
                    }
                    else {
                        $dataNeu = $dataNeu . $spieler[$i];
                    }
                    if ($i != count($spieler) - 1) {
                        $dataNeu = $dataNeu . "/";
                    }
                }
                
                ftruncate($fp, 0);
                fputs($fp, $dataNeu);
                fclose($fp);
                echo "Spieler " . $spielerId . " (" . $nameDesSpielersMitDerNeuenStufe . ") ist jetzt auf Stufe " . $neueStufe . ".";
            }
            else {
                echo "Datei 'spieler.txt' kann nicht gesperrt werden";
            }
        }
    }
    ?>
