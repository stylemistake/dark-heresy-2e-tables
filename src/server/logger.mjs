export function createLogger(ns) {
  return new Logger(ns);
}

const inception = Date.now();
const env = process.env.NODE_ENV;

const MONTHS = [
  'Jan', 'Feb', 'Mar',
  'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep',
  'Oct', 'Nov', 'Dec',
];

function getTimestamp() {
  if (env === 'production') {
    const date = new Date();
    return  MONTHS[date.getUTCMonth()] + ' '
      + date.toISOString().substring(8, 19).replace('T', ', ');
  }
  const timestamp = String(Date.now() - inception)
    .padStart(4, '0')
    .padStart(7, ' ');
  const seconds = timestamp.substr(0, timestamp.length - 3);
  const millis = timestamp.substr(-3);
  return `${seconds}.${millis}`;
}

const ESC = {
  dimmed: "\x1b[38;5;240m",
  bright: "\x1b[37;1m",
  reset: "\x1b[0m",
}

function getPrefix(ns) {
  return `${ESC.dimmed}${getTimestamp()} ${ESC.bright}${ns}${ESC.reset}`;
}

class Logger {

  constructor(ns) {
    this.ns = ns;
  }

  log(...args) {
    console.log(getPrefix(this.ns), ...args);
  }

  error(...args) {
    console.error(getPrefix(this.ns), ...args);
  }

}
