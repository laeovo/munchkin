<?php
    // Was passiert alles beim Start?
    
    $fp = fopen("../spielstatus.txt", r);
    $status = fgets($fp, filesize("spielstatus.txt")+1);
    fclose($fp);
    if ($status == "spielLaeuft") {
        // nichts tun!
    }
    else {
        // Türstapel iniziieren TODO: weitere Karten einpflegen
        $anzahlTuerkartenImSpiel = 161;
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
        
        $fp = fopen("../" . "3" . "nachziehstapelTuer.txt", w);
        fputs($fp, $tuerkartenString);
        fclose($fp);
        $fp = fopen("../" . "3" . "nachziehstapelSchatz.txt", w);
        fputs($fp, $schatzkartenString);
        fclose($fp);
        
        // Andere Stapel leeren
        $fp = fopen("../" . "3" . "ablagestapelTuer.txt", w);
        fputs($fp, "");
        fclose($fp);
        $fp = fopen("../" . "3" . "ablagestapelSchatz.txt", w);
        fputs($fp, "");
        fclose($fp);
        
        // Mitte iniziieren
        $fp = fopen("../" . "3" . "mitte.txt", w);
        fputs($fp, "");
        fclose($fp);
        
        // Dateien für Spieler anlegen
        $fp = fopen("../" . "3" . "spieler.txt", r);
        $data = fgets($fp, filesize("../" . "3" . "spieler.txt")+1);
        fclose($fp);
        $spieler = explode("/", $data);
        for ($i = 0; $i < 4; $i++) {
            $fp = fopen("../" . "3" . "karten" . $i . "verdeckt.txt", w);
            fputs($fp, "");
            fclose($fp);
            $fp = fopen("../" . "3" . "karten" . $i . "offen.txt", w);
            fputs($fp, "");
            fclose($fp);
        }
    }
    ?>
