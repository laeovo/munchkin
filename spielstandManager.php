<?php
    if (isset($_COOKIE["spielerId"])) {
        $spielerId = $_COOKIE["spielerId"];
        $fp = fopen("2spieler.txt", "a+");
        if (flock($fp, LOCK_EX)) {
            $data = fgets($fp, 4096);
            $spieler = explode("/", $data);
            
            $dataNeu = "";
            for ($i = 0; $i < count($spieler); $i++) {
                if ($i == $spielerId) {
                    $name = explode(";", $spieler[$i])[0];
                    $stufe = explode(";", $spieler[$i])[1];
                    $geschlecht = explode(";", $spieler[$i])[2];
                    if (isset($_POST["deltaStufe"])) {
                        $neueStufe = ($stufe + $_POST["deltaStufe"]) . "";
                        $dataNeu = $dataNeu . $name . ";" . $neueStufe . ";" . $geschlecht;
                    }
                    elseif (isset($_POST["geschlecht"])) {
                        if ($_POST["geschlecht"] == "toggle") {
                            if ($geschlecht == "w") {
                                $neuesGeschlecht = "m";
                            }
                            else {
                                $neuesGeschlecht = "w";
                            }
                            $dataNeu = $dataNeu . $name . ";" . $stufe . ";" . $neuesGeschlecht;
                        }
                    }
                }
                else {
                    $dataNeu = $dataNeu . $spieler[$i];
                }
                if ($i != 3) {
                    $dataNeu = $dataNeu . "/";
                }
            }

            ftruncate($fp, 0);
            fputs($fp, $dataNeu);
            flock($fp, LOCK_UN);
            fclose($fp);
            echo "Spieler " . $spielerId . " (" . $nameDesSpielersMitDerNeuenStufe . ") ist jetzt auf Stufe " . $neueStufe . ".";
        }
        else {
            echo "Datei 'spieler.txt' kann nicht gesperrt werden";
        }
    }
    ?>
