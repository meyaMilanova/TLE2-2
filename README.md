# Groenlandia React App

Dit is de front-end applicatie voor Groenlandia, een serie aan spelletjes bedoelt om kinderen van Groep 5-6 te leren over duurzaamheid.
Het bevat een registratie en login functie, en een profiel editor met een profielfoto systeem, waar je uit verschillende avatars kan kiezen.
Er zijn momenteel 2 games beschikbaar:
-Afval sorteren, waar je doormiddel van WASD jouw karakter kan controleren om afval op te pakken, die je daarna sorteert.
-Speelgoed maken, waar je het afval wat je hebt opgeruimt gaat gebruiken om speelgoed te maken. Dit speelgoed neemt de vorm van een companion in het afval sorteren spel.

De software maakt gebruik van node.js, en daarbij ook het React framework, en een dependancy voor confetti en motion in the styling.

Eerst maak jij een account aan bij het aanmelden, en dit laat jou automatisch een avatar kiezen. Hierna kan jij een van de vorige omschreven spellen kiezen.
Afval sorteren: WASD om te lopen, sleep de muis of druk op 1, 2, 3 of 4 om afval te sorteren.
Speelgoed maken: druk op de knop om speelgoed te maken als jij genoeg materiaal hebt.

Voor het verder ontwikkelijken van de applicatie, hou deze dingen in gedachten:
-Images zitten in 2 verschillende plekken. /public, en /src/assets/images
-Anti-Deeplink, Avatar Movement, Fun Facts, Slideshow en meeste Buttons zij al gemaakt als Components
-Pagina logica staat in de jsx file van de specifieke pagina, App.jsc is alleen voor routes
-Database staat niet in dit project, het is apart van de front-end
-Afval data wordt eerst opgeslagen in de localstorage, en wordt alleen in de database gezet nadat het is gesorteerd
-Accounts gemaakt zonder connectie met de database of voordat afval opslaan toegevoegd was kunnen geen afval behouden na een ronde voor het speelgoed maken

Voor dingen die wij nog willen toevoegen/veranderen:
-Hitbox van avatar meer accuraat maken met de grootte van het plaatje
-Snelheid horizontaal en verticaal gelijkmaken
-Toevoegen van de 2 missende spellen, "Elektrische Kat" en "Tuintje"

# Dit project mag alleen gebruikt worden met toestemming van het development team achter de originele developers.