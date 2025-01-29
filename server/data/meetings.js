const { addDays } = require('date-fns');

module.exports = [
  {
    id: 1,
    title: "פגישת צוות",
    time: "10:00",
    duration: "30 דקות",
    date: new Date(),
    participants: ['ישראל ישראלי', 'שרה כהן'],
  },
  {
    id: 2,
    title: "פגישת לקוח",
    time: "14:00",
    duration: "שעה",
    date: addDays(new Date(), 1),
    participants: ['יוסף לוי', 'שרון בלום'],
  },
  {
    id: 3,
    title: "סקירת פרויקט",
    time: "16:30",
    duration: "45 דקות",
    date: addDays(new Date(), 2),
    participants: ['דוד כהן', 'רונית לוי'],
  },
  {
    id: 4,
    title: "פגישת לקוח",
    time: "15:00",
    duration: "שעה",
    date: addDays(new Date(), 2),
    participants: ['מיכאל ישראלי', 'אורית כהן'],
  },
];
