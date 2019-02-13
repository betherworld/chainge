/**
 * Formats an iso date
 * @param {Date} dateObj The js date object
 * @param {boolean} day Whether to include the day
 * @param {boolean} hours Whether to include the hours
 * @param {boolean} minutes Whether to include the minutes
 * @param {boolean} seconds Whether to include the seconds
 * @returns {string} The formatted date
 */
export const formatIsoDate = (
  dateObj, //2018-06-16T22:00:00+00:00
  day = true,
  hours = true,
  minutes = true,
  seconds = false
) => {
  let date = "";

  if (!dateObj) {
    return "";
  }

  const y = dateObj.getFullYear(),
    m = (dateObj.getMonth() + 1).toString().padStart(2, "0"),
    d = dateObj
      .getDate()
      .toString()
      .padStart(2, "0"),
    h = dateObj
      .getHours()
      .toString()
      .padStart(2, "0"),
    mi = dateObj
      .getMinutes()
      .toString()
      .padStart(2, "0"),
    s = dateObj
      .getSeconds()
      .toString()
      .padStart(2, "0");

  if (day) {
    date += d + "." + m + "." + y;
  }

  if (hours) {
    date += (day ? ", " : "") + h;

    if (minutes) {
      date += ":" + mi;

      if (seconds) {
        date += ":" + s;
      }
    }
  }

  return date;
};

/**
 * Parses a iso date string
 * @param {string} string The iso date string
 * @returns {Date} The parsed date
 */
export const isoToDate = string => {
  const y = parseInt(string.substr(0, 4)),
    m = parseInt(string.substr(5, 2)),
    d = parseInt(string.substr(8, 2)),
    h = parseInt(string.substr(11, 2)),
    mi = parseInt(string.substr(14, 2)),
    s = parseInt(string.substr(17, 2));

  return new Date(y, m - 1, d, h, mi, s);
};
