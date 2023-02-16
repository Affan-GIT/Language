"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database = require("../Database/Database");
class LanguageController {
    constructor() {
        this.fetchLanguages = () => __awaiter(this, void 0, void 0, function* () {
            const languages = yield Database.fetchLanguages();
            return languages;
        });
        this.fetchPartsByLanguage = (language) => __awaiter(this, void 0, void 0, function* () {
            const parts = yield Database.fetchParts(language);
            return parts.map((part) => part.split(".")[0]);
        });
        this.fetchIndexedWord = (language, part, index) => __awaiter(this, void 0, void 0, function* () {
            const word = yield Database.fetchIndexedWord(language, part, index);
            return word;
        });
        this.fetchHeadersByPart = (language, part) => __awaiter(this, void 0, void 0, function* () {
            const headers = yield Database.fetchHeaders(language, part);
            return headers;
        });
        this.getRandomIndex = (length, previousIndices) => {
            const indices = Array(length - 1)
                .fill(0)
                .map((_, idx) => (previousIndices.includes(idx + 1) ? 0 : idx + 1));
            let i = 0;
            while (i < indices.length) {
                if (indices[i] === 0) {
                    indices.splice(i, 1);
                }
                else {
                    ++i;
                }
            }
            return indices[Math.floor(Math.random() * indices.length)];
        };
        this.fetchRandomWord = (language, part, previousIndices) => __awaiter(this, void 0, void 0, function* () {
            const length = yield Database.fetchFileLength(language, part);
            const randomIndex = this.getRandomIndex(length, previousIndices);
            const word = yield Database.fetchIndexedWord(language, part, randomIndex);
            return word;
        });
        console.log("LanguageController initialized");
    }
}
const Controller = new LanguageController();
const getLanguages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const languages = yield Controller.fetchLanguages();
    res.send(languages);
});
const getParts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parts = yield Controller.fetchPartsByLanguage(req.params.language);
    res.send(parts);
});
const getHeaders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const headers = yield Controller.fetchHeadersByPart(req.params.language, req.params.part);
    res.send(headers);
});
const getRandomWord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const word = yield Controller.fetchRandomWord(req.params.language, req.params.part, req.params.previousIndices.split(",").map((i) => parseInt(i)));
    res.send({ word: word });
});
const getIndexedWord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const word = yield Controller.fetchIndexedWord(req.params.language, req.params.part, parseInt(req.params.index));
    res.send({ word: word });
});
module.exports = {
    getLanguages,
    getParts,
    getHeaders,
    getRandomWord,
    getIndexedWord,
};
