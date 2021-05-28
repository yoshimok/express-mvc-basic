import { configure, getLogger } from "log4js";
import path from "path";

const logDir = path.join(__dirname, "./../../log");

// configure({
//   appenders: { system: { type: "file", filename: "system.log" }, debug: { type: "file", filename: "debug.log" } },
//   categories: { default: { appenders: ["system"], level: "info" }, debug: { appenders: ["debug"], level: "debug" } },
// });
configure({
  appenders: {
    consoleLog: {
      type: "console",
    },
    systemLog: {
      type: "file",
      filename: path.join(logDir, "/system.log"),
      backups: 5,
      maxLogSize: 5000000,
      compress: true,
    },
  },
  categories: {
    default: { appenders: ["consoleLog"], level: "debug" },
    system: {
      appenders: ["systemLog"],
      level: "TRACE",
    },
  },
});

export const infoLogger = (msg?: string) => {
  const console = getLogger();
  const system = getLogger("system");
  console.level = "debug";
  system.level = "debug";
  console.info(msg);
  system.info(msg);
};

export const errorLogger = (msg?: string) => {
  const console = getLogger();
  const system = getLogger("system");
  console.level = "debug";
  system.level = "debug";
  console.error(msg);
  system.error(msg);
};
