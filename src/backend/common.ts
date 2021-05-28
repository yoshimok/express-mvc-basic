import dateFormat from "dateformat";
import * as fs from "fs";
import { Parser } from "json2csv";
import { errorLogger, infoLogger } from "./logger/logger";
import { FileDetails } from "./models";

const outputDirPath = __dirname + "/../../csv/output/";

export const getFiles = (): fs.Dirent[] => {
  const files = fs.readdirSync(outputDirPath, {
    withFileTypes: true,
  });

  files.sort((a, b) => {
    const detailA = getFileDetail(a);
    const detailB = getFileDetail(b);
    if (detailA.createdAt < detailB.createdAt) return -1;
    if (detailA.createdAt > detailB.createdAt) return 1;
    return 0;
  });

  return files;
};

export const getFileDetails = (): FileDetails[] => {
  const files: fs.Dirent[] = getFiles();
  return files.map((file) => {
    return getFileDetail(file);
  });
};

export const getFileDetail = (file: fs.Dirent): FileDetails => {
  const latestFileName = file.name;
  const latestfile = fs.statSync(outputDirPath + latestFileName);
  return {
    name: latestFileName,
    createdAt: latestfile.mtime,
  };
};

export const getFileData = (filename: string) => {
  return fs.readFileSync(outputDirPath + filename);
};


export const createFile = (data: string | NodeJS.ArrayBufferView, filename: string) => {
  const files = getFiles();
  if (files.length >= 5) {
    const oldestFile = files[0];
    deleteFile(oldestFile.name);
  }

  fs.writeFileSync(outputDirPath + filename, data);
};

export const appendFile = (data: string | NodeJS.ArrayBufferView, filename: string) => {
  fs.appendFile(outputDirPath + filename, "\r\n" + data, (error) => {
    if (error) {
      errorLogger(error.message);
      throw error;
    } else {
      infoLogger("append data to " + filename);
    }
  });
};

export const deleteFile = (filename: string) =>
  fs.unlink(outputDirPath + filename, (error) => {
    if (error) throw error;
    infoLogger(`${filename} was deleted`);
  });

export const createUniquename = (name: string): string => {
  const now = dateFormat(new Date(), "yyyymmddHHMMss");
  const filename = `${name}-${now}.csv`;
  return filename;
};

export const renameFile = (baseName: string, newName: string) => {
  fs.rename(outputDirPath + baseName, outputDirPath + newName, (err) => {
    if (err) throw err;
  });
};

// TODO: middlewareにする
export const memoryUsageLog = () => {
  const used = process.memoryUsage();
  const messages = [];
  messages.push(`rss: ${Math.round((used.rss / 1024 / 1024) * 100) / 100} MB`);
  messages.push(`heapTotal: ${Math.round((used.heapTotal / 1024 / 1024) * 100) / 100} MB`);
  messages.push(`heapUsed: ${Math.round((used.heapUsed / 1024 / 1024) * 100) / 100} MB`);
  messages.push(`external: ${Math.round((used.external / 1024 / 1024) * 100) / 100} MB`);
  messages.push(`arrayBuffers: ${Math.round((used.arrayBuffers / 1024 / 1024) * 100) / 100} MB`);

  infoLogger(messages.join(", "));
};
