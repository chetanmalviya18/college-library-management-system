import log from "loglevel";

if (import.meta.env.MODE === "development") {
  log.setLevel("debug");
} else {
  log.setLevel("warn");
}

export const logger = {
  debug: (...args) => log.debug(...args),
  info: (...args) => log.info(...args),
  warn: (...args) => log.warn(...args),
  error: (...args) => log.error(...args),
};

export default logger;
