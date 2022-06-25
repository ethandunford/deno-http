// # -- ---------------------------------------------------------------------------
// # --
// # -- Title:   test-mod.ts
// # -- Desc:    modules for testing
// # -- Author:  Ethan Dunford
// # -- Version: 0.1
// # -- Date:    24/05/2022
// # --
// # -- ---------------------------------------------------------------------------
export { assertEquals } from "https://deno.land/std@0.145.0/testing/asserts.ts";
export { checkResult, HttpBinUrls, isEmpty, parseJson } from "./utils.ts";
export { httpDelete, httpGet, httpPatch, httpPost, httpPut } from "../http.ts";
