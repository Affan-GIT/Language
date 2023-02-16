import * as fs from "fs";

class Database {
  constructor() {
    console.log("Database connected");
  }
  public fetchLanguages = async (): Promise<String[]> => {
    try {
      const data = await fs.promises.readdir("../Database");
      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  public fetchParts = async (language: String): Promise<String[]> => {
    try {
      const data = await fs.promises.readdir(`../Database/${language}`);
      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  public fetchHeaders = async (
    language: String,
    part: String
  ): Promise<String[]> => {
    try {
      const data: Buffer = await fs.promises.readFile(
        `../Database/${language}/${part}.txt`
      );
      return data.toString().split("\n")[0].trim().split(", ");
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  public fetchIndexedWord = async (
    language: String,
    part: String,
    index: number
  ): Promise<String[]> => {
    try {
      const data: Buffer = await fs.promises.readFile(
        `../Database/${language}/${part}.txt`
      );
      return !!data.toString().split("\n")[index]
        ? [`${index}`, ...data.toString().split("\n")[index].trim().split(", ")]
        : ["null", "Completed"];
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  public fetchFileLength = async (
    language: String,
    part: String
  ): Promise<number> => {
    try {
      const data: Buffer = await fs.promises.readFile(
        `../Database/${language}/${part}.txt`
      );
      return data.toString().split("\n").length;
    } catch (err) {
      console.log(err);
      return 0;
    }
  };
}

export = new Database();
