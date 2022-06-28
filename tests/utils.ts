// # -- ---------------------------------------------------------------------------
// # --
// # -- Title:   utils.ts
// # -- Desc:    utils for testing
// # -- Author:  Ethan Dunford
// # -- Version: 0.1
// # -- Date:    24/05/2022
// # --
// # -- ---------------------------------------------------------------------------
import { assertEquals } from "./mods.ts";

export enum HttpBinUrls {
  Anything = "https://httpbin.org/anything",
  Post = "https://httpbin.org/post",
  Get = "https://httpbin.org/get",
  Put = "https://httpbin.org/put",
  Delete = "https://httpbin.org/delete",
  Patch = "https://httpbin.org/patch",
}

export const checkResult = (
  obj: unknown,
  status: number,
  expected_status = 200,
): void => {
  assertEquals(isEmpty(obj), false);
  assertEquals(status, expected_status);
};

export const isEmpty = (obj: unknown): boolean => {
  // https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
  if (typeof (obj) === "object" && obj !== null) {
    return obj &&
      Object.keys(obj).length === 0 &&
      Object.getPrototypeOf(obj) === Object.prototype;
  }
  console.log("=> error isObjEmpty not a object");
  return true;
};

export const parseJson = (s: string): { [key: string]: string } | null => {
  try {
    return JSON.parse(s);
  } catch (error) {
    console.log("=> error parsing json ->", s, error);
    return null;
  }
};

export const getFormData = () => {
  const formData = new FormData();
  formData.append("file", new Blob(["Hello, World!"]), "hello.txt");
  return formData;
};
