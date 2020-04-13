<?php
    if (isset($_COOKIE["spielerName"])) {
        echo "<html><head><meta http-equiv=\"refresh\" content=\"0; URL=http://www.leo.vornberger.net/munchkin/munchkin.php\"></head><body></body></html>";
    }
    else {
        echo "<html><head><meta http-equiv=\"refresh\" content=\"0; URL=http://www.leo.vornberger.net/munchkin/registrieren.php\"></head><body></body></html>";
    }
    ?>
