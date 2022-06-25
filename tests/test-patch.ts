// # -- ---------------------------------------------------------------------------
// # --
// # -- Title:   test-post.ts
// # -- Desc:    testing httpPatch function
// # -- Author:  Ethan Dunford
// # -- Version: 0.1
// # -- Date:    24/05/2022
// # --
// # -- ---------------------------------------------------------------------------
import {
  assertEquals,
  checkResult,
  HttpBinUrls,
  httpPatch,
  isEmpty,
  parseJson,
} from "./mods.ts";

Deno.test("testing httpPatch", async () => {
  const resp = await httpPatch({ url: HttpBinUrls.Patch });
  const r = parseJson(await resp.text());
  checkResult(r, await resp.status);
});

Deno.test("testing httpPatch invalid method", async () => {
  const resp = await httpPatch({ url: HttpBinUrls.Get });
  const r = parseJson(await resp.text());
  assertEquals(isEmpty(r), true);
  assertEquals(resp.status, 405);
});

Deno.test("testing httpPatch with args", async () => {
  const resp = await httpPatch({ url: `${HttpBinUrls.Anything}?foo=bah` });
  const r = parseJson(await resp.text());
  checkResult(r, await resp.status);

  if (r) {
    assertEquals(typeof (r["args"]), "object");
    if (typeof (r["args"]) === "object") {
      assertEquals(r["args"]["foo"], "bah");
    }
  }
});

Deno.test("testing httpPatch with headers", async () => {
  const resp = await httpPatch({
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

Deno.test("testing httpPatch with payload (body)", async () => {
  const resp = await httpPatch({ url: HttpBinUrls.Anything, payload: true });
  const r = JSON.parse(await resp.text());
  checkResult(r, await resp.status);
  assertEquals(r.data === "true", true);
});

Deno.test("testing httpPatch with payload (json)", async () => {
  const resp = await httpPatch({
    url: HttpBinUrls.Anything,
    payload: JSON.stringify({ "foo": "bah" }),
  });
  const r = JSON.parse(await resp.text());
  checkResult(r, await resp.status);

  if (r) {
    assertEquals(typeof (r["json"]), "object");
    assertEquals(r["json"]["foo"], "bah");
  }
});

Deno.test("testing httpPatch with payload (form data)", async () => {
  const formData = new FormData();
  formData.append("name", "Deno");
  const resp = await httpPatch({
    url: HttpBinUrls.Anything,
    payload: formData,
  });
  const r = JSON.parse(await resp.text());
  checkResult(r, await resp.status);
  assertEquals(isEmpty(r["form"]), false);
  assertEquals(r["form"]["name"], "Deno");

  if (r) {
    assertEquals(typeof (r["form"]), "object");

    if (r["form"]) {
      assertEquals(r["form"]["name"], "Deno");
    }
  }
});

Deno.test("testing httpPatch with payload (files)", async () => {
  const formData = new FormData();
  formData.append("file", new Blob(["Hello, World!"]), "hello.txt");
  const resp = await httpPatch({
    url: HttpBinUrls.Anything,
    payload: formData,
  });
  const r = JSON.parse(await resp.text());
  checkResult(r, await resp.status);

  if (r) {
    assertEquals(isEmpty(r["files"]), false);
    assertEquals(r["files"]["file"], "Hello, World!");
  }
});
