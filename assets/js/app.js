const TOOLS=[
{id:"words",name:"Wortzähler",desc:"Wörter, Zeichen und Sätze zählen.",cat:"text",icon:"Aa",tags:"text zählen wörter zeichen"},
{id:"case",name:"Groß-/Kleinschreibung",desc:"Text in verschiedene Schreibweisen umwandeln.",cat:"text",icon:"Aa",tags:"text converter groß klein"},
{id:"sort",name:"Zeilen sortieren",desc:"Zeilen alphabetisch oder umgekehrt sortieren.",cat:"text",icon:"↕",tags:"sortieren alphabet"},
{id:"duplicates",name:"Doppelte Zeilen entfernen",desc:"Entfernt wiederholte Zeilen aus einem Text.",cat:"text",icon:"≡",tags:"duplikate zeilen"},
{id:"spaces",name:"Leerzeichen bereinigen",desc:"Überflüssige Leerzeichen und Leerzeilen entfernen.",cat:"text",icon:"␠",tags:"whitespace leerzeichen"},
{id:"reverse",name:"Text umkehren",desc:"Dreht Zeichen oder Wörter um.",cat:"text",icon:"↶",tags:"umkehren rückwärts"},
{id:"json",name:"JSON-Formatierer",desc:"JSON prüfen, formatieren und verkleinern.",cat:"dev",icon:"{ }",tags:"json developer formatieren"},
{id:"base64",name:"Base64-Konverter",desc:"Text in Base64 umwandeln und zurück.",cat:"dev",icon:"64",tags:"base64 encode decode"},
{id:"url",name:"URL-Codierer",desc:"Texte für URLs codieren oder decodieren.",cat:"dev",icon:"↗",tags:"url encoder decoder"},
{id:"uuid",name:"UUID-Generator",desc:"Erstellt eindeutige Kennungen.",cat:"dev",icon:"#",tags:"uuid id generator"},
{id:"password",name:"Passwort-Generator",desc:"Erstellt zufällige Passwörter.",cat:"dev",icon:"⌑",tags:"passwort sicherheit"},
{id:"html",name:"HTML-Zeichen umwandeln",desc:"Sonderzeichen für HTML maskieren oder zurückwandeln.",cat:"dev",icon:"</>",tags:"html escape entities"},
{id:"percent",name:"Prozentrechner",desc:"Berechnet Prozentwerte und Anteile.",cat:"math",icon:"%",tags:"prozent mathematik"},
{id:"rule3",name:"Dreisatz-Rechner",desc:"Löst einfache Dreisatz-Aufgaben.",cat:"math",icon:"÷",tags:"dreisatz proportional"},
{id:"average",name:"Durchschnittsrechner",desc:"Berechnet den Mittelwert mehrerer Zahlen.",cat:"math",icon:"x̄",tags:"durchschnitt mittelwert"},
{id:"vat",name:"Mehrwertsteuer-Rechner",desc:"Rechnet Netto- und Bruttopreise um.",cat:"math",icon:"€",tags:"mwst steuer netto brutto"},
{id:"discount",name:"Rabatt-Rechner",desc:"Berechnet Rabatt und Endpreis.",cat:"math",icon:"↓",tags:"rabatt preis sparen"},
{id:"image",name:"Bild verkleinern",desc:"Skaliert Bilder direkt auf deinem Gerät.",cat:"image",icon:"▧",tags:"bild foto größe skalieren"}
];
const $=s=>document.querySelector(s), panel=$("#panel"),toolBody=$("#toolBody");
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function cards(list){return list.map(t=>'<article class="tool" data-search="'+esc((t.name+" "+t.desc+" "+t.tags).toLowerCase())+'"><button data-tool="'+t.id+'"><span class="ico">'+t.icon+'</span><h3>'+t.name+'</h3><p>'+t.desc+'</p></button></article>').join("")}
function renderTools(list=TOOLS){const grid=$("#toolGrid");if(!grid)return;grid.innerHTML=cards(list);const empty=$("#empty");if(empty)empty.style.display=list.length?"none":"block";const count=$("#count");if(count)count.textContent=list.length+" Werkzeuge"}
function input(label,id,placeholder="",type="text"){return '<div class="field"><label for="'+id+'">'+label+'</label><input id="'+id+'" type="'+type+'" placeholder="'+placeholder+'"></div>'}
function area(label,id,placeholder=""){return '<div class="field"><label for="'+id+'">'+label+'</label><textarea id="'+id+'" placeholder="'+placeholder+'"></textarea></div>'}
function result(text){return '<div class="result" id="result">'+text+'</div>'}
function show(id){const t=TOOLS.find(x=>x.id===id);if(!t)return;$("#panelTitle").textContent=t.name;panel.classList.add("open");let html="";
switch(id){
case"words":html=area("Dein Text","a","Text hier eingeben…")+result("0 Wörter · 0 Zeichen · 0 Sätze");break;
case"case":html=area("Dein Text","a","Text hier eingeben…")+'<div class="actions"><button class="secondary" data-action="upper">GROSSBUCHSTABEN</button><button class="secondary" data-action="lower">kleinbuchstaben</button><button class="secondary" data-action="title">Titel-Schreibweise</button></div>'+result("Das Ergebnis erscheint hier.");break;
case"sort":case"duplicates":case"spaces":case"reverse":html=area("Dein Text","a","Text hier eingeben…")+'<div class="actions"><button class="primary" data-action="run">Ausführen</button></div>'+result("Das Ergebnis erscheint hier.");break;
case"json":html=area("JSON-Eingabe","a",'{"beispiel":true}')+'<div class="actions"><button class="primary" data-action="format">Formatieren</button><button class="secondary" data-action="minify">Verkleinern</button></div>'+result("Noch kein Ergebnis.");break;
case"base64":html=area("Text oder Base64","a","Text eingeben…")+'<div class="actions"><button class="primary" data-action="encode">Zu Base64</button><button class="secondary" data-action="decode">Von Base64</button></div>'+result("Noch kein Ergebnis.");break;
case"url":html=area("Text oder URL","a","Text eingeben…")+'<div class="actions"><button class="primary" data-action="encode">Codieren</button><button class="secondary" data-action="decode">Decodieren</button></div>'+result("Noch kein Ergebnis.");break;
case"html":html=area("Text oder HTML-Zeichen","a","Text eingeben…")+'<div class="actions"><button class="primary" data-action="encode">Maskieren</button><button class="secondary" data-action="decode">Zurückwandeln</button></div>'+result("Noch kein Ergebnis.");break;
case"uuid":html='<div class="actions"><button class="primary" data-action="uuid">UUID erstellen</button><button class="secondary" data-action="uuid5">5 UUIDs erstellen</button></div>'+result("Noch keine UUID erstellt.");break;
case"password":html=input("Passwortlänge (8 bis 128)","length","20","number")+'<div class="field"><label><input type="checkbox" id="symbols" checked> Sonderzeichen verwenden</label></div><div class="actions"><button class="primary" data-action="password">Passwort erstellen</button></div>'+result("Noch kein Passwort erstellt.");break;
case"percent":html=input("Prozentsatz","a","15","number")+input("Ausgangswert","b","200","number")+'<div class="actions"><button class="primary" data-action="calc">Berechnen</button></div>'+result("Ergebnis erscheint hier.");break;
case"rule3":html=input("Wenn","a","2","number")+input("dann","b","10","number")+input("wenn","c","5","number")+'<div class="actions"><button class="primary" data-action="calc">Berechnen</button></div>'+result("Ergebnis erscheint hier.");break;
case"average":html=area("Zahlen (durch Komma, Leerzeichen oder Zeilenumbruch trennen)","a","12, 18, 24, 30")+'<div class="actions"><button class="primary" data-action="calc">Durchschnitt berechnen</button></div>'+result("Ergebnis erscheint hier.");break;
case"vat":html=input("Betrag in Euro","a","100","number")+'<div class="field"><label for="rate">Steuersatz</label><select id="rate"><option value="19">19 %</option><option value="7">7 %</option></select></div><div class="field"><label for="mode">Eingabe ist</label><select id="mode"><option value="net">Netto</option><option value="gross">Brutto</option></select></div><div class="actions"><button class="primary" data-action="calc">Berechnen</button></div>'+result("Ergebnis erscheint hier.");break;
case"discount":html=input("Ursprungspreis in Euro","a","100","number")+input("Rabatt in Prozent","b","20","number")+'<div class="actions"><button class="primary" data-action="calc">Berechnen</button></div>'+result("Ergebnis erscheint hier.");break;
case"image":html='<div class="field"><label for="file">Bild auswählen</label><input id="file" type="file" accept="image/*"></div>'+input("Neue Breite in Pixel","width","800","number")+'<div class="actions"><button class="primary" data-action="resize">Bild verkleinern</button></div>'+result("Das Bild bleibt auf deinem Gerät.")+'<canvas id="canvas" class="hidden"></canvas>';break;
}
toolBody.innerHTML=html;panel.scrollIntoView({behavior:"smooth",block:"start"});const $id=x=>document.getElementById(x),out=()=>$("#result"),val=x=>$id(x)?.value||"";
toolBody.onclick=async e=>{const b=e.target.closest("[data-action]");if(!b)return;const action=b.dataset.action,v=val("a");
try{
if(action==="upper")out().textContent=v.toLocaleUpperCase("de");
if(action==="lower")out().textContent=v.toLocaleLowerCase("de");
if(action==="title")out().textContent=v.toLocaleLowerCase("de").replace(/\b\p{L}/gu,c=>c.toLocaleUpperCase("de"));
if(action==="run"){let lines=v.split(/\r?\n/);if(id==="sort")lines.sort((x,y)=>x.localeCompare(y,"de"));if(id==="duplicates")lines=[...new Set(lines)];if(id==="spaces")lines=lines.map(x=>x.trim().replace(/\s+/g," ")).filter(Boolean);if(id==="reverse")lines=v.split("").reverse();out().textContent=lines.join("\n")}
if(action==="format"||action==="minify"){const parsed=JSON.parse(v);out().textContent=JSON.stringify(parsed,null,action==="format"?2:0)}
if(action==="encode"&&id==="base64")out().textContent=btoa(unescape(encodeURIComponent(v)));
if(action==="decode"&&id==="base64")out().textContent=decodeURIComponent(escape(atob(v)));
if(action==="encode"&&id==="url")out().textContent=encodeURIComponent(v);
if(action==="decode"&&id==="url")out().textContent=decodeURIComponent(v);
if(action==="encode"&&id==="html")out().textContent=v.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
if(action==="decode"&&id==="html"){const d=document.createElement("textarea");d.innerHTML=v;out().textContent=d.value}
if(action==="uuid")out().textContent=crypto.randomUUID();
if(action==="uuid5")out().textContent=Array.from({length:5},()=>crypto.randomUUID()).join("\n");
if(action==="password"){let n=Math.max(8,Math.min(128,Number(val("length"))||20)),chars="ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789"+($id("symbols").checked?"!@#$%&*+-_?":"");let a=new Uint32Array(n);crypto.getRandomValues(a);out().textContent=Array.from(a,x=>chars[x%chars.length]).join("")}
if(action==="calc"&&id==="percent")out().textContent=(Number(val("a"))*Number(val("b"))/100).toLocaleString("de-DE")+" (Ergebnis)";
if(action==="calc"&&id==="rule3")out().textContent=(Number(val("b"))*Number(val("c"))/Number(val("a"))).toLocaleString("de-DE");
if(action==="calc"&&id==="average"){let nums=v.split(/[\s,;]+/).filter(Boolean).map(Number);if(!nums.length||nums.some(Number.isNaN))throw Error("Bitte gültige Zahlen eingeben.");out().textContent=(nums.reduce((a,b)=>a+b,0)/nums.length).toLocaleString("de-DE")}
if(action==="calc"&&id==="vat"){let x=Number(val("a")),r=Number(val("rate"))/100;if($id("mode").value==="net")out().textContent="Brutto: "+(x*(1+r)).toFixed(2)+" € · Steuer: "+(x*r).toFixed(2)+" €";else out().textContent="Netto: "+(x/(1+r)).toFixed(2)+" € · Steuer: "+(x-x/(1+r)).toFixed(2)+" €"}
if(action==="calc"&&id==="discount"){let x=Number(val("a")),d=Number(val("b"));out().textContent="Neuer Preis: "+(x*(1-d/100)).toFixed(2)+" € · Ersparnis: "+(x*d/100).toFixed(2)+" €"}
if(action==="resize"){const file=$id("file").files[0];if(!file)throw Error("Bitte zuerst ein Bild auswählen.");const img=new Image(),url=URL.createObjectURL(file);img.onload=()=>{let w=Math.min(10000,Math.max(1,Number(val("width"))||800)),h=Math.round(img.height*w/img.width),c=$id("canvas");c.width=w;c.height=h;c.getContext("2d").drawImage(img,0,0,w,h);c.toBlob(blob=>{const link=document.createElement("a"),u=URL.createObjectURL(blob);link.href=u;link.download="toolboxly-bild.png";link.click();URL.revokeObjectURL(u);URL.revokeObjectURL(url);out().textContent="Fertig: Das verkleinerte Bild wurde heruntergeladen."},"image/png")};img.src=url}
}catch(err){out().textContent="Fehler: "+err.message}
};
if(id==="words")$id("a").addEventListener("input",()=>{let s=val("a").trim();out().textContent=(s?s.split(/\s+/).length:0)+" Wörter · "+val("a").length+" Zeichen · "+(s?(s.match(/[.!?]+(?=\s|$)/g)||[]).length:0)+" Sätze"});
}
document.addEventListener("click",e=>{const b=e.target.closest("[data-tool]");if(b){e.preventDefault();show(b.dataset.tool)}});
const search=$("#search");if(search)search.addEventListener("input",()=>{const q=search.value.toLocaleLowerCase("de");renderTools(TOOLS.filter(t=>(t.name+" "+t.desc+" "+t.tags).toLocaleLowerCase("de").includes(q)))});
const category=document.body.dataset.category;if(category)renderTools(TOOLS.filter(t=>t.cat===category));else renderTools();
const close=$("#close");if(close)close.onclick=()=>panel.classList.remove("open");
const year=$("#year");if(year)year.textContent=new Date().getFullYear();