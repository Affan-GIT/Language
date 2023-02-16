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
const express = require("express");
require("dotenv").config();
const router = require("./Routers/LanguageRouter");
const cors = require("cors");
const app = express();
app.use(cors());
app.use("/api/v1", router);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
});
start();
