import { paths as Paths } from "./fetch-api-schema";
import {
  Method,
  ApiResponse,
  TypedFetch,
  OpArgType,
  Request,
  CreateFetch,
} from "./fetch-api-types";

const sendBody = (method: Method) =>
  method === "post" ||
  method === "put" ||
  method === "patch" ||
  method === "delete";

function queryString(params: Record<string, unknown>): string {
  const qs: string[] = [];

  const encode = (key: string, value: unknown) =>
    `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;

  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value != null) {
      if (Array.isArray(value)) {
        value.forEach((value) => qs.push(encode(key, value)));
      } else {
        qs.push(encode(key, value));
      }
    }
  });

  if (qs.length > 0) {
    return `?${qs.join("&")}`;
  }

  return "";
}

function getPath(path: string, payload: Record<string, any>) {
  return path.replace(/\{([^}]+)\}/g, (_, key) => {
    const value = encodeURIComponent(payload[key]);
    delete payload[key];
    return value;
  });
}

function getQuery(
  method: Method,
  payload: Record<string, any>,
  query: string[]
) {
  let queryObj = {} as any;

  if (sendBody(method)) {
    query.forEach((key) => {
      queryObj[key] = payload[key];
      delete payload[key];
    });
  } else {
    queryObj = { ...payload };
  }

  return queryString(queryObj);
}

function getHeaders(body?: string, init: HeadersInit = {}) {
  const headers = new Headers(init);

  if (body !== undefined && !headers.has("Content-Type")) {
    headers.append("Content-Type", "application/json");
  }

  if (!headers.has("Accept")) {
    headers.append("Accept", "application/json");
  }

  return headers;
}

function getBody(method: Method, payload: any) {
  const body = sendBody(method) ? JSON.stringify(payload) : undefined;
  // if delete don't send body if empty
  return method === "delete" && body === "{}" ? undefined : body;
}

function getFetchParams(request: Request) {
  // clone payload
  // if body is a top level array [ 'a', 'b', param: value ] with param values
  // using spread [ ...payload ] returns [ 'a', 'b' ] and skips custom keys
  // cloning with Object.assign() preserves all keys
  const payload = Object.assign(
    Array.isArray(request.payload) ? [] : {},
    request.payload
  );

  const path = getPath(request.path, payload);
  const query = getQuery(request.method, payload, request.queryParams);
  const body = getBody(request.method, payload);
  const headers = getHeaders(body, request.init?.headers);
  const url = request.baseUrl + path + query;

  const init = {
    ...request.init,
    method: request.method.toUpperCase(),
    headers,
    body,
  };

  return { url, init };
}

async function fetchUrl<R>(request: Request) {
  const { url, init } = getFetchParams(request);

  const response = await request.fetch(url, init as any);

  return response as ApiResponse<R>;
}

function createFetch<OP>(fetch: TypedFetch<OP>): TypedFetch<OP> {
  return async (payload: OpArgType<OP>, init?: RequestInit) =>
    fetch(payload, init);
}

async function getResponseData(response: Response) {
  const contentType = response.headers.get("content-type");
  if (response.status === 204 /* no content */) {
    return undefined;
  }
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return await response.json();
  }
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

async function fetchJson(url: string, init: RequestInit): Promise<ApiResponse> {
  const response = await fetch(url, init);

  const data = await getResponseData(response);

  const result = {
    headers: response.headers,
    url: response.url,
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    data,
  };

  if (result.ok) {
    return result;
  }

  throw new Error(JSON.stringify(result));
}

export function fetcher() {
  let baseUrl = "";
  let baseInit: RequestInit;

  return {
    configure: (config: { baseUrl?: string; init?: RequestInit }) => {
      baseUrl = config.baseUrl || "";
      baseInit = config.init || {};
    },
    path: <P extends keyof Paths>(path: P) => ({
      method: <M extends keyof Paths[P]>(method: M) => ({
        build: ((queryParams?: Record<string, true | 1>) =>
          createFetch((payload, init = {}) => {
            return fetchUrl({
              baseUrl: baseUrl || "",
              path: path as string,
              method: method as Method,
              queryParams: Object.keys(queryParams || {}),
              payload,
              init: { ...init, ...baseInit },
              fetch: fetchJson,
            });
          })) as CreateFetch<M, Paths[P][M]>,
      }),
    }),
  };
}
