const Database = require("../Database/Database");
import { Express, Request, Response } from "express";

class LanguageController {
  private static _instance: LanguageController;

  constructor() {
    console.log("LanguageController initialized");
  }

  fetchLanguages = async () => {
    const languages = await Database.fetchLanguages();
    return languages;
  };
  fetchPartsByLanguage = async (language: String) => {
    const parts = await Database.fetchParts(language);
    return parts.map((part: String) => part.split(".")[0]);
  };
  fetchIndexedWord = async (language: String, part: String, index: number) => {
    const word = await Database.fetchIndexedWord(language, part, index);
    return word;
  };
  fetchHeadersByPart = async (language: String, part: String) => {
    const headers = await Database.fetchHeaders(language, part);
    return headers;
  };
  private getRandomIndex = (length: number, previousIndices: number[]) => {
    const indices = Array(length - 1)
      .fill(0)
      .map((_, idx) => (previousIndices.includes(idx + 1) ? 0 : idx + 1));

    let i = 0;
    while (i < indices.length) {
      if (indices[i] === 0) {
        indices.splice(i, 1);
      } else {
        ++i;
      }
    }
    return indices[Math.floor(Math.random() * indices.length)];
  };

  fetchRandomWord = async (
    language: String,
    part: String,
    previousIndices: number[]
  ) => {
    const length = await Database.fetchFileLength(language, part);
    const randomIndex = this.getRandomIndex(length, previousIndices);
    const word = await Database.fetchIndexedWord(language, part, randomIndex);
    return word;
  };
}

const Controller = new LanguageController();

const getLanguages = async (req: Request, res: Response) => {
  const languages = await Controller.fetchLanguages();
  res.send(languages);
};
const getParts = async (req: Request, res: Response) => {
  const parts = await Controller.fetchPartsByLanguage(req.params.language);
  res.send(parts);
};
const getHeaders = async (req: Request, res: Response) => {
  const headers = await Controller.fetchHeadersByPart(
    req.params.language,
    req.params.part
  );
  res.send(headers);
};
const getRandomWord = async (req: Request, res: Response) => {
  const word = await Controller.fetchRandomWord(
    req.params.language,
    req.params.part,
    req.params.previousIndices.split(",").map((i) => parseInt(i))
  );
  res.send({ word: word });
};
const getIndexedWord = async (req: Request, res: Response) => {
  const word = await Controller.fetchIndexedWord(
    req.params.language,
    req.params.part,
    parseInt(req.params.index)
  );
  res.send({ word: word });
};

module.exports = {
  getLanguages,
  getParts,
  getHeaders,
  getRandomWord,
  getIndexedWord,
};
