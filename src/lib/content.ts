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
  period: Record<Lang, string>;
  desc: Record<Lang, string>;
};

export type StackGroup = { group: string; items: string[] };

export type Track = { n: string; title: string; artist: string; url?: string; cover?: string };


const T = {
  en: {
    nav: { home: "Home", work: "Projects", about: "About", stack: "Stack", karate: "Karate", contact: "Contact" },
    hero: { hi: "Hi, I'm", eyebrow: "Apprentice Application Developer · Zurich", role: "Apprentice Application Developer", open: "Open to junior roles from 2027", claim: "Structured software, built with care.", blurb: "I design and build modern web and mobile products — from clean, considered frontends to solid backends. Currently completing my apprenticeship as an application developer alongside the Vocational Baccalaureate (BMS-W).", cta: "View my work", cta2: "Get in touch", cta3: "About me" },
    work: { title: "Selected work", sub: "Six projects, from a native iOS app to my own self-hosted infrastructure.", all: "All projects", pageTitle: "Projects", pageSub: "Mobile apps, club tooling and self-hosted infrastructure. Each entry says what it does, why I built it and what it runs on." },
    about: { title: "About", p1: "I am completing my apprenticeship as an application developer while attending the Vocational Baccalaureate School (BMS-W) in Switzerland. My focus lies in clean, scalable, well-structured web applications that are technically solid and pleasant to use.", p2: "I work across the full stack and enjoy the part most people skip: naming things well, keeping architecture legible, and making sure the code still makes sense six months later.", valuesTitle: "What I care about", pathTitle: "Path", cv: "Request my CV" },
    stack: { title: "Stack", sub: "Tools I use regularly, grouped by where they sit in a project." },
    karate: { eyebrow: "Beyond the screen", title: "Karate — discipline that carries over.", blurb: "I train and help organise at Kaisho Karate Bassersdorf, and now teach children too. The same habits apply to code: repetition, precision, and showing up when it is not convenient.", milestones: "Milestones" },
    contact: { title: "Get in touch", blurb: "Open to apprenticeship follow-ups, junior roles and small freelance builds. Email is the quickest route.", name: "Your name", namePh: "Jane Doe", email: "Your email", emailPh: "you@example.com", message: "Message", messagePh: "What are you working on?", send: "Send message", note: "I usually reply within two days." },
    cta: { title: "Let's build something that lasts.", blurb: "Looking for a developer who cares about structure as much as the surface? I'd like to hear about it.", button: "Contact me" },
    imprint: { title: "Imprint" },
    footer: { tag: "Passionate about software and new technologies.", imprint: "Imprint", made: "Made in Zurich, Switzerland" },
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
      { k: "Teaching", title: "Training children", text: "Since 2025 I pass on what I learned to the next generation, which taught me more about explaining than any course." },
      { k: "Competition", title: "Kata & tournaments", text: "Regional and cantonal tournaments — 2nd place Kata Friendship Tournament, 3rd place Canton Zurich." }
    ],
    karateTimeline: [
      { when: "2025", what: "Teaching children", note: "Started training children, sharing my passion and knowledge of karate." },
      { when: "November 2024", what: "Competition success", note: "2nd place in the Kata Friendship Tournament." },
      { when: "July 2024", what: "Zürcher Kantonalmeisterschaften", note: "3rd place in the regional tournament, Canton Zurich." },
      { when: "2024", what: "Violet belt", note: "Advanced technical proficiency and dedication." },
      { when: "2023", what: "Half violet belt", note: "A significant step forward in the journey." }
    ],
    links: [
      { k: "Email", v: "selimo.contact@gmail.com", href: "mailto:selimo.contact@gmail.com" },
      { k: "GitHub", v: "Selimo100", href: "https://github.com/Selimo100" },
      { k: "LinkedIn", v: "selina-mogicato", href: "https://www.linkedin.com/in/selina-mogicato-a48166316" }
    ],
    imprintBlocks: [
      { k: "Responsible", v: "Selina Mogicato\nZurich, Switzerland" },
      { k: "Contact", v: "selimo.contact@gmail.com" },
      { k: "Purpose", v: "Personal portfolio website. Content is provided for information purposes only." },
      { k: "Liability", v: "Despite careful checking, no liability is accepted for the accuracy or completeness of the content, nor for the content of linked external sites." },
      { k: "Copyright", v: "All texts, images and project material © 2026 Selina Mogicato unless stated otherwise." }
    ]
  },
  de: {
    nav: { home: "Start", work: "Projekte", about: "Über mich", stack: "Stack", karate: "Karate", contact: "Kontakt" },
    hero: { hi: "Hi, ich bin", eyebrow: "Applikationsentwicklerin in Ausbildung · Zürich", role: "Applikationsentwicklerin in Ausbildung", open: "Offen für Junior-Stellen ab 2027", claim: "Strukturierte Software, mit Sorgfalt gebaut.", blurb: "Ich gestalte und entwickle moderne Web- und Mobile-Produkte — von klaren, durchdachten Frontends bis zu stabilen Backends. Aktuell absolviere ich meine Lehre als Applikationsentwicklerin parallel zur Berufsmaturitätsschule (BMS-W).", cta: "Projekte ansehen", cta2: "Kontakt aufnehmen", cta3: "Über mich" },
    work: { title: "Ausgewählte Projekte", sub: "Sechs Projekte, von einer native iOS-App bis zur eigenen Infrastruktur.", all: "Alle Projekte", pageTitle: "Projekte", pageSub: "Mobile Apps, Vereins-Tools und selbst gehostete Infrastruktur. Jeder Eintrag zeigt, was es macht, warum es entstand und worauf es läuft." },
    about: { title: "Über mich", p1: "Ich absolviere meine Lehre als Applikationsentwicklerin und besuche parallel die Berufsmaturitätsschule (BMS-W). Mein Fokus liegt auf sauberen, skalierbaren und gut strukturierten Webanwendungen, die technisch solide und angenehm zu bedienen sind.", p2: "Ich arbeite über den ganzen Stack und mag genau den Teil, den viele überspringen: gute Benennungen, verständliche Architektur und Code, der auch in sechs Monaten noch Sinn ergibt.", valuesTitle: "Worauf ich achte", pathTitle: "Weg", cv: "CV anfragen" },
    stack: { title: "Stack", sub: "Werkzeuge, die ich regelmässig einsetze — nach Projektbereich gruppiert." },
    karate: { eyebrow: "Neben dem Bildschirm", title: "Karate — Disziplin, die übertragbar ist.", blurb: "Ich trainiere und helfe bei der Organisation im Kaisho Karate Bassersdorf und unterrichte inzwischen auch Kinder. Dieselben Gewohnheiten gelten für Code: Wiederholung, Präzision und Dranbleiben, auch wenn es unbequem ist.", milestones: "Meilensteine" },
    contact: { title: "Kontakt", blurb: "Offen für Anschlusslösungen nach der Lehre, Junior-Stellen und kleine Freelance-Projekte. Am schnellsten per E-Mail.", name: "Name", namePh: "Vor- und Nachname", email: "E-Mail", emailPh: "du@beispiel.ch", message: "Nachricht", messagePh: "An was arbeitest du?", send: "Nachricht senden", note: "Antwort in der Regel innert zwei Tagen." },
    cta: { title: "Bauen wir etwas, das bleibt.", blurb: "Auf der Suche nach einer Entwicklerin, der Struktur so wichtig ist wie die Oberfläche? Ich freue mich auf deine Nachricht.", button: "Kontaktieren" },
    imprint: { title: "Impressum" },
    footer: { tag: "Begeistert von Software und neuen Technologien.", imprint: "Impressum", made: "Gemacht in Zürich, Schweiz" },
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
      { k: "Unterricht", title: "Kindertraining", text: "Seit 2025 gebe ich mein Wissen an die nächste Generation weiter — die beste Schule im Erklären." },
      { k: "Wettkampf", title: "Kata & Turniere", text: "Regionale und kantonale Turniere — 2. Platz Kata Friendship Tournament, 3. Platz Kanton Zürich." }
    ],
    karateTimeline: [
      { when: "2025", what: "Kindertraining", note: "Begonnen, Kinder zu trainieren und meine Begeisterung weiterzugeben." },
      { when: "November 2024", what: "Wettkampferfolg", note: "2. Platz im Kata Friendship Tournament." },
      { when: "Juli 2024", what: "Zürcher Kantonalmeisterschaften", note: "3. Platz am Regionalturnier, Kanton Zürich." },
      { when: "2024", what: "Violetter Gürtel", note: "Fortgeschrittene Technik und Ausdauer." },
      { when: "2023", what: "Halb violetter Gürtel", note: "Ein wichtiger Schritt auf dem Weg." }
    ],
    links: [
      { k: "E-Mail", v: "selimo.contact@gmail.com", href: "mailto:selimo.contact@gmail.com" },
      { k: "GitHub", v: "Selimo100", href: "https://github.com/Selimo100" },
      { k: "LinkedIn", v: "selina-mogicato", href: "https://www.linkedin.com/in/selina-mogicato-a48166316" }
    ],
    imprintBlocks: [
      { k: "Verantwortlich", v: "Selina Mogicato\nZürich, Schweiz" },
      { k: "Kontakt", v: "selimo.contact@gmail.com" },
      { k: "Zweck", v: "Persönliche Portfolio-Website. Die Inhalte dienen ausschliesslich der Information." },
      { k: "Haftung", v: "Trotz sorgfältiger Prüfung wird keine Haftung für Richtigkeit und Vollständigkeit der Inhalte oder für Inhalte verlinkter externer Seiten übernommen." },
      { k: "Urheberrecht", v: "Alle Texte, Bilder und Projektmaterialien © 2026 Selina Mogicato, sofern nicht anders angegeben." }
    ]
  },
  it: {
    nav: { home: "Home", work: "Progetti", about: "Chi sono", stack: "Stack", karate: "Karate", contact: "Contatto" },
    hero: { hi: "Ciao, sono", eyebrow: "Sviluppatrice di applicazioni in formazione · Zurigo", role: "Sviluppatrice di applicazioni in formazione", open: "Disponibile per ruoli junior dal 2027", claim: "Software strutturato, costruito con cura.", blurb: "Progetto e realizzo prodotti web e mobile moderni — da frontend puliti e ragionati a backend solidi. Attualmente completo il mio apprendistato come sviluppatrice di applicazioni insieme alla maturità professionale (BMS-W).", cta: "Vedi i progetti", cta2: "Contattami", cta3: "Chi sono" },
    work: { title: "Progetti selezionati", sub: "Sei progetti, da un'app iOS nativa alla mia infrastruttura autogestita.", all: "Tutti i progetti", pageTitle: "Progetti", pageSub: "App mobile, strumenti per il club e infrastruttura autogestita. Ogni voce spiega cosa fa, perché l'ho creata e su cosa gira." },
    about: { title: "Chi sono", p1: "Sto completando l'apprendistato come sviluppatrice di applicazioni, frequentando in parallelo la scuola di maturità professionale (BMS-W). Mi concentro su applicazioni web pulite, scalabili e ben strutturate, solide tecnicamente e piacevoli da usare.", p2: "Lavoro su tutto lo stack e mi piace proprio la parte che molti saltano: dare buoni nomi, mantenere l'architettura leggibile e scrivere codice che avrà senso anche fra sei mesi.", valuesTitle: "Cosa mi importa", pathTitle: "Percorso", cv: "Richiedi il CV" },
    stack: { title: "Stack", sub: "Strumenti che uso regolarmente, raggruppati per ambito di progetto." },
    karate: { eyebrow: "Oltre lo schermo", title: "Karate — disciplina che si trasferisce.", blurb: "Mi alleno e aiuto nell'organizzazione al Kaisho Karate Bassersdorf, e ora insegno anche ai bambini. Le stesse abitudini valgono per il codice: ripetizione, precisione e costanza anche quando non è comodo.", milestones: "Tappe" },
    contact: { title: "Contatto", blurb: "Disponibile per opportunità dopo l'apprendistato, ruoli junior e piccoli progetti freelance. La via più rapida è l'email.", name: "Nome", namePh: "Nome e cognome", email: "Email", emailPh: "tu@esempio.ch", message: "Messaggio", messagePh: "A cosa stai lavorando?", send: "Invia messaggio", note: "Rispondo di solito entro due giorni." },
    cta: { title: "Costruiamo qualcosa che duri.", blurb: "Cerchi una sviluppatrice attenta alla struttura tanto quanto alla superficie? Mi farebbe piacere sentirti.", button: "Scrivimi" },
    imprint: { title: "Note legali" },
    footer: { tag: "Appassionata di software e nuove tecnologie.", imprint: "Note legali", made: "Fatto a Zurigo, Svizzera" },
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
      { k: "Insegnamento", title: "Allenare i bambini", text: "Dal 2025 trasmetto ciò che ho imparato alla generazione successiva: la miglior scuola per spiegare bene." },
      { k: "Gare", title: "Kata e tornei", text: "Tornei regionali e cantonali — 2° posto Kata Friendship Tournament, 3° posto Canton Zurigo." }
    ],
    karateTimeline: [
      { when: "2025", what: "Allenare i bambini", note: "Ho iniziato ad allenare bambini, condividendo passione e conoscenza." },
      { when: "Novembre 2024", what: "Successo in gara", note: "2° posto al Kata Friendship Tournament." },
      { when: "Luglio 2024", what: "Campionati cantonali di Zurigo", note: "3° posto al torneo regionale, Canton Zurigo." },
      { when: "2024", what: "Cintura viola", note: "Padronanza tecnica avanzata e dedizione." },
      { when: "2023", what: "Mezza cintura viola", note: "Un passo importante nel percorso." }
    ],
    links: [
      { k: "Email", v: "selimo.contact@gmail.com", href: "mailto:selimo.contact@gmail.com" },
      { k: "GitHub", v: "Selimo100", href: "https://github.com/Selimo100" },
      { k: "LinkedIn", v: "selina-mogicato", href: "https://www.linkedin.com/in/selina-mogicato-a48166316" }
    ],
    imprintBlocks: [
      { k: "Responsabile", v: "Selina Mogicato\nZurigo, Svizzera" },
      { k: "Contatto", v: "selimo.contact@gmail.com" },
      { k: "Scopo", v: "Sito portfolio personale. I contenuti hanno finalità puramente informative." },
      { k: "Responsabilità", v: "Nonostante la verifica accurata, non si assume responsabilità per l'esattezza o la completezza dei contenuti, né per i contenuti dei siti esterni collegati." },
      { k: "Copyright", v: "Tutti i testi, le immagini e i materiali di progetto © 2026 Selina Mogicato, salvo diversa indicazione." }
    ]
  }
};

const MOMO_Q = {
  en: ["What projects has Selina built?", "Which technologies does she use?", "Tell me about her apprenticeship."],
  de: ["Welche Projekte hat Selina gebaut?", "Welche Technologien nutzt sie?", "Erzähl mir von ihrer Lehre."],
  it: ["Quali progetti ha realizzato Selina?", "Quali tecnologie usa?", "Parlami del suo apprendistato."]
};

const PROJECTS: Project[] = [
  { id: "momento", url: "https://momento.mogicato.ch", name: "Momento App", cat: "personal", shot: "momento_app_card.png", tags: ["Swift", "SwiftUI", "Apple Photos"],
    period: { en: "Jun 2026 – present", de: "Juni 2026 – heute", it: "Giu 2026 – oggi" },
    desc: { en: "A local-first iOS app for turning photo sets into personal moments — adding the story, picking the best shots and exporting albums straight to Apple Photos.", de: "Eine local-first iOS-App, die Fotosets in persönliche Momente verwandelt — Geschichte ergänzen, beste Aufnahmen wählen, Album direkt nach Apple Fotos exportieren.", it: "Un'app iOS local-first che trasforma set di foto in momenti personali — aggiungi la storia, scegli le foto migliori, esporta album in Apple Foto." } },
  { id: "homelab", name: "HomeLab", cat: "personal", shot: "homelab_card.png", tags: ["Linux", "Docker", "Nginx"],
    period: { en: "Feb 2026 – present", de: "Feb 2026 – heute", it: "Feb 2026 – oggi" },
    desc: { en: "A self-built homelab on a 2012 MacBook Pro: containers, reverse proxying and monitoring on real hardware, hosting my own projects.", de: "Ein selbst gebautes Homelab auf einem MacBook Pro von 2012: Container, Reverse Proxy und Monitoring auf echter Hardware — hostet meine eigenen Projekte.", it: "Un homelab autocostruito su un MacBook Pro del 2012: container, reverse proxy e monitoraggio su hardware reale, ospita i miei progetti." } },
  { id: "yumigo", url: "https://yumigoapp.netlify.app/", name: "Yumigo App", cat: "personal", shot: "yumigo_app_card.png", tags: ["React Native", "Expo", "Firebase"],
    period: { en: "Jul 2025 – present", de: "Juli 2025 – heute", it: "Lug 2025 – oggi" },
    desc: { en: "Turns spontaneous food cravings into recipe suggestions, with seasonality and locality as first-class filters. Built during the BBC Basislehrjahr.", de: "Verwandelt spontane Gelüste in Rezeptvorschläge, mit Saison und Region als zentrale Filter. Entstanden im BBC Basislehrjahr.", it: "Trasforma le voglie improvvise in proposte di ricette, con stagionalità e provenienza come filtri principali. Creata durante il BBC Basislehrjahr." } },
  { id: "work", url: "https://selina.sunrise-avengers.ch", name: "Work Portfolio", cat: "professional", shot: "work_portfolio_card.png", tags: ["React", "Tailwind", "Vite"],
    period: { en: "2025", de: "2025", it: "2025" },
    desc: { en: "A dedicated portfolio for my professional environment, showing projects, achievements and technical growth within the apprenticeship.", de: "Ein eigenes Portfolio für mein berufliches Umfeld: Projekte, Erfolge und technische Entwicklung während der Lehre.", it: "Un portfolio dedicato al mio ambiente professionale: progetti, risultati e crescita tecnica durante l'apprendistato." } },
  { id: "kaisho", name: "Kaisho DojoTime", cat: "personal", shot: "kaisho_dojotime_card.png", tags: ["TypeScript", "Supabase", "React"],
    period: { en: "2025", de: "2025", it: "2025" },
    desc: { en: "An organisation tool for my karate club: training schedules, trainer assignments and club events in one place.", de: "Ein Organisationstool für meinen Karateverein: Trainingsplan, Trainerzuteilung und Vereinsanlässe an einem Ort.", it: "Uno strumento organizzativo per il mio club di karate: orari, assegnazione allenatori ed eventi in un unico posto." } },
  { id: "rummy", name: "Rummy Website", cat: "personal", shot: "rummy_card.png", tags: ["PHP", "SQL", "Bootstrap"],
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

const LANGS = [{ code: "EN", key: "en", name: "English" }, { code: "DE", key: "de", name: "Deutsch" }, { code: "IT", key: "it", name: "Italiano" }];

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
export const MUSIC_COPY: Record<Lang, { label: string; sub: string; intro: string }> = MUSIC;
export { PROJECTS, STACK, LANGS as LANG_OPTIONS, TRACKS as FALLBACK_TRACKS };
