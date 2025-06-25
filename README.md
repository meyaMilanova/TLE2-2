# Groenlandia React App

Dit is de front-end applicatie voor Groenlandia, een serie aan spelletjes bedoelt om kinderen van Groep 5-6 te leren over duurzaamheid.<br>
Het bevat een registratie en login functie, en een profiel editor met een profielfoto systeem, waar je uit verschillende avatars kan kiezen.<br>
Er zijn momenteel 2 games beschikbaar:<br>
-Afval sorteren, waar je doormiddel van WASD jouw karakter kan controleren om afval op te pakken, die je daarna sorteert.<br>
-Speelgoed maken, waar je het afval wat je hebt opgeruimt gaat gebruiken om speelgoed te maken. Dit speelgoed neemt de vorm van een companion in het afval sorteren spel.<br>

De software maakt gebruik van node.js, en daarbij ook het React framework, en een dependancy voor confetti en motion in the styling.<br>

Eerst maak jij een account aan bij het aanmelden, en dit laat jou automatisch een avatar kiezen. Hierna kan jij een van de vorige omschreven spellen kiezen.<br>
Afval sorteren: WASD om te lopen, sleep de muis of druk op 1, 2, 3 of 4 om afval te sorteren.<br>
Speelgoed maken: druk op de knop om speelgoed te maken als jij genoeg materiaal hebt.<br>

Voor het verder ontwikkelijken van de applicatie, hou deze dingen in gedachten:<br>
-Images zitten in 2 verschillende plekken. /public, en /src/assets/images<br>
-Anti-Deeplink, Avatar Movement, Fun Facts, Slideshow en meeste Buttons zij al gemaakt als Components<br>
-Pagina logica staat in de jsx file van de specifieke pagina, App.jsc is alleen voor routes<br>
-Database staat niet in dit project, het is apart van de front-end<br>
-Afval data wordt eerst opgeslagen in de localstorage, en wordt alleen in de database gezet nadat het is gesorteerd<br>
-Accounts gemaakt zonder connectie met de database of voordat afval opslaan toegevoegd was kunnen geen afval behouden na een ronde voor het speelgoed maken<br>

Voor dingen die wij nog willen toevoegen/veranderen:<br>
-Hitbox van avatar meer accuraat maken met de grootte van het plaatje<nr>
-Snelheid horizontaal en verticaal gelijkmaken<br>
-Toevoegen van de 2 missende spellen, "Elektrische Kat" en "Tuintje"<br>

# Dit project mag alleen gebruikt worden met toestemming van het development team achter de originele developers.