# Einigkeit und Freiheit (1815–1849) – Die interaktive Geschichts-Zeitreise

Eine didaktisch aufbereitete, motivierende und spielerische Lernplattform für Schülerinnen und Schüler der Klassen 8–10 zum Schulbuchthema **„Deutschland zwischen Restauration und Revolution (1815–1849)“**, ergänzt um ein umfassendes Lehrer-Dashboard mit Aufgabenlösungen und druckbaren Stationenlernen-Arbeitsblättern.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> **Bestätigte Entscheidungen aus Phase 1:**
> - **Zielgruppe**: Mittelstufe (Klasse 8 bis 10) – motivierend, altersgerecht formuliert, mit klarer Begriffsführung und methodischen Hilfen (Worterklärungen, Info-Tipps).
> - **Spielerischer Schwerpunkt**: Interaktive Zeitreise mit Story-Kapiteln, Aufgaben-Quests, sammelbaren historischen Abzeichen (z. B. *„Zensur-Spürhund“*, *„Paulskirchen-Diplomat“*, *„Barrikaden-Pionier“*) und interaktiven Mini-Spielen (Karikaturen-Lupe, Parlaments-Sitzordnung, Entscheidungs-Szenarien).
> - **Lehrer-Werkzeuge**: Vollständig integriertes Lehrer-Dashboard mit Musterlösungen zu allen Schulbuchfragen (Seiten 48–71), didaktischen Kompetenzrastern und einem druckbaren Stationenlernen-Laufzettel / Spickzettel.

---

## 1. Overview & Core Concept

Die Web-Applikation verwandelt die 13 gescannten Schulbuchseiten in eine lebendige Lernreise durch das 19. Jahrhundert. Schüler tauchen in die Epoche zwischen Wiener Kongress 1815 und der gescheiterten Revolution 1848/49 ein, erleben den Konflikt zwischen Fürstenwillkür (Restauration) und Bürgerrechten (Liberalismus & nationale Einheit) und festigen historisches Wissen durch aktive Interaktion.

### Die 7 interaktiven Lernstationen (Kapitel)
1. **Prolog & Befreiungskriege (1813–1815)**: Napoleon, das Lützowsche Freikorps, Ernst Moritz Arndt und das Entstehen von Schwarz-Rot-Gold.
2. **Wiener Kongress & Deutscher Bund (1815)**: Fürstenmacht, Fürst Metternich, Restauration vs. Volkssouveränität, Flickenteppich Deutschland.
3. **Protest & Unterdrückung (1817–1832)**: Wartburgfest 1817, Karlsbader Beschlüsse 1819 (Zensur, Bespitzelung), Biedermeier vs. Hambacher Fest 1832 und Georg Büchners *„Friede den Hütten, Krieg den Palästen“*.
4. **Quellen-Labor: Zensur & Gedichtanalyse**: Georg Herweghs *„Dem deutschen Volk“* (1841) interaktiv entschlüsseln, Reim- & Strophen-Analyse mit Werkzeugkasten.
5. **März 1848 – Der Völkerfrühling**: Barrikadenkämpfe in Berlin und Wien, Märzforderungen, König Friedrich Wilhelm IV. lenkt scheinbar ein.
6. **Die Paulskirche – Erstes deutsches Parlament**: Die Honoratioren, Fraktionen (Links/Mitte/Rechts), Streit um Grundrechte & Staatsform (Großdeutsch vs. Kleindeutsch).
7. **Ende & Erbe der Revolution (1849)**: Ablehnung der Kaiserkrone („Krone aus der Gosse“), Niederschlagung in Rastatt – und was bis heute blieb (Grundrechtekatalog, Bundesflagge, Parteienlandschaft).

---

## 2. User Experience & Visual Design

### Look & Feel
- **Ästhetik**: Historisch fundiert, modern und zugänglich (*Editorial History* trifft auf *Interactive Classroom*). Warme Pergament-Nuancen (`#FDFBF7`), sattes Preußischblau (`#1E293B`), heraldisches Gold (`#D97706`) und patriotisches Ziegelrot (`#B91C1C`) spiegeln die Trikolore Schwarz-Rot-Gold subtil und würdevoll wider.
- **Typografie**: Ausdrucksstarke Serif-Schrift (`Playfair Display` / `Fraunces`) für Epochen-Überschriften und Zitate, gepaart mit hochlesbarer Sans-Serif (`Plus Jakarta Sans`) für Quests, Leseabschnitte und UI-Elemente.
- **Interaktive Stationen-Features**:
  - **Interaktiver Zeitstrahl (1813–1849)** mit Schnellnavigation und Epochen-Meilensteinen.
  - **Karikaturen-Detektiv / Lupe**: Original-Karikaturen (u. a. *„Der Denker-Club“*, *„Die große Seeschlange“*, *„Wie sich die Zeiten ändern“*) mit klickbaren Hotspots, Hinweisen und Deutungsfragen.
  - **Mini-Game „Sitzordnung in der Paulskirche“**: Ordne historische Persönlichkeiten und Argumente den Fraktionen Donnersberg (Links), Casino (Mitte) und Café Milani (Rechts) zu.
  - **Zensur-Decoder**: Entschlüssle Passagen aus Karlsbader Beschlüssen und Büchners Landboten mit virtuellem Rotstift.
  - **Barrikaden-Entscheidungsspiel**: Schlüpfe in die Rolle eines Berliner Handwerkers oder einer Frankfurter Bürgerin im März 1848.
  - **Schüler-Profil & Abzeichen-Vitrine**: Echtzeit-Fortschrittsanzeige (z. B. 6/7 Quests gelöst, 5 historische Orden freigeschaltet) im Browser gespeichert (`localStorage`).
- **Lehrer-Dashboard & Unterrichtsmodus**:
  - Tabellarische Musterlösungen zu allen Fragen des Schulbuchs (Fragen a–e aus allen Kapiteln).
  - Kompetenz-Checkliste (orientiert an den Bildungsstandards auf Seite 47).
  - Druckfunktion (`window.print`) für einen strukturierten Schüler-Laufzettel und ein fertiges Stationenlernen-Quiz.

---

## 3. Key Product Decisions & Trade-Offs

- **Entscheidung 1: Lokale Persistenz (localStorage) statt Login-Zwang**:
  - *Begründung*: Im Schulunterricht haben Schüler oft keine eigenen Accounts. Die App soll sofort ohne Registrierung im Browser auf Tablets, Laptops oder Whiteboards laufen. Der Fortschritt bleibt pro Gerät erhalten.
- **Entscheidung 2: Zweiteilige Navigation (Schüler-Erlebnis & Lehrer-Werkzeuge)**:
  - *Begründung*: Schüler werden nicht mit Lösungen gespoilert, Lehrer können das Dashboard per PIN/Klick aktivieren, um den Unterricht vorzubereiten oder Lösungen am Smartboard zu präsentieren.
- **Entscheidung 3: Reale Buchinhalte & Originalquellen**:
  - *Begründung*: Alle Quellentexte (Arndt, Goethe, Hecker, Büchner, Herwegh, Friedrich Wilhelm IV.) und Karikaturen aus den Buchseiten werden originalgetreu und interaktiv aufbereitet.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        App Navigation & State                          │
│  [Zeitstrahl-Nav] [Stationen 1-7] [Abzeichen-Vitrine] [Lehrer-Bereich] │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
           ┌─────────────────────────┴─────────────────────────┐
           ▼                                                   ▼
┌───────────────────────────────────┐               ┌───────────────────────────────────┐
│     Schüler-Lernumgebung          │               │      Lehrer-Cockpit & Print       │
│  - Stationen-Lesetexte & Quellen  │               │  - Vollständige Musterlösungen    │
│  - Interaktive Quests & Aufgaben  │               │  - Kompetenzraster & Didaktik     │
│  - Mini-Games (Paulskirche, Zensur│               │  - Laufzettel-Druckansicht        │
│  - Karikaturen-Analysetool        │               │  - Differenzierungs-Tipps         │
│  - Abzeichen-Belohnungen          │               │                                   │
└──────────────────┬────────────────┘               └───────────────────────────────────┘
                   │
                   ▼
┌───────────────────────────────────────────────────────────────────────┐
│      Progress & State Manager (localStorage)                          │
│  - Gelöste Quests, erreichte Punkte, freigeschaltete Badges           │
└───────────────────────────────────────────────────────────────────────┘
```

- **Frontend**: React 19 + TypeScript + Tailwind CSS v4 + Motion für lebendige Übergänge.
- **Komponenten-Aufbau**:
  - `Header`: 3-Zonen Top-Bar mit Klassenstufen-Indikator, Fortschritts-Tracker und Modus-Umschalter.
  - `TimelineBar`: Interaktiver Epochenstrahl (1813 bis 1849).
  - `StationViewer`: Dynamische Stationen mit Registerkarten (Wissen, Quelle, Interaktive Quest, Karikatur/Spiel).
  - `InteractiveGames`: Karikaturen-Lupe, Paulskirchen-Sitzungsplan, Zensur-Labor, Entscheidungs-Simulator.
  - `TeacherDashboard`: Übersichtliche Tabellen mit Musterlösungen, didaktischem Leitfaden und Direktdruck.
  - `BadgeModal`: Vitrine der gesammelten Errungenschaften.
