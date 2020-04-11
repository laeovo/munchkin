<?php
    $anzahlTuerkartenGesamt = 162; // TODO: muss ganz am Ende angepasst werden
    
    $fp = fopen("spieler.txt", r);
    $data = fgets($fp, filesize("spieler.txt")+1);
    fclose($fp);
    $spieler = explode("/", $data);
    $anzahlSpieler = count($spieler);
    $spielerId = $_COOKIE["spielerId"];
    if (!isset($_POST["aktion"])) {
        echo "Kartenmanager:: keine Aktion angegeben!";
    }
    
    else {
        // verdeckt vom Stapel ziehen
        if ($_POST["aktion"] == "verdecktKarteZiehen") {
            $stapel = $_POST["stapel"];
            
            $fp = fopen("nachziehstapel" . $stapel . ".txt", r);
            $alterstapel = fgets($fp, filesize("nachziehstapel" . $stapel . ".txt")+1);
            fclose($fp);
            $karten = explode(";", $alterstapel);
            $obersteKarte = $karten[0];
            
            if ($alterstapel == "") {
                echo "Stapel ist leer.\n";
                tuerstapelAuffuellen();
                
                $fp = fopen("nachziehstapel" . $stapel . ".txt", r);
                $alterstapel = fgets($fp, filesize("nachziehstapel" . $stapel . ".txt")+1);
                fclose($fp);
                $karten = explode(";", $alterstapel);
                $obersteKarte = $karten[0];
            }
            
            $neuerStapel = "";
            for ($i = 1; $i < count($karten); $i++) {
                $neuerStapel .= $karten[$i];
                if ($i != count($karten)-1) {
                    $neuerStapel .= ";";
                }
            }
            $fp = fopen("nachziehstapel" . $stapel . ".txt", w);
            fputs($fp, $neuerStapel);
            fclose($fp);

            $fp = fopen("karten" . $spielerId . "verdeckt.txt", "a+");
            $bisherigeKarten = fgets($fp, filesize("karten" . $spielerId . "verdeckt.txt")+1);
            if ($bisherigeKarten != "") {
                fputs($fp, ";");
            }
            fputs($fp, $obersteKarte);
            fclose($fp);

            $fp = fopen("karten" . $spielerId . "verdeckt.txt", r);
            $neueKarten = fgets($fp, filesize("karten" . $spielerId . "verdeckt.txt")+1);
            fclose($fp);
            echo "Spieler " . $spielerId . " hat Karte " . $obersteKarte . " vom " . $stapel . "stapel gezogen.";
        }
        
        // offen vom Stapel ziehen
        elseif ($_POST["aktion"] == "offenKarteZiehen") {
            $stapel = $_POST["stapel"];
            
            $fp = fopen("nachziehstapel" . $stapel . ".txt", r);
            $alterstapel = fgets($fp, filesize("nachziehstapel" . $stapel . ".txt")+1);
            fclose($fp);
            $karten = explode(";", $alterstapel);
            $obersteKarte = $karten[0];
            
            if ($alterstapel == "") {
                echo "Stapel ist leer.\n";
                tuerstapelAuffuellen();
                
                $fp = fopen("nachziehstapel" . $stapel . ".txt", r);
                $alterstapel = fgets($fp, filesize("nachziehstapel" . $stapel . ".txt")+1);
                fclose($fp);
                $karten = explode(";", $alterstapel);
                $obersteKarte = $karten[0];
            }
            
            $neuerStapel = "";
            for ($i = 1; $i < count($karten); $i++) {
                $neuerStapel .= $karten[$i];
                if ($i != count($karten)-1) {
                    $neuerStapel .= ";";
                }
            }
            $fp = fopen("nachziehstapel" . $stapel . ".txt", w);
            fputs($fp, $neuerStapel);
            fclose($fp);
            
            $fp = fopen("mitte.txt", "a+");
            $bisherigeKarten = fgets($fp, filesize("mitte.txt")+1);
            if ($bisherigeKarten != "") {
                fputs($fp, ";");
            }
            fputs($fp, $obersteKarte);
            fclose($fp);
            
            $fp = fopen("mitte.txt", r);
            $neueKarten = fgets($fp, filesize("mitte.txt")+1);
            fclose($fp);
            
            echo "Spieler " . $spielerId . " hat Karte " . $obersteKarte . " offen gezogen";
        }
        
        // Karte ablegen (von Hand, Auslage oder Mitte)
        elseif ($_POST["aktion"] == "karteAblegen") {
            $kartenId = $_POST["kartenId"];
            $positionVorher = $_POST["positionVorher"];
            
            $dateiname = "";
            if ($positionVorher == "mitte") {
                $dateiname = "mitte.txt";
            }
            else {
                $dateiname = "karten" . $spielerId . $positionVorher . ".txt";
            }
            
            $fp = fopen($dateiname, r);
            $bisherigeKartenString = fgets($fp, filesize($dateiname)+1);
            $bisherigeKarten = explode(";", $bisherigeKartenString);
            fclose($fp);
            
            $neueKarten = "";
            for ($i = 0; $i < count($bisherigeKarten); $i++) {
                if ($bisherigeKarten[$i] != $kartenId) {
                    if ($neueKarten != "") {
                        $neueKarten .= ";";
                    }
                    $neueKarten .= $bisherigeKarten[$i];
                }
            }
            $fp = fopen($dateiname, w);
            fputs($fp, $neueKarten);
            fclose($fp);
            
            if ($kartenId < $anzahlTuerkartenGesamt) {
                $fp = fopen("ablagestapelTuer.txt", "a+");
                $bisherigerAblagestapel = fgets($fp, filesize("ablagestapelTuer.txt")+1);
                if ($bisherigerAblagestapel != "") {
                    fputs($fp, ";");
                }
            }
            else {
                $fp = fopen("ablagestapelSchatz.txt", "a+");
                $bisherigerAblagestapel = fgets($fp, filesize("ablagestapelSchatz.txt")+1);
                if ($bisherigerAblagestapel != "") {
                    fputs($fp, ";");
                }
            }
            fputs($fp, $kartenId);
            fclose($fp);

            echo "Spieler " . $spielerId . " hat Karte " . $kartenId . " abgelegt.";
        }
        
        // Karte verdeckt an jemanden geben (von Hand oder Auslage)
        elseif ($_POST["aktion"] == "karteWeitergeben") {
            // TODO beheben
            echo "Die Funktion 'karteWeitergeben' wurde noch nicht implementiert!";
        }
        
        // Karte auf jemanden spielen (=offen an jemanden geben) (von Hand oder Auslage)
        elseif ($_POST["aktion"] == "karteAufMitspielerSpielen") {
            // TODO ist das notwendig?
            echo "Die Funktion 'karteAufMitspielerSpielen' wurde noch nicht implementiert! Ist aber auch nicht so wichtig, nur für Flüche ganz nett.";
        }
        
        // Karte vor sich auslegen
        elseif ($_POST["aktion"] == "karteAuslegen") {
            $kartenId = $_POST["kartenId"];
            
            $fp = fopen("karten" . $spielerId . "verdeckt.txt", r);
            $bisherigeHandkartenString = fgets($fp, filesize("karten" . $spielerId . "verdeckt.txt")+1);
            $bisherigeHandkarten = explode(";", $bisherigeHandkartenString);
            fclose($fp);
            
            $neueHandkarten = "";
            for ($i = 0; $i < count($bisherigeHandkarten); $i++) {
                if ($bisherigeHandkarten[$i] != $kartenId) {
                    if ($neueHandkarten != "") {
                        $neueHandkarten .= ";";
                    }
                    $neueHandkarten .= $bisherigeHandkarten[$i];
                }
            }
            $fp = fopen("karten" . $spielerId . "verdeckt.txt", w);
            fputs($fp, $neueHandkarten);
            fclose($fp);
            
            $fp = fopen("karten" . $spielerId . "offen.txt", "a+");
            $bisherigeKarten = fgets($fp, filesize("karten" . $spielerId . "offen.txt")+1);
            if ($bisherigeKarten != "") {
                fputs($fp, ";");
            }
            fputs($fp, $kartenId);
            fclose($fp);
            
            echo "Spieler " . $spielerId . " hat Karte " . $kartenId . " vor sich ausgelegt.";
        }
        
        // Karte in die Mitte spielen (von Hand oder Auslage)
        elseif ($_POST["aktion"] == "karteSpielen") {
            $kartenId = $_POST["kartenId"];
            $positionVorher = $_POST["positionVorher"];
            $dateiname = "karten" . $spielerId . $positionVorher . ".txt";
            
            $fp = fopen($dateiname, r);
            $bisherigeKartenString = fgets($fp, filesize($dateiname)+1);
            $bisherigeKarten = explode(";", $bisherigeKartenString);
            fclose($fp);
            
            $neueKarten = "";
            for ($i = 0; $i < count($bisherigeKarten); $i++) {
                if ($bisherigeKarten[$i] != $kartenId) {
                    if ($neueKarten != "") {
                        $neueKarten .= ";";
                    }
                    $neueKarten .= $bisherigeKarten[$i];
                }
            }
            $fp = fopen($dateiname, w);
            fputs($fp, $neueKarten);
            fclose($fp);
            
            $fp = fopen("mitte.txt", "a+");
            $bisherigerAblagestapel = fgets($fp, filesize("mitte.txt")+1);
            if ($bisherigerAblagestapel != "") {
                fputs($fp, ";");
            }
            fputs($fp, $kartenId);
            fclose($fp);

            echo "Spieler " . $spielerId . " hat Karte " . $kartenId . " ";
            if ($positionVorher == "verdeckt") {
                echo "von der Hand";
            }
            elseif ($positionVorher == "offen") {
                echo "aus der Auslage";
            }
            else {
                echo "von einem unbekannten Ort her ('" . $positionVorher . "')";
            }
            echo " gespielt.";
        }
        
        // von jemandem eine Karte ziehen (entweder eine offene oder blind eine verdeckte) und danach auf die Hand nehmen
        elseif ($_POST["aktion"] == "karteVonMitspielerZiehen") {
            // TODO implementieren
            echo "Die Funktion 'karteVonMitspielerZiehen' wurde noch nicht implementiert!";
        }
        
        // Karte von der Mitte aufnehmen
        elseif ($_POST["aktion"] == "karteAufnehmen") {
            $kartenId = $_POST["kartenId"];
            
            $fp = fopen("mitte.txt", r);
            $bisherigeKartenString = fgets($fp, filesize("mitte.txt")+1);
            $bisherigeKarten = explode(";", $bisherigeKartenString);
            fclose($fp);
            
            $neueKarten = "";
            for ($i = 0; $i < count($bisherigeKarten); $i++) {
                if ($bisherigeKarten[$i] != $kartenId) {
                    if ($neueKarten != "") {
                        $neueKarten .= ";";
                    }
                    $neueKarten .= $bisherigeKarten[$i];
                }
            }
            $fp = fopen("mitte.txt", w);
            fputs($fp, $neueKarten);
            fclose($fp);
            
            $fp = fopen("karten" . $spielerId . "verdeckt.txt", "a+");
            $bisherigeKarten = fgets($fp, filesize("karten" . $spielerId . "verdeckt.txt")+1);
            if ($bisherigeKarten != "") {
                fputs($fp, ";");
            }
            fputs($fp, $kartenId);
            fclose($fp);
            
            echo "Spieler " . $spielerId . " hat Karte " . $kartenId . " auf seine Hand genommen.";
        }
        
        // Kartenreihenfolge ändern (offen)
        
        // Kartenreihenfolge ändern (verdeckt)
        
        else {
            echo "Ungültige Aktion!";
        }
    }
    
    function tuerstapelAuffuellen() {
        // Annahme: der Ablagestapel hat mindestens sechs Karten
        $fp = fopen("ablagestapelTuer.txt", r);
        $alterAblagestapel = fgets($fp, filesize("ablagestapelTuer.txt")+1);
        fclose($fp);
        
        echo "Alter Ablagestapel: " . $alterAblagestapel . "\n";

        $karten = explode(";", $alterAblagestapel);
        $neuerNachziehstapel = "";
        $neuerAblagestapel = "";

        for ($i = 0; $i < count($karten); $i++) {
            if ($i < count($karten)-5) {
                $neuerNachziehstapel .= $karten[$i];
                if ($i != count($karten)-6) {
                    $neuerNachziehstapel .= ";";
                }
            }
            else {
                $neuerAblagestapel .= $karten[$i];
                if ($i != count($karten)-1) {
                    $neuerAblagestapel .= ";";
                }
            }
        }
        
        echo "Neuer Ablagestapel: " . $neuerAblagestapel . "\n";
        echo "Neuer Nachziehstapel: " . $neuerNachziehstapel . "\n";

        $fp = fopen("nachziehstapelTuer.txt", w);
        fputs($fp, $neuerNachziehstapel);
        fclose($fp);

        $fp = fopen("ablagestapelTuer.txt", w);
        fputs($fp, $neuerAblagestapel);
        fclose($fp);

        nachziehstapelMischen();
    }
    
    function nachziehstapelMischen() { // TODO: Was ist mit dem Schatzstapel?
        $fp = fopen("nachziehstapelTuer.txt", r);
        $alterTuerstapel = fgets($fp, filesize("nachziehstapelTuer.txt")+1);
        fclose($fp);
        
        $karten = explode(";", $alterTuerstapel);
        shuffle($karten);
        
        $neuerTuerstapel = "";
        for ($i = 0; $i < count ($karten); $i++) {
            $neuerTuerstapel .= $karten[$i];
            if ($i != count($karten)-1) {
                $neuerTuerstapel .= ";";
            }
        }
        echo "Neuerer Tür-Nachziehstapel: " . $neuerTuerstapel . "\n";
        
        $fp = fopen("nachziehstapelTuer.txt", w);
        fputs($fp, $neuerTuerstapel);
        fclose($fp);
        
        
        $fp = fopen("nachziehstapelSchatz.txt", r);
        $alterSchatzstapel = fgets($fp, filesize("nachziehstapelSchatz.txt")+1);
        fclose($fp);
        
        $karten = explode(";", $alterSchatzstapel);
        shuffle($karten);
        
        $neuerSchatzstapel = "";
        for ($i = 0; $i < count ($karten); $i++) {
            $neuerSchatzstapel .= $karten[$i];
            if ($i != count($karten)-1) {
                $neuerSchatzstapel .= ";";
            }
        }
        echo "Neuerer Schatz-Nachziehstapel: " . $neuerSchatzstapel . "\n";
        
        $fp = fopen("nachziehstapelSchatz.txt", w);
        fputs($fp, $neuerSchatzstapel);
        fclose($fp);
    }
    ?>
