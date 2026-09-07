import { ProposalData } from './types';

export const defaultData: ProposalData = {
  company: {
    name: 'ARKITEKTURA STUDIO',
    address: 'Rruga e Dritës, Nd. 12, Tiranë, Shqipëri',
    email: 'info@arkitektura.al',
    phone: '+355 69 123 4567'
  },
  client: {
    name: 'Agim Krasniqi',
    projectTitle: 'Vila Rezidenciale "Bregdeti"',
    location: 'Palasë, Vlorë',
    area: 350
  },
  date: new Date().toLocaleDateString('sq-AL', { day: '2-digit', month: '2-digit', year: 'numeric' }),
  offerNumber: 'O-2026-042',
  introText: 'Faleminderit për mundësinë e bashkëpunimit. Më poshtë gjeni propozimin tonë financiar dhe teknik për realizimin e projektit tuaj. Ne jemi të përkushtuar të ofrojmë cilësi maksimale në çdo detaj të projektimit.',
  taxRate: 20,
  terms: `1. KUSHTET E PAGESËS
- 30% avans në momentin e nënshkrimit të kontratës.
- 40% pas dorëzimit të projektit ideor.
- 30% pas dorëzimit të projektit të zbatimit.

2. AFATET E REALIZIMIT
- Projekti Ideor: 4 javë pas aprovimit të detyrës së projektimit.
- Projekti i Zbatimit: 6 javë pas aprovimit të projektit ideor.

3. TË DREJTAT E AUTORIT
Të gjitha të drejtat e autorit mbi projektin i takojnë studios projektuese deri në shlyerjen e plotë të pagesave nga ana e porositësit.

4. VLEFSHMËRIA E OFERTËS
Kjo ofertë është e vlefshme për 30 ditë nga data e lëshimit.`,
  processes: [
    { id: 'proc1', number: '01', title: 'Analiza fillestare dhe kushtet urbanistike', duration: '', description: 'Procesi fillon me kontrollin e parcelës, pronësisë, planit urbanistik dhe parametrave të lejuar për ndërtim. Në këtë fazë përcaktohet çfarë mund të ndërtohet, sa mund të ndërtohet, pozicionimi i objektit, lartësia, katet, destinimi dhe kufizimet kryesore. Qëllimi është të verifikohet nëse kërkesat e investitorit mund të realizohen ligjërisht dhe teknikisht.' },
    { id: 'proc2', number: '02', title: 'Projekti ideor / konceptual', duration: '2 – 4 jave', description: 'Në bazë të kërkesave të investitorit dhe kushteve urbanistike zhvillohet zgjidhja arkitektonike. Përgatiten organizimi funksional, pozicionimi në parcelë, planet, volumetria, fasadat, sipërfaqet dhe pamja e përgjithshme e objektit. Sipas ofertës mund të përfshihen edhe vizualizime 3D. Kjo fazë përfundon me miratimin e konceptit nga investitori.' },
    { id: 'proc3', number: '03', title: 'Projekti bazë / kryesor', duration: '2 – 4 jave', description: 'Pas miratimit të konceptit përgatitet dokumentacioni teknik i nevojshëm për ndërtim dhe për procedurën e lejes. Projekti arkitektonik koordinohet me konstruksionin, instalimet elektrike, ujësjellësin dhe kanalizimin, mekanikën, efikasitetin energjetik dhe fazat e tjera që kërkohen për objektin. Dorëzohen planet, prerjet, fasadat, situacioni, detajet, tabelat e sipërfaqeve dhe dokumentacioni teknik përkatës.' },
    { id: 'proc4', number: '04', title: 'Procedura për lejen e ndërtimit', duration: '1 – 2 muaj', description: 'Projektuesi përgatit dhe koordinon dokumentacionin që është në kompetencën e tij për aplikimin për leje ndërtimi. Në procedurë mund të kërkohen edhe dokumente nga investitori, gjeodeti, revidenti, ndërmarrjet publike dhe institucionet kompetente. Lejen e ndërtimit e lëshon organi kompetent dhe jo projektuesi.' },
    { id: 'proc5', number: '05', title: 'Dizajni i interierit', duration: '1 – 2 muaj', description: 'Shërbimi i dizajnit të interierit përfshin organizimin e ambienteve, konceptin estetik, materialet, dyshemetë, tavanet, ndriçimin, mobilimin, kuzhinat, banjot dhe elementet e punuara me porosi. Dorëzohen plane të mobilimit, plane të dyshemeve dhe tavaneve, ndriçimi, zhvillimet e mureve, detaje të mobilieve, specifikime të materialeve dhe pajisjeve, si dhe vizualizime 3D sipas marrëveshjes.' },
    { id: 'proc6', number: '06', title: 'Kalkulimi i kostos së ndërtimit', duration: '1 jave', description: `Para realizimit mund të përgatitet paramasa dhe parallogaria e objektit me sasitë dhe kostot orientuese të punimeve. Kalkulimi mund të përfshijë materialet, fuqinë punëtore, instalimet, punimet e interierit, mjeshtrit, furnitorët dhe rezervën për shpenzime të paparashikuara. Kur merren oferta nga kontraktorë dhe furnitorë, ato mund të krahasohen teknikisht dhe financiarisht për t'i dhënë investitorit një pasqyrë më të qartë të kostos reale të realizimit.\nKy kalkulim është vlerësim profesional i kostos dhe çmimet reale mund të ndryshojnë sipas tregut, ofertave të kontraktorëve dhe zgjedhjeve finale të investitorit.\nVendimin përfundimtar për përzgjedhjen e kontraktorit ose furnitorit e merr investitori.` },
    { id: 'proc7', number: '07', title: 'Mbikëqyrja projektuese gjatë ndërtimit', duration: '1 – 2 muaj', description: `Gjatë realizimit arkitekti mund të ofrojë mbikëqyrje projektuese me vizita në objekt, sqarime të projektit, kontroll të zgjidhjeve arkitektonike, detaje plotësuese dhe koordinim të ndryshimeve që paraqiten gjatë punimeve. Ndryshimet që ndikojnë në projektin e miratuar duhet të kontrollohen dhe, kur kërkohet, të trajtohen përmes procedurës përkatëse ligjore.\nPor arkitekti projektues nuk zëvendëson realizuesin, inxhinierin e ndërtimit apo mbikëqyrësin ligjor .` },
    { id: 'proc8', number: '08', title: 'Mbikëqyrja e interierit', duration: '6 – 12 muaj', description: `Gjatë realizimit të interierit arkitekti kontrollon që materialet, dimensionet, mobiliet, ndriçimi dhe detajet të realizohen në përputhje me projektin e miratuar. Sipas nevojës jepen sqarime për mjeshtrit, kontrollohen mostrat dhe përgatiten detaje ose korrigjime shtesë.\nKjo është mbikëqyrje projektuese, dhe nuk duhet të ngatërrohet me mbikëqyrjen ligjore të ndërtimit.` },
    { id: 'proc9', number: '09', title: 'Përfundimi dhe dokumentimi i objektit', duration: '2 – 4 jave', description: `Pas përfundimit të punimeve duhet të kompletohet dokumentacioni i objektit të realizuar. Sipas rastit kjo përfshin projektin e gjendjes së realizuar, dokumentacionin e realizuesit dhe mbikëqyrësit, certifikatat dhe garancitë, dokumentacionin e instalimeve, elaboratin gjeodezik, dokumentet për kontrollin teknik dhe procedurat e nevojshme për përdorim dhe regjistrim të objektit në Katastër.\nRegjistrimi i objektit në Katastër nuk eshte detyrim I Projektuesit` }
  ],
  competencies: {
    intro: 'Arkitekti projektues është përgjegjës për projektimin, dokumentacionin që përgatit dhe nënshkruan, koordinimin projektues të disiplinave, sqarimet teknike, dizajnin e interierit dhe shërbimet shtesë që janë kontraktuar. Projektuesi nuk merr automatikisht përgjegjësinë e realizuesit, mbikëqyrësit ligjor, gjeodetit, furnitorëve apo institucioneve publike dhe nuk përgjigjet për ndryshime të realizuara pa miratimin e tij.\n\nQëllimi i shërbimit është që investitori të ketë një proces të qartë nga analiza e parcelës dhe ideja fillestare, përmes projektimit, lejes, ndërtimit dhe interierit, deri te dokumentimi dhe kompletimi përfundimtar i objektit.',
    responsible: [
      'analizën dhe projektimin',
      'zgjidhjen arkitektonike',
      'dokumentacionin që përgatit dhe nënshkruan',
      'koordinimin projektues të disiplinave',
      'dizajnin e interierit kur është kontraktuar',
      'specifikimin e materialeve dhe elementeve',
      'sqarimet dhe detajet gjatë realizimit',
      'kontrollin projektues të realizimit',
      'vlerësimin dhe kalkulimin e kostos kur është kontraktuar'
    ],
    notResponsible: [
      'cilësinë e punës së kontraktorëve',
      'sigurinë dhe organizimin e kantierit',
      'detyrimet ligjore të mbikëqyrësit',
      'gabimet e realizuesve dhe furnitorëve',
      'ndryshimet e bëra pa aprovimin e projektuesit',
      'çmimet që ndryshojnë nga furnitorët ose tregu',
      'afatet dhe vendimet e institucioneve',
      'regjistrimin përfundimtar të objektit nga autoritetet'
    ]
  },
  phases: [
    {
      id: 'p1',
      title: 'Faza 1: Projekti Ideor & Koncepti',
      description: 'Zhvillimi i konceptit arkitektonik, planimetritë e shpërndarjes, vizualizimet 3D dhe aprovimi i dizajnit preliminar.',
      items: [
        { id: 'i1', description: 'Analiza e sitit & Detyra e projektimit', quantity: 1, unit: 'copë', unitPrice: 500 },
        { id: 'i2', description: 'Dizajni Konceptual & Planimetritë', quantity: 350, unit: 'm²', unitPrice: 15 },
        { id: 'i3', description: 'Vizualizime 3D (Renders)', quantity: 4, unit: 'imazhe', unitPrice: 250 }
      ]
    },
    {
      id: 'p2',
      title: 'Faza 2: Projekti i Zbatimit',
      description: 'Përgatitja e vizatimeve teknike të detajuara të nevojshme për lejen e ndërtimit dhe zbatimin në kantier.',
      items: [
        { id: 'i4', description: 'Projekti Arkitektonik i Detajuar', quantity: 350, unit: 'm²', unitPrice: 25 },
        { id: 'i5', description: 'Projekti Konstruktiv', quantity: 350, unit: 'm²', unitPrice: 10 },
        { id: 'i6', description: 'Projektet e Instalimeve (Elektrike, Hidraulike, HVAC)', quantity: 350, unit: 'm²', unitPrice: 12 }
      ]
    }
  ]
};
