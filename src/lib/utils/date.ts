/**
 * Returns the next sunday
 * @param date
 */
export function getUpcomingSunday(date: Date = new Date()): Date {
  date.setUTCHours(24, 0);
  const dateNumber = date.getDate() + ((7 - date.getDay()) % 7);
  date.setUTCDate(dateNumber);
  return date;
}

/**
 * Returns a string in YYYY-MM-DD
 * Note: everything is converted to UTC.
 * @param date
 */
function toYYYYMMDD(date) {
  var d = new Date(date),
    month = "" + (d.getUTCMonth() + 1),
    day = "" + d.getUTCDate(),
    year = d.getUTCFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

/**
 * Returns a string that is usable by the DOM
 * @param date
 */
export function toDomDate(date: Date | string) {
  if (typeof date === "string") {
    date = new Date(date);
  }

  return toYYYYMMDD(date);
}
