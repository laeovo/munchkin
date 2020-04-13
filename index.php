<?php
    $fp = fopen("spielstatus.txt", r);
    $status = fgets($fp, filesize("spielstatus.txt")+1);
    fclose($fp);
    
    if (isset($_COOKIE["spielerName"]) && $status == "spielLaeuft") {
        echo "<html><head><meta http-equiv=\"refresh\" content=\"0; URL=http://www.leo.vornberger.net/munchkin/munchkin.php\"></head><body></body></html>";
    }
    else {
        echo "<html><head><meta http-equiv=\"refresh\" content=\"0; URL=http://www.leo.vornberger.net/munchkin/registrieren.php\"></head><body></body></html>";
    }
    ?>
