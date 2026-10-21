// ismoil-c2509 (ABM Store Q&A). Questions → full-screen "SAVOL" sheets; answers → captions.
// Times = whisper large-v3 (uz) word onsets, text rebuilt by hand; unclear words are left out.
// 54.06–58.0: whisper duplicated this phrase, times spread by syllable over the real speech window.
// Source cut at 73.37 → the ABM Store outro, left clean.
module.exports = {
  id: "c2509",
  duration: 77.911,
  groups: [],
  captions: [
    // A1
    { a: 3.02, b: 4.57, w: [["Yoʻq,", 3.02], ["aksincha", 3.28], ["20% dan", 3.88]] },
    { a: 4.57, b: 7.06, w: [["80% gacha", 4.57], ["zaryadlab", 5.51], ["yurish", 6.12], ["kerak.", 6.6]] },
    { a: 7.06, b: 9.57, w: [["Sababi,", 7.06], ["100% gacha", 7.66], ["zaryadlanadigan", 8.71]] },
    { a: 9.57, b: 10.7, w: [["boʻlsa,", 9.57], ["yomkostingizga", 9.97], ["va", 10.6]] },
    { a: 10.7, b: 12.9, w: [["batareyaning", 10.7], ["holatiga", 11.58], ["taʼsir", 11.81], ["qiladi.", 12.1]] },
    // A2
    { a: 17.02, b: 18.98, w: [["Yoʻq,", 17.02], ["aksincha", 17.26], ["tuzatib", 17.78], ["bermaydi.", 18.17]] },
    { a: 19.0, b: 20.68, w: [["Apple", 19.0], ["kompaniyasi", 19.31], ["iPhoneʼlarni", 19.94]] },
    { a: 20.68, b: 22.15, w: [["suvda", 20.68], ["ishlaydi", 20.89], ["deb", 21.3], ["aytadi,", 21.6]] },
    // A3
    { a: 28.02, b: 29.02, w: [["Toʻgʻridan-toʻgʻri", 28.02], ["yoʻq,", 28.78]] },
    { a: 29.02, b: 31.0, w: [["qaytanga", 29.02], ["obnovleniye", 29.5], ["boʻlgani", 30.04], ["hisobiga", 30.42]] },
    { a: 31.0, b: 32.0, w: [["telefon", 31.01], ["yaxshiroq,", 31.43]] },
    { a: 32.0, b: 34.02, w: [["batareya", 32.0], ["yomkosti", 32.4], ["yaxshiroq", 32.95], ["ishlashi", 33.4], ["kerak.", 33.75]] },
    { a: 34.02, b: 36.42, w: [["Lekin", 34.02], ["bu", 34.37], ["yili", 34.52], ["iPhone", 34.82], ["17", 35.28], ["Pro", 35.74], ["Maxʼda", 36.0]] },
    { a: 36.42, b: 39.06, w: [["100", 36.42], ["yomkostdan", 37.07], ["95–94% gacha", 37.78]] },
    { a: 39.06, b: 41.02, w: [["tushib", 39.06], ["ketgani", 39.51], ["kuzatilib", 39.96], ["oʻtdi.", 40.55]] },
    { a: 41.02, b: 42.24, w: [["Bu", 41.02], ["obnovleniyedan", 41.25], ["keyin,", 41.81]] },
    { a: 42.24, b: 44.73, w: [["buning", 42.24], ["hisobiga", 42.74], ["koʻpchilik", 43.23], ["17–18 ga", 43.73]] },
    { a: 44.73, b: 46.66, w: [["oʻtishligi", 44.73], ["uchun", 45.3], ["sunʼiy", 45.6], ["yaratilgan", 45.97]] },
    { a: 46.66, b: 47.95, w: [["tizim", 46.66], ["boʻlib", 46.95], ["chiqdi.", 47.14]] },
    // A4
    { a: 51.06, b: 54.06, w: [["OLED", 51.06], ["displeylarini", 51.35], ["va", 52.56], ["xotirasini.", 52.73]] },
    { a: 54.06, b: 55.94, w: [["Shunga", 54.06], ["qaramasdan", 54.44], ["Samsung", 55.19], ["bilan", 55.56]] },
    { a: 55.94, b: 58.02, w: [["Apple", 55.94], ["har", 56.31], ["doim", 56.5], ["raqobatlashib", 56.69], ["kelgan,", 57.63]] },
    { a: 58.02, b: 59.95, w: [["va", 58.02], ["birgalikda", 58.12], ["hamkorlikda", 58.67], ["ishlagan.", 59.27]] },
    // A5
    { a: 62.02, b: 63.2, w: [["Agar", 62.02], ["siz", 62.25], ["b/u", 62.4], ["telefonlarga ham", 62.66]] },
    { a: 63.2, b: 65.45, w: [["kafolat", 63.2], ["beradigan", 63.51], ["joy", 64.0], ["qidirayotgan", 64.4]] },
    { a: 65.45, b: 66.36, w: [["boʻlsangiz,", 65.45], ["albatta,", 66.02]] },
    { a: 66.36, b: 68.02, w: [["ABM Storeʼdan", 66.36], ["topsangiz", 67.4], ["boʻladi.", 67.64]] },
    { a: 68.02, b: 69.05, w: [["Oʻzingizga", 68.02], ["yoqqan", 68.16], ["iPhone", 68.32], ["modellarini", 68.66]] },
    { a: 69.05, b: 71.06, w: [["izohda", 69.05], ["yozib", 69.38], ["qoldiring,", 69.59]] },
    { a: 71.06, b: 73.2, w: [["biz", 71.06], ["oʻzimiz", 71.24], ["sizga", 71.66], ["aloqaga", 71.88], ["chiqamiz.", 72.26]] },
  ],
  sheets: [
    {
      id: "q1", type: "question", enter: "cut", a: 0, b: 3.02, num: "01",
      words: [["Telefonni", 0.06], ["100%", 0.35], ["zaryadlamasdan", 0.79], ["ishlatish", 1.35], ["batareyaga", 1.82], ["zarar", 2.34, 1], ["beradimi?", 2.6]],
    },
    {
      id: "q2", type: "question", enter: "slide", a: 12.9, b: 17.02, num: "02", size: 70,
      words: [["Agar", 13.02], ["suv", 13.24], ["ostida", 13.4], ["iPhone", 13.66], ["bilan", 14.02], ["video", 14.33], ["olsangiz", 14.62], ["va", 15.0], ["u", 15.19], ["buzilsa,", 15.28, 1], ["Apple", 15.96], ["kompaniyasi", 16.11], ["tuzatib", 16.46], ["beradimi?", 16.64]],
    },
    {
      id: "q3", type: "question", enter: "slide", a: 23.95, b: 28.02, num: "03", size: 76,
      words: [["Har", 24.06], ["doim", 24.25], ["telefonni", 24.44], ["yangilash", 24.88], ["uning", 25.72], ["yomkostini", 25.88, 1], ["tushirishga", 26.43], ["sabab", 27.01], ["boʻladimi?", 27.43]],
    },
    {
      id: "q4", type: "question", enter: "slide", a: 47.95, b: 51.06, num: "04",
      words: [["Apple", 48.06], ["qaysi", 48.33], ["qismlarini", 48.66], ["Samsungʼdan", 49.35, 1], ["sotib", 50.06], ["oladi?", 50.31]],
    },
    {
      id: "q5", type: "question", enter: "slide", a: 59.95, b: 62.02, num: "05",
      words: [["Ishonchli", 60.02], ["b/u", 60.4, 1], ["telefonlarni", 60.66], ["qayerdan", 61.08], ["topsa", 61.4], ["boʻladi?", 61.64]],
    },
  ],
};
