<?php
    $datei = $_POST["datei"];
    $fp = fopen($datei, "r");
    if (flock($fp, LOCK_SH)) {
        $inhalt = fgets($fp, filesize($datei));
        echo $inhalt;
        flock($fp, LOCK_UN);
        fclose($fp);
    }
    else {
        echo "Datei konnte nicht gesperrt werden";
    }
    ?>
