<?php
    // Was passiert alles beim Start?
    
    $fp = fopen("../spielstatus.txt", r);
    $status = fgets($fp, filesize("spielstatus.txt")+1);
    fclose($fp);
    if ($status == "spielLaeuft") {
        // nichts tun!
    }
    else {
        // Türstapel iniziieren
        $anzahlTuerkartenImSpiel = 162;
        $anzahlSchatzkartenImSpiel = 121;
        
        $tuerkarten = range(0, $anzahlTuerkartenImSpiel-1);
        shuffle($tuerkarten);
        $schatzkarten = range($anzahlTuerkartenImSpiel, $anzahlTuerkartenImSpiel+$anzahlSchatzkartenImSpiel-1);
        shuffle($schatzkarten);
        
        $tuerkartenString = "";
        $schatzkartenString = "";
        for ($i = 0; $i < $anzahlTuerkartenImSpiel; $i++) {
            $tuerkartenString .= $tuerkarten[$i];
            if ($i != $anzahlTuerkartenImSpiel-1) {
                $tuerkartenString .= ";";
            }
        }
        for ($i = 0; $i < $anzahlSchatzkartenImSpiel; $i++) {
            $schatzkartenString .= $schatzkarten[$i];
            if ($i != $anzahlSchatzkartenImSpiel-1) {
                $schatzkartenString .= ";";
            }
        }
        
        $fp = fopen("../2nachziehstapelTuer.txt", w);
        fputs($fp, $tuerkartenString);
        fclose($fp);
        $fp = fopen("../2nachziehstapelSchatz.txt", w);
        fputs($fp, $schatzkartenString);
        fclose($fp);
        
        // Andere Stapel leeren
        $fp = fopen("../2ablagestapelTuer.txt", w);
        fputs($fp, "");
        fclose($fp);
        $fp = fopen("../2ablagestapelSchatz.txt", w);
        fputs($fp, "");
        fclose($fp);
        
        // Mitte iniziieren
        $fp = fopen("../2mitte.txt", w);
        fputs($fp, "");
        fclose($fp);
        
        // Dateien für Spieler anlegen
        $fp = fopen("../2spieler.txt", r);
        $data = fgets($fp, filesize("../2spieler.txt")+1);
        fclose($fp);
        $spieler = explode("/", $data);
        for ($i = 0; $i < 4; $i++) {
            $fp = fopen("../2karten" . $i . "verdeckt.txt", w);
            fputs($fp, "");
            fclose($fp);
            $fp = fopen("../2karten" . $i . "offen.txt", w);
            fputs($fp, "");
            fclose($fp);
        }
    }
    ?>
