#!/usr/bin/env node
import collectInput from "get-stdin";
import reviveRequest from "./reviveRequest.ts";
import replaceResponse from "./replaceResponse.ts";

if (typeof fetch === "undefined") {
  const { fetch, Request, Response, Headers, FormData } = await import(
    "undici"
  );
  globalThis.fetch = fetch;
  globalThis.Request = Request;
  globalThis.Response = Response;
  globalThis.Headers = Headers;
  globalThis.FormData = FormData;
}

const request = reviveRequest(JSON.parse(await collectInput()));
const response = await fetch(request);
console.log(JSON.stringify(await replaceResponse(response)));
