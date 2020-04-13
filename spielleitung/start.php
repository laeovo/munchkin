<?php
    // Was passiert alles beim Start?
    
    // TODO Überprüfen, ob gerade nicht schon ein Spiel läuft! Falls ja, hier nichts machen.
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
        
        $fp = fopen("../nachziehstapelTuer.txt", w);
        fputs($fp, $tuerkartenString);
        fclose($fp);
        $fp = fopen("../nachziehstapelSchatz.txt", w);
        fputs($fp, $schatzkartenString);
        fclose($fp);
        
        // Andere Stapel leeren
        $fp = fopen("../ablagestapelTuer.txt", w);
        fputs($fp, "");
        fclose($fp);
        $fp = fopen("../ablagestapelSchatz.txt", w);
        fputs($fp, "");
        fclose($fp);
        
        // Mitte iniziieren
        $fp = fopen("../mitte.txt", w);
        fputs($fp, "");
        fclose($fp);
        
        // Dateien für Spieler anlegen
        $fp = fopen("../spieler.txt", r);
        $data = fgets($fp, filesize("../spieler.txt")+1);
        fclose($fp);
        $spieler = explode("/", $data);
        for ($i = 0; $i < 4; $i++) {
            $fp = fopen("../karten" . $i . "verdeckt.txt", w);
            fputs($fp, "");
            fclose($fp);
            $fp = fopen("../karten" . $i . "offen.txt", w);
            fputs($fp, "");
            fclose($fp);
        }
    }
    ?>
