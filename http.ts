// # -- ---------------------------------------------------------------------------
// # --
// # -- Title:   http.ts
// # -- Desc:    A wrapper around the standard request library.
// # -- Author:  Ethan Dunford
// # -- Version: 0.1
// # -- Date:    24/05/2022
// # --
// # -- ---------------------------------------------------------------------------

interface Result {}

interface Http {
  url: string;
  payload?: any;
  headers?: Record<string, unknown>;
}

enum HtppMethod {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export const httpPost = async (r: Http): Promise<Response> => {
  const resp = await fetch(r.url, {
    method: HtppMethod.POST,
    headers: { ...{}, ...r.headers },
    body: r.payload,
  });
  return resp;
};

export const httpGet = async (r: Http): Promise<Response> => {
  const resp = await fetch(r.url, {
    method: HtppMethod.GET,
    headers: { ...{}, ...r.headers },
  });
  return resp;
};

export const httpPut = async (r: Http): Promise<Response> => {
  const resp = await fetch(r.url, {
    method: HtppMethod.PUT,
    headers: { ...{}, ...r.headers },
    body: r.payload,
  });
  return resp;
};

export const httpDelete = async (r: Http): Promise<Response> => {
  const resp = await fetch(r.url, {
    method: HtppMethod.DELETE,
    headers: { ...{}, ...r.headers },
    body: r.payload,
  });
  return resp;
};

export const httpPatch = async (r: Http): Promise<Response> => {
  const resp = await fetch(r.url, {
    method: HtppMethod.PATCH,
    headers: { ...{}, ...r.headers },
    body: r.payload,
  });
  return resp;
};