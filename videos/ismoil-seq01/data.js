// ismoil-seq01 — beat plan. Times = word onsets from whisper large-v3 (uz), text rebuilt by hand.
// Source cuts: 18.50, 24.13, 36.47 — each sits under a full-screen sheet. Video ends at 41.60 (source is black after).
// Shots: 0–18.5 wide walking (y≈1250), 18.5–36.5 medium (y≈1230), 36.5–41.6 close-up (y≈1420).
module.exports = {
  id: "seq01",
  duration: 41.6,
  groups: [
    { a: 0.07, b: 1.1, y: 1250, lines: [{ c: "k", w: [["Marketologman", 0.07]] }] },
    {
      a: 1.12, b: 3.72, y: 1250,
      lines: [
        { c: "s", w: [["Davlat", 1.12], ["loyihalari", 1.48], ["bilan", 2.03]] },
        { c: "k", swoosh: true, w: [["tajribamdan", 2.59]] },
        { c: "a", w: [["kelib chiqib", 3.16]] },
      ],
    },
    { a: 3.75, b: 4.75, y: 1250, lines: [{ c: "s", w: [["ayta", 3.75], ["olaman,", 3.88]] }] },
    {
      a: 7.7, b: 9.72, y: 1250,
      lines: [
        { c: "s", w: [["Rahbarning", 7.77]] },
        { c: "k", w: [["olqishi", 8.67]] },
        { c: "s", w: [["uchun", 9.3]] },
      ],
    },
    {
      a: 9.75, b: 11.8, y: 1250,
      lines: [
        { c: "s", w: [["yoki", 9.75]] },
        { c: "k", band: true, w: [["eʼtibor", 10.11]] },
        { c: "s", w: [["uchun", 10.75], ["emas.", 11.2]] },
      ],
    },
    {
      a: 11.83, b: 13.3, y: 1250,
      lines: [
        { c: "s", w: [["Sizga", 11.83], ["berilgan", 12.09]] },
        { c: "k", w: [["topshiriqni", 12.63]] },
      ],
    },
    {
      a: 13.34, b: 15.8, y: 1250,
      lines: [
        { c: "s", w: [["rostdan", 13.34], ["ham,", 13.7]] },
        { c: "k", band: true, w: [["sifatli", 14.08]] },
        { c: "a", w: [["va oʻz vaqtida", 14.66]] },
      ],
    },
    { a: 15.84, b: 16.7, y: 1250, lines: [{ c: "k", w: [["bajarishingiz", 15.84]] }] },
    {
      a: 20.32, b: 21.8, y: 1230,
      lines: [
        { c: "s", w: [["bu", 20.32], ["ham", 20.45], ["sizning", 20.71]] },
        { c: "k", w: [["uzoq", 21.07], ["muddat", 21.44]] },
      ],
    },
    {
      a: 21.82, b: 23.55, y: 1230,
      lines: [
        { c: "s", w: [["ishlashingizni", 21.82]] },
        { c: "k", swoosh: true, w: [["taʼminlaydi.", 22.69]] },
      ],
    },
    {
      a: 25.39, b: 26.64, y: 1250,
      lines: [
        { c: "s", w: [["olishdan", 25.39]] },
        { c: "k", band: true, w: [["qoʻrqmaslik", 25.84]] },
      ],
    },
    {
      a: 26.66, b: 29.9, y: 1250,
      lines: [
        { c: "s", w: [["bu", 26.66], ["faqat", 26.8]] },
        { c: "k", w: [["yangi", 27.44], ["imkoniyatlar", 27.92]] },
        { c: "a", w: [["eshigini ochadi", 28.45]] },
      ],
    },
    {
      a: 38.76, b: 39.98, y: 1420,
      lines: [
        { c: "k", w: [["jamoa", 38.76]] },
        { c: "s", w: [["qidirayotgan", 39.03], ["boʻlsangiz,", 39.55]] },
      ],
    },
    {
      a: 40.02, b: 41.9, y: 1420,
      lines: [
        { c: "s", w: [["hamkorlikka", 40.02]] },
        { c: "k", band: true, w: [["tayyormiz.", 40.65]] },
      ],
    },
  ],
  sheets: [
    {
      id: "fsPul", type: "num", enter: "slide", a: 4.75, b: 7.39,
      top: ["davlat loyihalarida", 4.91], num: "PUL", numT: 5.88,
      cap: [["eng", 6.27], ["muhimi", 6.54], ["emas.", 6.96]],
    },
    {
      id: "fsMuhim", type: "paper", enter: "slide", a: 16.7, b: 18.5, ghost: "MUHIM",
      setup: [["mana", 16.75], ["shu", 17.05]], key: [["eng", 17.4], ["muhimi.", 17.77]],
    },
    {
      id: "fsRost", type: "dark", enter: "circle", a: 17.98, b: 20.3,
      rows: [[["Rostgoʻylik,", 18.19, 1]], [["yaʼni", 19.0], ["halol", 19.23]], [["boʻlish", 19.68]]],
    },
    {
      id: "fsVazifa", type: "paper", enter: "slide", a: 23.55, b: 25.37, ghost: "KATTA",
      setup: [["Katta", 23.95]], key: [["vazifalarni", 24.16]], sub: [["va", 24.67], ["loyihalarni", 24.77]],
    },
    {
      id: "fsBosh", type: "dark", enter: "circle", a: 31.1, b: 33.95,
      rows: [[["Hammasi", 31.14]], [["faqat", 31.74], ["boshida", 32.28, 1]], [["qiyin", 32.76, 1], ["tuyuladi.", 33.06]]],
    },
    {
      id: "fsMarketing", type: "paper", enter: "slide", a: 35.85, b: 38.74,
      key: [["Marketing", 36.19]], sub: [["loyihalarni", 37.48], ["bajara", 38.03], ["oladigan", 38.48]],
    },
  ],
};
