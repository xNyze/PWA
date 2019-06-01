# PWA

Getestete Browser:
- Google Chrome (Desktop/mobile)
- Firefox (Desktop)

Die Webapp ist zudem auf https://noten-lernen.firebaseapp.com/ deployed und kann dort auf verschiedenen Endgeräten getestet werden.

Der Node-Server mit angehangener MongoDB wurde auf https://floating-chamber-45103.herokuapp.com/api deployed und handlet einen Get- und einen Post-Request auf dieser URL.
Mit dem Get-Request wird die Aufgaben-Collection aus der MongoDB abgefragt, wohingegen mit dem Post-Request neue Aufgaben in die Collection inserted werden können.

Die Ajax Calls können sowohl von dem HTW-Server, als auch dem Node-Server gehandlet werden. (Die Serverinformationen sind hardcodiert und müssen händisch geändert werden - Auf der auf Firebase deployten Version ist der Node-Server angehangen).
Standardmäßig werden die Aufgabe zufällig generiert und erst nach dem Klick auf Ajax werden die Noten von einem Server abgefragt.
