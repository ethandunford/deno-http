// # -- ---------------------------------------------------------------------------
// # --
// # -- Title:   test-post.ts
// # -- Desc:    testing httpPost function
// # -- Author:  Ethan Dunford
// # -- Version: 0.1
// # -- Date:    24/05/2022
// # --
// # -- ---------------------------------------------------------------------------
import { readableStreamFromReader, writableStreamFromWriter } from "../mods.ts";
import { expandGlob } from "https://deno.land/std@0.145.0/fs/mod.ts";
import {
  assertEquals,
  checkResult,
  getFileData,
  getFormData,
  HttpBinUrls,
  httpPost,
  isEmpty,
  parseJson,
} from "../mods.ts";

Deno.test("testing httpPost", async () => {
  const resp = await httpPost({ url: HttpBinUrls.Post });

  if (resp.ok) {
    const r = parseJson(await resp.ok.text());
    checkResult(r, await resp.ok.status);
  }

  assertEquals(resp.error, null);
});

Deno.test("testing httpPost invalid method", async () => {
  const resp = await httpPost({ url: HttpBinUrls.Get });

  if (resp.ok) {
    const r = parseJson(await resp.ok.text());
    assertEquals(isEmpty(r), true);
    assertEquals(resp.ok.status, 405);
  }

  assertEquals(resp.error, null);
});

Deno.test("testing httpPost with args", async () => {
  const resp = await httpPost({ url: `${HttpBinUrls.Anything}?foo=bah` });

  if (resp.ok) {
    const r = parseJson(await resp.ok.text());
    checkResult(r, resp.ok.status);

    if (r) {
      assertEquals(typeof (r["args"]), "object");
      if (typeof (r["args"]) === "object") {
        assertEquals(r["args"]["foo"], "bah");
      }
    }
  }
  assertEquals(resp.error, null);
});

Deno.test("testing httpPost with headers", async () => {
  const resp = await httpPost({
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
    assertEquals(resp.error, null);
  }
});

Deno.test("testing httpPost with payload (body)", async () => {
  const resp = await httpPost({ url: HttpBinUrls.Anything, payload: true });

  if (resp.ok) {
    const r = JSON.parse(await resp.ok.text());
    checkResult(r, await resp.ok.status);
    if (r) {
      assertEquals(r.data === "true", true);
    }
  }
  assertEquals(resp.error, null);
});

Deno.test("testing httpPost with payload (json)", async () => {
  const resp = await httpPost({
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

Deno.test("testing httpPost with payload (form data)", async () => {
  const resp = await httpPost({
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

Deno.test("testing httpPost with payload (files)", async () => {
  const resp = await httpPost({
    url: HttpBinUrls.Anything,
    payload: getFileData(),
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

Deno.test("testing httpPost - sending file", async () => {
  const file = await Deno.open("./tests/logo.svg", { read: true });
  const readableStream = readableStreamFromReader(file);
  const resp = await httpPost({
    url: HttpBinUrls.Anything,
    payload: readableStream,
  });
  if (resp.ok) {
    const r = parseJson(await resp.ok.text());
    checkResult(r, await resp.ok.status, 200);
  }
  assertEquals(resp.error, null);
});

Deno.test("testing httpPost- receiving file", async () => {
  const resp = await httpPost({ url: "https://deno.land/logo.svg" });
  if (resp.ok && resp.ok.body) {
    const file = await Deno.open("./tests/logo-download.svg", {
      write: true,
      create: true,
    });
    const writableStream = writableStreamFromWriter(file);
    await resp.ok.body.pipeTo(writableStream);

    for await (const file of expandGlob("logo-download.svg")) {
      if (file.name === "logo-download.svg" && file.isFile == true) {
        assertEquals(true, true);
      } else {
        assertEquals(true, false);
      }
    }
  }
  assertEquals(resp.error, null);
});
