/**
 * All site copy and data, in the three languages the site ships in.
 *
 * Ported verbatim from the "Portfolio Redesign" design document, which is the
 * source of truth for wording. Project entries mirror the old data/projects.php
 * so the Momo knowledge base and the site stay in agreement.
 */

import type { Lang } from "./i18n";


export type Category = "personal" | "professional";

export type Project = {
  id: string;
  name: string;
  cat: Category;
  shot: string;
  tags: string[];
  /** Live deployment, where one exists. */
  url?: string;
  /** Demo clip shown in the detail modal, where one exists. */
  video?: string;
  period: Record<Lang, string>;
  desc: Record<Lang, string>;
};

export type StackGroup = { group: string; items: string[] };

export type LangOption = { code: string; key: Lang; name: string };

export type ImprintBlock = { k: string; v: string; link?: { label: string; href: string } };

export type Track = { n: string; title: string; artist: string; url?: string; cover?: string };


const T = {
  en: {
    nav: { home: "Home", work: "Projects", about: "About", stack: "Stack", karate: "Karate", contact: "Contact" },
    ui: { gridVariant: "Grid", demo: "Demo video" },
    hero: { hi: "Hi, I'm", eyebrow: "Apprentice Application Developer · Zurich", role: "Apprentice Application Developer", open: "Open to junior roles from 2027", claim: "Structured software, built with care.", blurb: "I design and build modern web and mobile products — from clean, considered frontends to solid backends. Currently completing my apprenticeship as an application developer alongside the Vocational Baccalaureate (BMS-W).", cta: "View my work", cta2: "Get in touch", cta3: "About me" },
    work: { title: "Selected work", sub: "Different projects, from a native iOS app to my own self-hosted infrastructure.", all: "All projects", pageTitle: "Projects", pageSub: "Mobile apps, club tooling and self-hosted infrastructure. Each entry says what it does, why I built it and what it runs on.", fanHint: "Hover to lift a card, click to open its details.", visit: "Visit project" },
    about: { title: "About", p1: "I am completing my apprenticeship as an application developer while attending the Vocational Baccalaureate School (BMS-W) in Switzerland. My focus lies in clean, scalable, well-structured web applications that are technically solid and pleasant to use.", p2: "I work across the full stack and enjoy the part most people skip: naming things well, keeping architecture legible, and making sure the code still makes sense six months later.", valuesTitle: "What I care about", pathTitle: "Path", cv: "Request my CV" },
    stack: { title: "Stack", sub: "Tools I use regularly, grouped by where they sit in a project." },
    karate: { eyebrow: "Beyond the screen", title: "Karate — discipline that carries over.", blurb: "I train and help organise at Kaisho Karate Bassersdorf, and now teach children too. The same habits apply to code: repetition, precision, and showing up when it is not convenient.", milestones: "Milestones" },
    contact: { title: "Get in touch", blurb: "Open to apprenticeship follow-ups, junior roles and small freelance builds. Email is the quickest route.", name: "Your name", namePh: "Jane Doe", email: "Your email", emailPh: "you@example.com", message: "Message", messagePh: "What are you working on?", send: "Send message", note: "I usually reply within two days." },
    cta: { title: "Let's build something that lasts.", blurb: "Looking for a developer who cares about structure as much as the surface? I'd like to hear about it.", button: "Contact me" },
    imprint: { title: "Imprint" },
    footer: { tag: "Passionate about new technologies and software development.", imprint: "Imprint", made: "Made in Zurich, Switzerland", rights: "All rights reserved." },
    momo: { label: "Ask Momo", title: "Momo — site assistant", blurb: "Ask about projects, technologies or the apprenticeship.", note: "Messages are sent to an AI service. Do not enter sensitive information." },
    filters: { all: "All", personal: "Personal", professional: "Professional" },
    stats: [
      { value: "2.0 yrs", label: "Professional experience" },
      { value: "2019", label: "Programming since" },
      { value: "6", label: "Shipped projects" },
      { value: "4+", label: "Languages spoken" }
    ],
    heroMeta: [
      { k: "Based in", v: "Zurich, Switzerland" },
      { k: "Currently", v: "Apprenticeship + BMS-W" },
      { k: "Focus", v: "Full-stack & mobile" },
      { k: "Available", v: "From summer 2027" }
    ],
    values: ["Clear architecture", "Maintainable code", "Thoughtful user experience", "Real-world usability"],
    timeline: [
      { when: "2026 – present", what: "Apprentice Application Developer", where: "Third year, working across frontend, backend and deployment on real client systems." },
      { when: "2025 – present", what: "Vocational Baccalaureate (BMS-W)", where: "Business-oriented baccalaureate alongside the apprenticeship." },
      { when: "2024 – 2025", what: "BBC Basislehrjahr", where: "Foundation year: fundamentals, project work and the first version of Yumigo." },
      { when: "2019", what: "First lines of code", where: "Started programming out of curiosity — websites and small tools for family." }
    ],
    facts: [
      { k: "Experience", v: "2.0 years professional" },
      { k: "Languages", v: "German · Italian · English · French, learning Spanish" },
      { k: "Interests", v: "Software development, frontend, UI/UX, AI" },
      { k: "Location", v: "Zurich, Switzerland" }
    ],
    karateCards: [
      { k: "Club", title: "Kaisho Karate Bassersdorf", text: "Member and helper — training regularly and supporting the organisation of schedules and events." },
      { k: "Teaching", title: "Training children", text: "Since 2025 I pass on what I learned to the next generation — backed since 2026 by the J&S 1418Coach qualification." },
      { k: "Competition", title: "Tournaments", text: "Cantonal championships and the international Nicki Cup in Austria — most recently 3rd place in Kata against athletes from three countries." }
    ],
    karateTimeline: [
      { when: "July 2026", what: "Zürcher Kantonalmeisterschaften 2026", note: "Competed in Kata at the cantonal championships, and coached our kids in Kata and Team Kata." },
      { when: "June 2026", what: "J&S 1418Coach course", note: "Completed the Jugend+Sport 1418Coach course — formal training for supporting young athletes." },
      { when: "May 2026", what: "Nicki Cup, Austria", note: "3rd place in Kata at the international tournament, against athletes from Switzerland, Germany and Austria." },
      { when: "September 2025", what: "Brown belt", note: "Passed the brown belt examination after a demanding grading — advanced technique and a deeper understanding of the art." },
      { when: "July 2025", what: "Zürcher Kantonalmeisterschaften 2025", note: "2nd place in Kata and 5th place in Kumite at the cantonal championships." },
      { when: "May 2025", what: "Nicki Cup, Austria", note: "3rd place in Kumite and 5th place in Kata at the international tournament in Austria." },
      { when: "2025", what: "Teaching children", note: "Started training children, sharing my passion and knowledge of karate with the next generation." },
      { when: "November 2024", what: "Kata Friendship Tournament", note: "2nd place in Kata." },
      { when: "July 2024", what: "Zürcher Kantonalmeisterschaften 2024", note: "3rd place at the cantonal championships, Canton Zurich." }
    ],
    links: [
      { k: "Email", v: "selimo.contact@gmail.com", href: "mailto:selimo.contact@gmail.com" },
      { k: "GitHub", v: "Selimo100", href: "https://github.com/Selimo100" },
      { k: "LinkedIn", v: "selina-mogicato", href: "https://www.linkedin.com/in/selina-mogicato-a48166316" }
    ],
    imprintBlocks: [
      { k: "Responsible", v: "Selina Mogicato\nZurich, Switzerland" },
      { k: "Contact", v: "selimo.contact@gmail.com\nlinkedin.com/in/selina-mogicato" },
      { k: "Purpose", v: "Personal portfolio website, showing my work, skills and experience as an application developer. Content is provided for information purposes only.\n\nI am currently completing my apprenticeship in application development alongside the Vocational Baccalaureate (BMS-W)." },
      { k: "Liability", v: "Despite careful checking, no liability is accepted for the accuracy or completeness of the content.\n\nThis site links to external websites whose content I have no influence over. The respective provider or operator is always responsible for their content." },
      { k: "Copyright & licence", v: "All original texts, images and project material © 2026 Selina Mogicato unless stated otherwise. Third-party assets and libraries keep their own licences.\n\nThis portfolio is published under the Creative Commons BY-NC 4.0 licence.", link: { label: "CC BY-NC 4.0", href: "https://creativecommons.org/licenses/by-nc/4.0/" } },
      { k: "Image credits", v: "Some images on this site were generated with DALL·E, OpenAI's image model, from prompts written by Selina Mogicato.\n\nWhere images are published under Creative Commons licences, those terms apply. Any further use requires explicit permission." },
      { k: "Privacy", v: "No personal data is collected from visitors without explicit consent.\nContact form submissions are used solely to answer the enquiry.\nNo tracking cookies are used for analytics or advertising.\nServer logs may temporarily store IP addresses for security purposes.\nQuestions sent to the Momo assistant may be forwarded to an AI provider." }
    ]
  },
  de: {
    nav: { home: "Start", work: "Projekte", about: "Über mich", stack: "Stack", karate: "Karate", contact: "Kontakt" },
    ui: { gridVariant: "Raster", demo: "Demo-Video" },
    hero: { hi: "Hi, ich bin", eyebrow: "Applikationsentwicklerin in Ausbildung · Zürich", role: "Applikationsentwicklerin in Ausbildung", open: "Offen für Junior-Stellen ab 2027", claim: "Strukturierte Software, mit Sorgfalt gebaut.", blurb: "Ich gestalte und entwickle moderne Web- und Mobile-Produkte — von klaren, durchdachten Frontends bis zu stabilen Backends. Aktuell absolviere ich meine Lehre als Applikationsentwicklerin parallel zur Berufsmaturitätsschule (BMS-W).", cta: "Projekte ansehen", cta2: "Kontakt aufnehmen", cta3: "Über mich" },
    work: { title: "Ausgewählte Projekte", sub: "Unterschiedliche Projekte, von einer native iOS-App bis zur eigenen Infrastruktur.", all: "Alle Projekte", pageTitle: "Projekte", pageSub: "Mobile Apps, Vereins-Tools und selbst gehostete Infrastruktur. Jeder Eintrag zeigt, was es macht, warum es entstand und worauf es läuft.", fanHint: "Karte zum Anheben antippen, klicken für Details.", visit: "Projekt öffnen" },
    about: { title: "Über mich", p1: "Ich absolviere meine Lehre als Applikationsentwicklerin und besuche parallel die Berufsmaturitätsschule (BMS-W). Mein Fokus liegt auf sauberen, skalierbaren und gut strukturierten Webanwendungen, die technisch solide und angenehm zu bedienen sind.", p2: "Ich arbeite über den ganzen Stack und mag genau den Teil, den viele überspringen: gute Benennungen, verständliche Architektur und Code, der auch in sechs Monaten noch Sinn ergibt.", valuesTitle: "Worauf ich achte", pathTitle: "Weg", cv: "CV anfragen" },
    stack: { title: "Stack", sub: "Werkzeuge, die ich regelmässig einsetze — nach Projektbereich gruppiert." },
    karate: { eyebrow: "Neben dem Bildschirm", title: "Karate — Disziplin, die übertragbar ist.", blurb: "Ich trainiere und helfe bei der Organisation im Kaisho Karate Bassersdorf und unterrichte inzwischen auch Kinder. Dieselben Gewohnheiten gelten für Code: Wiederholung, Präzision und Dranbleiben, auch wenn es unbequem ist.", milestones: "Meilensteine" },
    contact: { title: "Kontakt", blurb: "Offen für Anschlusslösungen nach der Lehre, Junior-Stellen und kleine Freelance-Projekte. Am schnellsten per E-Mail.", name: "Name", namePh: "Vor- und Nachname", email: "E-Mail", emailPh: "du@beispiel.ch", message: "Nachricht", messagePh: "An was arbeitest du?", send: "Nachricht senden", note: "Antwort in der Regel innert zwei Tagen." },
    cta: { title: "Bauen wir etwas, das bleibt.", blurb: "Auf der Suche nach einer Entwicklerin, der Struktur so wichtig ist wie die Oberfläche? Ich freue mich auf deine Nachricht.", button: "Kontaktieren" },
    imprint: { title: "Impressum" },
    footer: { tag: "Begeistert von neuen Technologien und Softwareentwicklung.", imprint: "Impressum", made: "Gemacht in Zürich, Schweiz", rights: "Alle Rechte vorbehalten." },
    momo: { label: "Momo fragen", title: "Momo — Seiten-Assistent", blurb: "Frag nach Projekten, Technologien oder der Lehre.", note: "Nachrichten werden an einen KI-Dienst gesendet. Keine sensiblen Daten eingeben." },
    filters: { all: "Alle", personal: "Privat", professional: "Beruflich" },
    stats: [
      { value: "2.0 J.", label: "Berufserfahrung" },
      { value: "2019", label: "Programmiere seit" },
      { value: "6", label: "Umgesetzte Projekte" },
      { value: "4+", label: "Gesprochene Sprachen" }
    ],
    heroMeta: [
      { k: "Standort", v: "Zürich, Schweiz" },
      { k: "Aktuell", v: "Lehre + BMS-W" },
      { k: "Fokus", v: "Full-Stack & Mobile" },
      { k: "Verfügbar", v: "Ab Sommer 2027" }
    ],
    values: ["Klare Architektur", "Wartbarer Code", "Durchdachte User Experience", "Praxistaugliche Lösungen"],
    timeline: [
      { when: "2026 – heute", what: "Lehre Applikationsentwicklung", where: "Drittes Lehrjahr, Arbeit an Frontend, Backend und Deployment realer Kundensysteme." },
      { when: "2025 – heute", what: "Berufsmaturität (BMS-W)", where: "Kaufmännische Berufsmaturität parallel zur Lehre." },
      { when: "2024 – 2025", what: "BBC Basislehrjahr", where: "Grundlagenjahr: Fundamente, Projektarbeit und die erste Version von Yumigo." },
      { when: "2019", what: "Erste Zeilen Code", where: "Aus Neugier begonnen — Websites und kleine Tools für die Familie." }
    ],
    facts: [
      { k: "Erfahrung", v: "2.0 Jahre beruflich" },
      { k: "Sprachen", v: "Deutsch · Italienisch · Englisch · Französisch, lerne Spanisch" },
      { k: "Interessen", v: "Softwareentwicklung, Frontend, UI/UX, KI" },
      { k: "Standort", v: "Zürich, Schweiz" }
    ],
    karateCards: [
      { k: "Verein", title: "Kaisho Karate Bassersdorf", text: "Mitglied und Helferin — regelmässiges Training und Unterstützung bei Planung und Events." },
      { k: "Unterricht", title: "Kindertraining", text: "Seit 2025 gebe ich mein Wissen an die nächste Generation weiter — seit 2026 mit dem J&S-Kurs 1418Coach im Rücken." },
      { k: "Wettkampf", title: "Turniere", text: "Kantonalmeisterschaften und der internationale Nicki Cup in Österreich — zuletzt 3. Platz im Kata gegen Athletinnen und Athleten aus drei Ländern." }
    ],
    karateTimeline: [
      { when: "Juli 2026", what: "Zürcher Kantonalmeisterschaften 2026", note: "Im Kata angetreten und unsere Kinder in Kata und Team-Kata gecoacht." },
      { when: "Juni 2026", what: "J&S-Kurs 1418Coach", note: "Den Jugend+Sport-Kurs 1418Coach abgeschlossen — Ausbildung für die Begleitung junger Sportlerinnen und Sportler." },
      { when: "Mai 2026", what: "Nicki Cup, Österreich", note: "3. Platz im Kata am internationalen Turnier, gegen Athletinnen und Athleten aus der Schweiz, Deutschland und Österreich." },
      { when: "September 2025", what: "Brauner Gürtel", note: "Nach anspruchsvoller Prüfung den braunen Gürtel erreicht — fortgeschrittene Technik und ein tieferes Verständnis der Kunst." },
      { when: "Juli 2025", what: "Zürcher Kantonalmeisterschaften 2025", note: "2. Platz im Kata und 5. Platz im Kumite an den Kantonalmeisterschaften." },
      { when: "Mai 2025", what: "Nicki Cup, Österreich", note: "3. Platz im Kumite und 5. Platz im Kata am internationalen Turnier in Österreich." },
      { when: "2025", what: "Kindertraining", note: "Begonnen, Kinder zu trainieren und meine Begeisterung an die nächste Generation weiterzugeben." },
      { when: "November 2024", what: "Kata Friendship Tournament", note: "2. Platz im Kata." },
      { when: "Juli 2024", what: "Zürcher Kantonalmeisterschaften 2024", note: "3. Platz an den Kantonalmeisterschaften, Kanton Zürich." }
    ],
    links: [
      { k: "E-Mail", v: "selimo.contact@gmail.com", href: "mailto:selimo.contact@gmail.com" },
      { k: "GitHub", v: "Selimo100", href: "https://github.com/Selimo100" },
      { k: "LinkedIn", v: "selina-mogicato", href: "https://www.linkedin.com/in/selina-mogicato-a48166316" }
    ],
    imprintBlocks: [
      { k: "Verantwortlich", v: "Selina Mogicato\nZürich, Schweiz" },
      { k: "Kontakt", v: "selimo.contact@gmail.com\nlinkedin.com/in/selina-mogicato" },
      { k: "Zweck", v: "Persönliche Portfolio-Website mit Arbeiten, Fähigkeiten und Erfahrung als Applikationsentwicklerin. Die Inhalte dienen ausschliesslich der Information.\n\nAktuell absolviere ich meine Lehre als Applikationsentwicklerin parallel zur Berufsmaturitätsschule (BMS-W)." },
      { k: "Haftung", v: "Trotz sorgfältiger Prüfung wird keine Haftung für Richtigkeit und Vollständigkeit der Inhalte übernommen.\n\nDiese Website verlinkt auf externe Seiten, auf deren Inhalte ich keinen Einfluss habe. Für diese ist stets der jeweilige Anbieter oder Betreiber verantwortlich." },
      { k: "Urheberrecht & Lizenz", v: "Alle eigenen Texte, Bilder und Projektmaterialien © 2026 Selina Mogicato, sofern nicht anders angegeben. Assets und Bibliotheken Dritter behalten ihre eigenen Lizenzen.\n\nDieses Portfolio steht unter der Creative-Commons-Lizenz BY-NC 4.0.", link: { label: "CC BY-NC 4.0", href: "https://creativecommons.org/licenses/by-nc/4.0/deed.de" } },
      { k: "Bildnachweis", v: "Einzelne Bilder dieser Website wurden mit DALL·E, dem Bildmodell von OpenAI, erzeugt — nach Prompts von Selina Mogicato.\n\nWo Bilder unter Creative-Commons-Lizenzen stehen, gelten deren Bedingungen. Jede weitere Nutzung bedarf der ausdrücklichen Erlaubnis." },
      { k: "Datenschutz", v: "Ohne ausdrückliche Einwilligung werden keine personenbezogenen Daten von Besucherinnen und Besuchern erhoben.\nAngaben aus dem Kontaktformular werden ausschliesslich zur Beantwortung der Anfrage verwendet.\nEs werden keine Tracking-Cookies für Analyse oder Werbung eingesetzt.\nServer-Logs können IP-Adressen aus Sicherheitsgründen vorübergehend speichern.\nFragen an den Momo-Assistenten können an einen KI-Dienst weitergeleitet werden." }
    ]
  },
  it: {
    nav: { home: "Home", work: "Progetti", about: "Chi sono", stack: "Stack", karate: "Karate", contact: "Contatto" },
    ui: { gridVariant: "Griglia", demo: "Video demo" },
    hero: { hi: "Ciao, sono", eyebrow: "Sviluppatrice di applicazioni in formazione · Zurigo", role: "Sviluppatrice di applicazioni in formazione", open: "Disponibile per ruoli junior dal 2027", claim: "Software strutturato, costruito con cura.", blurb: "Progetto e realizzo prodotti web e mobile moderni — da frontend puliti e ragionati a backend solidi. Attualmente completo il mio apprendistato come sviluppatrice di applicazioni insieme alla maturità professionale (BMS-W).", cta: "Vedi i progetti", cta2: "Contattami", cta3: "Chi sono" },
    work: { title: "Progetti selezionati", sub: "Diversi progetti, da un'app iOS nativa alla mia infrastruttura autogestita.", all: "Tutti i progetti", pageTitle: "Progetti", pageSub: "App mobile, strumenti per il club e infrastruttura autogestita. Ogni voce spiega cosa fa, perché l'ho creata e su cosa gira.", fanHint: "Passa il mouse per sollevare una carta, clicca per i dettagli.", visit: "Apri il progetto" },
    about: { title: "Chi sono", p1: "Sto completando l'apprendistato come sviluppatrice di applicazioni, frequentando in parallelo la scuola di maturità professionale (BMS-W). Mi concentro su applicazioni web pulite, scalabili e ben strutturate, solide tecnicamente e piacevoli da usare.", p2: "Lavoro su tutto lo stack e mi piace proprio la parte che molti saltano: dare buoni nomi, mantenere l'architettura leggibile e scrivere codice che avrà senso anche fra sei mesi.", valuesTitle: "Cosa mi importa", pathTitle: "Percorso", cv: "Richiedi il CV" },
    stack: { title: "Stack", sub: "Strumenti che uso regolarmente, raggruppati per ambito di progetto." },
    karate: { eyebrow: "Oltre lo schermo", title: "Karate — disciplina che si trasferisce.", blurb: "Mi alleno e aiuto nell'organizzazione al Kaisho Karate Bassersdorf, e ora insegno anche ai bambini. Le stesse abitudini valgono per il codice: ripetizione, precisione e costanza anche quando non è comodo.", milestones: "Tappe" },
    contact: { title: "Contatto", blurb: "Disponibile per opportunità dopo l'apprendistato, ruoli junior e piccoli progetti freelance. La via più rapida è l'email.", name: "Nome", namePh: "Nome e cognome", email: "Email", emailPh: "tu@esempio.ch", message: "Messaggio", messagePh: "A cosa stai lavorando?", send: "Invia messaggio", note: "Rispondo di solito entro due giorni." },
    cta: { title: "Costruiamo qualcosa che duri.", blurb: "Cerchi una sviluppatrice attenta alla struttura tanto quanto alla superficie? Mi farebbe piacere sentirti.", button: "Scrivimi" },
    imprint: { title: "Note legali" },
    footer: { tag: "Appassionata di nuove tecnologie e sviluppo software.", imprint: "Note legali", made: "Fatto a Zurigo, Svizzera", rights: "Tutti i diritti riservati." },
    momo: { label: "Chiedi a Momo", title: "Momo — assistente del sito", blurb: "Chiedi di progetti, tecnologie o apprendistato.", note: "I messaggi vengono inviati a un servizio IA. Non inserire dati sensibili." },
    filters: { all: "Tutti", personal: "Personale", professional: "Professionale" },
    stats: [
      { value: "2.0 anni", label: "Esperienza professionale" },
      { value: "2019", label: "Programmo dal" },
      { value: "6", label: "Progetti realizzati" },
      { value: "4+", label: "Lingue parlate" }
    ],
    heroMeta: [
      { k: "Sede", v: "Zurigo, Svizzera" },
      { k: "Attualmente", v: "Apprendistato + BMS-W" },
      { k: "Focus", v: "Full-stack e mobile" },
      { k: "Disponibile", v: "Dall'estate 2027" }
    ],
    values: ["Architettura chiara", "Codice mantenibile", "Esperienza utente curata", "Usabilità reale"],
    timeline: [
      { when: "2026 – oggi", what: "Apprendistato sviluppo applicazioni", where: "Terzo anno, lavoro su frontend, backend e deployment di sistemi reali." },
      { when: "2025 – oggi", what: "Maturità professionale (BMS-W)", where: "Maturità commerciale in parallelo all'apprendistato." },
      { when: "2024 – 2025", what: "BBC Basislehrjahr", where: "Anno di base: fondamenti, lavori di progetto e la prima versione di Yumigo." },
      { when: "2019", what: "Prime righe di codice", where: "Iniziato per curiosità — siti e piccoli strumenti per la famiglia." }
    ],
    facts: [
      { k: "Esperienza", v: "2.0 anni professionali" },
      { k: "Lingue", v: "Tedesco · Italiano · Inglese · Francese, sto imparando lo spagnolo" },
      { k: "Interessi", v: "Sviluppo software, frontend, UI/UX, IA" },
      { k: "Sede", v: "Zurigo, Svizzera" }
    ],
    karateCards: [
      { k: "Club", title: "Kaisho Karate Bassersdorf", text: "Membro e aiutante — allenamenti regolari e supporto nell'organizzazione di orari ed eventi." },
      { k: "Insegnamento", title: "Allenare i bambini", text: "Dal 2025 trasmetto ciò che ho imparato alla nuova generazione — dal 2026 con la qualifica G+S 1418Coach alle spalle." },
      { k: "Gare", title: "Tornei", text: "Campionati cantonali e il Nicki Cup internazionale in Austria — da ultimo 3° posto nel Kata contro atleti di tre paesi." }
    ],
    karateTimeline: [
      { when: "Luglio 2026", what: "Campionati cantonali di Zurigo 2026", note: "In gara nel Kata e coach dei nostri bambini nel Kata e nel Kata a squadre." },
      { when: "Giugno 2026", what: "Corso G+S 1418Coach", note: "Completato il corso Gioventù+Sport 1418Coach — formazione per accompagnare i giovani atleti." },
      { when: "Maggio 2026", what: "Nicki Cup, Austria", note: "3° posto nel Kata al torneo internazionale, contro atleti da Svizzera, Germania e Austria." },
      { when: "Settembre 2025", what: "Cintura marrone", note: "Superato un esame impegnativo per la cintura marrone — tecnica avanzata e una comprensione più profonda dell'arte." },
      { when: "Luglio 2025", what: "Campionati cantonali di Zurigo 2025", note: "2° posto nel Kata e 5° posto nel Kumite ai campionati cantonali." },
      { when: "Maggio 2025", what: "Nicki Cup, Austria", note: "3° posto nel Kumite e 5° posto nel Kata al torneo internazionale in Austria." },
      { when: "2025", what: "Allenare i bambini", note: "Ho iniziato ad allenare bambini, condividendo passione e conoscenza con la nuova generazione." },
      { when: "Novembre 2024", what: "Kata Friendship Tournament", note: "2° posto nel Kata." },
      { when: "Luglio 2024", what: "Campionati cantonali di Zurigo 2024", note: "3° posto ai campionati cantonali, Canton Zurigo." }
    ],
    links: [
      { k: "Email", v: "selimo.contact@gmail.com", href: "mailto:selimo.contact@gmail.com" },
      { k: "GitHub", v: "Selimo100", href: "https://github.com/Selimo100" },
      { k: "LinkedIn", v: "selina-mogicato", href: "https://www.linkedin.com/in/selina-mogicato-a48166316" }
    ],
    imprintBlocks: [
      { k: "Responsabile", v: "Selina Mogicato\nZurigo, Svizzera" },
      { k: "Contatto", v: "selimo.contact@gmail.com\nlinkedin.com/in/selina-mogicato" },
      { k: "Scopo", v: "Sito portfolio personale, con lavori, competenze ed esperienza come sviluppatrice di applicazioni. I contenuti hanno finalità puramente informative.\n\nAttualmente sto completando l'apprendistato in sviluppo di applicazioni parallelamente alla maturità professionale (BMS-W)." },
      { k: "Responsabilità", v: "Nonostante la verifica accurata, non si assume responsabilità per l'esattezza o la completezza dei contenuti.\n\nQuesto sito rimanda a siti esterni sui cui contenuti non ho alcuna influenza. Ne è sempre responsabile il rispettivo fornitore o gestore." },
      { k: "Copyright e licenza", v: "Tutti i testi, le immagini e i materiali di progetto originali © 2026 Selina Mogicato, salvo diversa indicazione. Le risorse e le librerie di terzi mantengono le proprie licenze.\n\nQuesto portfolio è pubblicato con licenza Creative Commons BY-NC 4.0.", link: { label: "CC BY-NC 4.0", href: "https://creativecommons.org/licenses/by-nc/4.0/deed.it" } },
      { k: "Crediti immagini", v: "Alcune immagini di questo sito sono state generate con DALL·E, il modello di immagini di OpenAI, a partire da prompt scritti da Selina Mogicato.\n\nDove le immagini sono pubblicate con licenze Creative Commons, valgono i relativi termini. Ogni ulteriore utilizzo richiede un'autorizzazione esplicita." },
      { k: "Privacy", v: "Non vengono raccolti dati personali dei visitatori senza consenso esplicito.\nI dati inviati dal modulo di contatto servono unicamente a rispondere alla richiesta.\nNon vengono usati cookie di tracciamento per analisi o pubblicità.\nI log del server possono conservare temporaneamente indirizzi IP per motivi di sicurezza.\nLe domande poste all'assistente Momo possono essere inoltrate a un servizio di IA." }
    ]
  }
};

const MOMO_Q = {
  en: ["What projects has Selina built?", "Which technologies does she use?", "Tell me about her apprenticeship."],
  de: ["Welche Projekte hat Selina gebaut?", "Welche Technologien nutzt sie?", "Erzähl mir von ihrer Lehre."],
  it: ["Quali progetti ha realizzato Selina?", "Quali tecnologie usa?", "Parlami del suo apprendistato."]
};

const PROJECTS: Project[] = [
  { id: "momento", url: "https://momento.mogicato.ch/", name: "Momento App", cat: "personal", shot: "momento_app_card.png", tags: ["Swift"],
    period: { en: "Jun 2026 – present", de: "Juni 2026 – heute", it: "Giu 2026 – oggi" },
    desc: { en: "A local-first iOS app for turning photo sets into personal moments — adding the story, picking the best shots and exporting albums straight to Apple Photos.", de: "Eine local-first iOS-App, die Fotosets in persönliche Momente verwandelt — Geschichte ergänzen, beste Aufnahmen wählen, Album direkt nach Apple Fotos exportieren.", it: "Un'app iOS local-first che trasforma set di foto in momenti personali — aggiungi la storia, scegli le foto migliori, esporta album in Apple Foto." } },
  { id: "homelab", name: "HomeLab", cat: "personal", shot: "homelab_card.png", tags: ["Linux", "Docker", "Nginx"],
    period: { en: "Feb 2026 – present", de: "Feb 2026 – heute", it: "Feb 2026 – oggi" },
    desc: { en: "A self-built homelab on a 2012 MacBook Pro: containers, reverse proxying and monitoring on real hardware, hosting my own projects.", de: "Ein selbst gebautes Homelab auf einem MacBook Pro von 2012: Container, Reverse Proxy und Monitoring auf echter Hardware — hostet meine eigenen Projekte.", it: "Un homelab autocostruito su un MacBook Pro del 2012: container, reverse proxy e monitoraggio su hardware reale, ospita i miei progetti." } },
  { id: "yumigo", url: "https://yumigoapp.netlify.app/", video: "yumigo_app_video.mp4", name: "Yumigo App", cat: "personal", shot: "yumigo_app_card.png", tags: ["React Native", "Expo", "Firebase"],
    period: { en: "Jul 2025 – present", de: "Juli 2025 – heute", it: "Lug 2025 – oggi" },
    desc: { en: "Turns spontaneous food cravings into recipe suggestions, with seasonality and locality as first-class filters. Built during the BBC Basislehrjahr.", de: "Verwandelt spontane Gelüste in Rezeptvorschläge, mit Saison und Region als zentrale Filter. Entstanden im BBC Basislehrjahr.", it: "Trasforma le voglie improvvise in proposte di ricette, con stagionalità e provenienza come filtri principali. Creata durante il BBC Basislehrjahr." } },
  { id: "work", url: "https://selina.sunrise-avengers.ch/", name: "Work Portfolio", cat: "professional", shot: "work_portfolio_card.png", tags: ["React", "Tailwind", "Vite"],
    period: { en: "2025", de: "2025", it: "2025" },
    desc: { en: "A dedicated portfolio for my professional environment, showing projects, achievements and technical growth within the apprenticeship.", de: "Ein eigenes Portfolio für mein berufliches Umfeld: Projekte, Erfolge und technische Entwicklung während der Lehre.", it: "Un portfolio dedicato al mio ambiente professionale: progetti, risultati e crescita tecnica durante l'apprendistato." } },
  { id: "kaisho", url: "https://kaisho-dojotime.netlify.app/", name: "Kaisho DojoTime", cat: "personal", shot: "kaisho_dojotime_card.png", tags: ["TypeScript", "Supabase", "React"],
    period: { en: "2025", de: "2025", it: "2025" },
    desc: { en: "An organisation tool developed for my Karate club, Kaisho Karate Bassersdorf. It helps manage training schedules, trainer assignments and club events efficiently, streamlining club administration and improving communication.", de: "Ein Organisationstool für meinen Karateverein: Trainingsplan, Trainerzuteilung und Vereinsanlässe an einem Ort.", it: "Uno strumento organizzativo per il mio club di karate: orari, assegnazione allenatori ed eventi in un unico posto." } },
  { id: "rummy", url: "https://rummy.mogicato.ch/", name: "Rummy Website", cat: "personal", shot: "rummy_card.png", tags: ["PHP", "SQL", "Bootstrap"],
    period: { en: "2024", de: "2024", it: "2024" },
    desc: { en: "A web tool for managing Rummy games with an intuitive scoring UI. Originally my final secondary school project, still used by my family.", de: "Ein Web-Tool zum Verwalten von Rummy-Partien mit intuitiver Punkteoberfläche. Ursprünglich meine Abschlussarbeit der Sekundarschule — bis heute im Familiengebrauch.", it: "Uno strumento web per gestire partite di Rummy con un'interfaccia punteggi intuitiva. Nato come progetto finale di scuola media, usato ancora in famiglia." } }
];

const STACK: StackGroup[] = [
  { group: "Languages", items: ["Java", "TypeScript", "JavaScript", "PHP", "Python", "HTML", "CSS", "Markdown"] },
  { group: "Frontend", items: ["React", "Vue.js", "Next.js", "Vite", "Tailwind", "Bootstrap", "React Router"] },
  { group: "Mobile", items: ["React Native", "Expo", "Swift"] },
  { group: "Backend", items: ["Spring Boot", "Node.js", "Flask", "Rust", "NPM"] },
  { group: "Databases", items: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "SQLite", "MariaDB"] },
  { group: "Backend services", items: ["Firebase", "Supabase"] },
  { group: "Hosting", items: ["Vercel", "Netlify", "Nginx", "Docker", "Self-hosted", "FTP"] },
  { group: "CI/CD & VCS", items: ["Git", "GitHub", "GitLab", "GitLab CI"] },
  { group: "Testing & quality", items: ["Vitest", "Jest", "Postman", "Swagger", "Prettier"] },
  { group: "Monitoring", items: ["Grafana", "Prometheus", "Gradle"] },
  { group: "Design", items: ["Figma", "Canva", "Prezi"] },
  { group: "Systems", items: ["macOS", "Windows 11", "Linux"] }
];

const LANGS: LangOption[] = [{ code: "EN", key: "en", name: "English" }, { code: "DE", key: "de", name: "Deutsch" }, { code: "IT", key: "it", name: "Italiano" }];

const MUSIC = {
  en: { label: "On repeat", sub: "Top 3 of the last 4 weeks on Spotify", intro: "Outside of coding, music is a big passion of mine — it accompanies pretty much everything I do, from long development sessions to training and studying." },
  de: { label: "On repeat", sub: "Top 3 der letzten 4 Wochen auf Spotify", intro: "Neben dem Programmieren ist Musik eine grosse Leidenschaft von mir — sie begleitet fast alles, was ich tue, von langen Entwicklungs-Sessions bis zu Training und Lernen." },
  it: { label: "On repeat", sub: "Top 3 delle ultime 4 settimane su Spotify", intro: "Oltre al codice, la musica è una grande passione — accompagna praticamente tutto ciò che faccio, dalle lunghe sessioni di sviluppo agli allenamenti e allo studio." }
};

const TRACKS: Track[] = [
  { n: "1", title: "سطلانة - من فيلم بعد الشر", artist: "Abd El Basset Hamouda, Mahmoud El Leithy, Hamdy Batshan, Ali Rabee, Osos, H…" },
  { n: "2", title: "Poesie Clandestine", artist: "LDA, Aka 7even" },
  { n: "3", title: "YAMA", artist: "DYSTINCT" }
];

export type Translation = (typeof T)["en"];

export const TRANSLATIONS: Record<Lang, Translation> = T;
export const MOMO_PROMPTS: Record<Lang, string[]> = MOMO_Q;
export const IMPRINT: Record<Lang, ImprintBlock[]> = {
  en: T.en.imprintBlocks,
  de: T.de.imprintBlocks,
  it: T.it.imprintBlocks,
};
export const MUSIC_COPY: Record<Lang, { label: string; sub: string; intro: string }> = MUSIC;
export { PROJECTS, STACK, LANGS as LANG_OPTIONS, TRACKS as FALLBACK_TRACKS };
