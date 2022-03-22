const isWeekday = (d: Date) => d.getDay() % 6 !== 0;

isWeekday(new Date(2022, 2, 21)); // -> true
isWeekday(new Date(2021, 2, 20)); // -> false