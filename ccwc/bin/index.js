#!/usr/bin/env node

const fs = require("fs");
const yargs = require("yargs");

const options = yargs
  .usage("Usage: -c | -l | -w | -m <fileLocation>")
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
  })
  .options("m", {
    alias: "characters",
    describe: "Enter the location of the file",
    type: "string",
    demandOption: false,
  }).argv;

if (options.l || options.c || options.w || options.m || !process.stdin.isTTY) {
  if (!process.stdin.isTTY) {
    const fileLocation = process.stdin.bytesRead;
    process.stdin.pipe;
    console.log(fileLocation);
    const data = fs.readFileSync(fileLocation, {
      encoding: "utf-8",
    });
    if (options.l) {
      let count = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i] === "\n") {
          count++;
        }
      }
      console.log(`${count} ${fileLocation}`);
    }
  } else {
    const fileLocation = options.m || options.w || options.c || options.l;
    if (fileLocation) {
      const data = fs.readFileSync(fileLocation, {
        encoding: "utf-8",
      });
      if (options.l) {
        let count = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i] === "\n") {
            count++;
          }
        }
        console.log(`${count} ${fileLocation}`);
      } else if (options.c) {
        const byteSize = (str) => new Blob([str]).size;
        console.log(`${byteSize(data)} ${fileLocation}`);
      } else if (options.w) {
        let noOfWords = countWords(data);
        console.log(`${noOfWords} ${fileLocation}`);
      } else if (options.m) {
        console.log(`${data.length} ${fileLocation}`);
      }
    }
  }
} else {
  console.log("Please provide a file location.");
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
