const {
  getLanguages,
  getParts,
  getHeaders,
  getRandomWord,
  getIndexedWord,
} = require("../Controllers/LanguageController");
const express = require("express");

const router = express.Router();

router.route("/languages").get(getLanguages);
router.route("/:language/parts").get(getParts);
router.route("/:language/:part/headers").get(getHeaders);
router.route("/:language/:part/:previousIndices").get(getRandomWord);
router.route("/:language/:part/:word/:index").get(getIndexedWord);

export = router;
