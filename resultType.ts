import {
  assertEquals,
  checkResult,
  HttpBinUrls,
  httpPost,
  parseJson,
} from "./tests/mods.ts";

interface Result {
  ok: Response | null;
  error: string | null;
}

const httpPostResultType = async (): Promise<Result> => {
  try {
    const resp = await fetch("https://does.not.exist/");
    return { ok: resp, error: null };
  } catch (error) {
    return { ok: null, error: error };
  }
};

const a = await httpPostResultType();
console.log(a);
