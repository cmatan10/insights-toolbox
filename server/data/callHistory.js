module.exports = [
  {
    id: 1,
    user: "משתמש123",
    message: "איך אני מאפס את הסיסמה שלי?",
    date: "2024-01-27T10:30:00",
    status: true,
    conversation: [
      { role: "user", content: "שלום, אני לא מצליח לאפס את הסיסמה שלי." },
      {
        role: "assistant",
        content: "היי! כדי לאפס את הסיסמה, אנא לחץ על כפתור 'שכחתי סיסמה' במסך ההתחברות, והמשך לפי ההוראות.",
      },
      {
        role: "user",
        content: "מדהים, תודה רבה!",
      },
      {
        role: "assistant",
        content: "בשמחה! אם יש עוד משהו, אשמח לעזור.",
      },
      { role: "user", content: "שלום, מתי מתוכנן חלון התחזוקה הבא?" },
      {
        role: "assistant",
        content: "חלון התחזוקה הבא מתוכנן ל-15 בפברואר, בין השעות 02:00-03:00.",
      },
    ],
  },
  {
    id: 2,
    user: "משתמש456",
    message: "מתי חלון התחזוקה הבא?",
    date: "2024-01-27T11:15:00",
    status: true,
    conversation: [
      { role: "user", content: "שלום, מתי מתוכנן חלון התחזוקה הבא?" },
      {
        role: "assistant",
        content: "חלון התחזוקה הבא מתוכנן ל-15 בפברואר, בין השעות 02:00-03:00.",
      },
      {
        role: "user",
        content: "תודה רבה על העדכון!",
      },
      {
        role: "assistant",
        content: "בשמחה! אם יהיו שינויים, נעדכן אתכם מראש.",
      },
    ],
  },
  {
    id: 3,
    user: "משתמש789",
    message: "האם תוכל לעזור עם אינטגרציית API?",
    date: "2024-01-27T14:20:00",
    status: false,
    conversation: [
      { role: "user", content: "היי, אני צריך עזרה עם האינטגרציה של ה-API החדש." },
      {
        role: "assistant",
        content: "בוודאי! מה בדיוק הבעיה שאתה נתקל בה?",
      },
      {
        role: "user",
        content: "אני מקבל שגיאת 401 כשאני מנסה לשלוח בקשה.",
      },
      {
        role: "assistant",
        content:
          "שגיאת 401 מעידה על כך שאין הרשאה מתאימה. ודא שאתה שולח את הטוקן הנכון בכותרת Authorization.",
      },
    ],
  },
  {
    id: 4,
    user: "משתמש8589",
    message: "האם תוכל לעזור?",
    date: "2024-01-27T14:20:00",
    status: false,
    conversation: [
      { role: "user", content: "היי, אני זקוק לעזרה כללית לגבי המערכת שלכם." },
      {
        role: "assistant",
        content:
          "כמובן! במה אוכל לעזור specifically?",
      },
    ],
  },
];
