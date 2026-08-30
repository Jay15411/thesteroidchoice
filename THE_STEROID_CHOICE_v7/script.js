const scenarios = [
  // 0-5: common opening
  {
    id:"s1", tag:"SOCIALE MEDIA", title:"Instagram laat een ideaalbeeld zien.",
    body:`<p>Je scrolt door Instagram en ziet een fictieve 12-weken-transformatie.</p>`,
    visual:"instagram",
    choices:[
      {text:"Iedereen kan dit bereiken als je hard genoeg traint.",delta:{performance:2,selfimage:-4,pressure:7},feedback:"Je neemt het online beeld grotendeels over. De sociale druk stijgt."},
      {text:"Dit resultaat is waarschijnlijk niet het hele verhaal.",delta:{selfimage:2,pressure:-2},feedback:"Je kijkt kritisch naar de boodschap en vergelijkt jezelf minder."},
      {text:"Waarom lukt mij dit niet?",delta:{performance:1,selfimage:-10,pressure:11},feedback:"Vergelijking met anderen vergroot in dit model de onzekerheid en sociale druk."}
    ]
  },
  {
    id:"s2", tag:"PRESTATIEDRUK", title:"Je progressie begint te stagneren.",
    body:`<p>Je traint al maanden hard, maar je kracht en spiermassa nemen nauwelijks meer toe.</p><p>Een vriend zegt: <strong>“Je moet gewoon iets sterkers gaan gebruiken.”</strong></p>`,
    choices:[
      {text:"Ik pas mijn training en voeding aan.",delta:{performance:3,pressure:-3},feedback:"Je kiest voor een route binnen training en leefstijl."},
      {text:"Ik zoek betrouwbare informatie over steroïden.",delta:{selfimage:2,health:2,pressure:-5},feedback:"Je kiest eerst voor informatie en maakt de afweging bewuster."},
      {text:"Ik begin serieus na te denken over steroïden.",delta:{performance:4,health:-7,pressure:8},feedback:"De mogelijke prestatiewinst trekt je aan, maar de risicoscore neemt toe."}
    ]
  },
  {
    id:"s3", tag:"SOCIALE INVLOED", title:"Je trainingsmaatje maakt enorme progressie.",
    body:`<p>Je trainingsmaatje maakt opvallend snel progressie. Je merkt dat je jezelf steeds vaker met hem vergelijkt.</p>`,
    visual:"person",
    choices:[
      {text:"Ik vergelijk mezelf met hem.",delta:{performance:2,selfimage:-7,pressure:9},feedback:"Vergelijking kan de ervaren druk versterken."},
      {text:"Ik blijf mijn eigen vooruitgang volgen.",delta:{performance:1,selfimage:4,pressure:-4},feedback:"Je houdt de focus bij je eigen doelen."},
      {text:"Ik vraag me af of ik ook steroïden moet gebruiken.",delta:{performance:3,selfimage:-5,pressure:10,health:-5},feedback:"De sociale invloed wordt sterker en de gezondheidswaarde daalt."}
    ]
  },
  {
    id:"s4", tag:"MEDIAKRITIEK", title:"Een influencer presenteert een perfecte transformatie.",
    body:`<div class="social-post">“Ik gebruik alleen discipline en hard werken. Geen excuses.”<br><small>Gesponsorde fitnesscontent</small></div><p>Je moet beoordelen hoe betrouwbaar deze boodschap is.</p>`,
    choices:[
      {text:"Heel betrouwbaar.",delta:{pressure:6,selfimage:-4},feedback:"Je neemt de boodschap zonder extra controle over."},
      {text:"Ik weet het niet.",delta:{pressure:1},feedback:"Je houdt de mogelijkheid open dat je informatie mist."},
      {text:"Ik wil de bron en context controleren.",delta:{selfimage:3,pressure:-4},feedback:"Je kiest voor bronkritiek."}
    ]
  },
  {
    id:"s5", tag:"VRIENDEN", title:"Je vriendengroep maakt er grappen over.",
    body:`<p>In de sportschool zegt iemand: <strong>“Als je echt serieus bent, doe je dit gewoon.”</strong> De anderen lachen.</p><p>Je merkt dat je niet buiten de groep wilt vallen.</p>`,
    choices:[
      {text:"Ik lach mee en zeg niets.",delta:{pressure:7,selfimage:-2},feedback:"De groepsdruk blijft bestaan."},
      {text:"Ik zeg dat ik eerst zelf wil bepalen wat goed voor mij is.",delta:{selfimage:4,pressure:-6},feedback:"Je stelt je eigen afweging centraal."},
      {text:"Ik wil bewijzen dat ik net zo serieus ben.",delta:{performance:2,pressure:9,selfimage:-5},feedback:"De behoefte om jezelf te bewijzen vergroot de druk."}
    ]
  },
  {
    id:"s6", tag:"HET KANTELPUNT", title:"Je staat voor de grote keuze.",
    body:`<p>Je hebt inmiddels veel informatie gelezen. Je weet dat steroïden spiergroei en prestaties kunnen bevorderen, maar dat er ook lichamelijke en mentale risico’s zijn.</p><p><strong>Wat doe je?</strong></p>`,
    choices:[
      {text:"Ik gebruik geen steroïden en blijf natuurlijk trainen.",delta:{health:2,selfimage:3,pressure:-3},feedback:"Je kiest voor de route met minder extra gezondheidsrisico in dit model.",path:"natural"},
      {text:"Ik blijf twijfelen en zoek nog meer informatie.",delta:{pressure:2,selfimage:-1},feedback:"Je stelt de beslissing uit en houdt meerdere mogelijkheden open.",path:"considering"},
      {text:"Ik kies ervoor het risico te nemen en steroïden te gebruiken.",delta:{performance:8,health:-14,pressure:8,consequences:7},feedback:"De prestatiewinst stijgt duidelijk, maar ook de gezondheids- en consequentiescore.",path:"using"}
    ]
  },

  // NATURAL ROUTE: 4 questions
  {
    id:"n1", route:"natural", tag:"NATUURLIJKE PROGRESSIE", title:"Je kiest voor natuurlijke progressie.",
    body:`<p>Je hebt besloten geen steroïden te gebruiken. Je zoekt naar andere manieren om vooruitgang te boeken.</p><p>Je ontdekt dat je trainingsschema, herstel en voeding beter op elkaar kunnen aansluiten.</p>`,
    choices:[
      {text:"Ik maak mijn training structureler.",delta:{performance:4,selfimage:2},feedback:"Je richt je op haalbare progressie en consistentie."},
      {text:"Ik focus vooral op sneller resultaat.",delta:{performance:2,pressure:4,selfimage:-2},feedback:"De prestatiedruk blijft aanwezig, ook zonder steroïden."},
      {text:"Ik geef mezelf meer tijd.",delta:{selfimage:5,pressure:-5},feedback:"Je verlaagt de druk en accepteert dat progressie tijd kost."}
    ]
  },
  {
    id:"n2", route:"natural", tag:"NATUURLIJKE PROGRESSIE", title:"Een maand later zie je kleine resultaten.",
    body:`<p>De verandering is niet spectaculair, maar je merkt dat je sterker en consistenter wordt.</p><p>Op sociale media lijken anderen nog steeds veel sneller vooruit te gaan.</p>`,
    choices:[
      {text:"Ik blijf mijn eigen voortgang meten.",delta:{performance:3,selfimage:4,pressure:-3},feedback:"Je vergelijkt jezelf minder met anderen."},
      {text:"Ik raak gefrustreerd door wat ik online zie.",delta:{selfimage:-5,pressure:7},feedback:"Online vergelijking brengt de sociale druk weer omhoog."},
      {text:"Ik zoek betrouwbare informatie over natuurlijke spiergroei.",delta:{selfimage:3,pressure:-4},feedback:"Je kiest opnieuw voor informatie in plaats van snelle oplossingen."}
    ]
  },
  {
    id:"n3", route:"natural", tag:"NATUURLIJKE PROGRESSIE", title:"Een nieuwe verleiding.",
    body:`<p>Een andere sporter zegt: <strong>“Je hoeft alleen maar een klein zetje te nemen. Daarna stop je gewoon.”</strong></p><p>Je weet inmiddels dat het niet zo eenvoudig is.</p>`,
    choices:[
      {text:"Ik wijs het aanbod af.",delta:{health:3,selfimage:4,pressure:-5},feedback:"Je blijft bij de keuze die je eerder hebt gemaakt."},
      {text:"Ik word opnieuw nieuwsgierig.",delta:{pressure:7,selfimage:-3},feedback:"Nieuwsgierigheid en sociale druk nemen toe."},
      {text:"Ik vraag waarom hij dat denkt.",delta:{selfimage:2,pressure:-2},feedback:"Je onderzoekt de overtuiging achter het advies."}
    ]
  },
  {
    id:"n4", route:"natural", tag:"NATUURLIJKE PROGRESSIE", title:"Je ontdekt wat realistische progressie betekent.",
    body:`<p>Je merkt dat vooruitgang niet altijd spectaculair of snel zichtbaar is. Toch kun je sterker worden en tevreden zijn met je ontwikkeling.</p><p><strong>Welke gedachte past het best bij jou?</strong></p>`,
    choices:[
      {text:"Ik wil mijn eigen vooruitgang blijven volgen.",delta:{selfimage:5,pressure:-5,performance:2},feedback:"Je kiest voor een realistische maatstaf: je eigen ontwikkeling."},
      {text:"Ik blijf mezelf vergelijken met snelle transformaties.",delta:{selfimage:-7,pressure:8},feedback:"De online vergelijking blijft invloed houden op je zelfbeeld."},
      {text:"Ik accepteer dat goede resultaten tijd kosten.",delta:{selfimage:6,pressure:-6},feedback:"Je verlaagt de druk door verwachtingen realistischer te maken."}
    ]
  },

  // CONSIDERING ROUTE: 4 questions
  {
    id:"c1", route:"considering", tag:"AFWEGING", title:"Je zoekt antwoorden voordat je beslist.",
    body:`<p>Je hebt nog geen definitieve keuze gemaakt. Je merkt dat online informatie elkaar soms tegenspreekt.</p><p>Je besluit je afweging op verschillende soorten bronnen te baseren.</p>`,
    choices:[
      {text:"Ik vergelijk meerdere betrouwbare bronnen.",delta:{selfimage:4,pressure:-4},feedback:"Je maakt je keuze informatiever."},
      {text:"Ik luister vooral naar mensen uit mijn sportschool.",delta:{pressure:6,selfimage:-2},feedback:"Je omgeving krijgt veel invloed op je afweging."},
      {text:"Ik zoek vooral succesverhalen.",delta:{pressure:5,performance:2},feedback:"Je ziet vooral de aantrekkelijke kant van de keuze."}
    ]
  },
  {
    id:"c2", route:"considering", tag:"AFWEGING", title:"Je ziet zowel voordelen als risico’s.",
    body:`<p>Je merkt dat de discussie ingewikkelder is dan één simpele voor- of tegenstelling. Er zijn mogelijke prestatiewinsten, maar ook lichamelijke, mentale en maatschappelijke risico’s.</p>`,
    choices:[
      {text:"Ik maak voor mezelf een lijst met voor- en nadelen.",delta:{selfimage:4,pressure:-3},feedback:"Je maakt de afweging expliciet."},
      {text:"Ik denk vooral aan hoe snel ik resultaat kan krijgen.",delta:{performance:3,pressure:5},feedback:"De korte termijn krijgt meer gewicht."},
      {text:"Ik praat met iemand die kritisch naar gezondheid kijkt.",delta:{health:3,selfimage:3,pressure:-4},feedback:"Je neemt gezondheid nadrukkelijk mee."}
    ]
  },
  {
    id:"c3", route:"considering", tag:"AFWEGING", title:"Je stelt je eigen grens vast.",
    body:`<p>Na het vergelijken van informatie merk je dat je vooral wilt weten welke grens voor jou belangrijk is.</p><p>Je hoeft niet alleen te kiezen tussen “voor” of “tegen”; je kunt ook bepalen welke informatie je nodig hebt om bewust te beslissen.</p>`,
    choices:[
      {text:"Ik neem mijn gezondheid als belangrijkste uitgangspunt.",delta:{health:3,selfimage:3,pressure:-4},feedback:"Je maakt gezondheid een duidelijk onderdeel van je eigen grens."},
      {text:"Ik laat vooral mijn sportieve doel bepalen wat ik doe.",delta:{performance:3,pressure:5},feedback:"Je sportieve doel krijgt in je afweging meer gewicht."},
      {text:"Ik wil eerst nog met een betrouwbare deskundige praten.",delta:{selfimage:4,pressure:-3},feedback:"Je zoekt extra context voordat je een definitieve keuze maakt."}
    ]
  },
  {
    id:"c4", route:"considering", tag:"AFWEGING", title:"Je maakt een bewuste tussenbalans.",
    body:`<p>Je hebt nog steeds geen steroïden gebruikt. Je merkt dat het verlangen naar snelle verandering er kan zijn, maar dat je nu beter ziet welke informatie je nodig hebt.</p><p><strong>Wat doe je met die twijfel?</strong></p>`,
    choices:[
      {text:"Ik kies ervoor het niet te doen.",delta:{health:4,selfimage:4,pressure:-5},feedback:"Je kiest voor de route met minder extra gezondheidsrisico." ,path:"natural"},
      {text:"Ik wil nog langer informatie verzamelen.",delta:{selfimage:3,pressure:-2},feedback:"Je blijft bewust in de afweging zonder direct te kiezen." ,path:"considering"},
      {text:"Ik besluit het toch te proberen.",delta:{performance:7,health:-12,pressure:7,consequences:6},feedback:"Je stapt in het gebruikspad. Vanaf hier veranderen je vervolgsituaties.",path:"using"}
    ]
  },

  // USING ROUTE: 4 questions
  {
    id:"u1", route:"using", tag:"GEBRUIKSPAD", title:"Je merkt snel verschil in prestaties.",
    body:`<p>In het scenario merk je een duidelijke verandering in spiermassa en kracht. Dat is precies het soort effect waar gebruikers naar op zoek kunnen zijn.</p><p>Tegelijkertijd weet je dat zichtbare resultaten niet het hele verhaal vertellen.</p>`,
    choices:[
      {text:"Ik ben vooral blij met de snelle vooruitgang.",delta:{performance:5,health:-3},feedback:"De korte-termijnwinst krijgt veel aandacht."},
      {text:"Ik begin me meer zorgen te maken over mijn gezondheid.",delta:{health:-1,selfimage:3},feedback:"Je kijkt verder dan alleen het uiterlijk."},
      {text:"Ik wil mijn keuze opnieuw beoordelen.",delta:{selfimage:3,pressure:-3},feedback:"Je neemt een moment om stil te staan bij de gevolgen."}
    ]
  },
  {
    id:"u2", route:"using", tag:"GEBRUIKSPAD", title:"Je lichaam reageert ook op de verandering.",
    body:`<div class="social-post">⚙️ BIOLOGISCHE FEEDBACK<br><br>Externe hormoonblootstelling ↑<br>→ negatieve feedback<br>→ eigen testosteronproductie ↓</div><p>Je beseft dat het lichaam een regelsysteem heeft dat reageert op veranderde hormoonniveaus.</p>`,
    choices:[
      {text:"Ik focus op het zichtbare resultaat.",delta:{performance:3,health:-4},feedback:"Je aandacht blijft vooral bij spiergroei en prestaties."},
      {text:"Ik wil begrijpen wat er biologisch gebeurt.",delta:{selfimage:3,health:-1},feedback:"Je verdiept je in de werking van het lichaam."},
      {text:"Ik had niet verwacht dat het lichaam zo sterk reageert.",delta:{health:-7,consequences:3},feedback:"Het gezondheidsrisico krijgt in het model meer gewicht."}
    ]
  },
  {
    id:"u3", route:"using", tag:"GEBRUIKSPAD", title:"Je merkt dat de sociale druk niet verdwijnt.",
    body:`<p>Nu je gespierder bent, krijg je juist meer aandacht. Mensen vragen hoe je zo snel vooruit bent gegaan.</p><p>Je voelt druk om het resultaat vast te houden.</p>`,
    choices:[
      {text:"Ik wil het resultaat koste wat kost behouden.",delta:{performance:3,pressure:8,health:-5},feedback:"De druk om het resultaat te behouden stijgt."},
      {text:"Ik vind het belangrijker om mijn gezondheid mee te nemen.",delta:{health:3,selfimage:3,pressure:-4},feedback:"Je brengt de lange termijn terug in de afweging."},
      {text:"Ik merk dat mijn uiterlijk mijn zelfbeeld bepaalt.",delta:{selfimage:-7,pressure:7},feedback:"Je zelfbeeld raakt sterker verbonden aan uiterlijk."}
    ]
  },
  {
    id:"u4", route:"using", tag:"GEBRUIKSPAD", title:"Je denkt na over wat je keuze betekent.",
    body:`<p>Je beseft dat de keuze niet alleen over spiermassa gaat. Gezondheid, relaties, sport en reputatie kunnen allemaal een rol spelen.</p><p><strong>Waar wil je vanaf nu meer aandacht aan geven?</strong></p>`,
    choices:[
      {text:"Mijn lange termijn en gezondheid.",delta:{health:4,selfimage:4,pressure:-5},feedback:"Je geeft toekomst en gezondheid meer gewicht."},
      {text:"Mijn huidige prestaties.",delta:{performance:3,consequences:4,pressure:4},feedback:"De korte termijn blijft dominant."},
      {text:"Bewuster omgaan met mijn keuzes.",delta:{selfimage:4,pressure:-3},feedback:"Je maakt ruimte voor reflectie en bewustwording."}
    ]
  },

  // COMMON AWARENESS ENDING: 5 questions
  {
    id:"e1", route:"any", tag:"BEWUSTWORDING", title:"Wat zie je nu anders dan aan het begin?",
    body:`<p>Je hebt verschillende kanten van het onderwerp gezien: sociale media, prestatiedruk, lichamelijke gevolgen, zelfbeeld en maatschappelijke gevolgen.</p><p>Welke gedachte neem je het sterkst mee?</p>`,
    choices:[
      {text:"Online resultaten zeggen niet automatisch alles.",delta:{selfimage:4,pressure:-4},feedback:"Je kijkt kritischer naar wat zichtbaar is en wat buiten beeld blijft."},
      {text:"Snelle resultaten blijven voor mij het aantrekkelijkst.",delta:{performance:2,pressure:4},feedback:"De aantrekkingskracht van snelle vooruitgang blijft zichtbaar."},
      {text:"Ik zie beter hoe meerdere factoren elkaar beïnvloeden.",delta:{selfimage:5,pressure:-3},feedback:"Je herkent dat keuzes niet door één factor worden bepaald."}
    ]
  },
  {
    id:"e2", route:"any", tag:"MAATSCHAPPIJ", title:"Hoe groot is de invloed van je omgeving?",
    body:`<p>Je hebt gemerkt dat vrienden, influencers en sportcultuur invloed kunnen hebben op verwachtingen rond spiermassa en prestaties.</p>`,
    choices:[
      {text:"Ik wil mijn eigen oordeel blijven vormen.",delta:{selfimage:4,pressure:-4},feedback:"Je maakt je eigen afweging belangrijker."},
      {text:"De mening van anderen weegt zwaar.",delta:{pressure:7,selfimage:-3},feedback:"Sociale invloed blijft in jouw profiel sterk aanwezig."},
      {text:"Ik wil eerst de bron en context controleren.",delta:{selfimage:4,pressure:-3},feedback:"Je kiest opnieuw voor kritisch denken."}
    ]
  },
  {
    id:"e3", route:"any", tag:"ZELFBEELD", title:"Hoe kijk je nu naar lichaamsidealen?",
    body:`<p>Je ziet opnieuw beelden van zeer gespierde lichamen. Je weet inmiddels dat wat je online ziet niet automatisch een compleet beeld van iemands situatie geeft.</p>`,
    choices:[
      {text:"Ik vergelijk mezelf minder met online beelden.",delta:{selfimage:5,pressure:-5},feedback:"Je vermindert de invloed van sociale vergelijking."},
      {text:"Ik blijf streven naar hetzelfde ideaal.",delta:{performance:3,selfimage:-5,pressure:7},feedback:"Het ideaal blijft veel invloed hebben op je profiel."},
      {text:"Ik probeer het beeld kritisch te bekijken.",delta:{selfimage:4,pressure:-4},feedback:"Je houdt meer afstand van het online ideaal."}
    ]
  },
  {
    id:"e4", route:"any", tag:"AWARENESS", title:"Wat zou je iemand anders meegeven?",
    body:`<p>Stel dat iemand van jouw leeftijd overweegt om steroïden te gebruiken omdat hij of zij zich onzeker voelt over spiermassa of prestaties.</p>`,
    choices:[
      {text:"Neem de tijd en zoek betrouwbare informatie.",delta:{selfimage:4,pressure:-4},feedback:"Je kiest voor een geïnformeerde afweging."},
      {text:"Als het doel belangrijk genoeg is, neem je het risico.",delta:{performance:2,pressure:6,health:-4},feedback:"Je geeft prestatiedoelen relatief veel gewicht."},
      {text:"Praat erover en kijk ook naar de druk achter die wens.",delta:{selfimage:5,pressure:-5},feedback:"Je kijkt naar de sociale en persoonlijke factoren achter de keuze."}
    ]
  },
  {
    id:"e5", route:"any", tag:"EINDREFLECTIE", title:"De laatste vraag is aan jou.",
    body:`<p>Je hebt vijftien situaties doorlopen. Je hebt voordelen, risico’s, sociale invloed en maatschappelijke gevolgen tegen elkaar afgewogen.</p><div class="social-post">WAT WEET JE NU DAT JE AAN HET BEGIN NIET ZAG?</div>`,
    choices:[
      {text:"De voordelen zijn het belangrijkste.",delta:{performance:3},feedback:"Je eindigt met een sterke focus op mogelijke voordelen."},
      {text:"De risico’s zijn het belangrijkste.",delta:{health:-1,selfimage:2},feedback:"Je eindigt met een sterke focus op mogelijke risico’s."},
      {text:"De afweging is complex en hangt van context af.",delta:{selfimage:3,pressure:-2},feedback:"Je benadrukt dat context verschil maakt."}
    ]
  }
];

const state = {
  performance: 50,
  selfimage: 50,
  health: 90,
  pressure: 20,
  consequences: 0,
  current: 0,
  selected: false,
  history: [],
  path: "neutral",
  visited: []
};

const $ = id => document.getElementById(id);
const clamp = (n,min=0,max=100) => Math.max(min,Math.min(max,n));

function showScreen(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  $(id).classList.add("active");
}

function updateStats(){
  const labels = ["performance","selfimage","health","pressure","consequences"];
  labels.forEach(key=>{
    state[key] = clamp(state[key]);
    $(`${key}Value`).textContent = state[key];
    $(`${key}Bar`).style.width = `${state[key]}%`;
  });
}

function renderDots(){
  const total = 15;
  const current = Math.min(Math.max(state.visited.length, 1), total);
  $("progressDots").innerHTML = "";
  for(let i=0;i<total;i++){
    const dot=document.createElement("i");
    if(i < current) dot.className="done";
    $("progressDots").appendChild(dot);
  }
  $("progressText").textContent = `${Math.min(Math.max(state.visited.length, 1), 15)} / 15`;
}

function applyDelta(delta){
  Object.entries(delta).forEach(([key,val])=>{
    if(key in state) state[key] += val;
  });
  updateStats();
}


function renderVisual(){
  const box = $("scenarioVisual");
  box.innerHTML = "";
  box.classList.add("hidden");
  const type = scenarios[state.current].visual;

  if(type === "instagram"){
    box.innerHTML = `
      <div class="instagram-mock">
        <div class="ig-head">
          <div class="ig-avatar"></div>
          <div class="ig-name">fit_transformation</div>
          <div class="ig-sponsored">Gesponsord</div>
        </div>
        <div class="ig-video">
          <div class="play">▶</div>
        </div>
        <div class="ig-caption">
          <strong>12 WEKEN TRANSFORMATIE 🔥</strong>
          + enorm veel spiermassa • #dedication #nofilter
          <div class="ig-stats">♡ 18.4K likes &nbsp; • &nbsp; 642 reacties</div>
        </div>
      </div>`;
    box.classList.remove("hidden");
  } else if(type === "person"){
    box.innerHTML = `
      <div class="portrait-card">
        <div class="portrait-large"></div>
        <div>
          <div class="visual-label">FICTIEVE SPORTER</div>
          <strong>Je trainingsmaatje</strong>
          <div class="visual-copy">Een gestileerde illustratie van een fictief persoon. Geen echte persoon.</div>
        </div>
      </div>`;
    box.classList.remove("hidden");
  }
}

function renderScenario(){
  const s = scenarios[state.current];
  state.selected=false;
  $("chapterLabel").textContent = `SITUATIE ${state.visited.length}`;
  $("scenarioNumber").textContent = `SITUATIE ${String(state.visited.length).padStart(2,"0")}`;
  $("scenarioTag").textContent = s.tag;
  $("scenarioTitle").textContent = s.title;
  $("scenarioBody").innerHTML = s.body;
  renderVisual();
  $("choices").innerHTML = "";
  $("feedback").classList.add("hidden");
  $("feedback").innerHTML = "";
  $("nextBtn").classList.add("hidden");

  s.choices.forEach((choice,i)=>{
    const btn=document.createElement("button");
    btn.className="choice";
    btn.innerHTML=`<span class="letter">${String.fromCharCode(65+i)}</span>${choice.text}`;
    btn.addEventListener("click",()=>selectChoice(i,btn));
    $("choices").appendChild(btn);
  });
  renderDots();
  updateStats();
}

function selectChoice(index,button){
  if(state.selected) return;
  state.selected=true;
  const choice=scenarios[state.current].choices[index];
  state.history.push({scenario:state.current, choice:index, text:choice.text, delta:choice.delta});
  if(choice.path && ["natural","using","considering"].includes(choice.path)) state.path=choice.path;
  document.querySelectorAll(".choice").forEach(b=>b.disabled=true);
  button.classList.add("selected");
  applyDelta(choice.delta);
  $("feedback").innerHTML=`<strong>GEVOLG IN DE SIMULATIE</strong><br>${choice.feedback}`;
  $("feedback").classList.remove("hidden");
  $("nextBtn").classList.remove("hidden");
}

function startGame(){
  Object.assign(state,{performance:50,selfimage:50,health:90,pressure:20,consequences:0,current:0,selected:false,history:[],path:"neutral",visited:[]});
  $("chapterLabel").textContent="SIMULATIE";
  showScreen("gameScreen");
  state.visited=[findScenarioId("s1")];
  renderScenario();
}

function showResults(){
  $("chapterLabel").textContent="RESULTAAT";
  const risk=Math.round((100-state.health)*0.45 + state.pressure*0.15 + state.consequences*0.40);
  const finalRisk=clamp(risk);
  $("riskScore").textContent=finalRisk;

  let headline,summary;
  if(finalRisk < 30){
    headline="Je eindigde met relatief lage risicoscores.";
    summary="Binnen dit fictieve model heb je meerdere keuzes gemaakt die de gezondheids- en maatschappelijke risico’s beperkten.";
  } else if(finalRisk < 60){
    headline="Je eindigde met een gemengd risicoprofiel.";
    summary="Je keuzes laten zien dat prestatiewinst en risico’s tegelijk kunnen oplopen.";
  } else {
    headline="Je eindigde met een hoog risicoprofiel.";
    summary="Binnen het model hebben sociale druk, gezondheidsrisico’s en/of maatschappelijke consequenties zich duidelijk opgestapeld.";
  }
  $("resultHeadline").textContent=headline;
  $("resultSummary").textContent=summary;

  const stats=[
    ["💪","PRESTATIE",state.performance],
    ["🧠","ZELFBEELD",state.selfimage],
    ["❤️","GEZONDHEID",state.health],
    ["👥","SOCIALE DRUK",state.pressure],
    ["⚖️","CONSEQUENTIES",state.consequences]
  ];
  $("resultStats").innerHTML=stats.map(([icon,label,val])=>`
    <div class="result-stat">
      <span>${icon} ${label}</span>
      <strong>${val}</strong>
      <div class="mini-bar"><i style="width:${val}%"></i></div>
    </div>`).join("");

  const negativeChoices = state.history.filter(h => Object.values(h.delta).some(v => v < 0)).length;
  const pressureChoices = state.history.filter(h => (h.delta.pressure||0) > 0).length;
  const healthChoices = state.history.filter(h => (h.delta.health||0) < 0).length;
  const performanceChoices = state.history.filter(h => (h.delta.performance||0) > 0).length;

  let reflection = "";
  const pathText = state.path === "natural"
    ? "Je bent uiteindelijk de route van natuurlijke progressie gevolgd."
    : state.path === "using"
      ? "Je bent uiteindelijk in het gebruikspad terechtgekomen."
      : state.path === "considering"
        ? "Je hebt lang getwijfeld en bewust informatie en afwegingen meegenomen."
        : "Je bleef in de eerste afwegingen relatief neutraal.";
  if(finalRisk >= 60){
    reflection = pathText + " " + `In jouw route kwamen vooral keuzes voor die de sociale druk, gezondheidsrisico’s of maatschappelijke consequenties verhoogden. Je koos op meerdere momenten voor korte-termijnvoordeel of liet je beïnvloeden door je omgeving. Dat betekent niet dat je “fout” hebt gespeeld: juist die keuzes laten zien hoe makkelijk een reeks kleine beslissingen samen een grotere richting kan krijgen.`;
  } else if(finalRisk >= 30){
    reflection = pathText + " " + `Jouw keuzes laten een gemengd beeld zien. Op sommige momenten woog prestatie of uiterlijk zwaar, terwijl je op andere momenten juist informatie, gezondheid of je eigen grenzen meenam. Dat maakt jouw resultaat interessant: bewustwording gaat niet alleen over één grote keuze, maar over alle kleine keuzes die eraan voorafgaan.`;
  } else {
    reflection = pathText + " " + `In jouw route koos je relatief vaak voor informatie, eigen grenzen, gezondheid en langetermijndenken. Daardoor bleef het risicoprofiel in deze simulatie lager. Ook dan blijft de centrale boodschap hetzelfde: online beelden en sociale druk kunnen invloed hebben op hoe mensen naar hun lichaam en prestaties kijken.`;
  }

  $("personalReflection").textContent = reflection;
  $("reflectionBullets").innerHTML = `
    <div class="reflection-item"><strong>JOUW GEDRAG</strong><span>Je maakte ${state.history.length} keuzes. ${performanceChoices} daarvan waren direct gericht op prestatiewinst.</span></div>
    <div class="reflection-item"><strong>INVLOED VAN DRUK</strong><span>Bij ${pressureChoices} keuzes nam de sociale druk in het model toe.</span></div>
    <div class="reflection-item"><strong>GEZONDHEID</strong><span>Bij ${healthChoices} keuzes werd de gezondheidsscore negatief beïnvloed.</span></div>
  `;

  showScreen("resultScreen");
}

$("startBtn").addEventListener("click",startGame);
function findScenarioId(id){
  return scenarios.findIndex(s=>s.id===id);
}

const routeSequences = {
  natural: ["s1","s2","s3","s4","s5","s6","n1","n2","n3","n4","e1","e2","e3","e4","e5"],
  considering: ["s1","s2","s3","s4","s5","s6","c1","c2","c3","c4","e1","e2","e3","e4","e5"],
  using: ["s1","s2","s3","s4","s5","s6","u1","u2","u3","u4","e1","e2","e3","e4","e5"],
  neutral: ["s1","s2","s3","s4","s5","s6","c1","c2","c3","c4","e1","e2","e3","e4","e5"]
};

function getActiveSequence(){
  return routeSequences[state.path] || routeSequences.neutral;
}

function getNextScenarioIndex(){
  const sequence=getActiveSequence();
  const currentId=scenarios[state.current]?.id;
  const pos=sequence.indexOf(currentId);

  if(pos===-1 || pos===sequence.length-1) return -1;
  return findScenarioId(sequence[pos+1]);
}

$("nextBtn").addEventListener("click",()=>{
  const next=getNextScenarioIndex();
  if(next === -1){
    showResults();
    window.scrollTo({top:0,behavior:"smooth"});
    return;
  }
  state.visited.push(next);
  state.current=next;
  renderScenario();
  window.scrollTo({top:0,behavior:"smooth"});
});
$("restartBtn").addEventListener("click",startGame);
$("printBtn").addEventListener("click",()=>window.print());

document.querySelectorAll("[data-final]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const response={
      advantages:"Je kiest ervoor de mogelijke voordelen zwaarder te laten wegen. Juist door die keuze bewust te maken, zie je welke risico’s je daarbij mee moet nemen.",
      risks:"Je kiest ervoor de risico’s zwaarder te laten wegen. Dat sluit aan bij de conclusie van ons onderzoek dat de voordelen meestal niet opwegen tegen de lichamelijke, mentale en maatschappelijke risico’s.",
      complex:"Je kiest voor nuance. Dat past bij het doel van het spel: bewustwording creëren en laten zien hoe biologische, sociale en maatschappelijke factoren samen een keuze kunnen beïnvloeden."
    }[btn.dataset.final];
    $("finalResponse").textContent=response;
    $("finalResponse").classList.remove("hidden");
  });
});

updateStats();
