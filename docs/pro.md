
 **WEB Praktikum: Aufgabestellung 2 - WS 17/18**
 
**Gruppe: E**
 
**Team: Hung Cuong Pham**
 
**Datum: 05.12.2018**

___

# Dokumentation

___

## Allgemeine Beschreibung der Lösung:

Projektinformationssystem auf Seiten des Frontends mit 14 Klassen in Python umgesetzt

An das Frontend werden J.S. Dateien, eine CSS Datei und aus Templates generierter HTML-Codes geliefert.

## Aufbau der Webanwendung:
 
Besteht aus: 
 
- 9 Python Dateien die die Anwendung bilden

- 1 Python Datei zur Serverumsetzung

- 1 Python Datei für Datenbank

- 1 Python Datei für Template

- 1 Python Datei für View 

- 1 Python Datei um Initpfad zu ermitteln

- 26 Templatedateien zur Erstellung der Listen und Formen und Homepage als HTML-Code

- 5 JavaScript Datei 

- 1 CSS Datei um Liste und Form und Homepage zu gestalten

- 10 JSON Datei zur Verwaltung der Datensätze
 
___

## Beschreibung der Serverkomponenten:
 
#### server.py: 
 
Zweck:

- Startet den Server
 
Aufbau:

- Besteht aus einer main funktion und ihrem Aufruf.

Zusammenwirken mit anderen Komponenten:

- Initialisiert die Klasse Application
 
 API:
 
- main()
 
#### application.py:
 
Zweck:

- F&uuml;hrt die Komponenten des Servers zusammen

- Stellt Schnittstelle zum Frontend

Aufbau:

- __init__
- default
- save
- delete
- bearbeiten

API:

- Add Kunden
- Add Mitarbeiter
- Add Projekt
- Add Aufwendung
- Delete Kunden
- Delete Mitarbeiter
- Delete Projekt
- Edit Kunden
- Edit Projekt
- Edit Mitarbeiter
- Edit Aufwendung
- Open Projekt List
- Open Kunden List
- Open Mitarbeiter List 
- Open Projekt Form
- Open Kunden Form
- Open Mitarbeiter Form
- Open Aufwendung Form
- Open Homepage
- Open Projetubersicht
- Aufwendung berechnen


#### database.py:
 
Zweck:

- Datenhaltung

Aufbau:

- init

- anlegen der 4 Datensätze aus json

Zusammenwirken mit anderen Komponenten:

- Wird von der Klasse Apllication_cl angesprochen
 
 API:

 - create_px 
 - read_px 
 - update_px 
 - delete_px 
 - getDefault_px 
 - readData_p 
 - saveData_p 
 - readData_p 
 - saveData_p
 
 
#### view.py:
 
Zweck:

- Zusammenstellen von Html Views aus Templates 

Aufbau:

- init und createFunktionen

Zusammenwirken mit anderen Komponenten:
 
 API:
 - Readfile_p
 - Create Homepage
 - Create Projektubersicht
 - Create Projekt List
 - Create Kunden List
 - Create Mitarbeiter List
 - Create Projekt Form
 - Create Kunden Form
 - Create Mitarbeiter Form
 - Create Aufwendung Form

 ___
 
## Datenablage

- 4 Json Dateien

- kunden

- pojekt

- projektmitarbeiter(aufwendung)

- mitarbeiter

## Konfiguration

[global]
tools.log_headers.on: True
tools.sessions.on:    False  
tools.encode.on:      True
tools.encode.encoding:"utf-8"

server.socket_port:   3000   
server.socket_timeout:60     

server.thread_pool:  10      
server.environment:  "production"
log.screen:          True    

[/]
tools.staticdir.root: cherrypy.Application.currentDir_s
tools.staticdir.on = True
tools.staticdir.dir = '.'

## Prüfung

- Durchf&uuml;hrung: wie gefordert

#### Ergebnis:
![CSS 1/8](./W3C_CSS(1).png)
![CSS 2/8](./W3C_CSS(2).png)
![CSS 3/8](./W3C_CSS(3).png)
![CSS 4/8](./W3C_CSS(4).png)
![CSS 5/8](./W3C_CSS(5).png)
![CSS 6/8](./W3C_CSS(6).png)
![CSS 7/8](./W3C_CSS(7).png)
![CSS 8/8](./W3C_CSS(8).png)
![HTML 1/4](./W3C_HTML(1).png)
![HTML 2/4](./W3C_HTML(2).png)
![HTML 3/4](./W3C_HTML(3).png)
![HTML 4/4](./W3C_HTML(4).png)
