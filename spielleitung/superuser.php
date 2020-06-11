<?php
    if (isset($_POST["passwort"]) && $_POST["passwort"] == "nudelholz") {
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
