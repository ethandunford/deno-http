// # -- ---------------------------------------------------------------------------
// # --
// # -- Title:   test-post.ts
// # -- Desc:    testing httpDelete function
// # -- Author:  Ethan Dunford
// # -- Version: 0.1
// # -- Date:    24/05/2022
// # --
// # -- ---------------------------------------------------------------------------
import {
  assertEquals,
  checkResult,
  getFormData,
  HttpBinUrls,
  httpDelete,
  isEmpty,
  parseJson,
} from "./mods.ts";

Deno.test("testing httpDelete", async () => {
  const resp = await httpDelete({ url: HttpBinUrls.Delete });
  if (resp.ok) {
    const r = parseJson(await resp.ok.text());
    checkResult(r, await resp.ok.status);
  }

  assertEquals(resp.error, null);
});

Deno.test("testing httpDelete invalid method", async () => {
  const resp = await httpDelete({ url: HttpBinUrls.Get });
  if (resp.ok) {
    const r = parseJson(await resp.ok.text());
    assertEquals(isEmpty(r), true);
    assertEquals(resp.ok.status, 405);
  }
  assertEquals(resp.error, null);
});

Deno.test("testing httpDelete with args", async () => {
  const resp = await httpDelete({ url: `${HttpBinUrls.Anything}?foo=bah` });

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

Deno.test("testing httpDelete with headers", async () => {
  const resp = await httpDelete({
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

Deno.test("testing httpDelete with payload (body)", async () => {
  const resp = await httpDelete({ url: HttpBinUrls.Anything, payload: true });
  if (resp.ok) {
    const r = JSON.parse(await resp.ok.text());
    checkResult(r, await resp.ok.status);
    assertEquals(r.data === "true", true);
  }
  assertEquals(resp.error, null);
});

Deno.test("testing httpDelete with payload (json)", async () => {
  const resp = await httpDelete({
    url: HttpBinUrls.Anything,
    payload: JSON.stringify({ "foo": "bah" }),
  });

  if (resp.ok) {
    const r = JSON.parse(await resp.ok.text());
    checkResult(r, await resp.ok.status);

    if (r) {
      assertEquals(typeof (r["json"]), "object");
      assertEquals(r["json"]["foo"], "bah");
    }
  }
  assertEquals(resp.error, null);
});

Deno.test("testing httpDelete with payload (form data)", async () => {
  const resp = await httpDelete({
    url: HttpBinUrls.Anything,
    payload: getFormData(),
  });

  if (resp.ok) {
    const r = JSON.parse(await resp.ok.text());
    checkResult(r, await resp.ok.status);
    assertEquals(isEmpty(r["form"]), false);
    assertEquals(r["form"]["name"], "Deno");

    if (r) {
      assertEquals(typeof (r["form"]), "object");

      if (r["form"]) {
        assertEquals(r["form"]["name"], "Deno");
      }
    }
  }
  assertEquals(resp.error, null);
});

Deno.test("testing httpDelete with payload (files)", async () => {
  const resp = await httpDelete({
    url: HttpBinUrls.Anything,
    payload: getFormData(),
  });

  if (resp.ok) {
    const r = JSON.parse(await resp.ok.text());
    checkResult(r, await resp.ok.status);

    if (r) {
      assertEquals(isEmpty(r["files"]), false);
      assertEquals(r["files"]["file"], "Hello, World!");
    }
  }
  assertEquals(resp.error, null);
});
