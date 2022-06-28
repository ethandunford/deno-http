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
  if (resp.ok) {
    const r = parseJson(await resp.ok.text());
    checkResult(r, await resp.ok.status);
  }

  assertEquals(resp.error, null);
});

Deno.test("testing httpGet invalid method", async () => {
  const resp = await httpGet({ url: HttpBinUrls.Post });

  if (resp.ok) {
    const r = parseJson(await resp.ok.text());
    assertEquals(isEmpty(r), true);
    assertEquals(resp.ok.status, 405);
  }
  assertEquals(resp.error, null);
});

Deno.test("testing httpGet with args", async () => {
  const resp = await httpGet({ url: `${HttpBinUrls.Anything}?foo=bah` });

  if (resp.ok) {
    const r = parseJson(await resp.ok.text());
    checkResult(r, await resp.ok.status);

    if (r) {
      assertEquals(typeof (r["args"]), "object");
      if (typeof (r["args"]) === "object") {
        assertEquals(r["args"]["foo"], "bah");
      }
    }
  }
  assertEquals(resp.error, null);
});

Deno.test("testing httpGet with headers", async () => {
  const resp = await httpGet({
    url: HttpBinUrls.Anything,
    headers: {
      "Content-Type": "text/html; charset=UTF-8",
      "test": "this is a test header",
    },
  });

  if (resp.ok) {
    const r = parseJson(await resp.ok.text());
    checkResult(r, await resp.ok.status);

    if (r) {
      assertEquals(typeof (r["headers"]), "object");
      if (typeof (r["headers"]) === "object") {
        assertEquals(r["headers"]["Content-Type"], "text/html; charset=UTF-8");
        assertEquals(r["headers"]["Test"], "this is a test header");
      }
    }
  }
  assertEquals(resp.error, null);
});
