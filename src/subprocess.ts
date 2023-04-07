#!/usr/bin/env node
import collectInput from "get-stdin";
import reviveRequest from "./reviveRequest.ts";
import replaceResponse from "./replaceResponse.ts";

if (typeof fetch === "undefined") {
  const { fetch, Request, Response, Headers, FormData } = await import(
    "undici"
  );
  // @ts-ignore
  globalThis.fetch = fetch;
  // @ts-ignore
  globalThis.Request = Request;
  // @ts-ignore
  globalThis.Response = Response;
  // @ts-ignore
  globalThis.Headers = Headers;
  // @ts-ignore
  globalThis.FormData = FormData;
}

const request = reviveRequest(JSON.parse(await collectInput()));
const response = await fetch(request);
console.log(JSON.stringify(await replaceResponse(response)));
