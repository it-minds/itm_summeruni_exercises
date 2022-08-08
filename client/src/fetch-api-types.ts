export type Method =
  | "get"
  | "post"
  | "put"
  | "patch"
  | "delete"
  | "head"
  | "options";

export type ApiResponse<R = any> = {
  readonly headers: Headers;
  readonly url: string;
  readonly ok: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly data: R;
};

export type OpArgType<OP> = OP extends {
  parameters?: {
    path?: infer P;
    query?: infer Q;
    body?: infer B;
    header?: unknown; // ignore
    cookie?: unknown; // ignore
  };
  // openapi 3
  requestBody?: {
    content: {
      "application/json": infer RB;
    };
  };
}
  ? P & Q & (B extends Record<string, unknown> ? B[keyof B] : unknown) & RB
  : Record<string, never>;

export type _OpReturnType<T> = 200 extends keyof T
  ? T[200]
  : 201 extends keyof T
  ? T[201]
  : "default" extends keyof T
  ? T["default"]
  : unknown;

export type OpResponseTypes<OP> = OP extends {
  responses: infer R;
}
  ? {
      [S in keyof R]: R[S] extends { schema?: infer S } // openapi 2
        ? S
        : R[S] extends { content: { "application/json": infer C } } // openapi 3
        ? C
        : S extends "default"
        ? R[S]
        : unknown;
    }
  : never;

export type OpReturnType<OP> = _OpReturnType<OpResponseTypes<OP>>;

export type TypedFetch<OP> = (
  arg: OpArgType<OP>,
  init?: RequestInit
) => Promise<ApiResponse<OpReturnType<OP>>>;

export type Fetch = (url: string, init: RequestInit) => Promise<ApiResponse>;

export type Request = {
  baseUrl: string;
  method: Method;
  path: string;
  queryParams: string[]; // even if a post these will be sent in query
  payload: any;
  init?: RequestInit;
  fetch: Fetch;
};

type _CreateFetch<OP, Q = never> = [Q] extends [never]
  ? () => TypedFetch<OP>
  : (query: Q) => TypedFetch<OP>;

export type CreateFetch<M, OP> = M extends "post" | "put" | "patch" | "delete"
  ? OP extends { parameters: { query: infer Q } }
    ? _CreateFetch<OP, { [K in keyof Q]: true | 1 }>
    : _CreateFetch<OP>
  : _CreateFetch<OP>;
