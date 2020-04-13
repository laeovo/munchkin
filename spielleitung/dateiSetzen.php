<?php
    $neuerInhalt = $_POST["neuerInhalt"];
    $dateiname = "../" . $_POST["datei"];
    $fp = fopen($dateiname, w);
    fputs($fp, $neuerInhalt);
    fclose($fp);
    echo $neuerInhalt;
    ?>
