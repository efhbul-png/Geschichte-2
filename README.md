# Einigkeit und Freiheit (1815–1849)

Eine interaktive Geschichts-Lernplattform für Schülerinnen und Schüler der Klassen 8–10 mit Zeitreise, Quests, Karikaturen-Lupe, Paulskirchen-Simulation und passwortgeschütztem Lehrer-Pult.

---

## 🔒 Lehrer-Passwort
Das Lehrer-Pult (mit allen Musterlösungen zu den Schulbuchseiten 48–71 und dem automatischen DIN-A4-Arbeitsblatt-Generator) ist passwortgeschützt:
- **Standard-Passwort:** `geschichte1848`
- Das Passwort kann im Lehrer-Pult unter dem Reiter *„Passwort & Netlify-Bereitstellung“* jederzeit geändert werden.
- Mit dem Button *„Pult sperren“* im Header kann das Lehrer-Pult vor der Weitergabe an Schüler sofort wieder verriegelt werden.

---

## 🚀 Bereitstellung über GitHub & Netlify

Die App ist als rein statische Web-Applikation (Vite SPA) aufgebaut und benötigt keinen externen Server. Sie kann kostenlos und dauerhaft auf Netlify gehostet werden.

### Option 1: Automatischer GitHub-Deploy über Netlify (Empfohlen)

1. **Repository auf GitHub anlegen:**
   - Erstelle auf [github.com](https://github.com) ein neues (öffentliches oder privates) Repository.
   - Lade den Code hoch (per Terminal oder GitHub Desktop):
     ```bash
     git init
     git add .
     git commit -m "Initial commit: Einigkeit und Freiheit 1848"
     git branch -M main
     git remote add origin https://github.com/DEIN-BENUTZERNAME/DEIN-REPO.git
     git push -u origin main
     ```

2. **Mit Netlify verbinden:**
   - Melde dich kostenlos auf [netlify.com](https://www.netlify.com) an.
   - Klicke auf **„Add new site“** → **„Import an existing project“**.
   - Wähle **GitHub** und wähle dein Repository aus.
   - Die Einstellungen werden durch die Datei `netlify.toml` automatisch erkannt:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
   - Klicke auf **„Deploy site“**.

3. **Fertig!**
   - Netlify generiert dir innerhalb von ca. 30 Sekunden eine verschlüsselte HTTPS-Webadresse (z. B. `https://einigkeit-1848.netlify.app`), die du direkt an deine Klasse verteilen kannst (per Link, QR-Code oder Schul-Cloud wie Moodle/Teams).

---

### Option 2: Schneller Direkt-Upload (Netlify Drop ohne Git)

1. Baue die Produktionsdateien lokal:
   ```bash
   npm run build
   ```
2. Gehe auf [app.netlify.com/drop](https://app.netlify.com/drop).
3. Ziehe einfach den erstellten Ordner **`dist`** per Drag-and-Drop in das Browserfenster.
4. Deine App ist sofort live und einsatzbereit!

---

## 🛠️ Lokale Entwicklung

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Produktions-Build erstellen
npm run build
```
