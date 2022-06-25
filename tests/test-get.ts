// # -- ---------------------------------------------------------------------------
// # --
// # -- Title:   test-get.ts
// # -- Desc:    testing httpGet function
// # -- Author:  Ethan Dunford
// # -- Version: 0.1
// # -- Date:    24/05/2022
// # --
// # -- ---------------------------------------------------------------------------
import {
  assertEquals,
  checkResult,
  HttpBinUrls,
  httpGet,
  isEmpty,
  parseJson,
} from "./mods.ts";

Deno.test("testing httpGet", async () => {
  const resp = await httpGet({ url: HttpBinUrls.Get });
  const r = parseJson(await resp.text());
  checkResult(r, await resp.status);
});

Deno.test("testing httpGet invalid method", async () => {
  const resp = await httpGet({ url: HttpBinUrls.Post });
  const r = parseJson(await resp.text());
  assertEquals(isEmpty(r), true);
  assertEquals(resp.status, 405);
});

Deno.test("testing httpGet with args", async () => {
  const resp = await httpGet({ url: `${HttpBinUrls.Anything}?foo=bah` });
  const r = parseJson(await resp.text());
  checkResult(r, await resp.status);

  if (r) {
    assertEquals(typeof (r["args"]), "object");
    if (typeof (r["args"]) === "object") {
      assertEquals(r["args"]["foo"], "bah");
    }
  }
});

Deno.test("testing httpGet with headers", async () => {
  const resp = await httpGet({
    url: HttpBinUrls.Anything,
    headers: {
      "Content-Type": "text/html; charset=UTF-8",
      "test": "this is a test header",
    },
  });
  const r = parseJson(await resp.text());
  checkResult(r, await resp.status);

  if (r) {
    assertEquals(typeof (r["headers"]), "object");
    if (typeof (r["headers"]) === "object") {
      assertEquals(r["headers"]["Content-Type"], "text/html; charset=UTF-8");
      assertEquals(r["headers"]["Test"], "this is a test header");
    }
  }
});
