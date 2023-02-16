"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fs = __importStar(require("fs"));
class Database {
    constructor() {
        this.fetchLanguages = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fs.promises.readdir("../Database");
                return data;
            }
            catch (err) {
                console.log(err);
                return [];
            }
        });
        this.fetchParts = (language) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fs.promises.readdir(`../Database/${language}`);
                return data;
            }
            catch (err) {
                console.log(err);
                return [];
            }
        });
        this.fetchHeaders = (language, part) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fs.promises.readFile(`../Database/${language}/${part}.txt`);
                return data.toString().split("\n")[0].trim().split(", ");
            }
            catch (err) {
                console.log(err);
                return [];
            }
        });
        this.fetchIndexedWord = (language, part, index) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fs.promises.readFile(`../Database/${language}/${part}.txt`);
                return !!data.toString().split("\n")[index]
                    ? [`${index}`, ...data.toString().split("\n")[index].trim().split(", ")]
                    : ["null", "Completed"];
            }
            catch (err) {
                console.log(err);
                return [];
            }
        });
        this.fetchFileLength = (language, part) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fs.promises.readFile(`../Database/${language}/${part}.txt`);
                return data.toString().split("\n").length;
            }
            catch (err) {
                console.log(err);
                return 0;
            }
        });
        console.log("Database connected");
    }
}
module.exports = new Database();
