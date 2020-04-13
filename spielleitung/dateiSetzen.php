<?php
    $neuerStatus = $_POST["neuerStatus"];
    $dateiname = "../" . $_POST["datei"];
    $fp = fopen($dateiname, w);
    fputs($fp, $neuerStatus);
    fclose($fp);
    ?>
