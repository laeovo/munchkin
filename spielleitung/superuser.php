<?php
    if (isset($_POST["passwort"]) && hash("sha256", $_POST["passwort"]) == "b4af39d5b65a14849e885a9d65f0efe4f4e689989689c28c16cfcb3a6e78db5a") {
        setcookie("superuser", "yes", time()+86400);
    }
    ?>
<html>
    <head>
<?php
    if (isset($_COOKIE["superuser"]) && $_COOKIE["superuser"] == "yes") {
        echo "<meta http-equiv=\"refresh\" content=\"0; URL=http://www.leo.vornberger.net/munchkin/spielleitung/\">";
    }
    ?>
        <title>Als Superuser anmelden</title>
        </head>
    <body>
        <form action="superuser.php" method="post"><span>Passwort: </span><input type="text" name="passwort" /><input type="submit" value="abschicken" /></form>
        </body>
    </html>
