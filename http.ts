// # -- ---------------------------------------------------------------------------
// # --
// # -- Title:   http.ts
// # -- Desc:    A wrapper around the standard request library.
// # -- Author:  Ethan Dunford
// # -- Version: 0.1
// # -- Date:    24/05/2022
// # --
// # -- ---------------------------------------------------------------------------

interface Http {
  url: string;
  payload?: any;
  headers?: Record<string, unknown>;
}

enum HttpMethod {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

interface Result {
  ok: Response | null;
  error: string | null;
}

export const httpPost = async (r: Http): Promise<Result> => {
  try {
    const resp = await fetch(r.url, {
      method: HttpMethod.POST,
      headers: { ...{}, ...r.headers },
      body: r.payload,
    });
    return { ok: resp, error: null };
  } catch (error) {
    return { ok: null, error: error };
  }
};

export const httpGet = async (r: Http): Promise<Response> => {
  const resp = await fetch(r.url, {
    method: HttpMethod.GET,
    headers: { ...{}, ...r.headers },
  });
  return resp;
};

export const httpPut = async (r: Http): Promise<Response> => {
  const resp = await fetch(r.url, {
    method: HttpMethod.PUT,
    headers: { ...{}, ...r.headers },
    body: r.payload,
  });
  return resp;
};

export const httpDelete = async (r: Http): Promise<Response> => {
  const resp = await fetch(r.url, {
    method: HttpMethod.DELETE,
    headers: { ...{}, ...r.headers },
    body: r.payload,
  });
  return resp;
};

export const httpPatch = async (r: Http): Promise<Response> => {
  const resp = await fetch(r.url, {
    method: HttpMethod.PATCH,
    headers: { ...{}, ...r.headers },
    body: r.payload,
  });
  return resp;
};
