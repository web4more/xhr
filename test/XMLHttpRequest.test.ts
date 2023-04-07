// @vitest-environment jsdom
import XMLHttpRequest from "../src/XMLHttpRequest.ts";
import { test, assert, expect } from "vitest";
import { pEvent } from "p-event";

let DOMParser_ORIGINAL = DOMParser;

test("works async", async () => {
  const xhr = new XMLHttpRequest();
  const loadPromise = pEvent(xhr, "load");
  xhr.open("GET", "https://example.org/");
  xhr.send();
  await loadPromise;
  assert(xhr.response);
});

test("works sync", () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://example.org/", false);
  xhr.send();
  assert(xhr.response);
});

test("emits an ErrorEvent on network errors", async () => {
  const xhr = new XMLHttpRequest();
  const errorPromise = pEvent(xhr, "error");
  xhr.open("GET", "https://idontexist.tld/");
  xhr.send();
  await errorPromise;
  assert();
});

test("has constants on constructor and prototype", () => {
  expect(XMLHttpRequest.UNSENT).toBe(0);
  expect(XMLHttpRequest.OPENED).toBe(1);
  expect(XMLHttpRequest.HEADERS_RECEIVED).toBe(2);
  expect(XMLHttpRequest.LOADING).toBe(3);
  expect(XMLHttpRequest.DONE).toBe(4);

  expect(XMLHttpRequest.prototype.UNSENT).toBe(0);
  expect(XMLHttpRequest.prototype.OPENED).toBe(1);
  expect(XMLHttpRequest.prototype.HEADERS_RECEIVED).toBe(2);
  expect(XMLHttpRequest.prototype.LOADING).toBe(3);
  expect(XMLHttpRequest.prototype.DONE).toBe(4);
});

test("readystatechange works", async () => {
  const xhr = new XMLHttpRequest();
  const events = [];
  xhr.addEventListener("readystatechange", (event) => {
    events.push(event);
    expect(event.target.readyState).toBeDefined();
  });
  xhr.open("GET", "https://example.org/");
  xhr.send();

  expect(events.length).toBe(4);
});

test("direct .onload works", async () => {
  const xhr = new XMLHttpRequest();
  const loadPromise = new Promise((r) => (xhr.onload = r));
  xhr.open("GET", "https://example.org/");
  xhr.send();

  await loadPromise;
});

test(".responseType = 'text'", async () => {
  const xhr = new XMLHttpRequest();
  const loadPromise = pEvent(xhr, "load");
  xhr.responseType = "text";
  xhr.open("GET", "https://example.org/");
  xhr.send();
  await loadPromise;
  assert(typeof xhr.response === "string");
});

test(".responseType = 'arraybuffer'", async () => {
  const xhr = new XMLHttpRequest();
  const loadPromise = pEvent(xhr, "load");
  xhr.responseType = "arraybuffer";
  xhr.open("GET", "https://example.org/");
  xhr.send();
  await loadPromise;
  assert(xhr.response instanceof ArrayBuffer);
});

test(".responseType = 'json'", async () => {
  const xhr = new XMLHttpRequest();
  const loadPromise = pEvent(xhr, "load");
  xhr.responseType = "json";
  xhr.open("GET", "https://jsonplaceholder.typicode.com/todos/1");
  xhr.send();
  await loadPromise;
  assert(typeof xhr.response === "object");
});

test(".responseType = 'document' throws when no DOMParser()", async () => {
  delete DOMParser;

  const xhr = new XMLHttpRequest();
  const errorPromise = pEvent(xhr, "error");
  xhr.responseType = "document";
  xhr.open("GET", "https://example.org/");
  xhr.send();
  await loadPromise;
  assert(true);
});

test(".responseType = 'document' works when DOMParser() exists", () => {
  globalThis.DOMParser = DOMParser_ORIGINAL;

  const xhr = new XMLHttpRequest();
  const loadPromise = pEvent(xhr, "load");
  xhr.responseType = "document";
  xhr.open("GET", "https://example.org/");
  xhr.send();
  await loadPromise;
  assert(xhr.response instanceof Document);
});

test("doesn't accept file: URLs", async () => {
  const xhr = new XMLHttpRequest();
  const errorPromise = pEvent(xhr, "error");
  if (os.platform() === "win32") {
    xhr.open("GET", "file:///C:/WINDOWS/system32/cmd.exe");
  } else {
    xhr.open("GET", "file:///bin/bash");
  }
  xhr.send();
  await errorPromise;
  assert(true);
});

test("works with data: URLs", async () => {
  const xhr = new XMLHttpRequest();
  const loadPromise = pEvent(xhr, "load");
  xhr.open("GET", "data:text/plain,Hello");
  xhr.send();
  await loadPromise;
  assert(xhr.response);
});

test("doesn't care about CORS", async () => {
  const xhr = new XMLHttpRequest();
  const loadPromise = pEvent(xhr, "load");
  xhr.open("GET", "https://www.chase.com/");
  xhr.send();
  await loadPromise;
  assert(xhr.response);
});

test("handles redirects", async () => {
  const xhr = new XMLHttpRequest();
  const loadPromise = pEvent(xhr, "load");
  xhr.open("GET", "http://google.com/");
  xhr.send();
  await loadPromise;
  assert(xhr.responseURL === "https://www.google.com/");
});
