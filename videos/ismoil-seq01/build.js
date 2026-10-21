// Generator: data.js (speech groups + sheets) → public/index.html (HyperFrames composition)
// Style: "Kinetic Reels" light-red (see .claude/agents/video-montaj.md §7)
const fs = require("fs");
const path = require("path");
const D = require("./data.js");

const FPS = 30;
const q = (t) => Math.round(t * FPS) / FPS;
const esc = (s) => String(s).replace(/\u02BB/g, "\u2018").replace(/\u02BC/g, "\u2019").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ---------- speech groups ----------
// group: { a, b, y, lines: [ { c: 's'|'k'|'a', band?, swoosh?, w: [[word, t], ...] } ] }
function groupHTML(g, gi) {
  const lines = g.lines
    .map((ln, li) => {
      const words = ln.w
        .map(([w, t], wi) => `<span class="w" id="g${gi}l${li}w${wi}" data-t="${t}">${esc(w)}</span>`)
        .join(" ");
      const band = ln.band ? `<u class="band" id="g${gi}l${li}band"></u>` : "";
      const sw = ln.swoosh
        ? `<svg class="sw" id="g${gi}l${li}sw" viewBox="0 0 300 40" preserveAspectRatio="none"><path d="M8 30 C 90 6, 200 4, 292 22" pathLength="1"/></svg>`
        : "";
      return `<div class="ln ${ln.c}"><span class="lnin">${band}${words}${sw}</span></div>`;
    })
    .join("");
  return `<div class="grp" id="g${gi}" style="top:${g.y || 1180}px">${lines}</div>`;
}

function groupJS(g, gi) {
  const out = [];
  out.push(`vis("#g${gi}",${q(g.a - 0.05)},${q(g.b)});`);
  g.lines.forEach((ln, li) => {
    ln.w.forEach(([, t], wi) => {
      const sel = `#g${gi}l${li}w${wi}`;
      if (ln.c === "a") out.push(`tl.fromTo("${sel}",{opacity:0,x:-24,filter:"blur(8px)"},{opacity:1,x:0,filter:"blur(0px)",duration:.5,ease:SOFT},${q(t)});`);
      else out.push(`tl.fromTo("${sel}",{opacity:0,y:30,filter:"blur(14px)"},{opacity:1,y:0,filter:"blur(0px)",duration:${ln.c === "k" ? 0.5 : 0.4},ease:SOFT},${q(t)});`);
    });
    const t0 = ln.w[0][1];
    if (ln.band) out.push(`tl.fromTo("#g${gi}l${li}band",{scaleX:0},{scaleX:1,duration:.35,ease:"power3.out"},${q(t0 + 0.12)});`);
    if (ln.swoosh) out.push(`tl.fromTo("#g${gi}l${li}sw path",{strokeDashoffset:1},{strokeDashoffset:0,duration:.4,ease:"power2.inOut"},${q(t0 + 0.2)});`);
  });
  out.push(`tl.to("#g${gi} .lnin",{opacity:0,y:-20,filter:"blur(10px)",duration:.3,ease:"power2.in"},${q(g.b - 0.3)});`);
  return out.join("\n ");
}

// ---------- full-screen sheets ----------
// sheet: { id, type, a, b, enter: 'slide'|'circle'|'cut', ...content }
function sheetHTML(s) {
  const bg = s.type === "dark" ? "dark" : "paper";
  let inner = "";
  const word = (txt, t, cls, id) => `<span class="sw-w ${cls || ""}" ${id ? `id="${id}"` : ""} data-t="${t}">${esc(txt)}</span>`;
  if (s.type === "paper") {
    // { ghost?, setup:[[w,t]], key:[[w,t]], sub?:[[w,t]], script?:[w,t] }
    inner = `${s.ghost ? `<div class="ghost" id="${s.id}-ghost" data-layout-allow-overflow>${esc(s.ghost)}</div>` : ""}
    <div class="stack">
      ${s.script ? `<div class="p-script">${word(s.script[0], s.script[1])}</div>` : ""}
      <div class="p-setup">${s.setup.map(([w, t]) => word(w, t)).join(" ")}</div>
      <div class="p-key"><u class="band" id="${s.id}-band"></u>${s.key.map(([w, t]) => word(w, t, "k")).join(" ")}</div>
      ${s.sub ? `<div class="p-sub">${s.sub.map(([w, t]) => word(w, t)).join(" ")}</div>` : ""}
    </div>`;
  } else if (s.type === "num") {
    // { top:[w,t], num:'…', numT, cap:[[w,t]] }
    inner = `<div class="grid" id="${s.id}-grid"></div>
    <div class="stack">
      <div class="p-setup">${word(s.top[0], s.top[1])}</div>
      <div class="n-big" id="${s.id}-num" data-t="${s.numT}">${esc(s.num)}</div>
      <div class="p-sub">${s.cap.map(([w, t]) => word(w, t)).join(" ")}</div>
    </div>`;
  } else if (s.type === "dark") {
    // { rows: [ [[w,t,red?], ...], ... ] }
    inner = `<div class="stack">${s.rows
      .map((r) => `<div class="d-row">${r.map(([w, t, red]) => word(w, t, red ? "red" : "")).join(" ")}</div>`)
      .join("")}</div>`;
  } else if (s.type === "list") {
    // { title:[w,t], rows:[[txt,t], ...] }
    inner = `<div class="note" id="${s.id}-note"><i class="pin"></i>
      <div class="n-title">${word(s.title[0], s.title[1])}</div><div class="n-rule"></div>
      ${s.rows.map(([txt, t]) => `<div class="n-row sw-w" data-t="${t}"><b>✓</b>${esc(txt)}</div>`).join("")}
    </div>`;
  } else if (s.type === "cta") {
    // { setup:[[w,t]], key:[[w,t]], handle, handleT }
    inner = `<div class="stack">
      <div class="p-setup">${s.setup.map(([w, t]) => word(w, t)).join(" ")}</div>
      <div class="p-key"><u class="band" id="${s.id}-band"></u>${s.key.map(([w, t]) => word(w, t, "k")).join(" ")}</div>
      ${s.handle ? `<div class="handle sw-w" data-t="${s.handleT}">${esc(s.handle)}</div>` : ""}
    </div>`;
  }
  return `<div class="fs ${bg}" id="${s.id}">${inner}</div>`;
}

function sheetJS(s) {
  const o = [];
  const sel = `#${s.id}`;
  o.push(`vis("${sel}",${q(s.a)},${q(s.b)});`);
  if (s.enter === "slide") o.push(`tl.fromTo("${sel}",{yPercent:100},{yPercent:0,duration:.5,ease:IO},${q(s.a)});`);
  else if (s.enter === "circle") o.push(`tl.fromTo("${sel}",{clipPath:"circle(0% at 50% 50%)"},{clipPath:"circle(75% at 50% 50%)",duration:.45,ease:IO},${q(s.a)});`);
  o.push(`sfx(${q(s.a)},"whoosh");`);
  o.push(`words("${sel}");`);
  if (s.ghost) o.push(`tl.fromTo("#${s.id}-ghost",{x:60,opacity:0},{x:-60,opacity:1,duration:${q(s.b - s.a)},ease:"none"},${q(s.a)});`);
  if (s.type === "paper" || s.type === "cta") {
    const t0 = s.key[0][1];
    o.push(`tl.fromTo("#${s.id}-band",{scaleX:0},{scaleX:1,duration:.35,ease:"power3.out"},${q(t0 + 0.12)});`);
    o.push(`sfx(${q(t0 + 0.12)},"pop");`);
  }
  if (s.type === "num") {
    o.push(`tl.fromTo("#${s.id}-grid",{opacity:0},{opacity:1,duration:.6,ease:SOFT},${q(s.numT - 0.2)});`);
    o.push(`tl.fromTo("#${s.id}-num",{opacity:0,y:40,filter:"blur(18px)"},{opacity:1,y:0,filter:"blur(0px)",duration:.6,ease:SOFT},${q(s.numT)});`);
    o.push(`sfx(${q(s.numT)},"pop");`);
  }
  if (s.type === "list") o.push(`tl.fromTo("#${s.id}-note",{opacity:0,y:60,rotation:-3},{opacity:1,y:0,rotation:-1.5,duration:.6,ease:SOFT},${q(s.a + 0.1)});`);
  return o.join("\n ");
}

// ---------- assemble ----------
const font = (fam, file, w) =>
  `@font-face{font-family:"${fam}";src:url(fonts/${file}-latin-ext-${w}-normal.woff2) format("woff2");font-weight:${w};unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF;}
@font-face{font-family:"${fam}";src:url(fonts/${file}-latin-${w}-normal.woff2) format("woff2");font-weight:${w};}`;

const fonts = [400, 500, 800, 900].map((w) => font("KR Sans", "montserrat", w)).join("\n") + "\n" + font("KR Script", "great-vibes", 400);

const sfxTags = [];
let sfxN = 0;

const html = `<!doctype html>
<html lang="uz">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=1080, height=1920" />
<title>${esc(D.id)}</title>
<script src="vendor/gsap.min.js"></script>
<style>
${fonts}
:root{--ink:#141414;--red:#E3171E;--red2:#8E0B0F;--paper:#F2F1EF}
html,body{margin:0;background:#000}
#stage{position:relative;width:100%;height:100%;overflow:hidden;background:#000;font-family:"KR Sans",sans-serif;-webkit-font-smoothing:antialiased}
#src{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
#shade{position:absolute;left:0;right:0;bottom:0;height:62%;pointer-events:none;background:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,.28) 55%,rgba(0,0,0,.42) 100%)}
.preload{position:absolute;left:-9999px;top:0;opacity:0}
/* speech text */
.grp{position:absolute;left:150px;right:150px;visibility:hidden;text-align:center;color:#fff;transform:translateY(-50%)}
.ln{display:block;line-height:1}
.lnin{position:relative;display:inline-block}
.w{display:inline-block;opacity:0}
.ln.s{font-weight:500;font-size:46px;letter-spacing:-.01em;text-shadow:0 2px 12px rgba(0,0,0,.45);margin-bottom:6px}
.ln.k{font-weight:900;font-size:118px;letter-spacing:-.045em;text-shadow:0 12px 26px rgba(0,0,0,.45)}
.ln.a{font-family:"KR Script",cursive;font-weight:400;font-size:96px;margin-top:-14px;text-shadow:0 4px 14px rgba(0,0,0,.5)}
.band{position:absolute;left:-14px;right:-14px;top:22%;height:62%;background:var(--red);z-index:-1;transform-origin:0 50%;display:block;text-decoration:none}
.lnin{isolation:isolate}
.sw{position:absolute;left:4%;width:92%;bottom:-34px;height:40px;overflow:visible}
.sw path{fill:none;stroke:var(--red);stroke-width:7;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:1}
/* sheets */
.fs{position:absolute;inset:0;visibility:hidden;overflow:hidden;display:flex;align-items:center;justify-content:center}
.fs.paper{background:radial-gradient(ellipse at 30% 20%,#ffffff 0%,#f3f2f0 55%,#e7e6e3 100%);color:var(--ink)}
.fs.paper::after{content:"";position:absolute;inset:-10%;background:linear-gradient(118deg,rgba(0,0,0,0) 18%,rgba(0,0,0,.055) 30%,rgba(0,0,0,0) 42%,rgba(0,0,0,0) 58%,rgba(0,0,0,.045) 70%,rgba(0,0,0,0) 82%);filter:blur(30px);pointer-events:none}
.fs.dark{background:radial-gradient(ellipse at 50% 45%,#141414 0%,#050505 70%);color:#fff}
.stack{position:relative;z-index:2;text-align:center;padding:0 150px}
.sw-w{display:inline-block;opacity:0}
.p-script{font-family:"KR Script",cursive;font-size:110px;line-height:.9;margin-bottom:-6px}
.p-setup{font-weight:500;font-size:52px;letter-spacing:-.01em;margin-bottom:10px}
.p-key{position:relative;display:inline-block;isolation:isolate;font-weight:900;font-size:136px;line-height:1.02;letter-spacing:-.05em;color:#fff;text-shadow:0 18px 30px rgba(0,0,0,.28)}
.fs.paper .p-key .k{color:#fff}
.p-sub{font-weight:500;font-size:46px;margin-top:22px;color:#2a2a2a}
.ghost{position:absolute;top:50%;left:-200px;transform:translateY(-50%);white-space:nowrap;font-weight:900;font-size:400px;letter-spacing:-.06em;color:rgba(0,0,0,.06);z-index:1}
.grid{position:absolute;left:140px;right:140px;top:560px;bottom:560px;background-image:linear-gradient(rgba(0,0,0,.11) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.11) 1px,transparent 1px);background-size:60px 60px;-webkit-mask-image:radial-gradient(ellipse at center,#000 35%,transparent 72%);mask-image:radial-gradient(ellipse at center,#000 35%,transparent 72%);opacity:0}
.n-big{font-weight:900;font-size:330px;line-height:.95;letter-spacing:-.06em;color:var(--red);background:linear-gradient(180deg,#F0262C 0%,#B30F15 60%,#7E0A0E 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(6px 8px 0 #6d080b) drop-shadow(0 30px 40px rgba(0,0,0,.25));opacity:0}
.d-row{font-weight:800;font-size:96px;letter-spacing:-.04em;line-height:1.08;text-shadow:0 0 26px rgba(255,255,255,.28)}
.d-row .red{color:#FF2A2A;text-shadow:0 0 34px rgba(255,30,30,.6)}
.note{position:relative;z-index:2;width:640px;padding:70px 56px 56px;background:#8b8b8b;color:#fff;box-shadow:0 40px 70px -20px rgba(0,0,0,.35);opacity:0}
.pin{position:absolute;left:50%;top:-22px;width:44px;height:44px;margin-left:-22px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#ff6b6b,#C40F15 60%,#7d070b);box-shadow:0 8px 12px rgba(0,0,0,.35)}
.n-title{font-weight:900;font-size:88px;letter-spacing:-.04em}
.n-rule{height:6px;background:#fff;margin:14px 0 24px;opacity:.9}
.n-row{display:block;font-weight:600;font-size:46px;margin:12px 0}
.n-row b{display:inline-block;width:56px;color:#fff}
.handle{display:block;margin-top:40px;font-weight:800;font-size:52px;color:var(--red)}
</style>
</head>
<body>
<div id="stage" data-composition-id="${D.id}" data-start="0" data-duration="${D.duration}" data-fps="30" data-width="1080" data-height="1920">
<video id="src" src="src.mp4" playsinline data-has-audio="true" data-start="0" data-duration="${D.duration}" data-track-index="0"></video>
<div id="shade"></div>
${D.groups.map(groupHTML).join("\n")}
${D.sheets.map(sheetHTML).join("\n")}
<div class="preload" style="font-family:'KR Sans';font-weight:900">Aa oʻgʻ</div><div class="preload" style="font-family:'KR Sans';font-weight:500">Aa oʻgʻ</div><div class="preload" style="font-family:'KR Script'">Aa</div>
%%SFX%%
</div>
<script>
(function(){
 var FPS=30,q=function(t){return Math.round(t*FPS)/FPS};
 var tl=gsap.timeline({paused:true}),SOFT="expo.out",IO="power3.inOut";
 function vis(s,a,b){tl.set(s,{visibility:"visible"},q(a));tl.set(s,{visibility:"hidden"},q(b));}
 function sfx(){}
 function words(root){document.querySelectorAll(root+" .sw-w[data-t]").forEach(function(el){
  tl.fromTo(el,{opacity:0,y:34,filter:"blur(14px)"},{opacity:1,y:0,filter:"blur(0px)",duration:.5,ease:SOFT},q(+el.dataset.t));});}
 tl.set({}, {}, ${D.duration});
 ${D.groups.map(groupJS).join("\n ")}
 ${D.sheets.map(sheetJS).join("\n ")}
 window.__timelines["${D.id}"]=tl;
})();
</script>
</body>
</html>
`;

// SFX → real <audio> clips (sfx() calls in JS are markers only; collect them here)
const sfxRe = /sfx\(([\d.]+),"(\w+)"\)/g;
let m;
const body = html;
while ((m = sfxRe.exec(body))) {
  const t = +m[1];
  const kind = m[2];
  const dur = kind === "whoosh" ? 0.6 : 0.12;
  sfxTags.push(`<audio id="sfx${sfxN++}" src="sfx/${kind}.wav" data-start="${t}" data-duration="${dur}" data-volume="0.0178" data-track-index="${9 + (sfxN % 2)}"></audio>`);
}
fs.writeFileSync(path.join(__dirname, "public/index.html"), html.replace("%%SFX%%", sfxTags.join("\n")));
console.log(`wrote public/index.html — ${D.groups.length} groups, ${D.sheets.length} sheets, ${sfxTags.length} sfx`);
