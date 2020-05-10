<?php
    if (isset($_COOKIE["spielerId"])) {
        $spielerId = $_COOKIE["spielerId"];
        $fp = fopen("3" . "spieler.txt", "a+");
        if (flock($fp, LOCK_EX)) {
            $data = fgets($fp, 4096);
            $spieler = explode("/", $data);
            
            $dataNeu = "";
            for ($i = 0; $i < count($spieler); $i++) {
                if ($i == $spielerId) {
                    $name = explode(";", $spieler[$i])[0];
                    $stufe = explode(";", $spieler[$i])[1];
                    $neueStufe = $stufe;
                    $geschlecht = explode(";", $spieler[$i])[2];
                    $neuesGeschlecht = $geschlecht;
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
                    echo "Spieler " . $spielerId . " (" . $name . ") ist jetzt auf Stufe " . $neueStufe . " und hat das Geschlecht '" . $neuesGeschlecht . "'.";
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
        }
        else {
            echo "Datei '3spieler.txt' kann nicht gesperrt werden";
        }
    }
    ?>
