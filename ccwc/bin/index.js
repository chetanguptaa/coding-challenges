#!/usr/bin/env node

const fs = require("fs");
const yargs = require("yargs");

const options = yargs
  .usage("Usage: -c | -l | -w <fileLocation>")
  .options("c", {
    alias: "bytes",
    describe: "Enter the location of the file",
    type: "string",
    demandOption: false,
  })
  .options("l", {
    alias: "lines",
    describe: "Enter the location of the file",
    type: "string",
    demandOption: false,
  })
  .options("w", {
    alias: "words",
    describe: "Enter the location of the file",
    type: "string",
    demandOption: false,
  }).argv;

if (options.l) {
  const data = fs.readFileSync(`${options.lines}`, {
    encoding: "utf-8",
  });
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i] == "\n") count++;
  }
  console.log(`${count} ${options.l}`);
} else if (options.c) {
  const data = fs.readFileSync(`${options.bytes}`, {
    encoding: "utf-8",
  });
  const byteSize = (str) => new Blob([str]).size;
  console.log(`${byteSize(data)} ${options.c}`);
} else if (options.w) {
  const data = fs.readFileSync(`${options.words}`, {
    encoding: "utf-8",
  });
  let noOfWords = countWords(data);
  console.log(`${noOfWords} ${options.w}`);
} else {
  console.log("Please provide suitable flag");
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
