// Copyright (C) turkbitig.com. All Rights Reserved.

const fonts = [
  {name:"Altyazılı", font:"tbldamga" },
  {name:"Öğrenci için", font:"tbldamga2" },
  {name:"Bilge Kağan", font:"bilgekaganyenib" },
  {name:"Bala", font:"bala" },
  {name:"Bala(K)", font:"balab" },
  {name:"Kalem", font:"gokturkkalem" },
  {name:"Kalem(G)", font:"gokturkkalemg" },
  {name:"Bediz", font:"bediz" },
  {name:"Çizgi", font:"cizgi" },
  {name:"Damga", font:"damgaregular" },
  {name:"Damga(K)", font:"damgab" },
  {name:"Damga(A)", font:"damgabb" },
  {name:"Damga(GB)", font:"damgagenisbold" },
  {name:"Kurgu", font:"gokturkyeni" },
  {name:"Kurgu(K)", font:"gokturkyenib" },
  {name:"Kırgız", font:"kirgiz" },
  {name:"Konçuy", font:"koncuy" },
  {name:"Kültiğin", font:"kultigin" },
  {name:"Kültiğin(K)", font:"kultiginbold" },
  {name:"Roman", font:"damgaroman" },
  {name:"Tatar", font:"tatarbold" },
  {name:"Tonyukuk", font:"tonyukuk" },
  {name:"Tonyukuk (K)", font:"tonyukukbold" },
  {name:"Türk Bitig", font:"turkbitig" },
  {name:"Türk Bitig(K)", font:"turkbitigbold" },
  {name:"Uygur", font:"uygur" },
  {name:"Yakşı", font:"yaksi" },
  {name:"Yakşı(K)", font:"yaksib" },
  {name:"Karluk", font:"karluk" },
  {name:"Irk Bitig", font:"irkbitig" },
];

let fp_currentIdx = 0;
let fp_currentFont = fonts[0].font;

const fp_btnPrev  = document.getElementById("fpBtnPrev");
const fp_btnCurr  = document.getElementById("fpBtnCurr");
const fp_btnNext  = document.getElementById("fpBtnNext");
const fp_btnUp    = document.getElementById("fpBtnUp");
const fp_btnDown  = document.getElementById("fpBtnDown");
const fp_btnReset = document.getElementById("fpBtnReset");

function fp_wrap(i) {
  const n = fonts.length;
  return i < 0 ? n - 1 : i >= n ? 0 : i;
}

function fp_refresh() {
  fp_currentIdx = fp_wrap(fp_currentIdx);
  fp_currentFont = fonts[fp_currentIdx].font;

  const p = fp_wrap(fp_currentIdx - 1);
  const n = fp_wrap(fp_currentIdx + 1);

  fp_btnPrev.textContent = fonts[p].name;
  fp_btnCurr.textContent = fonts[fp_currentIdx].name;
  fp_btnNext.textContent = fonts[n].name;

  const el = document.getElementById("gokturk");
  if (el) el.style.fontFamily = fp_currentFont;

  const inp = document.querySelector('input[name="selectedfont"]');
  if (inp) inp.value = fonts[fp_currentIdx].name;
}

function fp_attach(btn, step) {
  let to, iv;
  const go = () => { fp_currentIdx += step; fp_refresh(); };
  const stop = () => { clearTimeout(to); clearInterval(iv); };

  btn.onpointerdown = e => {
    e.preventDefault();
    btn.focus();
    go();
    to = setTimeout(() => iv = setInterval(go, 100), 350);
  };
  btn.onpointerup = btn.onpointerleave = btn.onpointercancel = stop;

  btn.onkeydown = e => {
    if (e.key === "ArrowUp")   { fp_currentIdx--; fp_refresh(); e.preventDefault(); }
    if (e.key === "ArrowDown") { fp_currentIdx++; fp_refresh(); e.preventDefault(); }
  };
}

fp_attach(fp_btnPrev, -1);
fp_attach(fp_btnNext, +1);
fp_attach(fp_btnUp,   -1);
fp_attach(fp_btnDown, +1);

// Middle row: single tap resets to first font, no hold
fp_btnCurr.onpointerdown = e => {
  e.preventDefault();
  fp_btnCurr.focus();
  fp_currentIdx = 0;
  fp_refresh();
};
fp_btnCurr.onkeydown = e => {
  if (e.key === "ArrowUp")   { fp_currentIdx--; fp_refresh(); e.preventDefault(); }
  if (e.key === "ArrowDown") { fp_currentIdx++; fp_refresh(); e.preventDefault(); }
};

// Reset button: single tap, no hold
fp_btnReset.onpointerdown = e => {
  e.preventDefault();
  fp_btnReset.focus();
  fp_currentIdx = 0;
  fp_refresh();
};
fp_btnReset.onkeydown = e => {
  if (e.key === "ArrowUp")   { fp_currentIdx--; fp_refresh(); e.preventDefault(); }
  if (e.key === "ArrowDown") { fp_currentIdx++; fp_refresh(); e.preventDefault(); }
};

fp_refresh();
