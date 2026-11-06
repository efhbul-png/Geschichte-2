export interface StationWorksheetData {
  stationId: number;
  tasks: {
    number: number;
    afb: 'AFB I' | 'AFB II' | 'AFB III';
    points: number;
    prompt: string;
    linesCount: number;
    sampleAnswer: string;
    tip: string;
  }[];
  vocabulary: { word: string; meaning: string }[];
}

export const STATION_WORKSHEETS: Record<number, StationWorksheetData> = {
  1: {
    stationId: 1,
    vocabulary: [
      { word: 'Freikorps', meaning: 'Freiwillige Truppenverbände, die unabhängig von regulären Armeen kämpften.' },
      { word: 'Kontinentalsperre', meaning: 'Von Napoleon verhängte Wirtschaftsblockade gegen Großbritannien (1806–1814).' },
      { word: 'Chauvinismus', meaning: 'Aggressiver, übersteigerter Nationalismus, verbunden mit der Verachtung anderer Völker.' },
    ],
    tasks: [
      {
        number: 1,
        afb: 'AFB I',
        points: 4,
        prompt: 'Erkläre den textilen und historischen Ursprung der deutschen Nationalfarben Schwarz-Rot-Gold beim Lützowschen Freikorps.',
        linesCount: 4,
        sampleAnswer: 'Die Freiwilligen des Lützowschen Freikorps stammten aus vielen Regionen und färbten ihre privaten Zivilröcke einheitlich schwarz. Dazu trugen sie rote Stoffaufschläge und goldene Messingknöpfe. Schwarz-Rot-Gold stand für den Weg aus der Schwärze der Knechtschaft durch blutige Schlachten zum goldenen Licht der Freiheit.',
        tip: 'Achte auf die 3 Bestandteile der Uniform: Rock, Vorstöße/Aufschläge und Knöpfe.',
      },
      {
        number: 2,
        afb: 'AFB II',
        points: 6,
        prompt: 'Vergleiche die Einstellung Ernst Moritz Arndts (Quelle Q2) mit jener Johann Wolfgang von Goethes (Quelle Q3) gegenüber Frankreich.',
        linesCount: 5,
        sampleAnswer: 'Arndt fordert einen ewigen, glühenden Franzosenhass als verbindende „Religion“ aller Deutschen. Goethe hingegen lehnt nationalen Hass entschieden ab: Er verdanke der französischen Kultur einen großen Teil seiner Bildung und sieht Hass als Zeichen unterentwickelter Kultur.',
        tip: 'Benenne Gemeinsamkeiten (beide beobachten die Epoche) und den fundamentalen Gegensatz (Hass vs. Humanismus).',
      },
      {
        number: 3,
        afb: 'AFB III',
        points: 6,
        prompt: 'Beurteile, ob der frühe deutsche Nationalismus von 1813 primär ein Befreiungsimpuls oder ein Nährboden für Ausgrenzung war.',
        linesCount: 5,
        sampleAnswer: 'Einerseits wirkte er befreiend, da er die Unterdrückung durch Napoleon beendete und Bürgern erstmals ein solidarisches Gemeinschaftsgefühl jenseits der Fürsten schenkte. Andererseits war er stark feindbildorientiert und grenzte Franzosen sowie nationale Minderheiten feindselig aus.',
        tip: 'Wäge positive Aspekte (Befreiung von Fremdherrschaft) gegen Gefahren (Fremdenhass) ab.',
      },
    ],
  },
  2: {
    stationId: 2,
    vocabulary: [
      { word: 'Restauration', meaning: 'Wiederherstellung der vormaligen politischen Ordnung von vor 1789.' },
      { word: 'Staatenbund', meaning: 'Lockerer Zusammenschluss souveräner Staaten ohne gemeinsame Verfassung oder Regierung.' },
      { word: 'Legitimität', meaning: 'Rechtmäßigkeit der Herrschaft der Fürstenhäuser von Gottes Gnaden.' },
    ],
    tasks: [
      {
        number: 1,
        afb: 'AFB I',
        points: 4,
        prompt: 'Nenne die drei Leitprinzipien des Wiener Kongresses 1815 und erläutere kurz ihre Bedeutung.',
        linesCount: 4,
        sampleAnswer: '1. Restauration: Rückkehr zu den Verhältnissen vor 1789. 2. Legitimität: Herrschaftsberechtigung der Monarchen von Gottes Gnaden. 3. Solidarität: Gegenseitiger Beistand der Fürsten gegen jede revolutionäre Erhebung (Heilige Allianz).',
        tip: 'Erinnere dich an die Rolle von Fürst Metternich.',
      },
      {
        number: 2,
        afb: 'AFB II',
        points: 6,
        prompt: 'Arbeite heraus, warum der Deutsche Bund von 1815 die Erwartungen vieler Bürger und Reformer (wie Freiherr vom Stein) enttäuschte.',
        linesCount: 5,
        sampleAnswer: 'Die Bürger hatten für Freiheit und einen geeinten deutschen Nationalstaat gekämpft. Stattdessen erhielten sie einen unbeweglichen Staatenbund aus 39 Mitgliedern ohne deutsches Staatsoberhaupt, ohne gemeinsames Parlament und ohne bürgerliche Grundrechte.',
        tip: 'Vergleiche den Staatenbund mit einem echten Nationalstaat.',
      },
      {
        number: 3,
        afb: 'AFB III',
        points: 6,
        prompt: 'Nimm Stellung zu der These: „Der Deutsche Bund war ein Stabilitätsfaktor für Europa, aber ein Gefängnis für das deutsche Volk.“',
        linesCount: 5,
        sampleAnswer: 'Für Europa sicherte der Bund das Gleichgewicht, da kein dominanter deutscher Machtblock entstand (Heeren). Für die deutsche Bevölkerung bedeutete er jedoch Erstarrung, Zersplitterung und die Fortdauer der fürstlichen Unterdrückung.',
        tip: 'Betrachte die Innen- und die Außenperspektive getrennt.',
      },
    ],
  },
  3: {
    stationId: 3,
    vocabulary: [
      { word: 'Karlsbader Beschlüsse', meaning: 'Repressionsgesetze von 1819: Pressezensur, Burschenschaftsverbot, Überwachung von Universitäten.' },
      { word: 'Demagogenverfolgung', meaning: 'Staatliche Jagd auf liberale Studenten, Professoren und Intellektuelle.' },
      { word: 'Pauperismus', meaning: 'Massenarmut und Elend im Vorfeld der industriellen Revolution.' },
    ],
    tasks: [
      {
        number: 1,
        afb: 'AFB I',
        points: 4,
        prompt: 'Fasse zusammen, welche Maßnahmen die Fürsten 1819 in den Karlsbader Beschlüssen erließen und welchen Vorwand sie nutzten.',
        linesCount: 4,
        sampleAnswer: 'Vorwand war die Ermordung August von Kotzebues durch Karl Ludwig Sand. Maßnahmen: Verbot der Burschenschaften, Vorzensur aller Druckwerke unter 20 Bogen, staatliche Inspektoren an Universitäten und Entlassung regierungskritischer Professoren.',
        tip: 'Denke an Zensur, Universitäten und Berufsverbote.',
      },
      {
        number: 2,
        afb: 'AFB II',
        points: 6,
        prompt: 'Analysiere die Karikatur „Der Denker-Club“ (1825): Entschlüssle die Symbole der Maulkörbe und der Gesetzestafel.',
        linesCount: 5,
        sampleAnswer: 'Die Maulkörbe symbolisieren die erzwungene Sprachlosigkeit und Zensur der Bürger. Die Tafel mit der Aufschrift „Schweigen ist das erste Gesetz“ persifliert das Verbot freier Meinungsäußerung. Die Gelehrten werden zu willenlosen Marionetten der Obrigkeit degradiert.',
        tip: 'Beschreibe erst das Bilddetail und deute dann die satirische Absicht.',
      },
      {
        number: 3,
        afb: 'AFB III',
        points: 6,
        prompt: 'Vergleiche das Hambacher Fest 1832 mit dem Wartburgfest 1817 hinsichtlich Teilnehmern und politischer Ausrichtung.',
        linesCount: 5,
        sampleAnswer: 'Wartburgfest 1817: ca. 500 Studenten, bildungsbürgerlich, stark deutschnational bis antisemitisch. Hambacher Fest 1832: Massenkundgebung von bis zu 30.000 Menschen aller Stände (auch Bauern, Frauen, Franzosen, Polen), klar demokratisch-republikanisch und international solidarisch.',
        tip: 'Vergleiche Teilnehmerzahl, gesellschaftliche Schichten und Ziele.',
      },
    ],
  },
  4: {
    stationId: 4,
    vocabulary: [
      { word: 'Agitationslyrik', meaning: 'Politisches Gedicht mit dem Ziel, Menschen zu mobilisieren und zum Handeln aufzurütteln.' },
      { word: 'Vormärz', meaning: 'Epoche zwischen 1815/1830 und dem Ausbruch der Revolution im März 1848.' },
      { word: 'Zensur', meaning: 'Behördliche Prüfung und Unterdrückung von Druckerzeugnissen vor oder nach Veröffentlichung.' },
    ],
    tasks: [
      {
        number: 1,
        afb: 'AFB I',
        points: 4,
        prompt: 'Gib wieder, warum Georg Herwegh in Strophe 2 von den „neununddreißig Reichen“ spricht und was dort fehlt.',
        linesCount: 4,
        sampleAnswer: 'Die 39 Reiche beziehen sich auf die 39 Teilstaaten des Deutschen Bundes. Herwegh klagt an, dass in diesen Fürstentümern das Wichtigste fehlt: Der hohe Stolz freier Bürger, da alle Untertanen unfrei gehalten werden.',
        tip: 'Achte auf den Kontrast zwischen blühender Natur und unfreiem Volk.',
      },
      {
        number: 2,
        afb: 'AFB II',
        points: 6,
        prompt: 'Erkläre, warum politische Gedichte im Vormärz eine so enorme revolutionäre Durchschlagskraft entfalten konnten.',
        linesCount: 5,
        sampleAnswer: 'Gedichte waren einprägsam, rhythmisch und konnten leicht auswendig gelernt oder gesungen werden. Sie ließen sich heimlich auf kleinen Zetteln über Zensurgrenzen schmuggeln und erreichten auch Bevölkerungsschichten, die keine langen theoretischen Bücher lasen.',
        tip: 'Denke an Zensurbestimmungen (unter 20 Bogen zensiert!) und mündliche Weitergabe.',
      },
      {
        number: 3,
        afb: 'AFB III',
        points: 6,
        prompt: 'Diskutiere Herweghs Aufruf „Reiß die Kreuze aus der Erden, alle Schwerter sollen werden!“ aus heutiger ethischer und geschichtlicher Sicht.',
        linesCount: 5,
        sampleAnswer: 'Herwegh fordert die Abkehr von christlicher Demut und Passivität hin zum bewaffneten Kampf. Aus Sicht des Vormärz war dies der verzweifelte Ruf nach Befreiung. Aus heutiger Sicht zeigt sich die Radikalität, die bereit war, religiöse Symbole für kriegerische Gewalt zu opfern.',
        tip: 'Stelle den Zweck (Befreiung von Tyrannei) den Mitteln (bewaffneter Aufstand) gegenüber.',
      },
    ],
  },
  5: {
    stationId: 5,
    vocabulary: [
      { word: 'Barrikade', meaning: 'Aus Pflastersteinen, Fässern und Möbeln improvisierte Straßensperre im Stadtkampf.' },
      { word: 'Märzminister', meaning: 'Liberale Bürgerpolitiker, die im Frühjahr 1848 von den Fürsten zu Ministern ernannt wurden.' },
      { word: 'Märzgefallene', meaning: 'Die über 200 getöteten Bürgerinnen und Bürger der Berliner Barrikadenkämpfe.' },
    ],
    tasks: [
      {
        number: 1,
        afb: 'AFB I',
        points: 4,
        prompt: 'Nenne die zentralen „Märzforderungen“, die das Bürgertum im Frühjahr 1848 an die Fürsten stellte.',
        linesCount: 4,
        sampleAnswer: '1. Presse- und Meinungsfreiheit ohne Zensur. 2. Schwurgerichte und Rechtsgleichheit. 3. Volksbewaffnung und Bürgerwehren. 4. Einberufung eines gesamtdeutschen Parlaments zur Ausarbeitung einer Verfassung.',
        tip: 'Nenne mindestens 4 konkrete Freiheitsforderungen.',
      },
      {
        number: 2,
        afb: 'AFB II',
        points: 6,
        prompt: 'Schildere die dramatischen Ereignisse in Berlin am 18. und 19. März 1848 und die Reaktion von König Friedrich Wilhelm IV.',
        linesCount: 5,
        sampleAnswer: 'Am 18. März fielen vor dem Berliner Schloss ungeklärte Schüsse des Militärs, woraufhin die Bürger hunderte Barrikaden bauten. Nach erbitterten Kämpfen zog der König seine Truppen ab, verneigte sich am 19. März vor den toten Märzgefallenen und versprach Reformen.',
        tip: 'Gehe auf den Auslöser, den Straßenkampf und die königliche Reverenz ein.',
      },
      {
        number: 3,
        afb: 'AFB III',
        points: 6,
        prompt: 'Bewerte den Ritt des preußischen Königs mit der schwarz-rot-goldenen Binde am 21. März: Aufrichtige Bekehrung oder taktisches Manöver?',
        linesCount: 5,
        sampleAnswer: 'Es war ein rein taktisches Nachgeben, um die Krone vor dem Zorn des Volkes zu retten. Der König wollte Zeit gewinnen. Sobald das Militär die Lage wieder kontrollierte, nahm er viele Zugeständnisse zurück und lehnte die Reichsverfassung 1849 verächtlich ab.',
        tip: 'Vergleiche seine Worte im März 1848 mit seinen privaten Äußerungen 1849.',
      },
    ],
  },
  6: {
    stationId: 6,
    vocabulary: [
      { word: 'Honoratioren', meaning: 'Angesehene, vermögende und gebildete Bürger (Professoren, Juristen, Beamte).' },
      { word: 'Konstitutionelle Monarchie', meaning: 'Staatsform, in der die Macht des Monarchen durch eine Verfassung und ein Parlament beschränkt ist.' },
      { word: 'Zensuswahlrecht', meaning: 'Ungleiches Wahlrecht, das das Stimmgewicht oder Wahlrecht an Steuern und Vermögen koppelt.' },
    ],
    tasks: [
      {
        number: 1,
        afb: 'AFB I',
        points: 4,
        prompt: 'Beschreibe die Zusammensetzung der Nationalversammlung in der Frankfurter Paulskirche (18. Mai 1848). Wer war nicht vertreten?',
        linesCount: 4,
        sampleAnswer: 'Über 75 % der Abgeordneten waren Akademiker: Professoren, Juristen, Richter, Beamte und Geistliche („Professorenparlament“). Arbeiter, Tagelöhner und Kleinbauern waren kaum vorhanden; Frauen besaßen weder aktives noch passives Wahlrecht.',
        tip: 'Nenne die dominierenden Berufsgruppen und die ausgeschlossenen Bevölkerungsteile.',
      },
      {
        number: 2,
        afb: 'AFB II',
        points: 6,
        prompt: 'Erkläre den Unterschied zwischen der „Großdeutschen“ und der „Kleindeutschen Lösung“ und warum sich letztere durchsetzte.',
        linesCount: 5,
        sampleAnswer: 'Großdeutsch: Einigung inklusive der deutschsprachigen Gebiete Österreichs. Dies scheiterte, da Österreich sein Vielvölkerreich (mit Ungarn und Slawen) nicht aufteilen wollte. Kleindeutsch: Einigung ohne Österreich unter der erblichen Kaiserkrone des preußischen Königs.',
        tip: 'Berücksichtige die multiethnische Struktur des Habsburgerreiches.',
      },
      {
        number: 3,
        afb: 'AFB III',
        points: 6,
        prompt: 'Vergleiche die Positionen der Paulskirchen-Fraktionen Donnersberg (Links), Casino (Mitte) und Café Milani (Rechts).',
        linesCount: 5,
        sampleAnswer: 'Donnersberg (Links): Wollte eine Republik, allgemeines Wahlrecht und Abschaffung aller Monarchen. Casino (Mitte): Wollte eine konstitutionelle Monarchie im Kompromiss mit den Fürsten und Zensuswahlrecht. Café Milani (Rechts): Wollte Vorherrschaft der Landesfürsten und minimale Parlamentsrechte.',
        tip: 'Stelle Staatsform, Wahlrecht und Haltung zu den Fürsten gegenüber.',
      },
    ],
  },
  7: {
    stationId: 7,
    vocabulary: [
      { word: 'Kaiserdeputation', meaning: 'Abordnung der Nationalversammlung, die 1849 nach Berlin reiste, um die Krone zu überreichen.' },
      { word: 'Reichsverfassungskampagne', meaning: 'Aufstände im Mai 1849 zur Durchsetzung der Paulskirchenverfassung mit Waffengewalt.' },
      { word: 'Grundrechte', meaning: 'Unantastbare Freiheits- und Abwehrrechte des Bürgers gegenüber staatlicher Willkür.' },
    ],
    tasks: [
      {
        number: 1,
        afb: 'AFB I',
        points: 4,
        prompt: 'Gib wieder, warum König Friedrich Wilhelm IV. die Kaiserkrone der Frankfurter Paulskirche im April 1849 ablehnte.',
        linesCount: 4,
        sampleAnswer: 'Der preußische König hielt unerschütterlich am Gottesgnadentum fest. Eine Krone durfte für ihn nur von Gott und den Fürsten verliehen werden, nicht aber von einem bürgerlichen Volksparlament. Er schmähte sie als „Krone aus Dreck und Letten mit dem Ludergeruch der Revolution“.',
        tip: 'Beziehe dich auf das Gottesgnadentum und seine Verachtung des Volkswillens.',
      },
      {
        number: 2,
        afb: 'AFB II',
        points: 6,
        prompt: 'Erläutere die wesentlichen Ursachen für das Scheitern der Revolution von 1848/49.',
        linesCount: 5,
        sampleAnswer: '1. Überforderung durch Doppelaufgabe (nationale Einheit UND freiheitliche Verfassung). 2. Fehlende militärische Exekutive (Truppen gehorchten den Monarchen). 3. Spaltung der Revolutionäre (gemäßigte Bürger vs. radikale Demokraten/Arbeiter). 4. Ablehnung der Kaiserkrone durch Preußen.',
        tip: 'Strukturiere deine Antwort nach militärischen, politischen und konzeptionellen Gründen.',
      },
      {
        number: 3,
        afb: 'AFB III',
        points: 6,
        prompt: 'Beurteile das historische Erbe von 1848/49 für die heutige Bundesrepublik Deutschland. War die Revolution vergeblich?',
        linesCount: 5,
        sampleAnswer: 'Die Revolution war keineswegs vergeblich. Sie schuf die Grundrechte (Blaupause für Art. 1–19 GG), die Bundesflagge Schwarz-Rot-Gold, das moderne Parteiensystem und verankerte das parlamentarische Bewusstsein dauerhaft in Deutschland.',
        tip: 'Ziehe den Bogen von 1848/49 zum Grundgesetz von 1949.',
      },
    ],
  },
};
