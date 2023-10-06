#!/usr/bin/env node

const fs = require("fs");
const yargs = require("yargs");

const options = yargs
  .usage("Usage: -c | -p <fileLocation>")
  .option("c", {
    alias: "fileLocation",
    describe: "Enter the location of the file",
    type: "string",
    demandOption: false,
  })
  .options("l", {
    alias: "fileLocation",
    describe: "Enter the location of the file",
    type: "string",
    demandOption: false,
  })
  .options("w", {
    alias: "fileLocation",
    describe: "Enter the location of the file",
    type: "string",
    demandOption: false,
  }).argv;

const data = fs.readFileSync(`${options.fileLocation}`, {
  encoding: "utf-8",
});

if (options.c) {
  const byteSize = (str) => new Blob([str]).size;
  console.log(`${byteSize(data)} ${options.fileLocation}`);
}

if (options.l) {
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i] == "\n") count++;
  }
  console.log(`${count} ${options.fileLocation}`);
}

if (options.w) {
  let noOfWords = countWords(data);
  console.log(`${noOfWords} ${options.fileLocation}`);
}

function countWords(str) {
  if (str == null || str.length == 0) return 0;
  let wordCount = 0;
  let isWord = false;
  let endOfLine = str.length - 1;
  let ch = str.split("");
  for (let i = 0; i < ch.length; i++) {
    if (isLetter(ch[i]) && i != endOfLine) isWord = true;
    else if (!isLetter(ch[i]) && isWord) {
      wordCount++;
      isWord = false;
    } else if (isLetter(ch[i]) && i == endOfLine) wordCount++;
  }
  return wordCount;
}

function isLetter(c) {
  return c.toLowerCase() != c.toUpperCase();
}
