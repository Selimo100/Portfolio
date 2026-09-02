# Selina Mogicato – Karate Journey

Eine statische, responsive Bewerbungswebsite für das Sunrise Young Talents
Sponsoring 2026.

## Dateien

- `index.html` – Inhalte und Seitenstruktur
- `styles.css` – vollständiges Styling
- `app.js` – Journey-Grafik, Scroll-Animationen und Navigation

Es wird kein Framework, Build-Prozess oder Backend benötigt.

## Veröffentlichung

1. Lade `index.html`, `styles.css` und `app.js` gemeinsam in denselben Ordner
   auf deinem Webserver. Alle drei Dateien werden benötigt.
2. Öffne die URL im Browser und kontrolliere, ob die Seite korrekt angezeigt
   wird.
3. Sobald die endgültige URL feststeht, kann daraus der QR-Code für das
   A4-Dossier erstellt werden.

## Texte anpassen

Die Texte der Abschnitte stehen direkt in `index.html` und können mit einem
normalen Texteditor oder in Visual Studio Code geändert werden.

Die Stationen der Zeitleiste stehen gesammelt am Anfang von `app.js` in der
Liste `STATIONS`. Jeder Eintrag hat:

- `x` / `y` – Position auf der Kurve (Koordinatensystem 900 × 1000)
- `tag` – Datum, z. B. `"Juli 2025"`
- `title` – Titel der Station
- `note` – ausführliche Beschreibung (erscheint in der Listenansicht)

Die Kurve wird aus diesen Punkten automatisch berechnet. Für ein ruhiges Bild
sollten die `y`-Werte gleichmässig verteilt sein und die `x`-Werte abwechselnd
links (ca. 180) und rechts (ca. 700) liegen.

## Gestaltung

Die Seite folgt dem Sunrise Corporate Design als System und behält Kaisho
Karate Bassersdorf als Herkunft. Alle Werte stehen als CSS-Variablen am Anfang
von `styles.css`.

### Sunrise gibt das System vor

| Element | Wert |
|---|---|
| Schrift | Figtree 400 / 700, Fallback Tahoma |
| Seitenfläche | Ice White `#FFFFFF` |
| Abgesetzte Abschnitte | Light Black Air `#F3F3F5` |
| Text | Light Black `#1F1F1F` |
| Aktionsfarbe | Sunrise Red `#DA291C` |
| Kleiner roter Text | `#CC2619`, dunklere Sunrise-Red-Stufe |
| Ruby Glow | `#DA291C → #F39200`, 180°, genau einmal (Zitat-Panel) |
| Tracking | −3 % Display, −2 % Headline, −1 % Klein |
| Zeilenhöhe | 0.9 Display, 1.15 Subline |
| Radien | 12 px Bedienelemente, 16 px Karten, 24 px Feature-Panel, Pille nur für Badges |
| Abstände | 4-px-Raster |
| Bewegung | 150 ms Mikro, 220 ms Standard, 550 ms Hero |

### Kaisho bleibt als Herkunft lesbar

| Farbe | Wert | Einsatz |
|---|---|---|
| Vereinsblau | `#044C77` | Startfarbe der Weg-Kurve |
| Hellblau | `#81BBD5` | Herkunft der blaustichigen Grautöne |

Sekundärtext (`#4A5C68`), Hilfstext (`#5F7280`) und die Linien (`#E3E8EB`,
`#CDD6DB`) sind neutrale Grautöne mit einem leichten Stich ins Vereinsblau.

Kaisho-Hellblau selbst erreicht auf Weiss nur 2.1:1 und ist deshalb nirgends
als Text oder Grafik im Einsatz — auf hellem Grund übernimmt das dunklere
Vereinsblau diese Rolle.

### Bewusste Abweichungen vom Sunrise-Guide

Zwei Punkte weichen absichtlich ab. Wer die Seite weiterbearbeitet, sollte sie
kennen:

1. **Kein Sunrise-Logo.** Die Seite ist ein persönliches Bewerbungsdossier,
   kein Auftritt von Sunrise. Ein Sunrise-Logo würde eine Absenderschaft
   vortäuschen, die nicht besteht. Der Hinweis im Footer stellt das klar.
2. **Ein zweiter Verlauf.** Der Guide erlaubt ausser Ruby Glow keinen Verlauf.
   Die Weg-Kurve läuft trotzdem von Vereinsblau nach Sunrise Red — das ist die
   inhaltliche Aussage der Zeitleiste. Definiert in `index.html` im
   `<linearGradient id="pathGrad">`.

### Kontrast

Alle Werte sind nachgerechnet:

| Prüfung | Wert |
|---|---|
| Light Black auf Weiss / Air | 16.5:1 / 14.9:1 |
| Sekundärtext auf Weiss / Air | 7.0:1 / 6.3:1 |
| Kleiner roter Text auf Weiss / Air | 5.4:1 / 4.9:1 |
| Ice White auf rotem Button | 4.9:1 |
| «Medaillen» (Grosstext) auf Weiss | 4.9:1 |
| Weg-Kurve Anfang / Ende (Grafik) | 9.1:1 / 4.9:1 |
| Unerreichte Weg-Kurve (Grafik) | 3.3:1 |

Sunrise Red erreicht auf Light Black Air nur 4.4:1 und ist dort für kleine
Schrift zu schwach — deshalb `--accent-text` (`#CC2619`) für Kleintext und
`--accent` (`#DA291C`) für Flächen und Grosstext.

Im Ruby-Glow-Panel wandert der Kontrast mit dem Verlauf. Das Zitat endet bei
rund 64 % der Panelhöhe, wo Ice White noch 3.1:1 erreicht — ausreichend für
Grosstext. Die Signatur steht darunter im orangen Bereich in Light Black
(6.5:1). Wer den Zitattext verlängert, muss das nachprüfen: sobald Weiss unter
3:1 fällt, braucht das Panel unten mehr Polsterung (siehe die Regel
`.quote-panel` im Mobile-Block).

Die noch nicht erreichte Weg-Kurve ist bewusst dünner statt heller gezeichnet.
Ein hellerer Grauton würde die 3:1-Grenze für Grafik (WCAG 1.4.11) reissen;
die Hierarchie entsteht deshalb über die Strichstärke.

Die Schrift Figtree wird über Google Fonts geladen. Ohne Internetverbindung
fällt die Seite automatisch auf Tahoma beziehungsweise eine Standardschrift
zurück.

## Verhalten

- **Zeitleiste:** Auf grossen Bildschirmen zeichnet sich die Kurve beim
  Scrollen. Ein Punkt wandert der Linie entlang, Stationen leuchten beim
  Erreichen auf und die Beschriftungen blenden sich ein.
- **Schmale Bildschirme (bis 832 px):** Statt der Grafik erscheint dieselbe
  Zeitleiste als klassische, vertikale Liste mit allen Beschreibungen.
- **Reduzierte Bewegung:** Wer im Betriebssystem «Bewegung reduzieren»
  aktiviert hat, sieht die Seite ohne Animationen und ohne langen Scrollweg.
- **Drucken:** Für den Druck wird die Zeitleiste ebenfalls als Liste
  ausgegeben.
