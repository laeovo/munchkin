
<?php
    $neuerStatus = $_POST["neuerStatus"];
    $fp = fopen("spielStatus.txt", w);
    fputs($fp, $neuerStatus);
    fclose($fp);
    ?>
